import { useContext } from "react";
import { MapContext } from "../../contexts/MapContext";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import Router from 'next/router';

const BackButton = styled.button`
  border: none;
  background-color: rgba(0,0,0,.4);
  color: white;
  border-radius: 5px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

const MapNamePrompt = () => {
  const { mapName } = useContext(MapContext);
  return mapName ? (
    <div style={{position: 'absolute', left: 7, top: 7}} className='d-flex'>
      <BackButton onClick={() => Router.push('/dashboard')}>
        <ArrowBackIcon />
      </BackButton>
      <div style={{backgroundColor: 'rgba(0,0,0,.4)', color: 'white', borderRadius: 5}}>
        <p className="m-0 p-2">{mapName}</p>
      </div>
    </div>
  ) : null
}

export default MapNamePrompt;
