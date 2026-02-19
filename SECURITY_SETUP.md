# ⚠️ Guía de Configuración de Seguridad

## Credenciales Sensibles Removidas

Se han removido todas las credenciales sensibles del código fuente:
- ✅ Firebase API Key
- ✅ Firebase Config
- ✅ Google Maps API Key  
- ✅ WhatsApp Number

## Cómo Configurar

### 1. Copiar el archivo de ejemplo
```bash
cp .env.example .env
```

### 2. Llenar tus credenciales
Edita el archivo `.env` con tus claves reales:
```env
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
FIREBASE_PROJECT_ID=your_firebase_project_id_here
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
FIREBASE_APP_ID=your_firebase_app_id_here

GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

WHATSAPP_NUMBER=your_whatsapp_number_here
```

### 3. Cargar las variables en el navegador (Opción A - Desarrollo Local)

En tu código HTML o en un script de inicialización, carga las variables:

```javascript
// Script que se ejecuta antes de config.js
async function loadEnv() {
  const response = await fetch('.env');
  const text = await response.text();
  const lines = text.split('\n');
  
  lines.forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        window[key.trim()] = value.trim();
      }
    }
  });
}

loadEnv();
```

### 3. Cargar las variables en Firebase Hosting (Opción B - Producción)

En Firebase Hosting, usa variables de entorno:

```bash
firebase functions:config:set firebase.api_key="..." google.maps.key="..." whatsapp.number="..."
```

Y luego en tu función Cloud Function:

```javascript
const functions = require('firebase-functions');
const config = functions.config();

// Pasa a tu HTML como variables globales
```

## ⚠️ IMPORTANTE

- **NUNCA** commiteies el archivo `.env` a Git
- **NUNCA** incluyas credenciales en el código fuente
- `.env` está ignorado en `.gitignore`
- Solo `.env.example` debe estar en Git (sin valores reales)

## Verificar que está seguro

```bash
# Verificar que las credenciales NO están en Git
git log --all --source -S "AIzaSy" 

# No debe mostrar ningún resultado
```

Si encuentras credenciales en el historio de Git, debes revocarlas inmediatamente en:
- Google Cloud Console
- Firebase Console
- Google Maps Console
