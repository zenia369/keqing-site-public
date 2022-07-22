//IMPORTS
import '../styles/style.scss';

import '../img/Genshin-Impact--Maid-Keqing-Genshin-Impact-6797207.png'
import '../img/keqing-city.png'
import '../img/Keqing.full.3414607.jpg'

// END IMPORTS


(() => {
    getAvatar();
})()

function getAvatar() {
    const src = localStorage.getItem('avatarSrc');
    const avatar = document.querySelector('.containerBar-list__img');
  
    avatar.style = `background-image: url(${src})`;
}