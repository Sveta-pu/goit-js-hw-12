import{a as f,S as p,i as l}from"./assets/vendor-xwsNXkQR.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();const y="https://pixabay.com/api/",g="52809699-ccc5c93f5d687b44e4326bc01",m=15;async function h(o,e=1){const n=`${y}?key=${g}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=${m}`;try{return(await f.get(n)).data}catch(a){throw console.error("Error fetching imeges:",a),a}}const i=document.querySelector(".gallery"),s=document.querySelector(".loader");s&&s.classList.add("hidden");const u=new p(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){return o.map(e=>`
        <li class="gallery-item">
          <a class="gallery-image" href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" />
          </a>
          <div class="info">
            <p ><b>Likes:</b> ${e.likes}</p>
            <p ><b>Views:</b> ${e.views}</p>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </li>
      `).join("")}function L(o){if(!Array.isArray(o)||o.length===0||!i)return;const e=b(o);i.insertAdjacentHTML("beforeend",e),u.refresh()}function w(){i&&(i.innerHTML="",u.refresh())}function $(){s&&s.classList.remove("hidden")}function A(){s&&s.classList.add("hidden")}const d=document.querySelector(".form"),v=d.elements["search-text"];let E=1;d.addEventListener("submit",async o=>{o.preventDefault();const e=v.value.trim();if(!e){l.warning({title:"Warning",message:"Please enter a search term!"});return}w(),$();try{const n=await h(e,E);if(!n||!Array.isArray(n.hits))throw new Error("Bad response shape from API");if(n.hits.length===0){l.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"});return}L(n.hits)}catch(n){console.error(n),l.error({title:"Error",message:"Network error or API failed. Try again later."})}finally{A()}});
//# sourceMappingURL=index.js.map
