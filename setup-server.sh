#!/bin/bash
# setup-server.sh - Configuración remota en el VPS
# Uso: ./setup-server.sh <remote_path> <domain> <admin_user> <admin_password>

set -euo pipefail

# ─── Parámetros ───
REMOTE_PATH="${1:-/home/ubuntu/MALU2}"
DOMAIN="${2:-144.33.22.185}"
ADMIN_USER="${3:-admin}"
ADMIN_PASS="${4}"

if [[ -z "$ADMIN_PASS" ]]; then
    echo "❌ Falta contraseña de admin (parámetro 4)"
    exit 1
fi

# ─── Colores ───
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

log_step() { echo -e "\n${CYAN}🚀 $1${NC}"; }
log_ok()   { echo -e "   ${GREEN}✅ $1${NC}"; }
log_warn() { echo -e "   ${YELLOW}⚠️  $1${NC}"; }
log_err()  { echo -e "   ${RED}❌ $1${NC}"; }

# ═══════════════════════════════════════════════════════════
# 1. VERIFICAR ARCHIVOS Y PYTHON
# ═══════════════════════════════════════════════════════════
log_step "Verificando archivos y Python..."
ls -la "$REMOTE_PATH"
python3 --version
log_ok "Archivos y Python verificados"

# ═══════════════════════════════════════════════════════════
# 2. PROBAR SERVIDOR PYTHON
# ═══════════════════════════════════════════════════════════
log_step "Probando servidor Python (test rápido)..."
cd "$REMOTE_PATH"
timeout 3 python3 server.py 2>&1 || true
log_ok "Test de server.py completado"

# ═══════════════════════════════════════════════════════════
# 3. CREAR SERVICIO SYSTEMD
# ═══════════════════════════════════════════════════════════
log_step "Creando y activando servicio systemd (malu)..."

cat << 'SYSTEMD_EOF' | sudo tee /etc/systemd/system/malu.service > /dev/null
[Unit]
Description=Espaço Elêusis - Servidor Python
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/MALU2
ExecStart=/usr/bin/python3 server.py
Restart=always
RestartSec=3
Environment=PYTHONUNBUFFERED=1
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SYSTEMD_EOF

# Reemplazar WorkingDirectory con la ruta real si es distinta
if [[ "$REMOTE_PATH" != "/home/ubuntu/MALU2" ]]; then
    sudo sed -i "s|/home/ubuntu/MALU2|$REMOTE_PATH|g" /etc/systemd/system/malu.service
fi

sudo systemctl daemon-reload
sudo systemctl enable malu
sudo systemctl start malu
sleep 2
sudo systemctl status malu --no-pager
log_ok "Servicio systemd creado y activado"

# ═══════════════════════════════════════════════════════════
# 4. VERIFICAR API
# ═══════════════════════════════════════════════════════════
log_step "Verificando API /api/content..."
curl -s http://localhost:8000/api/content | head -c 300
echo
log_ok "API responde correctamente"

# ═══════════════════════════════════════════════════════════
# 5. INSTALAR NGINX Y APACHE2-UTILS
# ═══════════════════════════════════════════════════════════
log_step "Instalando Nginx y apache2-utils..."
sudo apt update && sudo apt install -y nginx apache2-utils
log_ok "Nginx y apache2-utils instalados"

# ═══════════════════════════════════════════════════════════
# 6. CREAR CONTRASEÑA HTPASSWD
# ═══════════════════════════════════════════════════════════
log_step "Creando usuario admin para protección HTTP Basic Auth..."
echo "$ADMIN_PASS" | sudo htpasswd -c -i /etc/nginx/.htpasswd "$ADMIN_USER"
log_ok "Usuario $ADMIN_USER creado"

# ═══════════════════════════════════════════════════════════
# 7. CONFIGURAR NGINX
# ═══════════════════════════════════════════════════════════
log_step "Configurando Nginx como proxy reverso..."

cat << 'NGINX_EOF' | sudo tee /etc/nginx/sites-available/malu > /dev/null
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN_PLACEHOLDER;

    client_max_body_size 50M;

    # Proteger admin con contraseña
    location /admin.html {
        auth_basic "Área Restrita - Espaço Elêusis";
        auth_basic_user_file /etc/nginx/.htpasswd;
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /admin/ {
        auth_basic "Área Restrita - Espaço Elêusis";
        auth_basic_user_file /etc/nginx/.htpasswd;
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}
NGINX_EOF

# Reemplazar DOMAIN_PLACEHOLDER con el dominio real
sudo sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" /etc/nginx/sites-available/malu

sudo ln -sf /etc/nginx/sites-available/malu /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
log_ok "Nginx configurado y recargado"

# ═══════════════════════════════════════════════════════════
# 8. VERIFICACIÓN FINAL
# ═══════════════════════════════════════════════════════════
log_step "Comprobando endpoints y servicios..."

echo "--- Sitio público (HTTP code) ---"
curl -s -o /dev/null -w '%{http_code}' http://localhost/
echo

echo "--- Admin sin auth (debe dar 401) ---"
curl -s -o /dev/null -w '%{http_code}' http://localhost/admin.html
echo

echo "--- Admin con auth (debe dar 200) ---"
curl -s -u "$ADMIN_USER:$ADMIN_PASS" http://localhost/admin.html | head -c 100
echo

echo "--- Estado servicio malu ---"
sudo systemctl status malu --no-pager | head -10

log_ok "Verificación final completada"

echo -e "\n${GREEN}✅ Configuración del servidor completada exitosamente${NC}"