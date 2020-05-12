import { useState, useContext, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RoomIcon from '@material-ui/icons/Room';
import TimelineIcon from '@material-ui/icons/Timeline';
import CodeIcon from '@material-ui/icons/Code';
import { Motion, spring } from 'react-motion';
import { MapContext } from "../../contexts/MapContext";

const MapMenu = () => {
  const { buttonsAppear, setState, setSelectedMarkerIconModal } = useContext(MapContext);
  const [isMenu, setMenu] = useState(false);
  const [step, setStep] = useState(0);
  const [menuZIndex, setMenuZIndex] = useState(-1);

  useEffect(() => {
    if (isMenu) {
      setMenuZIndex(1);
      setStep(1);
      setTimeout(() => setStep(2), 100);
      setTimeout(() => setStep(3), 200);
    } else {
      setStep(2);
      setTimeout(() => setStep(1), 100);
      setTimeout(() => setStep(0), 200);
      setTimeout(() => setMenuZIndex(-1), 500);
    }
  }, [isMenu]);

  const button = (style, icon, text, onClick) => (
    <Motion style={{opacity: spring(style.opacity), left: spring(style.left)}}>{({opacity, left}) =>
      <Button onClick={onClick} style={{opacity, position: 'relative', left }} startIcon={icon} className="mb-2" color="primary" variant="contained">{text}</Button> 
    }</Motion>
  )
  
  const showOptions = () => {
    const buttonAppears = [
      step >= 1 ? { opacity: 1, left: 0 } : { opacity: 0, left: -20 },
      step >= 2 ? { opacity: 1, left: 0 } : { opacity: 0, left: -20 },
      step >= 3 ? { opacity: 1, left: 0 } : { opacity: 0, left: -20 }
    ];
    
    return (
      <>
        {button(buttonAppears[0], <RoomIcon/>, 'Marker', () => {
          setSelectedMarkerIconModal(true)
          setState('newMarker');
        })}
        {button(buttonAppears[1], <TimelineIcon/>, 'Line', () => {
          setState('newLine')
        })}
        {button(buttonAppears[2], <CodeIcon/>, 'KML', () => {
          setState('newKML');
        })}
      </>
    )
  }
  
  const showMoreIcon = () => {
    const { palette } = useTheme();
    const opacity = buttonsAppear ? 1 : 0;
    const left = buttonsAppear ? -3 : -10;
    return (
      <Motion style={{opacity: spring(opacity), left: spring(left)}}>{({opacity, left})=>
        <button onClick={toggleMenu} style={{justifySelf: 'end', marginTop: 10, position: 'relative', opacity, left, width: 60, height: 60, backgroundColor: 'white', borderRadius: '50%', border: 'none', boxShadow: '1px 1px 5px rgba(0,0,0,.3)'}}>
          <MoreVertIcon fontSize='large' style={{ color: palette.primary.main }} />
        </button>
      }</Motion>
    )
  }
  
  return (
    <>
      <div style={{position: 'absolute', bottom: 80, left: 0, zIndex: menuZIndex}}>
        <div style={{position: 'relative', overflow: 'hidden', padding: 10, display: 'grid'}}>
          {showOptions()}
        </div>
      </div>
      <div style={{position: 'absolute', bottom: 10, left: 0}}>
        <div style={{position: 'relative', overflow: 'hidden', padding: 10}}>
          {showMoreIcon()}
        </div>
      </div>
    </>
  )
}

export default MapMenu
