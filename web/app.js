const solutions={
  landing:{title:'Landing de conversión',meta:'1 objetivo · 1 recorrido · CTA directo',price:'Desde Gs. 350.000',time:'Alcance final según diagnóstico'},
  web:{title:'Web corporativa',meta:'Marca · servicios · confianza · contacto',price:'Cotización personalizada',time:'Según cantidad de secciones y contenido'},
  catalogo:{title:'Catálogo digital + WhatsApp',meta:'Productos · categorías · consulta directa',price:'Cotización personalizada',time:'Según cantidad de productos y estructura'},
  google:{title:'Perfil de Empresa en Google',meta:'Datos · categorías · fotos · enlaces',price:'Cotización personalizada',time:'Configuración u optimización según estado actual'},
  pack:{title:'Pack Presencia Digital',meta:'Web · Google · WhatsApp · medición',price:'Cotización personalizada',time:'Paquete armado según prioridad comercial'}
};
const service=document.querySelector('#service');
const goal=document.querySelector('#goal');
const content=document.querySelector('#content');
const title=document.querySelector('#result-title');
const meta=document.querySelector('#result-meta');
const price=document.querySelector('#result-price');
const time=document.querySelector('#result-time');
const wa='595971404438';
function updateSolution(){const s=solutions[service.value];title.textContent=s.title;meta.textContent=s.meta;price.textContent=s.price;time.textContent=s.time}
[service,goal,content].forEach(el=>el?.addEventListener('change',updateSolution));
function label(el){return el.options[el.selectedIndex].text}
function sendBrief(){
  const s=solutions[service.value];
  const msg='Hola Fabio, quiero una propuesta para mi negocio.%0A%0AServicio: '+encodeURIComponent(s.title)+'%0AObjetivo: '+encodeURIComponent(label(goal))+'%0AContenido: '+encodeURIComponent(label(content))+'%0A%0AQuiero hacer el diagnóstico y definir el alcance.';
  window.open('https://wa.me/'+wa+'?text='+msg,'_blank','noopener')
}
document.querySelector('#send-brief')?.addEventListener('click',sendBrief);
document.querySelectorAll('[data-service]').forEach(card=>{card.querySelector('button')?.addEventListener('click',()=>{service.value=card.dataset.service;updateSolution();document.querySelector('#diagnostico')?.scrollIntoView({behavior:'smooth',block:'center'})})});
document.querySelectorAll('[data-service-jump]').forEach(btn=>btn.addEventListener('click',()=>{service.value=btn.dataset.serviceJump;updateSolution();document.querySelector('#diagnostico')?.scrollIntoView({behavior:'smooth',block:'center'})}));
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('#main-nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open))});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.13});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
updateSolution();