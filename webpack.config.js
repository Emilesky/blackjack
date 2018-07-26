module.exports = {
    entry: ["./utils","./app.js"],
    output: {
        filename: "./dist/bundle.js",

    },
    watch: true,
    module: {
        rules: [
            {
                            test: /\.es6$/,
                            exclude: /node-modules/,
                            loader: "babel-loader"
        }
        ]
    },
    resolve: {
        extensions:['.js','.es6' ]
    }
}