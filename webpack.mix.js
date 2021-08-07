let mix = require("laravel-mix");
mix.pug = require("laravel-mix-pug");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const path = require("path");
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

Config.svgSprite = {
    loaderOptions: {
        extract: true
    },
    pluginOptions: {
        plainSprite: true
    }
};

mix.alias({
    "%modules%": path.join(__dirname, "src/blocks/modules"),
    "%components%": path.join(__dirname, "src/blocks/components")
})
    .js("src/js/index.js", "js")
    .extract()
    .sass("src/styles/vendor/main.scss", "css/main.css")
    .options({
        postCss: [require("css-mqpacker"), require("tailwindcss")]
    })
    .pug("src/views/index.pug", "../../dist")
    .setPublicPath("dist")
    .webpackConfig({
            plugins: [
                new CopyWebpackPlugin({
                    patterns: [
                        {from: "src/img/", to: "../dist/img/"},
                        {from: "src/fonts/", to: "../dist/fonts"}
                    ],
                }),
                new ImageminWebpWebpackPlugin({
                    config: [{
                        test: /\.(jpe?g|png|gif)$/i,
                        options: {
                            quality: 95,
                            lossless: false
                        }
                    }],
                }),
                new SVGSpritemapPlugin('src/img/svg/*.svg', {
                    output: {
                        filename: 'img/sprites/sprite.svg',
                        svgo: true,
                        svg4everybody: true,
                    },
                    sprite: {
                        prefix: "",
                    }
                })
            ],
        },
    )
    .browserSync({
        server: "./dist/",
        port: 4000,
        watch: true,
    });

