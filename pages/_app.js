import NextApp from 'next/app'
// import bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// import nprogress styles
import 'nprogress/nprogress.css';
// import global styles
import '../styles/index.scss';
// config
import { APP_NAME } from '../config';

// Themeprovider for providing theme context
import { ThemeProvider } from '@material-ui/core/styles';
// import theme for ThemeProvider
import theme from '../theme';

// import wake up call api
import { wakeUp } from '../actions/general';

import Head from 'next/head';

export default class App extends NextApp {
  // remove it here
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    // wake the api up
    wakeUp().then(data => console.log(data));
  }
  
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>{APP_NAME}</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
