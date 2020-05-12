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
    <div className="mt-5">
      <p>{text}</p>
    </div>
  ) : null;
}

export default InstructionsPrompt;