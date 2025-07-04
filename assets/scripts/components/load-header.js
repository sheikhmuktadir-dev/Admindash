export default async function loadHeader() {
  try {
    const res = await fetch("/assets/components/header.html");
    const html = await res.text();
    document.getElementById("header").innerHTML = html;
  } catch (err) {
    console.error("Failed to load header:", err);
  }
}
