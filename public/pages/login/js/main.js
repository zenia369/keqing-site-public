(()=>{"use strict";window.addEventListener("load",(()=>{const e=document.querySelector(".images");(async()=>{await fetch("api/login-images").then((e=>e.json())).then((t=>{return n=t,void Promise.all(n.map(((e,t)=>{const n=document.createElement("img");return n.src=e,new Promise((e=>n.onload=n.onerror=e))}))).then((()=>function(t){t.forEach(((t,n)=>{const a=document.createElement("img");a.classList.add("images__item"),a.alt=`Keqing image ${n+2}`,a.src=t,e.append(a)}))}(n))).then((()=>function(e,t,n){let a=!0,r=0;return()=>{setInterval((()=>{requestAnimationFrame((()=>{a?(r+=100,e.style=`transform: translateY(-${r}vh);`,a=600!==r):(r-=100,e.style=`transform: translateY(-${r}vh);`,a=0===r)}))}),5e3)}}(e)()));var n}))})()}))})();