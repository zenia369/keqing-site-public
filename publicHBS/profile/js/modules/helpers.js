

class Helpers {

    HandlerCardLayout(check = true) {
        layoutSettingsCard.style.visibility= check ? 'visible' : 'hidden';
        layoutSettingsCard.classList.toggle('animate__animated');
        layoutSettingsCard.classList.toggle('animate__zoomIn');
    }
    

    activeSetNewAvatar(e) {
        modalListStatus.children[0].classList.add('active');
        modalListStatus.children[0].classList.remove('d-none');
        cartListBody.children[0].classList.remove('d-none');
        modalListStatus.children[1].classList.remove('active');
        modalListStatus.children[1].classList.add('d-none');
        cartListBody.children[1].classList.add('d-none');
        cartsModal();
 
    }

    activeSetNewCharacter(e) {
        if(e.target.parentElement.nodeName === 'LI') {
            console.log(e.target.parentElement);
            modalListStatus.children[1].classList.add('active');
            modalListStatus.children[1].classList.remove('d-none');
            cartListBody.children[1].classList.remove('d-none');
            modalListStatus.children[0].classList.remove('active');
            modalListStatus.children[0].classList.add('d-none');
            cartListBody.children[0].classList.add('d-none');
            cartsModal();
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

}

function submiteEditeMode() {
    const checkBoxs = document.querySelectorAll('ul.gallery_wrapp input[type="checkbox"]:checked');
    console.log(checkBoxs);
    //submit edit
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
    modaleCarts.children[0].addEventListener('click', removeModalCarts);
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


