const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, context) => {
        config.plugins.push(new webpack
            .ExternalsPlugin("commonjs", ["leveldown"]));
        return config;
    }
}

module.exports = nextConfig
