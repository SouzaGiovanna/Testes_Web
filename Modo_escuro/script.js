const button = document.getElementsByClassName('js-theme')[0];

const themes = {
    't-dark': 't-light',
    't-light': 't-dark', 
}

if(button){
    button.addEventListener('click', event => {
        event.preventDefault();

        const currentTheme = document.body.dataset.theme;
        document.body.setAttribute('data-theme', themes[currentTheme] || 't-light');
    });
}