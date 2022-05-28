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

        function submiteEditeMode() {
            const checkBoxs = document.querySelectorAll('ul.gallery_wrapp input[type="checkbox"]:checked');
            console.log(checkBoxs);
            //create fetch change folovers images submit edit
            hideEditMode();
        }
    }


}