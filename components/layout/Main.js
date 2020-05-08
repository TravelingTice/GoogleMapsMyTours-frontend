import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';

const Main = ({ children }) => {
  const { isNav } = useContext(NavContext);
  const blur = isNav ? 'blur(3px)' : 'blur(0)';

  return (
    <main style={{filter: blur}}>
      {children}
    </main>
  );
}

export default Main;