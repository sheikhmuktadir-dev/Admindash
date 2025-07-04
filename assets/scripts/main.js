import loadHeader from "./components/load-header.js";
import loadSidebar from "./components/load-sidebar.js";
import initSidebarToggle from "./features/sidebar-toggle.js";
import initSubmenuToggle from "./features/submenu-toggle.js";
import initThemeToggle from "./features/theme-toggle.js";
import dashboardPageScript from "./pages/dashboard.js";

import { highlightActiveLink } from "./features/activemenu-toggle.js";

// Page-specific JS

// Route definitions with optional JS
const routes = {
  "/pages/dashboard.html": { js: dashboardPageScript },
  "/pages/chat.html": { js: null },
  "/pages/calendar.html": { js: null },
  "/pages/setting.html": { js: null },
  "/pages/innerpages/support.html": { js: null },
  "/pages/innerpages/faq.html": { js: null },
};

const defaultPage = "/pages/dashboard.html";
const notFoundPage = "/pages/404.html";

// Load content into main area
async function loadPage(url, pushState = true) {
  const lowerUrl = url.toLowerCase();
  const isValidRoute = routes.hasOwnProperty(lowerUrl);
  const finalUrl = isValidRoute ? lowerUrl : notFoundPage;

  try {
    const res = await fetch(finalUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    document.getElementById("main-content").innerHTML = html;

    if (isValidRoute) {
      const page = routes[lowerUrl];
      if (page?.js && typeof page.js === "function") {
        page.js();
      }
      highlightActiveLink(lowerUrl);
    } else {
      highlightActiveLink(""); // remove all actives
    }

    if (pushState) {
      window.history.pushState({}, "", isValidRoute ? lowerUrl : "/404");
    }
  } catch (err) {
    console.error("Page load error:", err);
    document.getElementById("main-content").innerHTML =
      "<p>Error loading page</p>";
  }
}

// Handle SPA link clicks
function setupLinkInterception() {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-route]");
    if (!link) return;

    const url = link.dataset.route;
    if (url) {
      e.preventDefault();
      loadPage(url);
    }
  });
}

// Initial load
async function initApp() {
  await loadHeader();
  await loadSidebar();
  initSidebarToggle();
  setupLinkInterception();
  initSubmenuToggle();
  initThemeToggle();
  let path = window.location.pathname.toLowerCase();

  // ✅ Redirect "/" to default page
  if (path === "/") {
    path = defaultPage;
    window.history.replaceState({}, "", path);
  }

  loadPage(path, false);
}

// Handle browser back/forward
window.addEventListener("popstate", () => {
  const path = window.location.pathname.toLowerCase();
  loadPage(path, false);
});

// Start app
initApp();
