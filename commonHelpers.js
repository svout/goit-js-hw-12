import{i as d,a as f,S as E}from"./assets/vendor-b42c18af.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&p(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function p(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const l=document.querySelector(".loader");l.style.display="none";let y=1,L="",g=0;const w=document.getElementById("searchForm"),v=document.getElementById("searchInput"),h=document.getElementById("imageGallery"),c=document.getElementById("loadMoreBtn");c.style.display="none";function b(){return document.querySelector(".card").getBoundingClientRect().height}w.addEventListener("submit",async i=>{i.preventDefault();const o=v.value.trim();if(o===""){d.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}l.style.display="inline-block",L=o,y=1;try{const s="42374416-80395e50359da313800ed9b7e",p=await f.get(`https://pixabay.com/api/?key=${s}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${y}&per_page=15`);l.style.display="none";const e=p.data;g=e.totalHits,e.hits.length===0?d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(h.innerHTML="",e.hits.forEach(r=>{const n=document.createElement("div");n.classList.add("card");const a=document.createElement("a");a.href=r.largeImageURL,a.classList.add("gallery-link");const m=document.createElement("img");m.src=r.webformatURL,m.alt=r.tags;const u=document.createElement("div");u.classList.add("details"),u.innerHTML=`
                    <p>Likes: ${r.likes}</p>
                    <p>Views: ${r.views}</p>
                    <p>Comments: ${r.comments}</p>
                    <p>Downloads: ${r.downloads}</p>
                `,a.appendChild(m),n.appendChild(a),n.appendChild(u),h.appendChild(n)}),new E(".gallery-link").refresh(),h.childElementCount<g&&(c.style.display="block"),window.scrollBy({top:b()*2,behavior:"smooth"}))}catch(s){console.log("Error fetching data:",s),l.style.display="none",d.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}});c.addEventListener("click",async()=>{y++,l.style.display="inline-block";try{const i="42374416-80395e50359da313800ed9b7e",o=await f.get(`https://pixabay.com/api/?key=${i}&q=${L}&image_type=photo&orientation=horizontal&safesearch=true&page=${y}&per_page=15`);l.style.display="none";const s=o.data;if(s.hits.length===0){d.error({title:"Error",message:"Sorry, there are no more images to load.",position:"topRight"}),c.style.display="none";return}else s.hits.forEach(e=>{const t=document.createElement("div");t.classList.add("card");const r=document.createElement("a");r.href=e.largeImageURL,r.classList.add("gallery-link");const n=document.createElement("img");n.src=e.webformatURL,n.alt=e.tags;const a=document.createElement("div");a.classList.add("details"),a.innerHTML=`
                    <p>Likes: ${e.likes}</p>
                    <p>Views: ${e.views}</p>
                    <p>Comments: ${e.comments}</p>
                    <p>Downloads: ${e.downloads}</p>
                `,r.appendChild(n),t.appendChild(r),t.appendChild(a),h.appendChild(t)}),new E(".gallery-link").refresh(),h.childElementCount<g?c.style.display="block":(c.style.display="none",d.info({title:"End of Search Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),window.scrollBy({top:b()*2,behavior:"smooth"})}catch(i){console.log("Error fetching data:",i),l.style.display="none",d.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}});
//# sourceMappingURL=commonHelpers.js.map