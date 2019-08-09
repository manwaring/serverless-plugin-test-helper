const common = [
  '*.feature',
  '--require *e2e.js',
  '--format progress-bar',
  '--format node_modules/cucumber-pretty'
].join(' ');

module.exports = {
  default: common
};
