let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

mix.js('src/js/index.js', 'js')
    .sass('src/styles/vendor/main.scss', 'css')
    .pug('src/views/index.pug', '../../dist').setPublicPath("dist")
    .options({
        postCss: [require("tailwindcss")]
    })
    .webpackConfig({
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/img/', to: '../dist/img/' },
                    { from: 'src/fonts/', to: '../dist/fonts' }
                ],
            }),
            new ImageminWebpWebpackPlugin({
                    config: [{
                        test: /\.(jpe?g|png|gif|svg)$/i,
                        options: {
                            quality: 75,
                            lossless: false
                        }
                    }],
                }
            )
        ],
    })
    .browserSync({
        server: "./dist/",
        port: 4000,
        watch: true,
    });

