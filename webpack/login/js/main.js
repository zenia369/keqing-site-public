import Carusel from './modules/animationCarusel';


window.addEventListener('load', () => {

    const images = document.querySelector('.images');

    (async () => {
        await fetch('api/login-images')
                .then(data => data.json())
                .then(data => preloadImages(data));
    })()




    function appendImages(sources) {
        sources.forEach((src, i) => {
            const el = document.createElement('img');
            el.classList.add('images__item');
            el.alt = `Keqing image ${i+2}`;
            el.src = src;

            images.append(el);
        });
    }

    function preloadImages(sources) {
        Promise.all(sources.map((src, i) => {
          const img = document.createElement('img');
          img.src = src;
          return new Promise(r => img.onload = img.onerror = r);
        }))
            .then(() => appendImages(sources))
            .then(() => Carusel(images, 5000, 100)())
    }


    
})


