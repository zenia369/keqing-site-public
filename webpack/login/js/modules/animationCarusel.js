export default function Carusel(element, time, step) {
    let item = 1;
    let isDown = true;
    let isActive = true;
    let length = 0

    return () => {

        setInterval(() => {
            requestAnimationFrame(() => {
                if(isDown) {
                    length += step;

                    element.style = `transform: translateY(-${length}vh);`;

                    isDown = length === 6 * step ? false : true;

                    item++;
                } else {
                    length -= step
                    element.style = `transform: translateY(-${length}vh);`;

                    isDown = length === 0 ? true : false;
                    item--;
                }

            })
        }, time)
    }
} 