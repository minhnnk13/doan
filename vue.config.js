module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/pages/account/main.js',
      // the source template
      template: 'public/index.html',
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },

    app: {
      // entry for the page
      entry: 'src/pages/app/main.js',
      // the source template
      template: 'public/index.html',
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'App',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'app']
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @use "sass:map";
            @use "sass:math";
            @import '@/assets/scss/common/variables.scss';
            @import '@/assets/scss/mixins/mixins.scss';
        `
      }
    }
  }
}
