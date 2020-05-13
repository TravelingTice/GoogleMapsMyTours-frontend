import { useContext } from "react";
import { MarkerIconContext } from "../../../contexts/MarkerIconContext";
import Loading from '../../Loading';
import Error from '../../Error';
import MarkerIcon from './MarkerIcon';
import styled from 'styled-components';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  @media (min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media(min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media(min-width: 992px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media(min-width: 1200px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const AddMarkerBtn = () => {
  const { initNew } = useContext(MarkerIconContext);
  return (
    <div role="button" onClick={initNew} style={{height: 100, width: '100%', backgroundColor: 'rgba(0,0,0,.2)', borderRadius: '5px', boxShadow: '1px 1px 5px rgba(0,0,0,.3)', cursor: 'pointer'}} className="d-flex align-items-center justify-content-center">
      <AddCircleRoundedIcon style={{color: 'white', fontSize: 35}} />
    </div>
  )
}

const MarkerIconList = () => {
  const { markerIcons, loading, error } = useContext(MarkerIconContext);

  const showLoading = () => loading && <Loading/>
  const showError = () => error && <Error content={error} />

  return (
    <>
      {showLoading()}
      {showError()}
      {!loading && (
        <GridContainer>
          {markerIcons.map(icon => (
            <MarkerIcon icon={icon} />
          ))}
          <AddMarkerBtn />
        </GridContainer>
      )}
    </>
  )
}

export default MarkerIconList;
