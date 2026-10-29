export const THEME_KEY = 'm1p:theme';

// Roda inline no <head>, antes da pintura, para o tema salvo não piscar.
export const THEME_INIT_SCRIPT = `try{var t=JSON.parse(localStorage.getItem('${THEME_KEY}'));if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;
