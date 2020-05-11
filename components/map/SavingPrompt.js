import { useContext, useState, useEffect } from "react";
import { MapContext } from '../../contexts/MapContext';
import { Motion, spring } from "react-motion";
import Message from '../Message';

const SavingPrompt = () => {
  const { saving } = useContext(MapContext);
  const [zIndex, setZIndex] = useState(-1);

  const top = saving ? 15 : 30;
  const opacity = saving ? 0.8 : 0;

  useEffect(() => {
    if (saving) {
      setZIndex(1);
    } else {
      setTimeout(() => setZIndex(-1), 400);
    }
  }, [saving]);

  return (
    <Motion style={{top: spring(top), opacity: spring(opacity)}}>{({top, opacity}) =>
      <div style={{position: 'absolute', right: 10, zIndex, top, opacity, borderRadius: 5}}>
        <Message content='Saving...' />
      </div>
    }</Motion>
  )
}

export default SavingPrompt;
