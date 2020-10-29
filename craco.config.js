const sassResourcesLoader = require("craco-sass-resources-loader");
const imageOptimizer = require("craco-image-optimizer-plugin");
const scopedCss = require("craco-plugin-scoped-css");

module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: "src/stylings/neptuna.scss",
      },
    },
    {
      plugin: scopedCss,
    },
    {
      plugin: imageOptimizer,
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65,
        },
        optipng: {
          enabled: true,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
      },
    },
  ],
};
