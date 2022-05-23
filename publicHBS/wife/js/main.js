const scene = document.getElementById('scene');
let parallaxInstance;

const screens = document.querySelectorAll('.screen');
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


btnOpenVideo.addEventListener('click', overlayView);
overlayBtn.addEventListener('click', overlayView);
btnNextScreen.addEventListener('click', upScreen);
btnPreviousScreen.addEventListener('click', downScreen);

window.addEventListener('load', () => {
    document.querySelector('.container').classList.remove('visibility')
    document.querySelector('.load-page').classList.add('visibility');
    parallaxInstance = new Parallax(scene);
})




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
    parallaxInstance.disable();
}

function downScreen() {
    gsap.effects.fade(threeScreen);
    parallaxInstance.enable();
}




