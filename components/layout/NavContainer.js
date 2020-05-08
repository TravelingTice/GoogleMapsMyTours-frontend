import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { NavContext } from '../../contexts/NavContext';
import NavList from './NavList';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { isAuth } from '../../actions/auth';
import { Motion, spring } from 'react-motion';

const ClickLayer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: ${props => props.zIndex};
`;

const Nav = styled.nav`
  background-color: ${props => props.bg};
  color: ${props => props.color};
  width: ${props => `${props.width - 7}px`};
  height: 100%;
  position: absolute;
  display: grid;
  grid-template-rows: auto auto 1fr;
  top: 0;
  right: ${props => `${props.rightOffset}px`};
  z-index: 5;
  box-shadow: -1px -1px 4px rgba(0,0,0,.2);
`;

const Top = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: transparent;
  padding: 14px;
  border: none;
  color: ${props => props.color};
`;

const NavContainer = () => {
  const { closeNav, closeNavForcibly, isNav } = useContext(NavContext);
  const [zIndex, setZIndex] = useState(-1);

  // fix zindex bug using useeffect
  useEffect(() => {
    if (isNav) {
      setZIndex(5);
    } else {
      setTimeout(() => { setZIndex(-1) }, 600);
    }
  }, [isNav]);

  const navWidth = 300;
  const navBg = '#fff';
  const navColor = '#333';

  const rightOffset = isNav ? 0 : -navWidth;

  return (
    <Motion style={{rightOffset: spring(rightOffset)}}>{({ rightOffset }) =>
    <>
      <ClickLayer 
        id="close-nav" 
        zIndex={isNav ? 5 : -1}
        onClick={closeNav}>
      </ClickLayer>

      <div style={{position: 'absolute', height: '100%', width: navWidth, right: 0, top: 0, overflow: 'hidden', zIndex }}>
        <div style={{position: 'relative', height: '100%', width: '100%'}}>
          <Nav 
            rightOffset={rightOffset}
            width={navWidth} 
            bg={navBg}
            color={navColor}>

              <Top>
                <CloseButton style={{zIndex: 5}} color={navColor} onClick={closeNavForcibly}>
                  <CloseRoundedIcon style={{fontSize: 30}} />
                </CloseButton>
              </Top>

              {isAuth() ? (
                <div style={{ marginLeft: 20 }} className="my-4">Welcome {isAuth().username}</div>
              ) : <div></div>}

              <NavList />

          </Nav>
        </div>
      </div>


      </>
        
    }</Motion>
  );
}

export default NavContainer;