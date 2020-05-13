import getConfig from 'next/config';
import cloudinary from 'cloudinary-core';

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_PROD : publicRuntimeConfig.API_DEV;

export const API_WITHOUT_VERSION = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_WITHOUT_VERSION_PROD : publicRuntimeConfig.API_WITHOUT_VERSION_DEV;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PROD : publicRuntimeConfig.DOMAIN_DEV;

export const APP_DESC = publicRuntimeConfig.APP_DESC;

export const CLOUDINARY_CLOUDNAME = publicRuntimeConfig.CLOUDINARY_CLOUDNAME;

export const GOOGLE_API_KEY = 'AIzaSyBQPDoYkte_-bXJOrSL9Oe2jRylizXFz8M';

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;

export const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: CLOUDINARY_CLOUDNAME });