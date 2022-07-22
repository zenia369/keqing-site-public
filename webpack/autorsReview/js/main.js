//IMPORT

import '../styles/style.scss'

import '../img/Keqing.full.3414607.jpg'
import '../img/mini-keqing-fan.png'
import '../img/mini-keqing-fly-removebg-preview.png'
import '../img/mini-keqing-leiin.png'

// END IMPORT


const btn = document.getElementById('btn');
const img = document.getElementById('reactMS__wrapp-img');
const emojiImg = document.querySelector('.reactMS').children;
const input = document.getElementById('floatingInputValue');


(() => {
    getAvatar();
})()

btn.addEventListener('click', sendMessage);
input.addEventListener('input', () => {
    btn.disabled = isValue(input.value);
    btn.style.cursor = 'pointer';
})


function getAvatar() {
    const src = localStorage.getItem('avatarSrc');
    const avatar = document.querySelector('.containerBar-list__img');
  
    avatar.style = `background-image: url(${src})`;
}

async function sendMessage(event) {
    const textMessage = document.getElementById('floatingTextarea2');
    const textMail = document.getElementById('floatingInputValue');
    let text = {
        email: textMail.value.trim(),
        message: textMessage.value,
    };

    event.preventDefault();
    
    if(textMessage.value && textMail.value) {
    
        changeEmojiImg(0); 

        //запрос на бекенд
        request('/api/message', 'POST', text )
            .then(({check}) => {
            event.target.disabled = "true";
            event.target.style.cursor = 'no-drop';
            textMail.value = '';
            textMessage.value = '';
            return check
            })
            .then(check => check? changeEmojiImg(2, 5000): changeEmojiImg(1))
            .then(() => { changeEmojiImg(emojiImg.length, 14000) })
            .then(() => {
                event.target.disabled = "false"
            })
            .catch(err => {
                console.log(err);
            })
        
    } else {
        changeEmojiImg(1);
    }
}

function changeEmojiImg(value, timeOut = 0) {
    setTimeout(() => {
        for (const el of emojiImg) {
            if(el === emojiImg[value]) {
                el.style.display = 'block'
            } else {
                el.style.display = 'none' 
            }
        }
    }, timeOut)
}

function isValue(value) {
    return value >= 10;
}

// Запит на сревер для отримання даних
async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body,
        })
        return await response.json();
    } catch (error) {
        console.warn('Error:', error.message);
    }
}