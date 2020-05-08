import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Container = styled.div`
  position: fixed;
  top: -70px;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255,255,255,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: opacity 200ms ease-in-out;
  opacity: ${props => props.opacity};
`;

const Attribution = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 10px;
`;

const Loading = () => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setTimeout(() => setOpacity(1), 10);
  }, []);

  return (
    <Container opacity={opacity}>

      <img width="120" style={{marginBottom: '100px' }} src="/loading.svg" alt="Loading..."/>

      <Attribution>
        <p>Loading animation is provided by <a href="loading.io">Loading.io</a></p>
      </Attribution>
    </Container>
  );
}

export default Loading;