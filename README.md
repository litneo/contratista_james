# Control Técnico WEB V1.6 — PWA instalable en Android

## Qué contiene
- `index.html`: aplicación original V1.5 con gestión de clientes, trabajos, servicios, cotizaciones, PDF y SQLite en IndexedDB.
- `manifest.webmanifest`, `sw.js` e `icons/`: archivos para que Chrome pueda instalarla como PWA.

## Instalación en Android (sin APK)
1. Publica **todos** los archivos y subcarpetas de este ZIP en **la misma dirección HTTPS donde ya utilizas Control Técnico**. No abras directamente el archivo HTML desde Descargas ni `file://`.
2. Abre la URL HTTPS desde **Google Chrome en Android** (no desde el navegador interno de WhatsApp).
3. Espera a que cargue SQLite, pulsa **Instalar aplicación** si aparece, o abre menú `⋮` > **Instalar aplicación** / **Añadir a pantalla de inicio**.
4. Confirma la instalación. Se abrirá en una ventana independiente desde el icono del inicio.

## Atención a los datos
Antes de actualizar, exporta un respaldo `.sqlite` desde la V1.5. **Debes conservar el mismo dominio, ruta y perfil del navegador** para que SQLite IndexedDB continúe disponible. Una nueva dirección web tiene una base vacía; en ella puedes usar Restaurar respaldo.

## Dependencias y sin conexión
La aplicación usa Bootstrap 5, sql.js y jsPDF desde CDN (versión V1.5). En la **primera visita** requiere Internet. El service worker guarda en caché los recursos que logra descargar, por lo que algunas visitas posteriores pueden funcionar sin Internet, pero no se garantiza funcionamiento offline pleno hasta que se distribuyan localmente esas bibliotecas.

## Requisitos y diagnóstico
- Requiere HTTPS o `localhost`, manifiesto e iconos accesibles, y soporte de service workers.
- Si no aparece la instalación, comprueba que no estés en modo incógnito, que la web esté en HTTPS, que `manifest.webmanifest` devuelva `200` con JSON correcto y que `sw.js` sea accesible desde la raíz de la aplicación.
- La opción de instalación la determina Chrome; algunas versiones muestran «Añadir a pantalla de inicio» en lugar de «Instalar aplicación».
- Para probar en PC: `python -m http.server 8000` en esta carpeta y abre `http://localhost:8000`. `localhost` es una excepción admitida para el service worker; una IP LAN por HTTP no lo es.
- No se genera APK; se instala como PWA.

## PDF
El generador directo requiere conexión inicial a jsPDF. La alternativa Imprimir / PDF utiliza el sistema de impresión de Android.
