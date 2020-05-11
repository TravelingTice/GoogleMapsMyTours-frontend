import { useContext, useState, useEffect } from "react";
import { MapContext } from '../../contexts/MapContext';
import { Motion, spring } from "react-motion";

const LoadingPrompt = () => {
  const { loading } = useContext(MapContext);
  const [zIndex, setZIndex] = useState(-1);

  const top = loading ? 15 : 30;
  const opacity = loading ? 1 : 0;

  useEffect(() => {
    if (loading) {
      setZIndex(1);
    } else {
      setTimeout(() => setZIndex(-1), 400);
    }
  }, [loading]);

  return (
    <Motion style={{top: spring(top), opacity: spring(opacity)}}>{({top, opacity}) =>
      <div style={{maxWidth: 100, margin: '0 auto', position: 'relative', zIndex, top, opacity, borderRadius: 5, backgroundColor: 'rgba(255,255,255,.3)'}}>
        <p style={{color: '#386387' }} className="p-2">Loading ...</p>
      </div>
    }</Motion>
  )
}

export default LoadingPrompt;
