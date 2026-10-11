const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

const server = http.createServer((req, res) => {
  // CORS & No-cache para desarrollo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Intentar agregar .html
      const htmlPath = filePath + '.html';
      if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
        filePath = htmlPath;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1><p>Archivo no encontrado.</p>');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ips = getLocalIpAddresses();
  console.log('='.repeat(55));
  console.log('🚀 Servidor HTTP de Molino Viejo activo en la red');
  console.log('='.repeat(55));
  console.log(`💻 Local (esta PC):`);
  console.log(`   http://localhost:${PORT}/index.html`);
  console.log(`   http://localhost:${PORT}/pedidos.html\n`);
  console.log(`📱 En tu Celular (misma red Wi-Fi):`);
  ips.forEach(ip => {
    console.log(`   http://${ip}:${PORT}/index.html`);
    console.log(`   http://${ip}:${PORT}/pedidos.html`);
  });
  console.log('='.repeat(55));
  console.log('Presiona Ctrl+C para detener el servidor.');
});
