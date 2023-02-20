//boton de cambiar tema
const theme = document.getElementById("btn-theme");
theme.addEventListener("click", () => {
    const root = document.querySelector(":root");
    
    if(theme.getAttribute("darkMode") == "false"){
        //darkmode (default)
        theme.setAttribute("darkMode", "true");
        
        root.style.setProperty("--font-color", "#eee");
        root.style.setProperty("--primary", "#301E67");
        root.style.setProperty("--primaryDark", "#03001C");
        root.style.setProperty("--brighter", "#B6EADA");
        root.style.setProperty("--exit", "#5B8FB9");
        document.getElementById("dark-mode-img").style.filter = "invert(0)";
        document.getElementById("dark-mode-img").style.transform = "scaleX(1)";
    }else {
        //lightmode
        theme.setAttribute("darkMode", "false");
        
        root.style.setProperty("--font-color", "#222");
        root.style.setProperty("--primary", "#FFD4B2");
        root.style.setProperty("--primaryDark", "#86C8BC");
        root.style.setProperty("--brighter", "#FFF6BD");
        root.style.setProperty("--exit", "#FFD4B2");
        document.getElementById("dark-mode-img").style.filter = "invert(1)";
        document.getElementById("dark-mode-img").style.transform = "scaleX(-1)";
    }
    
});