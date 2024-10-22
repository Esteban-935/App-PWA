if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
        navigator.serviceWorker.register('../service-worker.js')
        .then(registration => {
        console.log('ServiceWorker registrado con éxito:', registration);
        })
        .catch(err => {
        console.log('Error en el registro del ServiceWorker:', err);
        });
    });
}