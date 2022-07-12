import createFetch from "./createFetch";
import showUserMesage from "./showUserMesage";

const gallery = document.querySelector('.gallery');
const btnEditGallery = document.querySelector('.btn-edit-gallery');
const btnsEdit = document.querySelector('.wrapp-edit-btns');
const btnEditCancel = btnsEdit.querySelector('.btn-edit-gallery-cancel');
const btnEditSubmit = btnsEdit.querySelector('.btn-edit-gallery-submit');

export default new class EditFavorites {

    activeEditMode() {
        const el = document.createElement('div');
        el.classList.add('edit-mode-model')
        el.style = 'position: fixed; top:0; right:0; bottom:0; left:0; background: rgba(1,1,1, .4); z-index-1;';
        document.body.appendChild(el);

        gallery.classList.toggle('toggleGalleryVisible');
        btnsEdit.classList.toggle('d-none');
    
        btnEditCancel.addEventListener('click', hideEditMode);
        btnEditSubmit.addEventListener('click', submiteEditeMode);

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
        
            btnEditCancel.removeEventListener('click', hideEditMode);
            btnEditSubmit.removeEventListener('click', submiteEditeMode);
        }

        async function submiteEditeMode() {
            const checkBoxs = document.querySelectorAll('ul.gallery_wrapp input[type="checkbox"]:checked');

            const links = [...checkBoxs].reduce((acc, el) => {
                const parent = el.parentNode.parentNode;
                const aLink = parent.children[1].getAttribute('href');

                acc.push(aLink)
                return acc
            }, []);

            await saveChanges(links);

            queueMicrotask(() => {
                [...checkBoxs].forEach((el) => {
                    // el.parentNode.parentNode.remove()
                    const parent = el.parentNode.parentNode;
                    parent.style = 'transform: scale(0.5); opacity: 0.4;'
                    setTimeout(() => parent.remove(), 450)
                });

                hideEditMode();
            })
        }
    }


}

async function saveChanges(links) {
    console.log(window.pageYOffset);
    try {
        const response = await createFetch(
            '/api/profile/deleteFavoritePhoto',
            {
                links
            },
            'DELETE'
        )
        showUserMesage(response.message, 'succes', 'top', 'left', 'toastify-sticky');        
    } catch (error) {
        console.log(error.message);
        showUserMesage(error.message, 'error', 'top', 'left', 'toastify-sticky');        
    }
}