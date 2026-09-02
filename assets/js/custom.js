/**
 * Main JS file for Scriptor behaviours
 */

// Responsive video embeds
let videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));

// Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const applyTheme = function (theme) {
  const isDark = theme === 'dark';
  root.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    const label = themeToggle.querySelector('.theme-toggle__label');

    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  }
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  }, false);
}

// Menu on small screens
let menuToggle = document.querySelectorAll('.menu-toggle');
if (menuToggle) {
  for (let i = 0; i < menuToggle.length; i++) {
    menuToggle[i].addEventListener('click', function (e) {
      document.body.classList.toggle('menu--opened');
      e.preventDefault();
    }, false);
  }
}
