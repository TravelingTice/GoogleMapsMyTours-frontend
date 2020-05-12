import { useContext } from 'react';
import { MapContext } from '../../contexts/MapContext';

const InstructionsPrompt = () => {
  const { state, selectedMarkerIcon } = useContext(MapContext);

  const texts = {
    newMarker: 'Click anywhere on the map to drop the marker',
    addLine: 'Click 2 markers to connect the line between'
  }

  const text = texts[state] || '';

  return text && selectedMarkerIcon ? (
    <div style={{position: 'absolute', zIndex: 2, top: 65, width: '100%'}} className="d-flex justify-content-center">
      <span className="p-2 text-white" style={{margin: '0 auto', borderRadius: 5, backgroundColor: 'rgba(0,0,0,.5)'}}>{text}</span>
    </div>
  ) : null;
}

export default InstructionsPrompt;