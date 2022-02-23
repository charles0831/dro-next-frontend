const path = require("path");

const appConfig = {
  images: {
    domains: [
      "w7.pngwing.com",
      "www.researchgate.net",
      "upload.wikimedia.org",
      "toppng.com",
      "png.pngtree.com",
      "www.pngall.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = appConfig;
