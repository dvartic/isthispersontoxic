module.exports = {
    siteUrl: process.env.BASE_PATH || "https://edepo-web.vercel.app",
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: false,
    exclude: ["/report", "/report/*"],
    // ...other options
};
