# Espaço Elêusis - Cloudflare Pages + KV Deployment

## 📋 Resumen
Este sitio está configurado para desplegarse en **Cloudflare Pages** (gratis) utilizando **Cloudflare Pages Functions** y **Cloudflare KV** para el sistema de administración de contenido dinámico (CMS).

De esta manera, el sitio sigue siendo estático (HTML/JS) pero se pueden realizar ediciones de contenido en tiempo real desde el panel de control (`/admin`) sin necesidad de un servidor Python (`server.py`).

---

## 🚀 Cómo configurar y desplegar

### 1. Requisitos
- Node.js (npm) instalado
- Cuenta en Cloudflare (gratis)

### 2. Instalar wrangler CLI y dependencias
```bash
npm install wrangler --save-dev
```

### 3. Iniciar sesión en Cloudflare
```bash
npx wrangler login
```

### 4. Crear el Namespace KV en Cloudflare
Crea una base de datos Key-Value para almacenar el contenido del sitio:
```bash
npx wrangler kv:namespace create SITE_CONTENT_KV
```

Esto te devolverá un ID, por ejemplo:
```toml
[[kv_namespaces]]
binding = "SITE_CONTENT_KV"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 5. Configurar `wrangler.toml`
Abre `wrangler.toml` y reemplaza `"YOUR_KV_NAMESPACE_ID_HERE"` con el ID que te devolvió el comando anterior.

### 6. Inicializar el contenido en KV
Carga tu archivo de contenido inicial `site-content.json` en la base de datos de Cloudflare ejecutando:
```bash
node scripts/init-kv.js
```
*Nota: Si estás usando Windows PowerShell, asegúrate de que wrangler esté configurado correctamente con tu login.*

### 7. Desplegar el sitio
Para subir el sitio completo (archivos estáticos + backend serverless en `/functions`):
```bash
npx wrangler pages deploy . --project-name="espaco-eleusis"
```

---

## 🌐 Conectar dominio de Namecheap

1. **En Cloudflare:**
   - Ve a Pages > espaco-eleusis > Custom Domains
   - Agrega tu dominio (ej: `tudominio.com`)
   - Cloudflare te dará los registros DNS a configurar.

2. **En Namecheap:**
   - Ve a Domain List > Manage > Advanced DNS
   - Cambia los Nameservers de "Namecheap BasicDNS" a "Custom DNS".
   - Introduce los dos Nameservers de Cloudflare (ej: `ns1.cloudflare.com`, `ns2.cloudflare.com`).
   - Espera de 12 a 24 horas para la propagación.

---

## 📝 Cómo funciona el CMS en Cloudflare

1. El sitio (`index.html`) hace un `fetch('/api/content')`.
2. Una **Pages Function** intercepta esta llamada y obtiene el contenido de **SITE_CONTENT_KV** en milisegundos.
3. El panel de administración (`/admin/index.html`) utiliza el mismo endpoint con un método `POST` para guardar los cambios instantáneamente en **Cloudflare KV**.
4. ¡El contenido se actualiza en tiempo real para todos los visitantes del sitio sin necesidad de reconstruir o redesplegar el sitio en Git!

### Fallback
Si por alguna razón la base de datos KV no está disponible, el sitio cargará el archivo local `site-content.json` como plan de respaldo automático.