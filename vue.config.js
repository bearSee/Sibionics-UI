const path = require('path');
const merge = require('webpack-merge');
const buildConfig = require('./build.config');
const Components = require('./components.json');

module.exports = {
  pages: {
    index: {
      entry: './src/index.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  publicPath: './',
  outputDir: path.resolve(process.cwd(), process.env.NODE_ENV === 'release' ? './dist' : './lib'),
  chainWebpack: (config) => {
    config.plugins.delete('copy');
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.plugins.delete('hmr');
    config.optimization.delete('splitChunks');
    // 打包后的图片文件放到服务器image文件夹下
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => merge(options, {
        limit: 50 * 1024,
        fallback: {
          loader: 'file-loader',
          options: {
            name: '/image/sibionics-ui/[name].[ext]',
          },
        },
      }));
    config.module
      .rule('js')
      .include
      .add('/packages')
      .add(process.cwd())
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => options);
  },
  configureWebpack: (conf) => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'release') {
      conf = {
        entry: {
          index: 'examples/main.js',
        },
        resolve: {
          extensions: ['.js', '.vue', '.json', '.scss'],
          alias: buildConfig.alias,
          modules: ['node_modules'],
        },
      };
    // } else if (process.env.NODE_ENV === 'production') {
    } else {
      const buildComponent = !!conf.entry.index;
      conf = {
        entry: buildComponent ? Components : conf.entry,
        output: {
          filename: '[name].js',
          chunkFilename: '[id].js',
          libraryExport: 'default',
          library: 'SIBIONICS',
          libraryTarget: 'umd',
          // libraryTarget: buildComponent ? 'commonjs2' : conf.output.libraryTarget,
        },
        resolve: {
          extensions: ['.js', '.vue', '.json'],
          alias: buildConfig.alias,
          modules: ['node_modules'],
        },
        externals: buildComponent ? buildConfig.externals : conf.externals,
        optimization: {
          minimize: !buildComponent,
        },
      };
    }
    return conf;
  },
  productionSourceMap: false,
  css: {
    extract: true,
    // loaderOptions
  },
  lintOnSave: true,
  devServer: {
      port: 8888,
      hot: true,
  },
};
