const PHONE='595981414443';
const hamb=document.getElementById('hamb'),nav=document.getElementById('nav');
hamb.addEventListener('click',()=>{nav.classList.toggle('open');hamb.textContent=nav.classList.contains('open')?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');hamb.textContent='☰'}));
const openModal=id=>document.getElementById(id).classList.add('open');
const closeModal=id=>document.getElementById(id).classList.remove('open');
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.close)));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'))});
document.querySelectorAll('.quote-open').forEach(b=>b.addEventListener('click',()=>openModal('quoteModal')));
document.getElementById('moreDest').addEventListener('click',()=>openModal('destModal'));
function setQuote({destino='',servicio=''}={}){const f=document.getElementById('quoteForm');if(destino)f.destino.value=destino;if(servicio)f.servicio.value=servicio;openModal('quoteModal')}
document.querySelectorAll('.dest-card,.dest-choice').forEach(el=>el.addEventListener('click',()=>{closeModal('destModal');setQuote({destino:el.dataset.dest})}));
document.querySelectorAll('.service-open').forEach(el=>el.addEventListener('click',()=>setQuote({servicio:el.dataset.service})));
document.getElementById('quoteForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target),get=k=>(f.get(k)||'No indicado').toString().trim()||'No indicado';const msg=`Hola Excursiones Py 👋\n\nQuisiera solicitar un presupuesto.\n\nNombre: ${get('nombre')}\nPasajeros: ${get('pasajeros')}\nServicio: ${get('servicio')}\nDestino: ${get('destino')}\nFecha aproximada: ${get('fecha')}\nSalida desde: ${get('salida')}\nComentario: ${get('comentario')}`;window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,'_blank','noopener')});
document.getElementById('year').textContent=new Date().getFullYear();