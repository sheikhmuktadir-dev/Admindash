export function highlightActiveLink(url) {
  const allMainLinks = document.querySelectorAll(".sideBar-Link");
  const allSubLinks = document.querySelectorAll(".sideBar-Submenu-Link");

  allMainLinks.forEach((link) => {
    const route = link.dataset.route?.toLowerCase();

    // Reset active class
    link.classList.remove("active");

    // If this is not a submenu item and matches the URL
    if (route && route === url.toLowerCase()) {
      link.classList.add("active");
      closeAllSubmenus(); // Close submenu if going to another tab
    }
  });

  allSubLinks.forEach((link) => {
    const route = link.dataset.route?.toLowerCase();
    link.classList.remove("active-submenu");

    if (route === url.toLowerCase()) {
      link.classList.add("active-submenu");

      // Expand and activate the parent item
      const submenu = link.closest(".sideBar-Submenu");
      const parentItem = submenu.closest(".sideBar-Item");
      submenu.style.display = "block";
      parentItem.classList.add("submenu-open");

      // Highlight the parent menu (like "Pages")
      const parentLink = parentItem.querySelector(".sideBar-Link");
      const arrow = parentItem.querySelector(".sideBar-ArrowIcon");
      parentLink.classList.add("active");
      arrow?.classList.add("sideBar-Arrow-Rotate");
    }
  });
}

function closeAllSubmenus() {
  document.querySelectorAll(".sideBar-Item.submenu-open").forEach((item) => {
    item.classList.remove("submenu-open");
    item
      .querySelector(".sideBar-Submenu")
      ?.style.setProperty("display", "none");
    item
      .querySelector(".sideBar-ArrowIcon")
      ?.classList.remove("sideBar-Arrow-Rotate");
  });
}
