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

// Formulaire : envoi via Netlify Forms (uniquement une fois le site en ligne sur Netlify)
const form = document.querySelector("form[data-netlify]");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const note = form.querySelector(".formulaire__note");
    const bouton = form.querySelector("button[type=submit]");
    bouton.disabled = true;
    try {
      const r = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!r.ok) throw new Error(r.status);
      window.location.href = form.getAttribute("action");
    } catch (err) {
      note.hidden = false;
      note.textContent = "Le message n'a pas pu être envoyé (le formulaire fonctionnera une fois le site en ligne). Vous pouvez nous écrire directement à " + ((document.querySelector('a[href^="mailto:"]')?.getAttribute("href") || "").slice(7) || "l'association") + ".";
      bouton.disabled = false;
    }
  });
}
