// Export statique pour GitHub Pages, servi dans le sous-dossier du dépôt (NEXT_PUBLIC_BASE_PATH=/Portfolio).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
