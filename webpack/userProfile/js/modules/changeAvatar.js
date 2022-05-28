const modaleCarts = document.getElementById('carts');
const modalListStatus = modaleCarts.querySelector('ul');
const cartListBody = document.querySelector('.cart-characters-wrapp__cards');

import CartCharactersModal from "./CartCharactersModal";
const {
    activeModalCarts,
    removeModalCarts,
} = CartCharactersModal;

export default new class Avatar {
    activeSetNewAvatar(changeCard) {
        modalListStatus.children[1].classList.add('d-none');
        modalListStatus.children[0].classList.remove('d-none');
        cartListBody.children[1].classList.add('d-none');
        cartListBody.children[0].classList.remove('d-none');

        activeModalCarts();

        const list = document.querySelector('#choose-new-card');

        list.addEventListener('click', (e) => {
            if(e.target.parentElement.nodeName === 'LI') {
                setTimeout(() => removeModalCarts(), 0);

                setTimeout(() => window.scrollTo(0,0), 1000);

                changeCard(e);

                list.removeEventListener('click', null);

            }
        })

    }

    changeCard(e) {
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
        }).catch(() => {
            console.warn("Error with load image for card");
        })
    
        //create fetch change user data in promise
    }

}