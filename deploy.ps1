<#
.SYNOPSIS
    Despliegue automatizado de Espaço Elêusis en VPS Ubuntu (Oracle Cloud)
.NOTES
    Requiere: PowerShell 5.1+, OpenSSH client (incluido en Windows 10/11)
    Uso: .\deploy.ps1
#>

param(
    [string]$VpsIp = "144.33.22.185",
    [string]$VpsUser = "ubuntu",
    [string]$LocalPath = "C:\Users\staph\OneDrive\Desktop\MALU2",
    [string]$RemotePath = "/home/ubuntu/MALU2",
    [string]$SshKeyPath = "C:\Users\staph\.ssh\ssh-key-2026-07-22.key",
    [string]$Domain = "144.33.22.185",
    [string]$AdminUser = "admin"
)

# ─── Colores ───
$Green  = [ConsoleColor]::Green
$Yellow = [ConsoleColor]::Yellow
$Red    = [ConsoleColor]::Red
$Cyan   = [ConsoleColor]::Cyan
$Gray   = [ConsoleColor]::DarkGray

function Write-Step { param($msg) Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] 🚀 $msg" -Fore $Cyan }
function Write-Ok   { param($msg) Write-Host "   ✅ $msg" -Fore $Green }
function Write-Warn { param($msg) Write-Host "   ⚠️  $msg" -Fore $Yellow }
function Write-Err  { param($msg) Write-Host "   ❌ $msg" -Fore $Red }
function Write-Info { param($msg) Write-Host "   ℹ️  $msg" -Fore $Gray }

# ─── Verificaciones previas ───
Write-Step "Verificando prerequisitos..."

if (-not (Test-Path $LocalPath)) {
    Write-Err "Carpeta local no encontrada: $LocalPath"
    exit 1
}
Write-Ok "Carpeta local existe: $LocalPath"

if (-not (Test-Path $SshKeyPath)) {
    Write-Err "Clave SSH no encontrada: $SshKeyPath"
    exit 1
}
Write-Ok "Clave SSH existe"

# Verificar que setup-server.sh existe
$setupScriptLocal = Join-Path $PSScriptRoot "setup-server.sh"
if (-not (Test-Path $setupScriptLocal)) {
    Write-Err "No se encuentra setup-server.sh en la misma carpeta"
    exit 1
}
Write-Ok "Script de configuración remota encontrado"

# Verificar conectividad SSH
Write-Step "Probando conexión SSH..."
$test = & ssh -i $SshKeyPath -o ConnectTimeout=10 -o BatchMode=yes $VpsUser@$VpsIp "echo 'OK'" 2>&1
if ($LASTEXITCODE -ne 0 -or $test -notlike "*OK*") {
    Write-Err "No se puede conectar al VPS. Verifica IP, usuario y clave."
    Write-Host $test
    exit 1
}
Write-Ok "Conexión SSH exitosa"

# ─── Pedir contraseña para admin (segura) ───
$securePwd = Read-Host -AsSecureString "Contraseña para panel admin (usuario: $AdminUser)"
$adminPwd = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePwd)
)
if ([string]::IsNullOrWhiteSpace($adminPwd)) {
    Write-Err "Contraseña vacía, abortando."
    exit 1
}
Write-Ok "Contraseña capturada"

# ═══════════════════════════════════════════════════════════
# 1. SUBIR ARCHIVOS DEL SITIO (SCP)
# ═══════════════════════════════════════════════════════════
Write-Step "Subiendo carpeta MALU2 al VPS (SCP)..."
$scpRemotePath = $VpsUser + '@' + $VpsIp + ':/home/ubuntu/'
$scpCmd = "scp -i '$SshKeyPath' -r '$LocalPath' $scpRemotePath"
$scpResult = Invoke-Expression $scpCmd
if ($LASTEXITCODE -ne 0) {
    Write-Err "Error subiendo archivos via SCP"
    Write-Host $scpResult
    exit 1
}
Write-Ok "Archivos del sitio subidos correctamente"

# ═══════════════════════════════════════════════════════════
# 2. SUBIR SCRIPT DE CONFIGURACIÓN REMOTA
# ═══════════════════════════════════════════════════════════
Write-Step "Subiendo script de configuración remota..."
$scpScriptCmd = "scp -i '$SshKeyPath' '$setupScriptLocal' $VpsUser@$VpsIp:/home/ubuntu/setup-server.sh"
$scpScriptResult = Invoke-Expression $scpScriptCmd
if ($LASTEXITCODE -ne 0) {
    Write-Err "Error subiendo script de configuración"
    Write-Host $scpScriptResult
    exit 1
}
Write-Ok "Script de configuración subido"

# ═══════════════════════════════════════════════════════════
# 3. EJECUTAR SCRIPT REMOTO CON PARÁMETROS
# ═══════════════════════════════════════════════════════════
Write-Step "Ejecutando configuración en el VPS..."

# Escapar la contraseña para bash (comillas simples, escapar comillas simples existentes)
$adminPwdEscaped = $adminPwd -replace "'", "'\"'\"'"

$remoteCmd = "chmod +x /home/ubuntu/setup-server.sh && /home/ubuntu/setup-server.sh '$RemotePath' '$Domain' '$AdminUser' '$adminPwdEscaped'"

$fullCmd = "ssh -i '$SshKeyPath' -o ConnectTimeout=120 $VpsUser@$VpsIp `"$remoteCmd`""
Write-Host "   (esto puede tardar 1-2 minutos...)" -Fore $Gray
$result = Invoke-Expression $fullCmd

if ($LASTEXITCODE -ne 0) {
    Write-Err "Falló la configuración remota"
    Write-Host $result
    exit 1
}
Write-Ok "Configuración remota completada"
Write-Host $result

# ─── Resumen ───
Write-Host "`n==================================================" -Fore $Cyan
Write-Host "🎉  DESPLIEGUE COMPLETADO" -Fore $Green
Write-Host "==================================================" -Fore $Cyan
Write-Host "📍 Sitio público:    http://$VpsIp/" -Fore $Cyan
Write-Host "🔐 Panel admin:      http://$VpsIp/admin.html" -Fore $Cyan
Write-Host "   Usuario:          $AdminUser" -Fore $Gray
Write-Host "   Contraseña:       (la que ingresaste)" -Fore $Gray
Write-Host "`n📋 Próximos pasos:" -Fore $Yellow
Write-Host "   1. Abre http://$VpsIp/ en tu navegador" -Fore $Gray
Write-Host "   2. Abre http://$VpsIp/admin.html y edita algo" -Fore $Gray
Write-Host "   3. Recarga el sitio público → cambios persistidos" -Fore $Gray
Write-Host "`n☁️  IMPORTANTE - Oracle Cloud:" -Fore $Yellow
Write-Host "   Ve a la consola OCI → Networking → Security Lists" -Fore $Gray
Write-Host "   Agrega regla Ingress: TCP puerto 80, Source 0.0.0.0/0" -Fore $Gray
Write-Host "`n🔒 Para HTTPS (cuando tengas dominio):" -Fore $Yellow
Write-Host "   sudo apt install certbot python3-certbot-nginx" -Fore $Gray
Write-Host "   sudo certbot --nginx -d tudominio.com" -Fore $Gray