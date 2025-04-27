export default async function sitemap() {
  const routes = ['', '/board', '/chat', '/message', '/post', '/profile', '/write'].map(
    (route) => ({
      url: `https://www.kcanberra.com${route}`,
      lastModified: new Date().toISOString(),
    }),
  )

  return routes
}
