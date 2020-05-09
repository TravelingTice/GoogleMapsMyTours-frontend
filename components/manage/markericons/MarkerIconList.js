import { useContext } from "react";
import { MarkerIconContext } from "../../../contexts/MarkerIconContext";
import Loading from '../../Loading';
import Error from '../../Error';
import MarkerIcon from './MarkerIcon';

const MarkerIconList = () => {
  const { markerIcons, loading, error } = useContext(MarkerIconContext);

  const showLoading = () => loading && <Loading/>
  const showError = () => error && <Error content={error} />
  return (
    <>
      {showLoading()}
      {showError()}
      {markerIcons.map(icon => (
        <MarkerIcon icon={icon} />
      ))}
    </>
  )
}

export default MarkerIconList;
