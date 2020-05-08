// import layout components
import Header from './Header';
// import Footer from './Footer';
import NavContainer from './NavContainer';
import Main from './Main';

// import context for nav
import { NavContextProvider } from '../../contexts/NavContext';

const Layout = ({ children }) => {

  return (
    <>
      <NavContextProvider>

        <Header />
        
        <NavContainer />

        <Main>
          {children}
        </Main>
        
        {/* <Footer /> */}

      </NavContextProvider>
    </>
  );
}

export default Layout;