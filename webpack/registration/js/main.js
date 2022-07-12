import Toastify from 'toastify-js';

import fetchRegistration from "./modules/fetchRegistration";

const form = document.querySelector('#form');


window.addEventListener('load', () => {

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const target = event.target;

        const cred = {
            email: target.querySelector('#email').value,
            password: target.querySelector('#password').value,
            userName: target.querySelector('#name').value,
            userCity: target.querySelector('#city').value,
            userElement: target.querySelector('#elemental').value,
        }

        const btn = target.querySelector('button');
        btn.disabled = true;
        try {
            const uid = await fetchRegistration(cred);

            target.querySelector('#email').value = '';
            target.querySelector('#password').value = '';
            target.querySelector('#name').value = '';
            target.querySelector('#city').value = '';
            target.querySelector('#elemental').value = '';
            btn.disabled = false;

            window.location.assign('/userProfile?uid=' + uid);
        } catch (error) {
            btn.disabled = false;
            target.querySelector('#email').value = '';            
            target.querySelector('#email').focus();

            Toastify({
                text: error.message,
                duration: 4000,
                close: true,
                gravity: "bottom",
                position: "left", 
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                },
              }).showToast();

        }
    })
})