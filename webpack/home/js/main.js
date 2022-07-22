//IMPORT

import '../styles/style.scss'

import '../audio/KeqingVoice.mp3'

import '../img/electro.png'
import '../img/Keqing.png'

// END IMPORT


const warapperGallery = document.querySelector('.section-2__wrapper-gallery__listWrapp-box__list');
const galleryBox = document.querySelector('.section-2__wrapper-gallery');
const list = document.querySelector('.section-2__wrapper-gallery__listWrapp-box__list');
const loader = document.getElementById('loader');

let isScrolling = false; 

(() => {
  getAvatar();
})()

window.addEventListener('load', () => {
  galerry();
  window.addEventListener("scroll", throttleScroll, false);
  document.addEventListener("DOMContentLoaded", scrolling, false);
})

async function galerry() {
  const response = await fetch("/api/home-image");
  const data = await response.json();

  preloadImages(data);
}
function createElementGallery(gallerySrc) {
  gallerySrc.forEach((el) => {
    const img = document.createElement('img');
    img.classList.add('active')
    img.src = el;
    img.alt = 'Keqing-site'
    warapperGallery.appendChild(img)
  });

  list.style.display = 'flex';
  loader.style.display = 'none';
  
}

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function() {
      scrolling(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
}
function scrolling() {
    if (isFullyVisible(galleryBox)) {
      list.classList.add('section-2__wrapper-gallery__listWrapp-box__list-active');
    } else {
      list.classList.remove('section-2__wrapper-gallery__listWrapp-box__list-active');
    }
}
function isFullyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;
    return ((top >= 0) && (bottom <= window.innerHeight));
}

function getAvatar() {
  const src = localStorage.getItem('avatarSrc');
  const avatar = document.querySelector('.containerBar-list__img');

  avatar.style = `background-image: url(${src})`;
}

function preloadImages(sources) {
  Promise.all(sources.map(src => {
    const img = document.createElement('img');
    img.src = src;
    return new Promise(r => img.onload = img.onerror = r);
  }))
      .then(() => createElementGallery(sources))
}