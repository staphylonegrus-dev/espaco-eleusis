#!/usr/bin/env python3
"""
Espaço Elêusis - Servidor local con API de contenido
Sirve archivos estáticos y permite guardar/cargar contenido del sitio
para que todos los visitantes vean el mismo contenido (no localStorage).
"""

import http.server
import json
import os
import urllib.parse
from datetime import datetime

PORT = 8000
CONTENT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site-content.json')

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def end_headers(self):
        # CORS headers para permitir acceso desde cualquier origen
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/content':
            self.handle_get_content()
        else:
            super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/content':
            self.handle_save_content()
        else:
            self.send_error(404, 'Not found')

    def handle_get_content(self):
        try:
            if os.path.exists(CONTENT_FILE):
                with open(CONTENT_FILE, 'r', encoding='utf-8') as f:
                    content = json.load(f)
            else:
                content = None
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True, 'content': content}).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))

    def handle_save_content(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            content = data.get('content', data)

            # Validar que el contenido es un diccionario
            if not isinstance(content, dict):
                raise ValueError("El contenido debe ser un objeto JSON")

            # Añadir timestamp
            content['_lastUpdated'] = datetime.now().isoformat()

            # Validar y limpiar contenido antes de guardar
            cleaned_content = self.validate_content(content)

            # Guardar contenido
            with open(CONTENT_FILE, 'w', encoding='utf-8') as f:
                json.dump(cleaned_content, f, ensure_ascii=False, indent=2)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'message': 'Contenido guardado correctamente',
                'contentSize': len(json.dumps(cleaned_content))
            }).encode('utf-8'))
        except json.JSONDecodeError as e:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': False,
                'error': f'Error de JSON: {str(e)}',
                'message': 'El contenido enviado no es un JSON válido'
            }).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': False,
                'error': str(e),
                'message': 'Error al guardar el contenido'
            }).encode('utf-8'))

    def validate_content(self, content):
        """Validar y limpiar el contenido antes de guardar"""
        if not isinstance(content, dict):
            return content

        # Crear una copia profunda para no modificar el original
        cleaned = json.loads(json.dumps(content))

        # Validar sección 'sobre'
        if 'sobre' in cleaned and isinstance(cleaned['sobre'], dict):
            # Validar galería de fotos
            if 'galeria' in cleaned['sobre'] and isinstance(cleaned['sobre']['galeria'], list):
                # Limitar tamaño de data URLs para evitar JSON muy grandes
                for i, foto in enumerate(cleaned['sobre']['galeria']):
                    if isinstance(foto, dict) and 'image' in foto:
                        if foto['image'].startswith('data:image/'):
                            # Limitar tamaño de data URLs (aprox 1MB)
                            if len(foto['image']) > 1_000_000:  # ~1MB
                                # Opcional: guardar solo la metadata y manejar imágenes grandes de otra forma
                                print(f"Advertencia: Imagen muy grande en galería[{i}], tamaño: {len(foto['image'])} bytes")
                                # Podríamos guardar solo la metadata y manejar imágenes grandes por separado
                                # Por ahora, guardamos pero con advertencia

        return cleaned

    def log_message(self, format, *args):
        # Log con estado y respuesta
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {args[0]}")

    def send_response(self, code, message=None):
        super().send_response(code, message)
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Response: {code}")


def main():
    print(f"🚀 Servidor Espaço Elêusis iniciado en http://localhost:{PORT}")
    print(f"📁 Sirviendo archivos desde: {os.path.dirname(os.path.abspath(__file__))}")
    print(f"💾 Archivo de contenido: {CONTENT_FILE}")
    print(f"📡 API disponible en: http://localhost:{PORT}/api/content")
    print("-" * 60)
    server = http.server.HTTPServer(('127.0.0.1', PORT), CustomHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Servidor detenido")
        server.server_close()


if __name__ == '__main__':
    main()