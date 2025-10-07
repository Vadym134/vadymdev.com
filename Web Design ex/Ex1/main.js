// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // set current year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      // toggle a11y attribute
      if(!expanded) nav.setAttribute('aria-hidden', 'false'); else nav.setAttribute('aria-hidden', 'true');
    });
  }

  // IntersectionObserver: reveal elements
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // if you want reveal only once:
        // io.unobserve(entry.target);
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));

  // Contact form: basic validation and fake submit (replace with real endpoint)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      // Simulate submit: you can swap this with fetch() to your backend or Formspree/Netlify
      try{
        // Example: send to your API
        // await fetch('https://form-handler.example/send', { method:'POST', body: new FormData(form) });

        // simple UX feedback
        status.textContent = 'Отправка...';
        // simulate delay
        setTimeout(() => {
          status.textContent = 'Спасибо! Сообщение отправлено.';
          form.reset();
        }, 700);
      } catch(err){
        status.textContent = 'Ошибка при отправке. Попробуйте позже.';
      }
    });
  }
});
