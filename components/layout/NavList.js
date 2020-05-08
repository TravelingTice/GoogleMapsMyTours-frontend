import Link from 'next/link';
import styled from 'styled-components';
import { isAuth, signout } from '../../actions/auth';
import Router, { withRouter } from 'next/router';
import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';

const NavListContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const NavItem = styled.li`
  padding: 10px 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #555;
  cursor: pointer;
`;

const NavList = ({ router }) => {
  const { closeNavForcibly } = useContext(NavContext);

  const onSignout = () => signout(() => {
    // close the nav
    closeNavForcibly();
    Router.push('/');
  });

  return (
    <NavListContainer>

      <div>
        {!isAuth() && (
          <>
            <Link href='/'><NavItem>Home</NavItem></Link>
            <Link href='/signup'><NavItem>Sign up</NavItem></Link>
            <Link href='/signin'><NavItem>Sign in</NavItem></Link>
          </>
        )}

        {isAuth() && (
          <>
            <Link href='/dashboard'><NavItem>Dashboard</NavItem></Link>
            <Link href='/manage/profile'><NavItem>Update profile</NavItem></Link>
          </>
        )}
      </div>

      <div></div>

      {/* bottom part */}
      <div className="mb-2">
        <Link href='/about'><NavItem>About</NavItem></Link>
        {isAuth() && (
          <NavItem role="button" onClick={onSignout}>Sign out</NavItem>
        )}
      </div>
    </NavListContainer>
  );
}

export default withRouter(NavList);
