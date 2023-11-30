function darkMode() {
    var selectedTheme = document.querySelector('input[name="theme"]:checked').value;
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