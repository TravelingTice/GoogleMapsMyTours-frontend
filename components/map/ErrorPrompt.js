import { useContext, useState, useEffect } from "react";
import { MapContext } from '../../contexts/MapContext';
import { Motion, spring } from "react-motion";
import Error from '../Error';

const ErrorPrompt = () => {
  const { error } = useContext(MapContext);
  const [zIndex, setZIndex] = useState(-1);

  const top = error ? 15 : 30;
  const opacity = error ? 1 : 0;

  useEffect(() => {
    if (error) {
      setZIndex(1);
    } else {
      setTimeout(() => setZIndex(-1), 400);
    }
  }, [error]);

  return (
    <Motion style={{top: spring(top), opacity: spring(opacity)}}>{({top, opacity}) =>
      <div style={{position: 'absolute', right: 10, zIndex, top, opacity, borderRadius: 5}}>
        <Error content={error} />
      </div>
    }</Motion>
  )
}

export default ErrorPrompt;
