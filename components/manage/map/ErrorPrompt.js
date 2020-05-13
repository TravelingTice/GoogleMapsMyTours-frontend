import { useContext, useState, useEffect } from "react";
import { MapContext } from '../../../contexts/MapContext';
import { Motion, spring } from "react-motion";
import Error from '../../Error';

const ErrorPrompt = () => {
  const { error } = useContext(MapContext);
  const [displayError, setDisplayError] = useState(false);
  const [zIndex, setZIndex] = useState(-1);

  const showErrorMs = 3000

  useEffect(() => {
    if (error) {
      setDisplayError(true);
      setZIndex(1);
      setTimeout(() => setDisplayError(false), showErrorMs);

      setTimeout(() => setZIndex(-1), showErrorMs + 400);
    }
  }, [error]);

  const top = displayError ? 15 : 30;
  const opacity = displayError ? 1 : 0;

  return (
    <Motion style={{top: spring(top), opacity: spring(opacity)}}>{({top, opacity}) =>
      <div style={{position: 'absolute', right: 10, zIndex, top, opacity, borderRadius: 5}}>
        <Error content={error} />
      </div>
    }</Motion>
  )
}

export default ErrorPrompt;
