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

    submitFormPersonalCard(e, HandlerCardLayout) {
        e.preventDefault();

        const inputText = formPersonalCard.querySelector('#newName');
        const newCity = formPersonalCard.querySelector('#city');
        const newElemental = formPersonalCard.querySelector('#elemental');
    
        if(inputText.value !== '' && newCity.value !== '' && newElemental.value !== '') {
            userName.innerHTML = inputText.value;
            userCity.innerHTML = newCity.value;
            userElemental.innerHTML = newElemental.value;
        
            inputText.value = '';
            newCity.value = '';
            newElemental.value = '';
        
            //fetch data
        }
    
        HandlerCardLayout(false)
    }
}