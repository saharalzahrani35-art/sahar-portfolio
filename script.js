const languageButton = document.querySelector('.language-switch');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
const translatable = document.querySelectorAll('[data-ar][data-en]');

const setLanguage = (language) => {
  const isArabic = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', !isArabic);
  languageButton.textContent = isArabic ? 'EN' : 'AR';
  languageButton.setAttribute('aria-label', isArabic ? 'Switch to English' : 'التبديل إلى العربية');
  translatable.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  document.title = isArabic
    ? 'سحر الزهراني — الاستراتيجية والتصميم'
    : 'Sahar Alzahrani — Strategy & Design';
  localStorage.setItem('sahar-portfolio-language', language);
};

languageButton.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
});

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
setLanguage(localStorage.getItem('sahar-portfolio-language') || 'ar');
