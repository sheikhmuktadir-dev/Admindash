export default function initSubmenuToggle() {
  const menuItems = document.querySelectorAll(".sideBar-Item");

  menuItems.forEach((item) => {
    const submenu = item.querySelector(".sideBar-Submenu");
    const arrow = item.querySelector(".sideBar-ArrowIcon");
    const toggleLink = item.querySelector(".sideBar-Link");

    if (submenu && toggleLink) {
      toggleLink.addEventListener("click", (e) => {
        e.preventDefault();

        const isOpen = item.classList.contains("submenu-open");

        // Close all other submenus
        menuItems.forEach((el) => {
          el.classList.remove("submenu-open");
          el.querySelector(".sideBar-Submenu")?.style.setProperty(
            "display",
            "none"
          );
          el.querySelector(".sideBar-ArrowIcon")?.classList.remove(
            "sideBar-Arrow-Rotate"
          );
        });

        // Toggle current submenu
        if (!isOpen) {
          item.classList.add("submenu-open");
          submenu.style.display = "block";
          arrow?.classList.add("sideBar-Arrow-Rotate");
        }
      });
    }
  });
}
