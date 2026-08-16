# Espaço Elêusis - Cloudflare Pages Deployment

## 📋 Resumen
Este sitio está configurado para desplegarse en **Cloudflare Pages** (gratis).

## 🚀 Cómo desplegar

### 1. Requisitos
- Node.js (npm) instalado
- Cuenta en Cloudflare (gratis)

### 2. Instalar wrangler CLI
```bash
npm install -g wrangler
```

### 3. Iniciar sesión en Cloudflare
```bash
echo "Autenticando con Cloudflare..."
wrangler login
```

### 4. Desplegar
```bash
wrangler pages deploy --project-name="espaco-eleusis"
```

## 🌐 Conectar dominio de Namecheap

1. **En Cloudflare:**
   - Ve a Pages > espaco-eleusis > Custom Domains
   - Agrega tu dominio (ej: `tudominio.com`)
   - Cloudflare te dará los registros DNS

2. **En Namecheap:**
   - Ve a Domain List > Manage > Advanced DNS
   - Cambia los DNS a los de Cloudflare (ej: `ns1.cloudflare.com`, `ns2.cloudflare.com`)
   - Espera 24-48h para propagación

## 📝 Cómo actualizar contenido

1. Edita `site-content.json` localmente
2. Ejecuta `wrangler pages deploy`
3. ¡Listo! Los cambios se reflejarán en minutos.

## ⚠️ Notas
- El panel admin ahora guarda el JSON localmente (descarga el archivo)
- Para subir cambios, usa `wrangler pages deploy` o el dashboard de Cloudflare
- Cloudflare Pages es **gratis** y incluye SSL automático

## 🔗 Enlaces útiles
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Namecheap DNS Setup](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/)