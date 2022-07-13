(() => {
    getAvatar();
})()

function getAvatar() {
    const src = localStorage.getItem('avatarSrc');
    const avatar = document.querySelector('.containerBar-list__img');
  
    avatar.style = `background-image: url(${src})`;
}