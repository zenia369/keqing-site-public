const Router = require('express');
const router = Router();
const Path = require('path');


const charactersList = require('../data/charactersList');

router.get('/userProfile', (req, res) => {
    try {
        const {query} = req;

        if(!query.uid) {
            throw Error
        }

        const elements = {
            Piro: "pages/userProfile/images/Elements/Element_Pyro.png",
            Anemo: "pages/userProfile/images/Elements/Element_Anemo.png",
            Electro: "/pages/userProfile/images/Elements/Element_Electro.png",
            Geo: "pages/userProfile/images/Elements/Element_Geo.png",
            Hydro: "/pages/userProfile/images/Elements/Element_Hydro.png",
            Cryo: "pages/userProfile/images/Elements/Element_Cryo.png",
        };

        const user = {
            name: "argonavt",
            card: "./pages/userProfile/images/NameCards/Namecard_Background_Keqing_Lightning_Stiletto.webp",
            avatart: "./pages/userProfile/images/Characters/106/Keqing.png",
            id: 170910302,
            city: "Inazuma",
            element: "Electro",
            stand: [
                {
                    "name": "Keqing",
                    element: elements.Electro,
                    "images": {
                        "74": "pages/userProfile/images/Characters/74/Character_Keqing_Thumb.webp",
                        "106": "pages/userProfile/images/Characters/106/Keqing.png"
                    },
                    "card": "pages/userProfile/images/NameCards/Namecard_Background_Keqing_Lightning_Stiletto.webp"
                },
                {
                    name: "Beidou",
                    element: elements.Electro,
                    images: {
                    74: "pages/userProfile/images/Characters/74/Character_Beidou_Thumb.webp",
                    106: "pages/userProfile/images/Characters/106/Beidou.png",
                    },
                    card: "pages/userProfile/images/NameCards/Namecard_Background_Beidou_Weighing_Anchor.webp",
                },
                {
                    name: "Bennett",
                    element: elements.Piro,
                    images: {
                        74: "pages/userProfile/images/Characters/74/Character_Bennett_Thumb.webp",
                        106: "pages/userProfile/images/Characters/106/Bennett.png",
                    },
                    card: "pages/userProfile/images/NameCards/Namecard_Background_Bennett_Recognition.webp",
                },
                {
                    name: "Chongyun",
                    element: elements.Cryo,
                    images: {
                        74: "pages/userProfile/images/Characters/74/Character_Chongyun_Thumb.webp",
                        106: "pages/userProfile/images/Characters/106/Chongyun.png",
                    },
                    card: "pages/userProfile/images/NameCards/Namecard_Background_Chongyun_Spirit_Blade.webp",
                },
                {
                    name: "Diluc",
                    element: elements.Piro,
                    images: {
                        74: "pages/userProfile/images/Characters/74/Character_Diluc_Thumb.webp",
                        106: "pages/userProfile/images/Characters/106/Diluc.png",
                    },
                    card: "pages/userProfile/images/NameCards/Namecard_Background_Diluc_Flames.webp",
                },
                {
                    name: "Diona",
                    element: elements.Cryo,
                    images: {
                        74: "pages/userProfile/images/Characters/74/Character_Diona_Thumb.webp",
                        106: "pages/userProfile/images/Characters/106/Diona.png",
                    },
                    card: "pages/userProfile/images/NameCards/Namecard_Background_Diona_Meow.webp",
                },
                {
                    name: "Eula",
                    element: elements.Cryo,
                    images: {
                        74: "pages/userProfile/images/Characters/74/Character_Eula_Thumb.webp",
                        106: "pages/userProfile/images/Characters/106/Eula.png",
                    },
                    card: "pages/userProfile/images/NameCards/Namecard_Background_Eula_Ice-Sealed.webp",
                },
                {
                    name: "Fischl",
                    element: elements.Electro,
                    images: {
                        74: "pages/userProfile/images/Characters/74/Character_Fischl_Thumb.webp",
                        106: "pages/userProfile/images/Characters/106/Fischl.png",
                    },
                    card: "pages/userProfile/images/NameCards/Namecard_Background_Fischl_Night_Raven.webp",
                },
            ],
            favorites: [],
        }

        res.render('profile', {
            layout: 'layout-profile',
            user,
            charactersList,
        })
    
    } catch (error) {
        res.redirect('/login')
    }
    
});

module.exports = router