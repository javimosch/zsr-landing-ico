const path = require('path');

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'zeshopr - Social E-Commerce',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: ''
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico?v2'
    },{
      rel:'stylesheet',
      href:'https://use.fontawesome.com/releases/v5.0.8/css/all.css'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  modules: [
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
    '@nuxtjs/font-awesome',
    ['nuxt-sass-resources-loader', {
        resources: path.join(process.cwd(), 'assets/scss/main.scss')
    }],
  ],
  env: {
    loginSalt: '$2a$10$67Bn8fXfK0peYFBhAKCctequ/QSkwtX4DWE5UmG0DQOieGdGysR8S',
    apiUrl: process.env.API_URL || 'http://localhost:8080',
    loginEmail: process.env.NODE_ENV === 'production' ? '' : 'pierre@diagnostical.fr',
    loginPwd: process.env.NODE_ENV === 'production' ? '' : '041281aaa'
  },
  plugins: [
  {src: '@/plugins/vue-disable-autocomplete'},
  {src: '@/plugins/vuejs-noty', ssr: false},
  {src: '@/plugins/vuex-router-sync.js', ssr: false},
  {src: '@/plugins/vue-cookie', ssr: false},
  { src: '@/plugins/codemirror', ssr: false }
  ],
  css: [
    'vuejs-noty/dist/vuejs-noty.css',
    // lib css
    'codemirror/lib/codemirror.css',
    // merge css
    'codemirror/addon/merge/merge.css',
    // theme css
    'codemirror/theme/base16-dark.css'
  ],
  workbox: {
    runtimeCaching: [{
      // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
      urlPattern: 'https://my-cdn.com/.*',
      // Defaults to `networkFirst` if omitted
      //handler: 'cacheFirst',
      // Defaults to `GET` if omitted
      method: 'GET'
    }]
  },
  manifest: {
    display: 'standalone',
    name: 'LaTourImmo Backoffice',
    lang: 'fr'
  },
  render:{
    ssr:false
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}