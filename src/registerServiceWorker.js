import { register } from 'register-service-worker';

register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {
    console.log(
      'La aplicación está siendo servida desde la caché por un Service Worker.'
    );
  },
  registered() {
    console.log('Service Worker registrado con éxito.');
  },
  cached() {
    console.log('Contenido cacheado para uso offline.');
  },
  updatefound() {
    console.log('Descargando nueva versión...');
  },
  updated(registration) {
    console.log('Nueva versión disponible. Aplicando actualización...');
    if (registration.waiting) {
      registration.waiting.postMessage({ action: 'skipWaiting' });
      window.location.reload();
    }
  },
  offline() {
    console.log('No hay conexión a internet. La aplicación está en modo offline.');
  },
  error(error) {
    console.error('Error al registrar el Service Worker:', error);
  }
});
