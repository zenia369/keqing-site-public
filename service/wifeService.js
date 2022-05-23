import { initializeApp } from "firebase/app";
// const imageToBase64 = require('image-to-base64');

import firebaseConfig from '../data/firebaseConfig.js';

const firebase = initializeApp(firebaseConfig);
import { getStorage, ref, listAll} from "firebase/storage";
const storage = getStorage(firebase);


class Wife {
    static async getPathImg(name) {
        let path = []
        const listRef = ref(storage, `/characters/${name}/image`);
            await listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        path.push(itemRef.fullPath);
                    });
                }).catch((error) => {
                    console.log("Error in get Path img:", error);
                });

        return await this.createUrlImg({name, path})
    }
    
    static async createUrlImg({path, name}) {
        let images = [];
        path.forEach(async (el) => {
            const imagesRef = await ref(storage, `${el}`);
            images.push({
                link: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Fimage%2F${imagesRef.name}?alt=media&token`,
                newLink: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Ffull-size-image%2F${imagesRef.name}?alt=media&token`,
            })
        })
        return {images, name}
    }

    async toBase64({images}) {
        console.log(images);
        let colectionBase64 = [];
        images.forEach(el => {
            const response = imageToBase64(el)
            colectionBase64.push(response)
        })
       
        return colectionBase64
    }
}


export default Wife