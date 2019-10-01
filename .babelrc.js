module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [['@babel/preset-env', { targets: { node: 10 } }], '@babel/preset-typescript']
};
