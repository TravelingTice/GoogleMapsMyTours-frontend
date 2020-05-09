import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_PROD : publicRuntimeConfig.API_DEV;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PROD : publicRuntimeConfig.DOMAIN_DEV;

export const APP_DESC = publicRuntimeConfig.APP_DESC;

export const CLOUDINARY_CLOUDNAME = publicRuntimeConfig.CLOUDINARY_CLOUDNAME;