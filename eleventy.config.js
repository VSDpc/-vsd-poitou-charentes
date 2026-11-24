export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  eleventyConfig.addGlobalData("annee", new Date().getFullYear());

  // Actualités, de la plus récente à la plus ancienne
  eleventyConfig.addCollection("actualites", (api) =>
    api
      .getFilteredByGlob("src/actualites/*.md")
      .filter((p) => !p.data.brouillon)
      .sort((a, b) => b.date - a.date)
  );

  // Pages ajoutées depuis le back-office et cochées « Afficher dans le menu »
  eleventyConfig.addCollection("pagesMenu", (api) =>
    api
      .getFilteredByGlob("src/pages/*.md")
      .filter((p) => p.data.menu)
      .sort((a, b) => (a.data.ordre || 50) - (b.data.ordre || 50))
  );

  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  eleventyConfig.addFilter("dateFr", (d) => {
    const x = new Date(d);
    if (isNaN(x)) return "";
    return `${x.getUTCDate()} ${mois[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("dateIso", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  // Données structurées (schema.org) lues par Google
  const ld = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
  const tel = (s) => "+33" + String(s || "").replace(/[^0-9]/g, "").replace(/^0/, "");
  eleventyConfig.addFilter("ldAccueil", (site, url) => ld({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: site.nom, alternateName: ["Vivre Son Deuil PC", "VSD Poitou-Charentes"], url: url + "/" },
      { "@type": "NGO", name: site.nom, url: url + "/", logo: url + "/media/logo-vsdpc.jpg", description: site.description,
        email: site.email, telephone: tel(site.telephone),
        address: { "@type": "PostalAddress", streetAddress: "67, rue des Groges", postalCode: "86280", addressLocality: "Saint-Benoît", addressCountry: "FR" },
        parentOrganization: { "@type": "Organization", name: "Fédération Européenne Vivre Son Deuil", url: site.federation_url },
        sameAs: [site.facebook, site.linkedin].filter(Boolean) }
    ]
  }));
  eleventyConfig.addFilter("ldArticle", (site, url, title, desc, img, date, pageUrl) => ld({
    "@context": "https://schema.org", "@type": "Article", headline: title, description: desc,
    image: [url + img], datePublished: new Date(date).toISOString().slice(0, 10), mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: site.nom, url: url + "/" },
    publisher: { "@type": "Organization", name: site.nom, logo: { "@type": "ImageObject", url: url + "/media/logo-vsdpc.jpg" } }
  }));
  // Accepte le jeton seul ou le code complet collé depuis Cloudflare
  eleventyConfig.addFilter("cfToken", (s) => { const v = String(s || ""); const m = v.match(/"token"\s*:\s*"([a-zA-Z0-9]+)"/) || v.trim().match(/^([a-zA-Z0-9]+)$/); return m ? m[1] : ""; });
  eleventyConfig.addFilter("tel", (s) => "tel:" + String(s || "").replace(/[^0-9+]/g, ""));

  // Permet d'écrire du markdown dans les champs texte (Pages CMS)
  let md;
  eleventyConfig.amendLibrary("md", (lib) => {
    md = lib;
    // Dans les textes du back-office : un lien seul sur sa ligne devient un bouton
    const render = lib.render.bind(lib);
    lib.core.ruler.push("ids_titres", (state) => { state.tokens.forEach((t, i) => { if (t.type === "heading_open" && !t.attrGet("id")) { const txt = state.tokens[i+1].content; t.attrSet("id", txt.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")); } }); });
      lib.render = (src, env) =>
      render(src, env).replace(/<p>\s*<a href="([^"]+)">([^<]+)<\/a>\s*<\/p>/g, '<p><a class="btn" href="$1">$2</a></p>');
  });
  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("mdInline", (s) => (s ? md.renderInline(String(s)) : ""));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
