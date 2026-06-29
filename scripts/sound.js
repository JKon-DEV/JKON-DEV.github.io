// Requires refactoring and separation of concerns.
// Sound and transition management scripts.

const sounds = {
  open: new Audio('/assets/menu_open.wav'),
  close: new Audio('/assets/menu_close.wav'),
  hover: new Audio('/assets/menu_item_hover.wav'),
  contact: new Audio('/assets/contact_transition.wav'),
  blog: new Audio('/assets/blog_transition.wav'),
  about: new Audio('/assets/about_transition.wav')
};

sounds.open.volume = 0.3;
sounds.close.volume = 0.3;
sounds.hover.volume = 0.15;
sounds.contact.volume = 0.3;
sounds.blog.volume = 0.3;
sounds.about.volume = 0.3;

function playSound(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function fadeInOnLoad() {
  const fade = document.getElementById('page-fade');
  if (!fade) return;
  requestAnimationFrame(() => requestAnimationFrame(() => fade.classList.remove('active')));
}

function fadeNavigate(linkEl, sound) {
  const fade = document.getElementById('page-fade');
  const target = linkEl.href;
  if (!target) return;

  playSound(sound);
  if (fade) fade.classList.add('active');

  setTimeout(() => {
    window.location.href = target;
  }, 700);
}

document.addEventListener('DOMContentLoaded', () => {
  fadeInOnLoad();

  // Click (delegated)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.hotspot');
    if (!a) return;

    const key = a.dataset.sound || 'open';
    const target = new URL(a.href);
    const isSameOriginPage = target.origin === window.location.origin &&
      (target.protocol === 'http:' || target.protocol === 'https:');

    if (!isSameOriginPage) {
      playSound(sounds[key] || sounds.open);
      return;
    }

    e.preventDefault();
    fadeNavigate(a, sounds[key] || sounds.open);
  });

  // Hover (delegated)
  if (!window.matchMedia('(hover: none)').matches) {
    document.addEventListener('mouseenter', (e) => {
      const a = e.target.closest?.('a.hotspot');
      if (!a) return;
      playSound(sounds.hover);
    }, true);
  }

  document.querySelectorAll('.menu-icon').forEach(icon => {
    const description = document.getElementById('menuDescription');
    if (!description) return;

    icon.addEventListener('mouseenter', () => {
      description.textContent = icon.dataset.desc;
      playSound(sounds.hover);
    });
    icon.addEventListener('mouseleave', () => {
      description.textContent = "Select a project";
    });
  });
});

window.addEventListener('pageshow', () => {
  const fade = document.getElementById('page-fade');
  if (fade) fade.classList.remove('active');
});

