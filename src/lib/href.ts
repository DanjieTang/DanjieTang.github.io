/**
 * Relative paths like "files/cv.pdf" point into `public/`. Prefix them with the
 * deploy base so they still work when the site is served from a subpath.
 */
export const resolveHref = (href: string) =>
  /^([a-z][a-z\d+.-]*:|#|\/)/i.test(href) ? href : import.meta.env.BASE_URL + href
