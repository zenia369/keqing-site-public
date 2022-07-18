

const overlay = document.querySelector('.second-screen__video-box');
const overlayBtn = overlay.querySelector('.second-screen__video-box__content__btn');
const overlayContent = overlay.querySelector('.second-screen__video-box__content');
const threeScreen = document.querySelector('.three-screen');

const btnOpenVideo = document.querySelector('.first-screen__video__wrapp__btn');
const btnPreviousScreen = document.querySelector('.three-screen-upBtn');
const btnNextScreen = document.querySelector('.first-screen__video-wrappBtn__next');



//REGISTER EFFECT GSAP
gsap.registerEffect({
    name: "up", 
    extendTimeline: true,
    effect: (targets, config) => {
        return gsap.to(targets, {translateY: '0', opacity: 1, visibility: 'visible'});
    }
});
gsap.registerEffect({
    name: "fade", 
    extendTimeline: true,
    effect: (targets, config) => {
        return gsap.to(targets, {translateY: '500px', opacity: 0, visibility: 'hidden'});
    }
});
gsap.registerEffect({
    name: "videoActive", 
    extendTimeline: true,
    effect: (targets, config) => {
        return gsap.to(targets, {visibility: 'visible', background: "rgba(1, 1, 1, 0.6)"});
    }
});
gsap.registerEffect({
    name: "videoDisable", 
    extendTimeline: true,
    effect: (targets, config) => {
        return gsap.to(targets, {visibility: 'hidden', background: "rgba(1, 1, 1, 0.0)"});
    }
});
gsap.registerEffect({
    name: "videoContentFade", 
    extendTimeline: true,
    effect: (targets, config) => {
        return gsap.to(targets, {opacity: 1, translateY: '0'});
    }
});
gsap.registerEffect({
    name: "videoContentUp", 
    extendTimeline: true,
    effect: (targets, config) => {
        return gsap.to(targets, {opacity: '0', translateY: '-300px'});
    }
});

//class
class ImageAction {
    async addFavorite(bigLink, link) {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        try {
            const response = await fetch('/api/wife/addFavoritePhoto', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'CSRF-Token': Cookies.get('XSRF-TOKEN')
                },
                body: JSON.stringify({
                    bigLink,
                    link,
                    uid: params.uid
                })
            })
            
            if(!response.ok) throw Error((await response.json()).message)

            return {message: (await response.json()).message, status: 'success'}
        } catch (error) {
            return {message: error.message, status: 'error'}
        }
    }
    showStatus(message, status) {
        const colors = {
            success: 'linear-gradient(to right, #00b09b, #96c93d)',
            error: 'linear-gradient(to right, #ff5f6d, #ffc371)'
        }

        Toastify({
            text: message,
            duration: 5000,
            close: true,
            gravity: 'bottom',
            position: 'center', 
            stopOnFocus: true,
            style: {
              background: colors[status],
            },
          }).showToast();
    }
}


btnOpenVideo.addEventListener('click', overlayView);
overlayBtn.addEventListener('click', overlayView);
btnNextScreen.addEventListener('click', upScreen);
btnPreviousScreen.addEventListener('click', downScreen);

window.addEventListener('load', () => {
    document.querySelector('.container').classList.remove('visibility')
    document.querySelector('.load-page').classList.add('visibility');
})

const imageAction = new ImageAction();



function overlayView() {
    let tl = gsap.timeline();

    if(!overlay.classList.contains('active')) {
        tl.videoActive(overlay)
          .videoContentFade(overlayContent);

        overlay.classList.add('active');
    } else {
        tl.videoContentUp(overlayContent)
          .videoDisable(overlay);
        
        overlay.classList.remove('active');
    }
}

function upScreen() {
    gsap.effects.up(threeScreen);
}

function downScreen() {
    gsap.effects.fade(threeScreen);
}


async function saveFavorite(bigLink, link) {
    const image = await imageAction.addFavorite(bigLink, link);
    imageAction.showStatus(image.message, image.status);
}

