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

export default new class ChangeCharacter {

    activeSetNewCharacter(e, changeStandCharacter) {
        const parent = e.target.parentElement;
        const id = +parent.dataset.id;
        
        if(parent.nodeName === 'LI') {
            const list = document.querySelector('#choose-new-character');
            const stand = Array.from(document.getElementById('characters').children);

            modalListStatus.children[0].classList.add('d-none');
            modalListStatus.children[1].classList.remove('d-none');
            cartListBody.children[0].classList.add('d-none');
            cartListBody.children[1].classList.remove('d-none');

            activeModalCarts();

            list.addEventListener('click', changeCharacter);

            async function changeCharacter(e) {
                if(
                    e.target.parentElement.nodeName === 'LI' && 
                    !stand.find(el => el.dataset.name === e.target.parentElement.dataset.name)
                ) {
                    setTimeout(() => removeModalCarts(), 0);
                    setTimeout(() => window.scrollTo(0,0), 1000);

                    const newCard = changeStandCharacter(e, parent);

                    await saveCard(id, newCard);

                    list.removeEventListener('click', changeCharacter);

                    //create fetch for change user data
                } else {
                    setTimeout(() => removeModalCarts(), 0);
                    setTimeout(() => window.scrollTo(0,0), 1000);

                    list.removeEventListener('click', changeCharacter);
                }
            }
        }
    }

    changeStandCharacter(e, parent) {            
        const target = e.target.parentElement;
    
        const newName = target.querySelector('#name').innerHTML;
        const newImage = target.querySelector('#image').style.backgroundImage;
        const newElement = target.querySelector('#element').src;
    
        const name = parent.querySelector('#name');
        const image = parent.querySelector('#image');
        const element = parent.querySelector('#element');
    
        name.innerHTML = newName;
        image.style = `background-image: ${newImage};`;
        element.src = newElement;
        parent.dataset.name = target.dataset.name;   
        
        const redex = /\/[a-zA-z0-9\/.]{0,}/;
        const getUrlimaga = newImage.match(redex)[0];

        return {
            name: newName,
            element: newElement,
            images: {small: getUrlimaga}
        }
    }

}

async function saveCard(id, newCard) {
    try {

        const response = await createFetch(
            '/api/profile/updateStand',
            {
                newCard,
                id
            }
        );
        showUserMesage(response.message, 'succes');        
    } catch (error) {
        showUserMesage(error.message, 'error');        
    }
}