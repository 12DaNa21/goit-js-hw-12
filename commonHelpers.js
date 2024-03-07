import{S as g,i as d,a as w}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const u=new g(".gallery a",{scaleImageToRatio:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250});async function L(o){if(o.length===0){d.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",color:"red"});return}o.forEach(e=>{const n=`
            <div class="card">
                <a href="${e.webformatURL}">
                    <img src="${e.webformatURL}" alt="${e.tags}">
                </a>
                <p>Likes: ${e.likes}</p>
                <p>Views: ${e.views}</p>
                <p>Comments: ${e.comments}</p>
                <p>Downloads: ${e.downloads}</p>
            </div>
        `;gallery.insertAdjacentHTML("beforeend",n),gallery.lastElementChild.querySelector("img").addEventListener("click",()=>{u.open({items:[{src:e.largeImageURL,title:e.tags}]})})}),o[0].totalHits,u.refresh()}const f=document.getElementById("loader"),y=document.querySelector(".gallery");let c=1,l="";document.getElementById("searchForm").addEventListener("submit",async o=>{o.preventDefault();const e=document.getElementById("searchInput");e&&(c=1,l=e.value.trim(),y.innerHTML="",await p(l))});async function p(o){try{E();const e=await w.get(`https://pixabay.com/api/?key=28194821-49041d995ecd04735d9e20d11&q=${o}&page=${c}&per_page=15`);m();const n=e.data.hits,a=e.data.totalHits;if(n.length===0){b();return}L(n),M(),v(a)}catch(e){m(),handleError(e)}}function E(){f.style.display="block"}function m(){f.style.display="none"}function b(){d.info({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomCenter",color:"red"})}function M(){loadMoreBtn.style.display=y.childElementCount>0?"block":"none"}function I(){loadMoreBtn.style.display="none"}function v(o){o-c*15<=0&&(I(),R())}function R(){d.show({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"})}async function P(o){const e=window.scrollY,n=performance.now();return new Promise(a=>{function t(){const s=performance.now(),i=Math.min(1,(s-n)/500);window.scroll(0,r(e,o,i)),i<1?requestAnimationFrame(t):a()}function r(s,i,h){return s+(1-Math.cos(Math.PI*h))*(i-s)/2}requestAnimationFrame(t)})}loadMoreBtn.addEventListener("click",async()=>{c++,await p(l),await S()});async function S(){const o=document.querySelector(".gallery .card").getBoundingClientRect().height;await P(window.scrollY+o)}
//# sourceMappingURL=commonHelpers.js.map
