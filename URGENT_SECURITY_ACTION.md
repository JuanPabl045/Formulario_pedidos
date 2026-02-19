# 🚨 ACCIÓN URGENTE - Credenciales Comprometidas

## Estado: CREDENCIALES EXPUESTAS EN GITHUB

✅ Credenciales encontradas en Git:
- Firebase API Key: `AIzaSyCFvAXW--jQkrvmK0jHEPtTyAUmWQqQ7y4`
- Firebase Project: `studio-8205095748-bad39`
- Google Maps API Key: `AIzaSyBwmbJ5hhyu9i4Ixv77yjJwNfltIZ4VjNk`
- WhatsApp Number: `51989719386`

En commits: `01e617d`, `c54f6af`, `94aa9bf`, `a5f028f`, `0af07bb`, `346494a` y más

## PASO 1: Verificar si está en GitHub

```bash
# Ver el URL del repositorio
git remote -v

# Si ve "github.com" en la salida, las credenciales ARE PÚBLICAS
```

Si está en GitHub, cualquiera puede usar tus credenciales para:
- ✗ Acceder a tu base de datos Firestore
- ✗ Leer/modificar/borrar datos de clientes
- ✗ Usar tu API Key de Google Maps
- ✗ Enviarte facturas enormes por uso no autorizado

## PASO 2: Revocar Credenciales INMEDIATAMENTE

### 2.1 Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona el proyecto `studio-8205095748-bad39`
3. Settings → Project Settings → Service Accounts
4. Revoca la API Key actual
5. Crea una NUEVA API Key
6. Actualiza `.env` con la nueva clave

### 2.2 Google Maps API Key
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona el proyecto
3. APIs & Services → Credentials
4. Revoca la clave `AIzaSyBwmbJ5hhyu9i4Ixv77yjJwNfltIZ4VjNk`
5. Crea una NUEVA API Key
6. Actualiza `.env` con la nueva clave

## PASO 3: Limpiar el Historial de Git

### opción A: Si aún NO está en GitHub (solo local)
```bash
# Cambiar la rama actual para evitar errores
git checkout --orphan new_history
git add -A
git commit -m "Initial commit without secrets"
git branch -D main
git branch -m main
git push -f origin main  # ⚠️ SOLO si quieres sobrescribir GitHub
```

### Opción B: Si YA está en GitHub (recomendado)

Instalar `git-filter-repo`:
```bash
pip install git-filter-repo
```

Luego ejecutar (sustituye `main` por tu rama):
```bash
# Crear backup primero
cp -r .git .git.backup

# Remover archivo que contiene secretos
git-filter-repo --invert-paths --path public/pedidos.html --path public/admin.html

# O remover todos los commits con credenciales
git-filter-repo --mailmap <(echo 'Mailmap') -f
```

## PASO 4: Forzar Push (ÚLTIMO RECURSO)

⚠️ Solo si el repositorio es TUYO y nadie más está trabajando:

```bash
git push -f origin main
```

## PASO 5: Crear .env Local (Seguro)

```bash
cp .env.example .env
# Edita .env con tus NUEVAS credenciales
# Nunca commitees .env a Git
```

## Verificación Final

```bash
# Confirmar que las credenciales NO están en GitHub
git log --all -S "AIzaSyBwmbJ5hhyu9i4Ixv77yjJwNfltIZ4VjNk"

# Si no sale nada = está limpio ✅
# Si sale algo = aún hay exposición ❌
```

## ⏰ Timeline

- **Ahora**: Revocar credenciales en Google Cloud + Firebase
- **Hoy**: Limpiar historial de Git
- **Mañana**: Verificar que está seguro

---

**Referencias:**
- [GitHub: Removing data from history](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Google Cloud: Securing API Keys](https://cloud.google.com/docs/authentication/api-keys)
- [Firebase: Security Best Practices](https://firebase.google.com/docs/projects/api/settings)
