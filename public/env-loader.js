/**
 * 🔐 Environment Loader for Development
 * 
 * This script loads environment variables from .env file during development
 * Use this ONLY in development - in production, use proper environment configuration
 */

async function loadEnvVariables() {
  try {
    // Only load in development (localhost)
    if (!window.location.hostname.includes('localhost') && 
        !window.location.hostname.includes('127.0.0.1')) {
      console.log('⚠️ .env loading disabled in production');
      return;
    }

    const response = await fetch('../.env');
    
    if (!response.ok) {
      console.warn('⚠️ .env file not found. Using placeholder values.');
      return;
    }

    const text = await response.text();
    const lines = text.split('\n');

    lines.forEach(line => {
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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadEnvVariables);
} else {
  loadEnvVariables();
}
