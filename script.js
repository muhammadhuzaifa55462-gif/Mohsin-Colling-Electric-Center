

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  // active nav link
  const sections = ['home','services','about','gallery','contact'];
  const y = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
      document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
    }
  });
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});
document.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  })
);

// Hero slider
const slidesData = [
  { eyebrow: 'LICENSED AC SPECIALISTS', title: 'Expert AC Installation<br>& Repair Services' },
  { eyebrow: '24/7 EMERGENCY RESPONSE', title: 'Cooling Failures Fixed<br>The Same Day' },
  { eyebrow: 'EVERY MAJOR BRAND', title: 'Gas Refill, Service<br>& Maintenance' },
];
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;

// Inject title / eyebrow dynamically inside hero-content
const heroContent = document.querySelector('.hero-content');
heroContent.insertAdjacentHTML('afterbegin', `
  <div class="eyebrow-wrap">
    <span class="section-eye-line" style="width:48px;height:3px;background:#dc2626;display:inline-block"></span>
    <span id="heroEyebrow">${slidesData[0].eyebrow}</span>
  </div>
  <h1 id="heroTitle">${slidesData[0].title}</h1>
`);

function goToSlide(i) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  document.getElementById('heroEyebrow').textContent = slidesData[i].eyebrow;
  document.getElementById('heroTitle').innerHTML = slidesData[i].title;
  current = i;
}
dots.forEach(d => d.addEventListener('click', () => goToSlide(parseInt(d.dataset.index))));
setInterval(() => goToSlide((current + 1) % slides.length), 5200);

// Contact form (opens WhatsApp with details since no backend)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const text = `Hello Muhsin Cooling Center,%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Service:* ${data.service}%0A%0A*Message:*%0A${data.message}`;
  window.open(`https://wa.me/923024706446?text=${text}`, '_blank');
  formMsg.textContent = "Opening WhatsApp… we'll get back to you shortly!";
  formMsg.className = 'form-msg success';
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();