import { Container, Row, Col } from "reactstrap";
import { APP_NAME, APP_DESC, DOMAIN } from '../config';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { useState, useEffect } from "react";
import { Motion, spring } from 'react-motion';
import { Button } from '@material-ui/core';
import Head from 'next/head';
import { isAuth } from '../actions/auth';

const stepIntervals = [1000, 1000, 200, 200, 1000];

const Home = () => {
  const head = () => (
    <Head>
      <meta name='description' content={APP_DESC} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={APP_NAME} />
      <meta property='og:description' content={APP_DESC} />
      <meta property='og:site_name' content={APP_NAME} />
      <meta property='og:url' content={DOMAIN} />
      <meta property='og:image' content={`${DOMAIN}/apple-icon.png`} />
      
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content={DOMAIN} />
      <meta name='twitter:title' content={APP_NAME} />
      <meta name='twitter:description' content={APP_DESC} />
      <meta name='twitter:image' content={`${DOMAIN}/android-icon-192x192.png`} />
      <meta name='twitter:creator' content='@travelingtice' />
    </Head>
  )
  const [step, setStep] = useState(0);

  const incrementStep = () => setStep(step + 1);

  useEffect(() => {
    if (stepIntervals.length > step) {
      setTimeout(incrementStep, stepIntervals[step]);
    }
  }, [step]);

  const showSubtitle = () => {
    const appear = step >= 1;

    const opacity = appear ? 1 : 0;
    const right = appear ? 0 : -20;
    return <Motion style={{opacity: spring(opacity), right: spring(right)}}>{({ opacity, right }) =>
      <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: 40}}>
        <div style={{position: 'absolute', opacity, right, width: '100%' }}>
          <p className="text-center">Create your own maps like these: </p>
        </div>
      </div>
    }</Motion>
  }

  const showMapImage = (url, appearStep) => {
    const appear = step >= appearStep;
    const opacity = appear ? 1 : 0;
    const top = appear ? 0 : 35;
    let left;
    if (appearStep === 2) {
      left = -100;
    } else if (appearStep === 3) {
      left = -50
    } else {
      left = 0;
    }

    return (
      <Motion style={{opacity: spring(opacity), top: spring(top)}}>{({opacity, top}) => 
        <img src={url} alt="Map" style={{position: 'absolute', objectFit: 'cover', top, opacity, left, width: 200, height: 150, borderRadius: 5, boxShadow: '1px 1px 3px rgba(0,0,0,.2)', zIndex: appearStep}} />
      }</Motion>
    )
  }

  const showMaps = () => (
    <div style={{display: 'flex', maxWidth: 400, width: '100%', height: '100%', margin: '0 auto'}}>
      <div style={{width: '100%', height: 150, alignSelf: 'flex-end', position: 'relative'}}>{showMapImage('/map1.jpg', 4)}</div>
      <div style={{width: '100%', height: 150, margin: 'auto', position: 'relative'}}>{showMapImage('/map2.jpg', 3)}</div>
      <div style={{width: '100%', height: 150, position: 'relative'}}>{showMapImage('/map3.jpg', 2)}</div>
    </div>
  )

  const showTryNowButton = () => {
    const appear = step >= 5;
    const opacity = appear ? 1 : 0;

    return (
      <Motion style={{opacity: spring(opacity)}}>{({opacity}) =>
        <Button color="primary" onClick={() => Router.push('/signup')} variant="contained" style={{opacity}}>Try now</Button>
      }</Motion>
    )
  }

  const showGoToDashboardButton = () => {
    const appear = step >= 5;
    const opacity = appear ? 1 : 0;

    return (
      <Motion style={{opacity: spring(opacity)}}>{({opacity}) =>
        <Button color="primary" onClick={() => Router.push('/dashboard')} variant="contained" style={{opacity}}>Go to my Dashboard</Button>
      }</Motion>
    )
  }

  return (
    <>
      {head()}
      <Layout>
        <Container>
          <Row>
            <Col xs="12">
              <div className="text-center my-4">
                <h1>{APP_NAME}</h1>
              </div>
            </Col>

            <Col xs="12">
              {showSubtitle()}
            </Col>

            <Col xs="12" className="mt-4" style={{height: 300}}>
              {showMaps()}
            </Col>

            <Col xs="12" className="my-5 text-center">
              {!isAuth() ? showTryNowButton() : showGoToDashboardButton()}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Home;
