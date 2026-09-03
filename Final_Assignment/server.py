import http.server
import socketserver
import os
import mimetypes

PORT = 8080
DIRECTORY = os.path.join(os.path.dirname(__file__), "public")

mimetypes.add_type('application/xml', '.xml')
mimetypes.add_type('application/xslt+xml', '.xsl')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Server serving at http://127.0.0.1:{PORT}")
        httpd.serve_forever()
