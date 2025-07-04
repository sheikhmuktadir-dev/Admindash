import Chart from "chart.js/auto";

export default function initGraphs() {
  const getCSSVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  // ============================ Doughnut Chart ============================
  const ctx = document.getElementById("hoverDoughnut")?.getContext("2d");
  let centerText = "UI DESIGN";

  const centerTextPlugin = {
    id: "centerTextPlugin",
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.save();
      ctx.font = "900 22px Montserrat";
      ctx.fillStyle = getCSSVar("--chart-text");
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(centerText, width / 2, height / 2);
      ctx.restore();
    },
  };

  if (ctx) {
    const doughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["UX DESIGN", "UI DESIGN", "CODE"],
        datasets: [
          {
            data: [45, 35, 20],
            backgroundColor: [
              getCSSVar("--color-ux"),
              getCSSVar("--color-ui"),
              getCSSVar("--color-code"),
            ],
            borderColor: getCSSVar("--chart-border"),
            borderWidth: 0,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "65%",
        animation: {
          animateRotate: true,
          animateScale: true,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: getCSSVar("--chart-tooltip-bg"),
            titleColor: getCSSVar("--chart-tooltip-text"),
            bodyColor: getCSSVar("--chart-tooltip-text"),
          },
        },
        onHover: (event, elements) => {
          if (elements.length) {
            const label = doughnutChart.data.labels[elements[0].index];
            centerText = label;
            doughnutChart.update();
          }
        },
      },
      plugins: [centerTextPlugin],
    });

    document.addEventListener("theme-changed", () => {
      const dataset = doughnutChart.data.datasets[0];
      dataset.backgroundColor = [
        getCSSVar("--color-ux"),
        getCSSVar("--color-ui"),
        getCSSVar("--color-code"),
      ];
      dataset.borderColor = getCSSVar("--chart-border");

      doughnutChart.options.plugins.tooltip.backgroundColor =
        getCSSVar("--chart-tooltip-bg");
      doughnutChart.options.plugins.tooltip.titleColor = getCSSVar(
        "--chart-tooltip-text"
      );
      doughnutChart.options.plugins.tooltip.bodyColor = getCSSVar(
        "--chart-tooltip-text"
      );

      doughnutChart.update();
    });
  }

  // ============================ Wave Chart ============================
  const waveCtx = document.getElementById("waveStackedChart")?.getContext("2d");
  if (waveCtx) {
    const waveChart = new Chart(waveCtx, {
      type: "line",
      data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
        datasets: [
          {
            label: "Design",
            data: [500, 1000, 800, 600, 1200, 900, 1000],
            fill: true,
            borderColor: getCSSVar("--theme-design-border"),
            backgroundColor: getCSSVar("--theme-design-bg"),
            tension: 0.4,
            pointRadius: 4,
          },
          {
            label: "Development",
            data: [400, 700, 2000, 500, 1100, 800, 950],
            fill: true,
            borderColor: getCSSVar("--theme-dev-border"),
            backgroundColor: getCSSVar("--theme-dev-bg"),
            tension: 0.4,
            pointRadius: 4,
          },
          {
            label: "Marketing",
            data: [500, 600, 650, 800, 950, 1000, 850],
            fill: true,
            borderColor: getCSSVar("--theme-marketing-border"),
            backgroundColor: getCSSVar("--theme-marketing-bg"),
            tension: 0.4,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: getCSSVar("--theme-tooltip-bg"),
            bodyColor: getCSSVar("--theme-tooltip-text"),
            padding: 10,
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            ticks: {
              color: getCSSVar("--theme-axis-x"),
              font: { weight: "bold" },
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { color: getCSSVar("--theme-axis-y") },
            grid: {
              color: getCSSVar("--theme-grid-color"),
            },
          },
        },
      },
    });

    document.addEventListener("theme-changed", () => {
      waveChart.data.datasets.forEach((dataset, index) => {
        const keys = ["design", "dev", "marketing"];
        dataset.borderColor = getCSSVar(`--theme-${keys[index]}-border`);
        dataset.backgroundColor = getCSSVar(`--theme-${keys[index]}-bg`);
      });

      waveChart.options.plugins.tooltip.backgroundColor =
        getCSSVar("--theme-tooltip-bg");
      waveChart.options.plugins.tooltip.bodyColor = getCSSVar(
        "--theme-tooltip-text"
      );
      waveChart.options.scales.x.ticks.color = getCSSVar("--theme-axis-x");
      waveChart.options.scales.y.ticks.color = getCSSVar("--theme-axis-y");
      waveChart.options.scales.y.grid.color = getCSSVar("--theme-grid-color");

      waveChart.update();
    });
  }

  // ============================ Bar Chart ============================
  const barCtx = document.getElementById("barChart")?.getContext("2d");
  if (barCtx) {
    const barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["UX DESIGN", "UI DESIGN", "CODE"],
        datasets: [
          {
            label: "Skill Score",
            data: [45, 35, 20],
            backgroundColor: [
              getCSSVar("--bar-color-ux"),
              getCSSVar("--bar-color-ui"),
              getCSSVar("--bar-color-code"),
            ],
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: getCSSVar("--bar-tooltip-bg"),
            titleColor: getCSSVar("--bar-tooltip-text"),
            bodyColor: getCSSVar("--bar-tooltip-text"),
            padding: 10,
          },
        },
        scales: {
          x: {
            ticks: {
              color: getCSSVar("--bar-axis-text"),
              font: { weight: "bold" },
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { color: getCSSVar("--bar-axis-text") },
            grid: {
              color: getCSSVar("--bar-grid"),
            },
          },
        },
      },
    });

    document.addEventListener("theme-changed", () => {
      barChart.data.datasets[0].backgroundColor = [
        getCSSVar("--bar-color-ux"),
        getCSSVar("--bar-color-ui"),
        getCSSVar("--bar-color-code"),
      ];
      barChart.options.plugins.tooltip.backgroundColor =
        getCSSVar("--bar-tooltip-bg");
      barChart.options.plugins.tooltip.titleColor =
        getCSSVar("--bar-tooltip-text");
      barChart.options.plugins.tooltip.bodyColor =
        getCSSVar("--bar-tooltip-text");
      barChart.options.scales.x.ticks.color = getCSSVar("--bar-axis-text");
      barChart.options.scales.y.ticks.color = getCSSVar("--bar-axis-text");
      barChart.options.scales.y.grid.color = getCSSVar("--bar-grid");

      barChart.update();
    });
  }

  // ============================ Scatter Chart ============================
  const scatterCtx = document.getElementById("scatterChart")?.getContext("2d");
  if (scatterCtx) {
    new Chart(scatterCtx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "UX DESIGN",
            data: [
              { x: 5, y: 7 },
              { x: 10, y: 12 },
              { x: 15, y: 9 },
            ],
            backgroundColor: getCSSVar("--scatter-color-ux"),
            pointRadius: 6,
          },
          {
            label: "UI DESIGN",
            data: [
              { x: 7, y: 4 },
              { x: 12, y: 10 },
              { x: 18, y: 8 },
            ],
            backgroundColor: getCSSVar("--scatter-color-ui"),
            pointRadius: 6,
          },
          {
            label: "CODE",
            data: [
              { x: 4, y: 5 },
              { x: 9, y: 3 },
              { x: 13, y: 7 },
            ],
            backgroundColor: getCSSVar("--scatter-color-code"),
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: {
            backgroundColor: getCSSVar("--scatter-tooltip-bg"),
            titleColor: getCSSVar("--scatter-tooltip-text"),
            bodyColor: getCSSVar("--scatter-tooltip-text"),
            padding: 10,
          },
        },
        scales: {
          x: {
            title: { display: true, text: "X Value" },
            ticks: { color: getCSSVar("--scatter-axis-text") },
            grid: { color: getCSSVar("--scatter-grid") },
          },
          y: {
            title: { display: true, text: "Y Value" },
            ticks: { color: getCSSVar("--scatter-axis-text") },
            grid: { color: getCSSVar("--scatter-grid") },
          },
        },
      },
    });
  }

  // ============================ Chat Filter Tabs ============================
  const buttons = document.querySelectorAll(
    ".chatOnline-LargeBox-FIlter-Buttons .filter-btn"
  );
  const items = document.querySelectorAll(".chatOnline-LargeBox-ItemInner");

  if (buttons.length && items.length) {
    const defaultFilter = buttons[0].getAttribute(
      "chatOnline-LargeBox-Data-Filter"
    );

    function showFilteredItems(filter) {
      items.forEach((item) => {
        item.style.display = item.classList.contains(filter) ? "block" : "none";
      });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("chatOnline-LargeBox-Data-Filter");
        buttons.forEach((btn) =>
          btn.classList.remove("chatOnline-LargeBox-Active")
        );
        button.classList.add("chatOnline-LargeBox-Active");
        showFilteredItems(filter);
      });
    });

    showFilteredItems(defaultFilter);
  }

  // ============================ CardGraph Dropdown Toggle ============================
  const toggleAreas = document.querySelectorAll(".CardGraph-ClickArea");

  toggleAreas.forEach((area) => {
    const icon = area.querySelector(".toggle-menu-icon");
    const menu = area.querySelector(".dashGraph-HiddenPop");

    if (!icon || !menu) return;

    icon.setAttribute("tabindex", "0");
    icon.setAttribute("role", "button");
    icon.setAttribute("aria-haspopup", "true");
    icon.setAttribute("aria-expanded", "false");

    function toggleMenu(e) {
      e.stopPropagation();

      document
        .querySelectorAll(".dashGraph-HiddenPop.dashGraph-active")
        .forEach((openMenu) => {
          if (openMenu !== menu) {
            openMenu.classList.remove("dashGraph-active");
            openMenu.previousElementSibling?.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        });

      const isOpen = menu.classList.contains("dashGraph-active");
      menu.classList.toggle("dashGraph-active");
      icon.setAttribute("aria-expanded", String(!isOpen));
    }

    icon.addEventListener("click", toggleMenu);
    icon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu(e);
      } else if (e.key === "Escape") {
        menu.classList.remove("dashGraph-active");
        icon.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dashGraph-HiddenPop.dashGraph-active")
      .forEach((menu) => {
        menu.classList.remove("dashGraph-active");
        menu.previousElementSibling?.setAttribute("aria-expanded", "false");
      });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".dashGraph-HiddenPop.dashGraph-active")
        .forEach((menu) => {
          menu.classList.remove("dashGraph-active");
          menu.previousElementSibling?.setAttribute("aria-expanded", "false");
        });
    }
  });
}
