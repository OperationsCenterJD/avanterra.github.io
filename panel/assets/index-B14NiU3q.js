(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const m="https://aventerra-links-backend.onrender.com",c="https://www.avanterra.tech/Ofertas/",f="https://avanterra.tech/images/",x=[{id:"img1",label:"Opción 1",file:"ofertaTap.jpg"},{id:"img2",label:"Opción 2",file:"antena.jpg"},{id:"img3",label:"Opción 3",file:"conectividad.jpg"},{id:"img4",label:"Opción 4",file:"cosecha.jpg"}];function u(r){return r.trim().toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-|-$/g,"")}function b(){const r=x.map((i,n)=>{const l=`${f}${i.file}`;return`
      <label style="border:1px solid #ddd;border-radius:12px;padding:10px;display:grid;gap:8px;cursor:pointer;">
        <input type="radio" name="imagePick" value="${l}" ${n===0?"checked":""} />
        <div style="font-size:14px;">${i.label}</div>
        <img
          src="${l}"
          alt="${i.label}"
          style="width:100%;height:120px;object-fit:cover;border-radius:10px;background:#f4f4f4;"
        />
        <div style="font-size:12px;color:#666;word-break:break-all;">${i.file}</div>
      </label>
    `}).join("");return`
    <div style="max-width:820px;margin:40px auto;font-family:system-ui;">
      <h1>Crear link</h1>
      <p>Se creará: <code>${c}<span id="previewSlug">(slug)</span></code></p>

      <form id="linkForm" style="display:grid;gap:14px;">
        <label style="display:grid;gap:6px;">
          URL de Highspot (destino)
          <input id="targetUrl" type="url" placeholder="https://view.highspot.com/..." required
                 style="padding:10px;border:1px solid #ccc;border-radius:8px;" />
        </label>

        <label style="display:grid;gap:6px;">
          Link (se añadirá a ${c})
          <input id="slugInput" type="text" placeholder="Link" required
                 style="padding:10px;border:1px solid #ccc;border-radius:8px;" />
        </label>

        <label style="display:grid;gap:6px;">
          Título
          <input id="title" type="text" placeholder="Mi oferta" required
                 style="padding:10px;border:1px solid #ccc;border-radius:8px;" />
        </label>

        <label style="display:grid;gap:6px;">
          Descripción
          <input id="description" type="text" placeholder="Descripción corta" required
                 style="padding:10px;border:1px solid #ccc;border-radius:8px;" />
        </label>

        <div style="display:grid;gap:8px;">
          <div style="font-weight:600;">Imagen (elige una)</div>
          <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;">
            ${r}
          </div>
        </div>

        <button type="submit"
                style="padding:10px 14px;border:0;border-radius:10px;cursor:pointer;">
          Crear
        </button>
      </form>

      <h3 style="margin-top:24px;">Resultado</h3>
      <pre id="out" style="background:#f6f6f6;padding:12px;border-radius:10px;overflow:auto;"></pre>
    </div>
  `}document.querySelector("#app").innerHTML=b();const h=document.querySelector("#linkForm"),a=document.querySelector("#out"),g=document.querySelector("#slugInput"),v=document.querySelector("#previewSlug");function y(){const r=u(g.value);v.textContent=r||"(slug)"}g.addEventListener("input",y);y();function S(){const r=document.querySelector('input[name="imagePick"]:checked');return r?r.value:""}h.addEventListener("submit",async r=>{r.preventDefault(),a.textContent="Enviando...";const i=document.querySelector("#targetUrl").value.trim(),n=u(document.querySelector("#slugInput").value),l=document.querySelector("#title").value.trim(),e=document.querySelector("#description").value.trim(),t=S(),d={slug:n,title:l,description:e,image:t,targetUrl:i};try{const s=await fetch(`${m}/api/links`,{method:"POST",headers:{"Content-Type":"application/json","x-admin-key":"Juanavanterra123"},body:JSON.stringify(d)}),p=await s.text();let o;try{o=JSON.parse(p)}catch{o=p}if(!s.ok){a.textContent=`ERROR ${s.status}
`+(typeof o=="string"?o:JSON.stringify(o,null,2));return}a.textContent=typeof o=="string"?o:JSON.stringify(o,null,2),n&&(a.textContent+=`

URL pública:
${c}${n}`),t&&(a.textContent+=`

Imagen:
${t}`)}catch(s){a.textContent="Error de red: "+s.message}});
