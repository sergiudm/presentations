import type { NextConfig } from 'next';

// Hosted at https://sergiudm.github.io/presentations/gpp3/.
// The deck is a single route with hash navigation, so only asset URLs need the
// subpath prefix; the route itself stays at "/" and remains statically exportable.
// scripts/build-site.mjs sets PAGES_ASSET_PREFIX and flattens the prefixed
// _next directory back onto the build root after the export.
const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: process.env.PAGES_ASSET_PREFIX ?? '/presentations/gpp3',
};

export default nextConfig;
