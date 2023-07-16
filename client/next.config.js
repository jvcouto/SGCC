/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "pt-BR",
  }

}

module.exports = nextConfig
