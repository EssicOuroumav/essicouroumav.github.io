// Export statique pour GitHub Pages (site utilisateur, servi à la racine : pas de basePath).
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
