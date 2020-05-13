const withPWA = require('next-pwa');
const cacheOptions = require('./cache');
require('dotenv').config();

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
    register: process.env.NODE_ENV === 'production',
    runtimeCaching: cacheOptions
  },
  publicRuntimeConfig: {
    APP_NAME: 'Google Maps My Tours',
    PRODUCTION: process.env.NODE_ENV === 'production',
    DOMAIN_DEV: 'http://localhost:3000',
    DOMAIN_PROD: 'https://google-maps-my-tours.now.sh',
    API_DEV: 'http://localhost:3001/v1',
    API_PROD: 'https://google-maps-my-tours-api.herokuapp.com/v1',
    CLOUDINARY_CLOUDNAME: 'ticekralt',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    FB_APP_ID: '193880831633929'
  }
})