const e=document.querySelector(".breed-select"),t=document.querySelector(".loader"),n=document.querySelector("error"),c=document.querySelector(".cat-info");function r(e){return new Promise(((t,c)=>{fetch(e).then((e=>{if(e.ok)return e.json();c(n)})).then((e=>{t(e)})).catch((e=>c(e)))}))}t.classList.add("hidden"),r("https://api.thecatapi.com/v1/breeds?api_key=live_lICq8CvALSqDOOGteKLfstNbQ0FFbekBPNTeXFQqaeLv7ofwBQa3owxwAO2DE2EQ").then((t=>{const n=t.map((e=>`option value='${e.id}'>${e.name}</option>`)).join("");e.insertAdjacentHTML("afterbegin",n)})),e.addEventListener("change",(function(e){c.innerHTML="",r(`https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}`).then((e=>{const t=`<div><img src ="${e[0].url}" class ="cat-pic"></div>`;c.insertAdjacentHTML("afterbegin",t)}))}));
//# sourceMappingURL=index.9cb20b90.js.map