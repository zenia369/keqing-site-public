

export default class Helpers {

    HandlerCardLayout(check = true) {
        layoutSettingsCard.style.visibility= check ? 'visible' : 'hidden';
        layoutSettingsCard.classList.toggle('animate__animated');
        layoutSettingsCard.classList.toggle('animate__zoomIn');
    }
    

    activeSetNewAvatar() {
        modalListStatus.children[1].classList.add('d-none');
        modalListStatus.children[0].classList.remove('d-none');
        cartListBody.children[1].classList.add('d-none');
        cartListBody.children[0].classList.remove('d-none');

        cartsModal();

        const list = document.querySelector('#choose-new-card');

        list.addEventListener('click', (e) => {
            if(e.target.parentElement.nodeName === 'LI') {
                setTimeout(() => addAnimationClose(), 0);

                setTimeout(() => window.scrollTo(0,0), 1000);

                changeCard(e);

                list.removeEventListener('click', null);

            }
        })

    }


    activeSetNewCharacter(e) {
        const parent = e.target.parentElement;

        if(parent.nodeName === 'LI') {
            const list = document.querySelector('#choose-new-character');
            const stand = Array.from(document.getElementById('characters').children);

            modalListStatus.children[0].classList.add('d-none');
            modalListStatus.children[1].classList.remove('d-none');
            cartListBody.children[0].classList.add('d-none');
            cartListBody.children[1].classList.remove('d-none');

            cartsModal();

            list.addEventListener('click', changeCharacter);

            function changeCharacter(e) {
                if(
                    e.target.parentElement.nodeName === 'LI' && 
                    !stand.find(el => el.dataset.name === e.target.parentElement.dataset.name)
                ) {
                    setTimeout(() => addAnimationClose(), 0);
                    setTimeout(() => window.scrollTo(0,0), 1000);

                    changeStandCharacter(e, parent);

                    list.removeEventListener('click', changeCharacter);

                    //create fetch for change user data
                } else {
                    setTimeout(() => addAnimationClose(), 0);
                    setTimeout(() => window.scrollTo(0,0), 1000);

                    list.removeEventListener('click', changeCharacter);
                }
            }
        }
    
    }

    activeEditMode() {
        const el = document.createElement('div');
        el.classList.add('edit-mode-model')
        el.style = 'position: fixed; top:0; right:0; bottom:0; left:0; background: rgba(1,1,1, .4); z-index-1;';
        document.body.appendChild(el);

        gallery.classList.toggle('toggleGalleryVisible');
        btnsEdit.classList.toggle('d-none');
    
        btnEditCancel.addEventListener('click', hideEditMode);
        btnEditSubmit.addEventListener('click', submiteEditeMode)
    }

    removeModalCarts() {
        addAnimationClose()
    }

}

function changeStandCharacter(e, parent) {            
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
}

function changeCard(e) {
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

function submiteEditeMode() {
    const checkBoxs = document.querySelectorAll('ul.gallery_wrapp input[type="checkbox"]:checked');
    console.log(checkBoxs);
    //create fetch change folovers images submit edit
    hideEditMode();
}

function hideEditMode() {
    const modal = document.querySelector('.edit-mode-model');
    const checkBoxs = document.querySelectorAll('ul.gallery_wrapp input[type="checkbox"]');

    modal.remove();
    gallery.classList.toggle('toggleGalleryVisible');
    btnEditGallery.classList.remove('d-none');
    btnsEdit.classList.toggle('d-none');
    btnEditGallery.disabled = false;

    for (const el of checkBoxs) {
        el.checked = false;
    }

    btnEditCancel.removeEventListener('click', null);
    btnEditSubmit.removeEventListener('click', null);
}

function cartsModal() {
    modaleCarts.style.display = 'block';
    modaleCarts.children[0].addEventListener('click', addAnimationClose);
}

function removeModalCarts() {
    addAnimationClose();
}

function addAnimationClose() {
    modaleCarts.children[1].classList.add('animate__animated');
    modaleCarts.children[1].classList.add('animate__zoomOutDown');
    modaleCarts.children[1].addEventListener('animationend', () => {
        modaleCarts.style.display = 'none';
        modaleCarts.children[0].removeEventListener;
        modaleCarts.children[1].classList.remove('animate__animated');
        modaleCarts.children[1].classList.remove('animate__zoomOutDown');
    })
}


