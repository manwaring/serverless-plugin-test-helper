const common = [
  '*.feature',
  '--require *cucumber.js',
  '--format progress-bar',
  '--format node_modules/cucumber-pretty'
].join(' ');

module.exports = {
  default: common
};
