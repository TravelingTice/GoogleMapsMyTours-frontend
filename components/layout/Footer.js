import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';

const Footer = () => {
  const { isNav } = useContext(NavContext);
  const blur = isNav ? 'blur(3px)' : 'blur(0)';

  return (
    <footer style={{filter: blur}}>
      
    </footer>
  );
}

export default Footer;