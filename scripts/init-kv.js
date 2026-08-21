/**
 * Script para inicializar el KV de Cloudflare con el contenido inicial
 * 
 * Uso:
 * 1. Crea un namespace KV en Cloudflare Dashboard
 * 2. Actualiza wrangler.toml con el ID del namespace
 * 3. Ejecuta: npx wrangler kv:key put --binding=SITE_CONTENT_KV "content" "$(cat site-content.json)"
 * 
 * O usa este script con: node scripts/init-kv.js
 */

import fs from 'fs';
import { execSync } from 'child_process';

const content = JSON.parse(fs.readFileSync('site-content.json', 'utf-8'));

console.log('📦 Inicializando KV con contenido del sitio...');
console.log('Contenido a guardar:', JSON.stringify(content, null, 2));

try {
    // Usar wrangler CLI para guardar en KV
    const jsonStr = JSON.stringify(content);
    // Escape para línea de comandos
    const escaped = jsonStr.replace(/"/g, '\\"').replace(/\$/g, '\\$');
    
    const cmd = `npx wrangler kv:key put --binding=SITE_CONTENT_KV "content" "${escaped}"`;
    
    console.log('\n🔧 Ejecutando comando:');
    console.log(cmd);
    
    execSync(cmd, { stdio: 'inherit' });
    
    console.log('\n✅ KV inicializado correctamente!');
    console.log('Ahora puedes hacer deploy con: npx wrangler pages deploy .');
    
} catch (error) {
    console.error('\n❌ Error al inicializar KV:');
    console.error(error.message);
    console.log('\n📝 Alternativa manual:');
    console.log('1. Ve a Cloudflare Dashboard > Workers & Pages > KV');
    console.log('2. Selecciona tu namespace');
    console.log('3. Crea una key "content" con el JSON de site-content.json');
    process.exit(1);
}