/*
function darkMode() {
    var selectedTheme = 'light';
    if(document.querySelector('input[name="theme"]:checked').value) {
        selectedTheme = document.querySelector('input[name="theme"]:checked').value;
    } else {
        if(window.matchMedia('(prefers-color-scheme: dark)')) {
            console.log("your browser prefers dark mode");
            localStorage.setItem('selectedTheme', 'dark');
            selectedTheme = 'dark';
        }
    }
    var element = document.body;   
    element.classList.toggle("dark");

    if (selectedTheme === 'dark') {
        element.classList.add('dark');
        element.style.transition = "background-color 0.5s, color 0.5s";
        element.style.animation = "darkModeFadeIn 0.5s";
    } else if (selectedTheme === 'light') {
        element.classList.remove('dark');
        element.style.transition = "background-color 0.5s, color 0.5s";
        element.style.animation = "darkModeFadeIn 0.5s reverse";
    }
}
*/