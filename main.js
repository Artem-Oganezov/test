const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile__menu');
const closeBtn = document.querySelector('.mobile-menu-close');
const backdrop = document.querySelector('.backdrop');
const modalCloseBtn = document.querySelector('.modal-close');

// Мобильное меню
burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('is-open');
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
});

mobileMenu.addEventListener('click', e => {
  if (e.target.classList.contains('mobile__link') || e.target === mobileMenu) {
    mobileMenu.classList.remove('is-open');
  }
});

// Попап (делегирование)
document.addEventListener('click', e => {
  if (e.target.classList.contains('open-popup')) {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  if (e.target === modalCloseBtn) {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});

// Валидация формы
function validateForm(form) {
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea')
    ? form.querySelector('textarea').value.trim()
    : 'ok';
  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    (form.querySelector('textarea') && !message)
  ) {
    alert('Будь ласка, введіть коректні дані!');
    return false;
  }
  return true;
}

// Обработка всех форм через делегирование
document.addEventListener('submit', e => {
  const form = e.target;
  if (form.tagName === 'FORM') {
    e.preventDefault();
    if (validateForm(form)) {
      const params = new URLSearchParams(new FormData(form)).toString();
      window.location.href = `${window.location.pathname}?${params}`;
    }
  }
});
