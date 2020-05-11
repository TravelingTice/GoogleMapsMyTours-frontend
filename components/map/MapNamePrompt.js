import { useContext } from "react";
import { MapContext } from "../../contexts/MapContext";

const MapNamePrompt = () => {
  const { mapName } = useContext(MapContext);
  return mapName ? (
    <div style={{position: 'absolute', left: 10, top: 10, backgroundColor: 'rgba(0,0,0,.4)', color: 'white', borderRadius: 5}}>
      <p className="m-0 p-2">{mapName}</p>
    </div>
  ) : null
}

export default MapNamePrompt;
