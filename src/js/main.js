// Menu mobile
const burger = document.querySelector(".burger");
const nav = document.getElementById("menu");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const ouvert = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!ouvert));
    burger.setAttribute("aria-label", ouvert ? "Ouvrir le menu" : "Fermer le menu");
    nav.classList.toggle("ouvert", !ouvert);
  });
}

// Formulaire de contact : envoi via Web3Forms (les messages arrivent par mail)
const form = document.querySelector("form.formulaire");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const note = form.querySelector(".formulaire__note");
    const bouton = form.querySelector("button[type=submit]");
    bouton.disabled = true;
    try {
      const r = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const res = await r.json();
      if (!r.ok || !res.success) throw new Error(res.message || r.status);
      window.location.href = form.dataset.merci;
    } catch (err) {
      note.hidden = false;
      note.textContent = "Le message n'a pas pu être envoyé. Vous pouvez nous écrire directement à " + ((document.querySelector('a[href^="mailto:"]')?.getAttribute("href") || "").slice(7) || "l'association") + ".";
      bouton.disabled = false;
    }
  });
}
