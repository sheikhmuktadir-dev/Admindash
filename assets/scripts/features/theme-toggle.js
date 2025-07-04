export default function initThemeToggle() {
  const themeBtn = document.getElementById("theme");
  const html = document.documentElement;

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
      class="navBar-Mainicon">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>`;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
      class="navBar-Mainicon">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>`;

  // Initial theme setup
  const savedTheme = localStorage.getItem("theme");
  const defaultTheme = savedTheme || html.getAttribute("data-theme") || "dark";

  html.setAttribute("data-theme", defaultTheme);
  themeBtn.innerHTML = defaultTheme === "dark" ? sunIcon : moonIcon;

  // Toggle on click
  themeBtn.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeBtn.innerHTML = newTheme === "dark" ? sunIcon : moonIcon;
  });
}
