import Toastify from 'toastify-js';

const colors = {
    succes: 'linear-gradient(to right, #00b09b, #96c93d)',
    error: 'linear-gradient(to right, #ff5f6d, #ffc371)'
}

export default (mes, type, gravity = "top", position = "left", classes = '') => {
    Toastify({
        text: mes,
        duration: 5000,
        close: true,
        gravity,
        position, 
        stopOnFocus: true,
        style: {
          background: colors[type],
        },
        className: classes
      }).showToast();
} 