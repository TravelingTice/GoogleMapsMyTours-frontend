import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import styled from 'styled-components';
import Router from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { DashboardContext } from '../../../contexts/DashboardContext';
import { cloudinaryCore } from '../../../config';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Motion, spring } from 'react-motion';
import { Button } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import CodeIcon from '@material-ui/icons/Code';
import VisibilityIcon from '@material-ui/icons/Visibility';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media(min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media(min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media(min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const MapContainer = styled.div`
  box-shadow: 1px 1px 5px rgba(0,0,0,.3);
  background-image: url(${props => cloudinaryCore.url(props.image, { height: 400, crop: 'fill' })});
  background-size: cover;
  height: 130px;
  width: 100%;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: flex-end;
`;

const AddMap = () => {
  return (
    <div role="button" onClick={() => Router.push('/manage/maps/new')} style={{height: 130, width: '100%', backgroundColor: 'rgba(0,0,0,.2)', borderRadius: '5px', boxShadow: '1px 1px 5px rgba(0,0,0,.3)', cursor: 'pointer'}} className="d-flex align-items-center justify-content-center">
      <AddCircleRoundedIcon style={{color: 'white', fontSize: 35}} />
    </div>
  )
}

// Map snapshot will be here => `${DOMAIN}/maps/${map.id}`
const Map = ({ map }) => {
  const [isMenu, setMenu] = useState(false);
  const [zIndex, setZIndex] = useState(-1);

  useEffect(() => {
    if (isMenu) {
      setZIndex(3);
    } else {
      setTimeout(() => setZIndex(-1), 300);
    }
  }, [isMenu]);

  const toggleMenu = () => {
    setMenu(!isMenu);
  }

  const handleClick = e => {
    if (e.target.id === 'map-container' || e.target.id === 'map-paragraph') {
      Router.push(`/manage/maps/${map.id}`)
    }
  }

  const showMenu = () => {
    const opacity = isMenu ? 1 : 0;
    const right = isMenu ? 0 : -20;

    return (
      <Motion style={{opacity: spring(opacity), right: spring(right)}}>{({opacity, right}) =>
        <div style={{position: 'absolute', bottom: 135, opacity, right, zIndex}}>
          <div className="my-1">
            <Button onClick={() => setShareModal(true)} color="primary" variant="contained" startIcon={<ShareIcon/>}></Button>
          </div>
          <div className="my-1">
            <Button color="primary" variant="contained" startIcon={<CodeIcon/>}></Button>
          </div>
          <Button role="link" onClick={() => Router.push(`/maps/${map.id}`)} color="primary" variant="contained" startIcon={<VisibilityIcon/>}></Button>
        </div>
      }</Motion>
    )
  }

  return (
    <MapContainer id='map-container' image={'default_map.png'} onClick={handleClick} style={{cursor: 'pointer'}}>
      <p id="map-paragraph" className="p-1 m-1" style={{backgroundColor: 'rgba(255,255,255,.7)', borderRadius: 5}}>{map.name}</p>
      <button onClick={toggleMenu} style={{position: 'absolute', right: 5, top: 5, backgroundColor: 'rgba(255,255,255,.7)', width: 25, height: 25, borderRadius: '50%', border: 'none', padding: 0, zIndex: 2}}>
        <MoreVertIcon />
      </button>
      {showMenu()}
    </MapContainer>
  )
}

const MapList = () => {
  const { maps, loading } = useContext(DashboardContext);
  
  return !loading ? (
    <GridContainer>
      {maps.map(map => (
        <Map key={map.id} map={map} />
      ))}
      <AddMap />
    </GridContainer>
  ) : (
    <p className="text-center">Loading ...</p>
  )
}

export default MapList;
