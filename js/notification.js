let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Previene que el mini-info se muestre automáticamente
    e.preventDefault();
    // Guarda el evento para que lo puedas disparar más tarde
    deferredPrompt = e;

    // Muestra la notificación de SweetAlert
    Swal.fire({
        title: '¡Aplicación disponible!',
        text: '¿Quieres agregar esta aplicación a tu pantalla de inicio?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'No, gracias'
    }).then((result) => {
        if (result.isConfirmed) {
            // Muestra el prompt para agregar a la pantalla de inicio
            deferredPrompt.prompt();
            // Espera la respuesta del usuario
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuario aceptó agregar a la pantalla de inicio');
                } else {
                    console.log('Usuario canceló agregar a la pantalla de inicio');
                }
                deferredPrompt = null; // Resetea el evento
            });
        }
    });
});