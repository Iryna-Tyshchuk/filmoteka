import localStorage from './localstorage';

const THEME_KEY = 'currentTheme';
const DARK_THEME = 'theme-dark';
const LIGHT_THEME = 'theme-light';

const checkboxEl = document.querySelector('#checkbox');
checkboxEl.addEventListener('change', onCheckboxChange);

function onCheckboxChange() {
  const selectedTheme = checkboxEl.checked ? DARK_THEME : LIGHT_THEME;
  document.body.className = selectedTheme;
  localStorage.save(THEME_KEY, selectedTheme);
}

function getSelectedTheme() {
  const savedTheme = localStorage.load(THEME_KEY);
  if (savedTheme === DARK_THEME) {
    document.body.className = savedTheme;
    checkboxEl.checked = true;
  }
}

getSelectedTheme();