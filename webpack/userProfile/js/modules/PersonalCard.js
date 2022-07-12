import createFetch from "./createFetch";
import showUserMesage from "./showUserMesage";


const layoutSettingsCard = document.getElementById('settings-card');
const formPersonalCard = document.getElementById('form-card');
const userName = document.querySelector('span#name');
const userCity = document.querySelector('span#city');
const userElemental = document.querySelector('span#elemental');

export default new class PersonalCard {
    HandlerCardLayout(check = true) {
        layoutSettingsCard.style.visibility= check ? 'visible' : 'hidden';
        layoutSettingsCard.classList.toggle('animate__animated');
        layoutSettingsCard.classList.toggle('animate__zoomIn');
    }

    async submitFormPersonalCard(e, HandlerCardLayout) {
        e.preventDefault();

        const inputText = formPersonalCard.querySelector('#newName');
        const newCity = formPersonalCard.querySelector('#city');
        const newElemental = formPersonalCard.querySelector('#elemental');
    
        if(inputText.value !== '' && newCity.value !== '' && newElemental.value !== '') {
            userName.innerHTML = inputText.value;
            userCity.innerHTML = newCity.value;
            userElemental.innerHTML = newElemental.value;

            await saveInfo(inputText.value, newCity.value, newElemental.value);
        
            inputText.value = '';
            newCity.value = '';
            newElemental.value = '';
        }
    
        HandlerCardLayout(false)
    }
}

async function saveInfo(newName, newCity, newElemental) {
    try {
        const response = await createFetch(
            '/api/profile/changeInfo',
            {
                name: newName,
                city: newCity,
                element: newElemental
            }
        )

        showUserMesage(response.message, 'succes');
    } catch (error) {
        showUserMesage(error.message, 'error');
    }
}