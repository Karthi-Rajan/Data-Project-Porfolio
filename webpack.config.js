const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); // 👈 Added compression plugin

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', // Added contenthash for better caching
        publicPath: "/Data-Project-Porfolio/", // 👈 Ensures correct asset path
        chunkFilename: '[name].[contenthash].js', // Added contenthash for dynamic chunks
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                            publicPath: '/assets',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // Split all chunks (including vendor and async chunks)
            minSize: 20000, // Split chunks larger than 20KB
            maxSize: 250000, // Ensure chunks are not too large
        },
        minimize: true, // Enable minimization in production mode
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true, // Run minification in parallel
            }),
            new CssMinimizerPlugin(), // Minify CSS in production
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            chunks: ['main'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', // Added contenthash for better caching
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/assets', to: 'assets' }, // Copy assets to dist/assets
            ],
        }),
        new CompressionPlugin({
            test: /\.(js|css|html|json|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot|otf|glb|mp4|webp)$/, // Add file types to compress
            algorithm: 'gzip', // Using gzip for compression
            threshold: 10240, // Compress assets larger than 10KB
            minRatio: 0.8, // Compress if the compression ratio is greater than 80%
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
    },
    devtool: 'source-map', // Enable source maps for debugging
    mode: 'production', // Ensure production mode for optimizations
};
