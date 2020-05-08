import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

// import config
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import { APP_NAME, DOMAIN, APP_DESC } from '../config.js';

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      }
    } finally {
      styledComponentSheet.seal()
    }
  }

  setGoogleTags = () => {
    return {
      __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-113540683-10');
      `
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
          {this.props.styleTags}
          {publicRuntimeConfig.PRODUCTION && (
            <>
              {/* Google analytics code */}
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-113540683-10"></script>
              <script dangerouslySetInnerHTML={this.setGoogleTags()}></script>
            </>
          )}
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>

          <link rel="manifest" href="/manifest.json"/>

          <meta name='msapplication-TileColor' content='#1E88E5' />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#1E88E5"/>
          <meta name='application-name' content={APP_NAME} />

          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />

          <meta name='description' content={APP_DESC} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/browserconfig.xml' />
          <meta name='msapplication-tap-highlight' content='no' />
          
          <meta name='theme-color' content='#1E88E5' />
                    
          {/* <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' /> */}
          <link rel='shortcut icon' href='/favicon.ico' />
          {/* <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' /> */}
              
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content={DOMAIN} />
          <meta name='twitter:title' content={APP_NAME} />
          <meta name='twitter:description' content={APP_DESC} />
          <meta name='twitter:image' content={`${DOMAIN}/android-icon-192x192.png`} />
          <meta name='twitter:creator' content='@travelingtice' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={APP_NAME} />
          <meta property='og:description' content={APP_DESC} />
          <meta property='og:site_name' content={APP_NAME} />
          <meta property='og:url' content={DOMAIN} />
          <meta property='og:image' content={`${DOMAIN}/apple-icon.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;