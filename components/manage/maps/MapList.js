import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import styled from 'styled-components';
import Router from 'next/router';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const AddMap = () => {
  return (
    <div role="button" onClick={() => Router.push('/maps/new')} style={{height: 100, width: '100%', backgroundColor: 'rgba(0,0,0,.2)', borderRadius: '5px', boxShadow: '1px 1px 5px rgba(0,0,0,.3)'}} className="d-flex align-items-center justify-content-center">
      <AddCircleRoundedIcon style={{color: 'white', fontSize: 35}} />
    </div>
  )
}

const MapList = () => {
  
  return (
    <GridContainer>
      <AddMap />
    </GridContainer>

  )
}

export default MapList;
