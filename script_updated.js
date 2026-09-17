const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const contacts = (window.SITE_CONFIG && SITE_CONFIG.contacts) || {};
const forms = (window.SITE_CONFIG && SITE_CONFIG.forms) || {};

function contactHref(type) {
  const value = contacts[type];
  if (!value) return '#contact';
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone1' || type === 'phone2') return `tel:${value.replace(/[^+\d]/g, '')}`;
  return value;
}

function contactLabel(type) {
  const value = contacts[type];
  if (value) return value;
  return ({
    instagram: 'Add Instagram link',
    facebook: 'Add Facebook link',
    email: 'Add email address',
    phone1: 'Add phone number',
    phone2: 'Add phone number'
  })[type] || '';
}

document.querySelectorAll('[data-contact]').forEach(el => {
  const type = el.dataset.contact;
  el.href = contactHref(type);
  if (el.classList.contains('contact-link')) el.textContent = contactLabel(type);
  if (contacts[type] && (type === 'instagram' || type === 'facebook')) {
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  }
});

// Gallery lightbox
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = '';
};

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (!lightboxImage || !lightboxCaption) return;
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector('img').alt;
    lightboxCaption.textContent = item.querySelector('span').textContent;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Formspree configuration and safe client-side setup.
function setupExternalForm(formId, formKey) {
  const form = document.getElementById(formId);
  if (!form) return;

  const status = form.querySelector('.form-status');
  const button = form.querySelector('.form-submit');
  const endpointId = forms[formKey];

  if (!endpointId) {
    if (status) status.textContent = 'Form is not connected yet. The site owner needs to add the Formspree form ID in config.js.';
    if (button) button.type = 'button';
    button?.addEventListener('click', () => {
      if (status) status.textContent = 'Please connect this form in config.js before accepting submissions.';
    });
    return;
  }

  form.action = `https://formspree.io/f/${endpointId}`;
  form.addEventListener('submit', () => {
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
  });
}

setupExternalForm('contact-form', 'contact');
setupExternalForm('join-form', 'join');
