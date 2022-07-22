import createFetch from "./createFetch";
import showUserMesage from "./showUserMesage";

const modaleCarts = document.getElementById('carts');
const modalListStatus = modaleCarts.querySelector('ul');
const cartListBody = document.querySelector('.cart-characters-wrapp__cards');

import CartCharactersModal from "./CartCharactersModal";
const {
    activeModalCarts,
    removeModalCarts,
} = CartCharactersModal;

export default new class Avatar {
    activeSetNewAvatar() {
        modalListStatus.children[1].classList.add('d-none');
        modalListStatus.children[0].classList.remove('d-none');
        cartListBody.children[1].classList.add('d-none');
        cartListBody.children[0].classList.remove('d-none');

        activeModalCarts();

        const list = document.querySelector('#choose-new-card');

        list.addEventListener('click', choosedAvatar);
    }

    saveAvatarSrc(src) {
        queueMicrotask(() => {
            localStorage.setItem('avatarSrc', src);
        })
    }
}

function choosedAvatar(e) {
    if(e.target.parentElement.nodeName === 'LI') {
        queueMicrotask(() => {
            removeModalCarts();
        })
        queueMicrotask(() => {
            window.scrollTo(0,0);
        })
        changeCard(e);
    }
}

async function saveChanges(newAvatar, newCard) {
    try {
        const response = await createFetch(
            '/api/profile/changeAvatar',
            {
                avatar: newAvatar, 
                card: newCard,
            }
        )
        showUserMesage(response.message, 'succes');        
    } catch (error) {
        showUserMesage(error.message, 'error');        
    }

}

async function changeCard(e) {
    const avatar = document.querySelector('.main__first__section__card__wrapper__image-wrapper__border-content');
    const card = document.querySelector('.main__first__section__card');

    const parent = e.target.parentElement;
    const newAvatar = parent.dataset.src;
    const newCard = parent.dataset.card;

    Promise.resolve().then(() => {
        const el = document.createElement('img');
        el.src = newCard;

        return new Promise(r => el.onload = el.onerror = r);
    }).then(() => {
        card.style = `background-image: url(${newCard});`
        avatar.style = `background-image: url(${newAvatar});`
    }).then(() => {
        localStorage.setItem('avatarSrc', newAvatar);
    })
    .catch(() => {
        showUserMesage('Erro loading new avatar', 'error');  
    })

    await saveChanges(newAvatar, newCard);

} 