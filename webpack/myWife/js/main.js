//IMPORT

import '../styles/style.scss'


//END IMPORT


const list = document.querySelector('.cardList');
const loader = document.getElementById('loader');



window.addEventListener('load', createList);

async function createList() {
    try {
        await request('/api/myWife').then(data => {
                let links = [];

                data.map(value => { //пушить всі силки в масив
                    links.push(value["game-img"]);
                    value.items.forEach(el => {
                        if (el?.backgraundURL) {
                            links.push(el.backgraundURL);
                        }
                    });
                })
                preloadImages(links, data);
            })
    } catch (e) {
        console.warn('Error:', e.message)
    }

}

function toCard(post) {
    return `
        <div class="cardList-card">
            <div class="cardList-card__title">
                <p class="name-game"><a href="${post["game-href"]}" target="_blank">${post["name-game"]}</a></p>
                <div class="cardList-card__title-img" style="background: url(${post["game-img"]});background-repeat: no-repeat;background-size: cover;background-position-x: center;"></div>
            </div>
            <ul class="cardList-card__ul">
                ${toItmes(post)}
            </ul>
        </div>  
    `
}


function toItmes({items}) {
    let listItems = [];

    for (let el of items) {
        const list = `
                    <li>
                        <div style="background: url(${el.backgraundURL});background-repeat: no-repeat;background-size: cover;">
                            <div class="link">
                                <a href="${el.pageURL}">${el.pageName}</a>
                            </div>
                        </div>
                    </li>
        `
        listItems.push(list);
    }
    
    listItems =listItems.join('')
    
    return listItems
}

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

function preloadImages(sources, data) {
    Promise.all(sources.map(src => {
      const img = document.createElement('img');
      img.src = src;
      return new Promise(r => img.onload = img.onerror = r);
    }))
        .then(() => list.innerHTML = data.map(toCard).join('\n'))
        .then(() => {
            loader.style.display = "none";
        })
        .then(() => {
            for (const el of list.children) {
                el.classList.add('animation-item')
            }
        });
}
