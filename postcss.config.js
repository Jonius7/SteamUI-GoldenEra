module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,  // base directory for imports
      path: ['libraryroot'], // extra lookup paths for imports
    }
  }
};