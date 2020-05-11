import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import styled from 'styled-components';
import Router from 'next/router';
import { useState } from 'react';
import { getMaps } from '../../../actions/map';
import { cloudinaryCore, DOMAIN } from '../../../config';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const MapContainer = styled.div`
  box-shadow: 1px 1px 5px rgba(0,0,0,.3);
  background-image: url(${props => cloudinaryCore.url(props.image, { height: 400, crop: 'fill' })});
  height: 100px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddMap = () => {
  return (
    <div role="button" onClick={() => Router.push('/manage/maps/new')} style={{height: 100, width: '100%', backgroundColor: 'rgba(0,0,0,.2)', borderRadius: '5px', boxShadow: '1px 1px 5px rgba(0,0,0,.3)'}} className="d-flex align-items-center justify-content-center">
      <AddCircleRoundedIcon style={{color: 'white', fontSize: 35}} />
    </div>
  )
}

// Map snapshot will be here => `${DOMAIN}/maps/${map.id}`
const Map = ({ map }) => {
  <MapContainer image={'default_map.png'}>
    
  </MapContainer>
}

const MapList = () => {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    const maps = await getMaps(token);
    setMaps(maps);
  }
  
  return (
    <GridContainer>
      {maps.map(map => (
        <Map map={map} />
      ))}
      <AddMap />
    </GridContainer>

  )
}

export default MapList;
