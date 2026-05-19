/**
 * 🔐 Environment Loader for Development
 * 
 * This script loads environment variables from .env file during development
 * Use this ONLY in development - in production, use proper environment configuration
 */

function loadEnvVariables() {
  try {
    const host = window.location.hostname;
    const isPrivateIp = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host);

    // Only load in development (localhost or LAN IP)
    if (!host.includes('localhost') && !host.includes('127.0.0.1') && !isPrivateIp) {
      console.log('⚠️ .env loading disabled in production');
      return;
    }

    const envPaths = ['env.local', './env.local', '../.env', './.env', '.env'];
    let envText = '';

    for (const envPath of envPaths) {
      const request = new XMLHttpRequest();
      request.open('GET', envPath, false);
      request.send(null);

      if (request.status === 200 || request.status === 0) {
        envText = request.responseText;
        console.log(`✅ Loaded .env from ${envPath}`);
        break;
      }
    }

    if (!envText) {
      console.warn('⚠️ .env file not found. Using placeholder values.');
      return;
    }

    envText.split('\n').forEach(line => {
      // Skip empty lines and comments
      if (!line.trim() || line.trim().startsWith('#')) {
        return;
      }

      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const envKey = key.trim();
        const envValue = valueParts.join('=').trim();

        // Set as window variable for access in scripts
        window[envKey] = envValue;
        console.log(`✅ Loaded ${envKey}`);
      }
    });

  } catch (error) {
    console.error('❌ Error loading .env:', error);
    console.log('⚠️ Falling back to placeholder values');
  }
}

// Load env variables before other scripts run
loadEnvVariables();
