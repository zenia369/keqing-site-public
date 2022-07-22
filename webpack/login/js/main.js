//IMPORT
import '../styles/style.scss'

import '../images/keqing-1.png'
import '../images/keqing-2.png'
import '../images/keqing-3.png'
import '../images/keqing-4.png'
import '../images/keqing-5.png'
import '../images/keqing-6.png'
import '../images/keqing-7.png'
import '../images/reaction.svg'
// END IMPORT

import preloadImages from './modules/preloadImages';
import login from './modules/fetchAuth';

const form = document.querySelector('#form')


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const target = event.target;

    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const btn = target.querySelector('button');
    btn.disabled = true;

    try {
        const uid = await login(email, password);

        if(!uid) throw Error('Server error, try again')

        target.querySelector('#email').value = '';
        target.querySelector('#password').value = '';
        btn.disabled = false;

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        window.location.assign(params.continuePath ?? '/userProfile' + '?uid=' + uid);
    } catch (error) {
        btn.disabled = false;
        console.warn(error.message);
    }

})
window.addEventListener('load', () => preloadImages())
