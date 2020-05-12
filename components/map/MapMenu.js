import { useState, useContext, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RoomIcon from '@material-ui/icons/Room';
import TimelineIcon from '@material-ui/icons/Timeline';
import CodeIcon from '@material-ui/icons/Code';
import { Motion, spring } from 'react-motion';
import { MapContext } from "../../contexts/MapContext";

const MapMenu = () => {
  const { buttonsAppear, isMenu, toggleMenu, setState, setSelectedMarkerIconModal, markers, setError } = useContext(MapContext);
  const [step, setStep] = useState(0);
  const [zIndex, setZIndex] = useState(-1);

  useEffect(() => {
    if (isMenu) {
      setZIndex(1);
      setStep(1);
      setTimeout(() => setStep(2), 100);
      setTimeout(() => setStep(3), 200);
    } else {
      setStep(2);
      setTimeout(() => setStep(1), 100);
      setTimeout(() => setStep(0), 200);
      setTimeout(() => setZIndex(-1), 500);
    }
  }, [isMenu]);

  const initLine = () => {
    if (markers.length < 2) {
      setError('You need at least 2 markers to connect a line');
    } else {
      setState('newLine');
    }
  }

  const button = (style, icon, text, onClick) => (
    <Motion style={{opacity: spring(style.opacity), right: spring(style.right)}}>{({opacity, right}) =>
      <Button onClick={onClick} style={{opacity, position: 'relative', right }} startIcon={icon} className="mb-2" color="primary" variant="contained">{text}</Button> 
    }</Motion>
  )
  
  const showOptions = () => {
    const buttonAppears = [
      step >= 1 ? { opacity: 1, right: 0 } : { opacity: 0, right: -20 },
      step >= 2 ? { opacity: 1, right: 0 } : { opacity: 0, right: -20 },
      step >= 3 ? { opacity: 1, right: 0 } : { opacity: 0, right: -20 }
    ];
    
    return (
      <>
        {button(buttonAppears[0], <RoomIcon/>, 'Marker', () => {
          setSelectedMarkerIconModal(true)
          setState('newMarker');
        })}
        {button(buttonAppears[1], <TimelineIcon/>, 'Line', initLine)}
        {button(buttonAppears[2], <CodeIcon/>, 'KML', () => {
          setState('newKML');
        })}
      </>
    )
  }
  
  const showPlusIcon = () => {
    const { palette } = useTheme();
    const opacity = buttonsAppear ? 1 : 0;
    const right = buttonsAppear ? -3 : -10;
    return (
      <Motion style={{opacity: spring(opacity), right: spring(right)}}>{({opacity, right})=>
        <button onClick={toggleMenu} style={{justifySelf: 'end', marginTop: 10, position: 'relative', opacity, right, width: 60, height: 60, backgroundColor: palette.primary.main, borderRadius: '50%', border: 'none', boxShadow: '1px 1px 5px rgba(0,0,0,.3)'}}>
          <AddRoundedIcon fontSize='large' style={{ color: 'white' }} />
        </button>
      }</Motion>
    )
  }
  
  return (
    <>
      <div style={{position: 'absolute', bottom: 80, right: 0, zIndex}}>
        <div style={{position: 'relative', overflow: 'hidden', padding: 10, display: 'grid'}}>
          {showOptions()}
        </div>
      </div>
      <div style={{position: 'absolute', bottom: 10, right: 0}}>
        <div style={{position: 'relative', overflow: 'hidden', padding: 10}}>
          {showPlusIcon()}
        </div>
      </div>
    </>
  )
}

export default MapMenu
