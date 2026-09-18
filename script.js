/* SFI SPCMC website */

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

const contacts = (window.SITE_CONFIG && window.SITE_CONFIG.contacts) || {};
const forms = (window.SITE_CONFIG && window.SITE_CONFIG.forms) || {};

function phoneNumbers() {
  const value = contacts.phone;
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function contactHref(type, index = 0) {
  const value = contacts[type];
  if (!value) return '#contact';
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone') {
    const number = phoneNumbers()[index] || phoneNumbers()[0];
    return number ? `tel:${number.replace(/[^+\d]/g, '')}` : '#contact';
  }
  return value;
}

function contactLabel(type) {
  const value = contacts[type];
  if (type === 'instagram' && contacts.instagramLabel) return contacts.instagramLabel;
  if (type === 'facebook' && contacts.facebookLabel) return contacts.facebookLabel;
  if (type === 'email') return value || 'Add email address';
  if (type === 'phone') return phoneNumbers().join(' / ') || 'Add phone number';
  return value || ({
    instagram: 'Add Instagram username',
    facebook: 'Add Facebook page name'
  })[type];
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

// Render each phone number as its own dialable link.
const phoneList = document.querySelector('[data-phone-list]');
if (phoneList) {
  phoneNumbers().forEach((number, index) => {
    const link = document.createElement('a');
    link.className = 'contact-link phone-link';
    link.href = contactHref('phone', index);
    link.textContent = number.replace(/^\+91(?=\d)/, '+91 ');
    phoneList.appendChild(link);
  });
}

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
