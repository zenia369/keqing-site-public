const preloadImages = document.getElementById('gallery_preload').children;

export default new class Favorites {
    activePreload() {
        preloadImages[0].classList.toggle('active-preload');
        preloadImages[1].classList.toggle('active-preload');
    }
} 