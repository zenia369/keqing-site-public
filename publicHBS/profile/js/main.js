const {
    HandlerCardLayout,
    activeSetNewAvatar,
    activeSetNewCharacter,
    activeEditMode,
} = new Helpers();


const btnPersonalCard = document.getElementById('btn-card-ss');
const layoutSettingsCard = document.getElementById('settings-card');
const formCard = document.getElementById('form-card');
const activeAvatar = document.getElementById('avatar-card');
const activeCharacter = document.getElementById('characters');
const cartListHeader = document.querySelector('.cart-characters-wrapp__header-list');
const cartListBody = document.querySelector('.cart-characters-wrapp__cards');
const modaleCarts = document.getElementById('carts');
const modalListStatus = modaleCarts.querySelector('ul');
const btnCloseModal = document.querySelector('#close-modal');
//gallery
const gallery = document.querySelector('.gallery');
const btnEditGallery = document.querySelector('.btn-edit-gallery');
const btnsEdit = document.querySelector('.wrapp-edit-btns');
const btnEditCancel = btnsEdit.querySelector('.btn-edit-gallery-cancel');
const btnEditSubmit = btnsEdit.querySelector('.btn-edit-gallery-submit');

const preloadImages = document.getElementById('gallery_preload').children;
//card submit data
const userName = document.querySelector('span#name');
const userCity = document.querySelector('span#city');
const userElemental = document.querySelector('span#elemental');




btnPersonalCard.addEventListener('click', HandlerCardLayout)
formCard.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputText = formCard.querySelector('#newName');
    const newCity = formCard.querySelector('#city');
    const newElemental = formCard.querySelector('#elemental');

    if(inputText.value !== '' && newCity.value !== '' && newElemental.value !== '') {
        userName.innerHTML = inputText.value;
        userCity.innerHTML = newCity.value;
        userElemental.innerHTML = newElemental.value;
    
        inputText.value = '';
        newCity.value = '';
        newElemental.value = '';
    
        //fetch data
    }

    HandlerCardLayout(false)
});


cartListHeader.addEventListener('click', e => {
    if(e.target.nodeName === 'LI') {
        console.log('hiii');
        const elements = e.target.parentElement.children;
        for(let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('active')
        }
        e.target.classList.add('active')
    }
})

btnCloseModal.addEventListener('click', removeModalCarts)

activeAvatar.addEventListener('click', activeSetNewAvatar);
activeCharacter.addEventListener('click', activeSetNewCharacter);

preloadImages[0].addEventListener('click', () => {
    preloadImages[0].classList.toggle('active-preload');
    preloadImages[1].classList.toggle('active-preload');
    console.log('hii');
});

btnEditGallery.addEventListener('click', (e) => {
    e.target.classList.add('d-none');
    e.target.disabled = true;

    activeEditMode();

})
