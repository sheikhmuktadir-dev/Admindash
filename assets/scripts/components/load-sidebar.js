export default async function loadSidebar() {
  try {
    const res = await fetch("/assets/components/sidebar.html");
    const html = await res.text();
    document.getElementById("sidebar").innerHTML = html;
  } catch (err) {
    console.error("Failed to load sidebar:", err);
  }
}
