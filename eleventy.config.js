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
  eleventyConfig.addFilter("tel", (s) => "tel:" + String(s || "").replace(/[^0-9+]/g, ""));

  // Permet d'écrire du markdown dans les champs texte (Pages CMS)
  let md;
  eleventyConfig.amendLibrary("md", (lib) => { md = lib; });
  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("mdInline", (s) => (s ? md.renderInline(String(s)) : ""));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
