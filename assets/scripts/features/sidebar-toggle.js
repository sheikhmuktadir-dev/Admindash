export default function initSidebarToggle() {
  const toggleBtn = document.getElementById("sidebarToggle");
  const burgerIcon = document.getElementById("burgerIcon");
  const layout = document.querySelector(".layout");
  const closeBtn = document.querySelector(".sideBarClose-Mobile");

  // Icon SVGs
  const iconOpen = `
    <path d="M15 12H3" />
    <path d="M17 18H3" />
    <path d="M21 6H3" />
  `;
  const iconClose = `
    <path d="M3 12h18" />
    <path d="M3 18h18" />
    <path d="M3 6h18" />
  `;

  let expanded = false;

  // Toggle sidebar via burger button
  if (toggleBtn && burgerIcon) {
    toggleBtn.addEventListener("click", () => {
      expanded = !expanded;
      layout.classList.toggle("sidebar-expanded", expanded);
      burgerIcon.innerHTML = expanded ? iconClose : iconOpen;
    });
  }

  // Close sidebar via "X" button (mobile)
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      expanded = false;
      layout.classList.remove("sidebar-expanded");
      burgerIcon.innerHTML = iconOpen;
    });
  }

  // Optional: Auto-close sidebar on route/page change (mobile only)
  const observer = new MutationObserver(() => {
    if (window.innerWidth <= 991) {
      layout.classList.remove("sidebar-expanded");
      burgerIcon.innerHTML = iconOpen;
      expanded = false;
    }
  });

  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    observer.observe(mainContent, { childList: true });
  }
}
