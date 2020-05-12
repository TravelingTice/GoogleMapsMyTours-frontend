import { useState, useContext, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Motion, spring } from 'react-motion';
import { MapContext } from "../../contexts/MapContext";
import DeleteIcon from '@material-ui/icons/Delete';
import CodeIcon from '@material-ui/icons/Code';

const MapMenu = () => {
  const { buttonsAppear, isMoreMenu, toggleMoreMenu, onRemoveMap, setKmlManageModal } = useContext(MapContext);
  const [step, setStep] = useState(0);
  const [menuZIndex, setMenuZIndex] = useState(-1);

  useEffect(() => {
    if (isMoreMenu) {
      setMenuZIndex(1);
      setStep(1);
      setTimeout(() => setStep(2), 100);
    } else {
      setStep(1);
      setTimeout(() => setStep(0), 200);
      setTimeout(() => setMenuZIndex(-1), 400);
    }
  }, [isMoreMenu]);

  const button = (style, icon, text, onClick, color) => (
    <Motion style={{opacity: spring(style.opacity), left: spring(style.left)}}>{({opacity, left}) =>
      <Button onClick={onClick} style={{opacity, position: 'relative', left }} startIcon={icon} className="mb-2" color={color} variant="contained">{text}</Button> 
    }</Motion>
  )
  
  const showOptions = () => {
    const buttonAppears = [
      step >= 1 ? { opacity: 1, left: 0 } : { opacity: 0, left: -20 },
      step >= 2 ? { opacity: 1, left: 0 } : { opacity: 0, left: -20 }
      // step >= 3 ? { opacity: 1, left: 0 } : { opacity: 0, left: -20 }
    ];
    
    return (
      <>
        {button(buttonAppears[0], <CodeIcon/>, 'Manage kmls', () => setKmlManageModal(true), 'primary')}
        {button(buttonAppears[1], <DeleteIcon/>, 'Delete map', onRemoveMap, 'secondary')}
      </>
    )
  }
  
  const showMoreIcon = () => {
    const { palette } = useTheme();
    const opacity = buttonsAppear ? 1 : 0;
    const left = buttonsAppear ? -3 : -10;
    return (
      <Motion style={{opacity: spring(opacity), left: spring(left)}}>{({opacity, left})=>
        <button onClick={toggleMoreMenu} style={{justifySelf: 'end', marginTop: 10, position: 'relative', opacity, left, width: 60, height: 60, backgroundColor: 'white', borderRadius: '50%', border: 'none', boxShadow: '1px 1px 5px rgba(0,0,0,.3)'}}>
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
