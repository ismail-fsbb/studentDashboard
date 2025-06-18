// theme.js
export function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
  
    html.classList.remove(currentTheme);
    html.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  }
  
  export function loadTheme() {
    const saved = localStorage.getItem("theme");
    const html = document.documentElement;
    if (saved) {
      html.classList.add(saved);
    } else {
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }
  