//IMPORT
import '../styles/style.scss'
// END IMPORT



//Work with personal card
const btnPersonalCard = document.getElementById('btn-card-ss');
const formPersonalCard = document.getElementById('form-card');

//Work with modal characters
const btnCloseModal = document.querySelector('#close-modal');

//Work with change avatar
const activeAvatar = document.getElementById('avatar-card');

//Work with change character
const activeCharacter = document.getElementById('characters');

//Work with preload favorites image
const preloadImages = document.getElementById('gallery_preload').children;

//Work with edit favorites
const btnEditGallery = document.querySelector('.btn-edit-gallery');





import PersonalCard from "./modules/PersonalCard";
const {
    HandlerCardLayout,
    submitFormPersonalCard,
} = PersonalCard;

import CartCharactersModal from './modules/CartCharactersModal';
const {
    removeModalCarts,
} = CartCharactersModal;

import Avatar from './modules/changeAvatar';
const {
    activeSetNewAvatar,
    saveAvatarSrc
} = Avatar;

import ChangeCharacter from './modules/changeCharacter';
const {
    activeSetNewCharacter,
    changeStandCharacter,
} = ChangeCharacter;

import Favorites from './modules/preloadFavorites';
const {
    activePreload,
} = Favorites;

import EditFavorites from './modules/editFavorites';
const {
    activeEditMode,
} = EditFavorites;

//Listeners for personal card
btnPersonalCard.addEventListener('click', HandlerCardLayout);
formPersonalCard.addEventListener('submit', (e) => submitFormPersonalCard(e, HandlerCardLayout));

//For caracters modal
btnCloseModal.addEventListener('click', removeModalCarts);


//For change avatar
activeAvatar.addEventListener('click', activeSetNewAvatar);


//For change character
activeCharacter.addEventListener('click', (e) => activeSetNewCharacter(e, changeStandCharacter));


//For preload favorites
preloadImages[0].addEventListener('click', activePreload);


//For Edit favorites
btnEditGallery.addEventListener('click', (e) => {
    e.target.classList.add('d-none');
    e.target.disabled = true;

    activeEditMode();
});

document.addEventListener('load', () => {
    const avatar = document.querySelector('.main__first__section__card__wrapper__image-wrapper__border-content');
    const src = avatar.getAttribute('background-image');
    saveAvatarSrc(src);
}); 