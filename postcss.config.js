const colors = require('./src/styles/colors');

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-for'),
    require('postcss-import'),
    require('postcss-simple-vars')({ variables: colors }),
  ],
};
