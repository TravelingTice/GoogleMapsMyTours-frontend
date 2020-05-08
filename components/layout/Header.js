import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import MenuRoundedIcon from '@material-ui/icons/MenuOutlined';
import NProgress from 'nprogress';
import { APP_NAME } from '../../config';

const HeaderContainer = styled.header`
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0,0,0,.2);
  justify-content: space-between;
  background-color: #fcfcfc;
  color: white;
  filter: ${props => props.blur ? 'blur(3px)' : 'blur(0)' };
`;

const Logo = styled.img`
  height: 43px!important;
`;

const Brand = styled.h2`
  font-size: 1.2em;
  margin: 0;
  margin-left: 10px;
  margin-top: 9px;
`;

const HamburgerContainer = styled.button`
  border: none;
  background-color: #5d4037;
  padding: 7px 13px;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 150ms ease-out;
  &:hover {
    box-shadow: 3px 3px 4px rgba(0,0,0,.2);
  }
  &:active {
    box-shadow: 1px 1px 3px rgba(0,0,0,.2);
  }
  &:focus {
    outline: none;
  }
`;

// nprogress
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const { isNav, openNav } = useContext(NavContext);

  return (
    <HeaderContainer blur={isNav}>

      <Link href='/'>
        <a style={{ textDecoration: 'none'}} >
          <div className="d-flex align-items-center">
            <Logo src="/wallet.svg" alt={APP_NAME} />
            <Brand>{APP_NAME}</Brand>
          </div>
        </a>
      </Link>

      <HamburgerContainer onClick={openNav}>
        <MenuRoundedIcon style={{ fontSize: 28, color: 'white' }} />
      </HamburgerContainer>
      
    </HeaderContainer>
  );
}

export default Header;