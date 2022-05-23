const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const Components = require('./components.json');

const utilsList = fs.readdirSync(path.resolve(__dirname, './src/utils'));
const filtersList = fs.readdirSync(path.resolve(__dirname, './src/filters'));

let externals = {};

Object.keys(Components).forEach((key) => {
  externals[`sibionics-ui/packages/${key}`] = `sibionics-ui/lib/${key}`;
});

utilsList.forEach((file) => {
  file = path.basename(file, '.js');
  externals[`sibionics-ui/src/utils/${file}`] = `sibionics-ui/lib/utils/${file}`;
});

filtersList.forEach((file) => {
  file = path.basename(file, '.js');
  externals[`sibionics-ui/src/filters/${file}`] = `sibionics-ui/lib/filters/${file}`;
});

externals = [{ vue: 'vue', ...externals }, nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, './src'),
  packages: path.resolve(__dirname, './packages'),
  examples: path.resolve(__dirname, './examples'),
  'sibionics-ui': path.resolve(__dirname, './'),
};
