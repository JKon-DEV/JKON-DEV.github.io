document.addEventListener('DOMContentLoaded', () => {
  const slides = [
    '/assets/about_me_1.png',
    '/assets/about_me_2.png',
    '/assets/about_me_3.png',
    '/assets/about_me_4.png'
  ];

  let i = 0;

  const img = document.getElementById('about-slide');
  const fade = document.getElementById('page-fade');
  const clickArea = document.querySelector('.about-content');

  function show() {
    img.src = slides[i];
  }

  function playSound(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
  }

  const nextSound = new Audio('/assets/dialogue_next.wav')
  const dialogueFinishSound = new Audio('/assets/dialogue_done.wav')

  function next() {

    if (i < slides.length - 1) {
      i += 1;
      playSound(nextSound);
      show();
    } else {
      // finished: fade + go home
    playSound(dialogueFinishSound);
      fade?.classList.add('active');
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 600);
    }
  }

  // Click anywhere to advance
  clickArea.addEventListener('click', next);

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      next();
    }
  });

  show();
});
