const modaleCarts = document.getElementById('carts');


export default new class CartCharactersModal {
    removeModalCarts() {
        modaleCarts.children[1].classList.add('animate__animated');
        modaleCarts.children[1].classList.add('animate__zoomOutDown');
        modaleCarts.children[1].addEventListener('animationend', () => {
            modaleCarts.style.display = 'none';
            modaleCarts.children[0].removeEventListener;
            modaleCarts.children[1].classList.remove('animate__animated');
            modaleCarts.children[1].classList.remove('animate__zoomOutDown');
        })
    }

    activeModalCarts() {
        modaleCarts.style.display = 'block';
        modaleCarts.children[0].addEventListener('click', () => this.removeModalCarts());
    }
}