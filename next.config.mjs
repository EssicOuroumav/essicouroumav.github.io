// Export statique pour GitHub Pages. NEXT_PUBLIC_BASE_PATH sert seulement si le site est publié dans un sous-dossier.
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
