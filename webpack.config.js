
const path = require('path');

module.exports = [
    {
        entry: {
            index: "./src/main/js/bundles/driver/index.js"
        },
        mode: 'production',
        output: {
            path: path.resolve(__dirname, 'target/webapp/js/bundles/driver'),
            filename: "index.js",
            libraryTarget: 'amd'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                },
                {
                    test: /\.css$/i,
                    include: /node_modules/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        }
    }
]

