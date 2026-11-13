export default {
  layout: "actualite.njk",
  permalink: (data) => (data.brouillon ? false : `/actualites/${data.page.fileSlug}/`),
};
