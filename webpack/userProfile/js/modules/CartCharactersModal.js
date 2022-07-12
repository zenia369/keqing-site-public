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
            document.body.style = "overflow: overlay; height: auto;"
        })
    }

    activeModalCarts() {
        window.scrollTo(0,0);        
        setTimeout(() => {
            document.body.style = "overflow: hidden; height: 100vh;"
            modaleCarts.children[0].addEventListener('click', () => {
                modaleCarts.children[1].classList.add('animate__animated');
                modaleCarts.children[1].classList.add('animate__zoomOutDown');
                modaleCarts.children[1].addEventListener('animationend', () => {
                    modaleCarts.style.display = 'none';
                    modaleCarts.children[0].removeEventListener;
                    modaleCarts.children[1].classList.remove('animate__animated');
                    modaleCarts.children[1].classList.remove('animate__zoomOutDown');
                    document.body.style = "overflow: overlay; height: auto;"
                })
            });

            modaleCarts.style.display = 'block';
        }, 600)
    }

}