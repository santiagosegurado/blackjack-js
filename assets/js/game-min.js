const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],n=["A","J","Q","K"],r=[];const l=document.querySelector("#btnPedir"),s=document.querySelector("#btnDetener"),o=document.querySelector("#btnNuevo"),c=document.querySelectorAll("small"),d=document.querySelectorAll(".divCartas"),a=(t=2)=>{e=i(),r=[];for(let e=0;e<t;e++)r.push(0);c.forEach(e=>{e.innerText=0}),d.forEach(e=>{e.innerHTML=" "}),l.disabled=!1,s.disabled=!1},i=()=>{e=[];for(let n=2;n<=10;n++)for(let r=0;r<t.length;r++)e.push(n+t[r]);for(const r of n)for(const n of t)e.push(r+n);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay mas cartas en el Deck";return e.pop()},h=(e,t)=>(r[t]+=(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),c[t].innerText=r[t],r[t]),b=(e,t)=>{const n=document.createElement("img");n.src=`assets/cartas/${e}.png`,n.classList.add("carta"),d[t].append(n)},f=e=>{let t=0;do{const e=u();t=h(e,r.length-1),b(e,r.length-1)}while(e>=t&&e<=21);setTimeout(()=>{e===t?alert(" EMPATE "):e>21?alert("CPU GANA :("):alert(" JUGADOR1 GANA ;)")},500)};return l.addEventListener("click",()=>{let e=u();const t=h(e,0);b(e,0),t>21?(l.disabled=!0,s.disabled=!0,f(t)):21===t&&(l.disabled=!0,s.disabled=!0,f(t))}),s.addEventListener("click",()=>{l.disabled=!0,s.disabled=!0,f(r[0])}),o.addEventListener("click",()=>{a()}),{nuevoJuego:a}})();