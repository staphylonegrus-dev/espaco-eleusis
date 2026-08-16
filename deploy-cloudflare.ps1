<#
.SYNOPSIS
    Despliegue de Espaço Elêusis en Cloudflare Pages
.NOTES
    Requiere: npm, wrangler CLI (instalado globalmente)
    Uso: .\deploy-cloudflare.ps1
#>

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

# ─── Verificaciones ───
Write-Step "Verificando prerequisitos..."

# Verificar npm
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Err "npm no está instalado. Instala Node.js primero: https://nodejs.org"
    exit 1
}
Write-Ok "npm instalado"

# Verificar wrangler
if (-not (Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Info "Instalando wrangler CLI..."
    npm install -g wrangler
    if (-not (Get-Command wrangler -ErrorAction SilentlyContinue)) {
        Write-Err "No se pudo instalar wrangler"
        exit 1
    }
}
Write-Ok "wrangler instalado"

# ─── Login en Cloudflare ───
Write-Step "Iniciando sesión en Cloudflare..."
wrangler login
if ($LASTEXITCODE -ne 0) {
    Write-Err "Error al iniciar sesión. Asegúrate de tener una cuenta Cloudflare."
    exit 1
}
Write-Ok "Sesión iniciada"

# ─── Deploy ───
Write-Step "Desplegando sitio..."
wrangler pages deploy --project-name="espaco-eleusis"
if ($LASTEXITCODE -eq 0) {
    Write-Ok "¡Sitio desplegado con éxito!"
    Write-Info "URL temporal: https://espaco-eleusis.pages.dev"
    Write-Info "Sigue las instrucciones para conectar tu dominio de Namecheap."
} else {
    Write-Err "Error al desplegar. Revisa los logs."
}

# ─── Instrucciones para dominio ───
Write-Step "Para conectar tu dominio de Namecheap:"
Write-Info "1. Ve a Cloudflare Dashboard > Pages > espaco-eleusis"
Write-Info "2. Haz clic en 'Custom Domains'"
Write-Info "3. Agrega tu dominio (ej: tudominio.com)"
Write-Info "4. Cloudflare te dará los DNS a configurar"
Write-Info "5. Ve a Namecheap > Domain List > Manage > Advanced DNS"
Write-Info "6. Cambia los DNS a los de Cloudflare"
Write-Info "7. Espera 24-48h para propagación"

Write-Step "¡Listo! Tu sitio estará online en minutos."