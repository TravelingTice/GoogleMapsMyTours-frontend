import { useState, createContext, useEffect } from 'react';
import { getMarkerIcons } from '../actions/markerIcon';
import { getCookie } from '../actions/auth';
import generateId from 'generate-unique-id';
import { getMapForEdit, removeMap } from '../actions/map';
import { addLine, updateLine, removeLine } from '../actions/line';
import { addMarkerInfoWindow, updateMarkerInfoWindow, removeMarker } from '../actions/marker';
import lowerSnakalize from '../helpers/lowerSnakalize';
import Router from 'next/router';

export const MapContext = createContext();

export const MapContextProvider = ({ children, id }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  // startup
  const [mapName, setMapName] = useState('');
  const [isMapNameModal, setMapNameModal] = useState(false);
  const [buttonsAppear, setButtonsAppear] = useState(false);
  const [markerIcons, setMarkerIcons] = useState([]);
  // states: add marker, add line, add kml
  const [state, setState] = useState('');
  const [isMenu, setMenu] = useState(false);
  const [isMoreMenu, setMoreMenu] = useState(false);
  // marker crud
  const [isSelectedMarkerIconModal, setSelectedMarkerIconModal] = useState(false);
  const [isInfoWindowModal, setInfoWindowModal] = useState(false);
  const [selectedMarkerIcon, setSelectedMarkerIcon] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [infoWindowError, setIWError] = useState('');
  const [markerEditId, setMarkerEditId] = useState('');
  // line crud
  const [lines, setLines] = useState([]);
  const [isLineModal, setLineModal] = useState(false);
  const [selectedLine, setSelectedLine] = useState({
    strokeColor: '#000000',
    strokeOpacity: 1,
    strokeWeight: 1,
    coords: []
  });
  const [lineError, setLineError] = useState('');
  // kml crud
  const [isKmlModal, setKmlModal] = useState(false);

  const [modalError, setModalError] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const token = getCookie('token');

  const findMarkerIconById = id => markerIcons.find(icon => icon.id === id);

  const findMarkerByRefId = refId => markers.find(marker => marker.refId === refId);

  const findInfoWindowByMarkerRefId = refId => infoWindows.find(infoWindow => infoWindow.markerRefId === refId);

  const toggleMenu = () => setMenu(!isMenu);

  const toggleMoreMenu = () => setMoreMenu(!isMoreMenu);
  
  useEffect(() => {
    fetchMapData(id);
  }, [id]);

  useEffect(() => {
    setMenu(false);
  }, [state]);

  const fetchMapData = async (id) => {
    const markerIcons = await getMarkerIcons(token);
    setMarkerIcons(markerIcons);

    if (id) {
      const { markers, infoWindows, lines, mapName } = await getMapForEdit(id, token);
      setMarkers(markers);
      setLines(lines);
      setInfoWindows(infoWindows);
      setMapName(mapName);
    } else {
      // new map -> fetch name
      setMapNameModal(true);
    }

    setLoading(false);
        
    setTimeout(() => setButtonsAppear(true), 500);
  }

  const initMapName = name => {
    setMapName(name);
    setMapNameModal(false);
    setMenu(true);
  }

  const initMarkerEdit = refId => {
    setMarkerEditId(refId);
    setInfoWindowModal(true);
  }

  const onSelectMarkerIcon = e => setSelectedMarkerIcon(e.target.value);

  // marker crud
  const onAddMarker = (coords) => {
    const newMarker = {
      lat: coords.latLng.lat(),
      lng: coords.latLng.lng(),
      refId: generateId(),
      markerIconId: selectedMarkerIcon.id
    }
    setMarkers(markers.concat(newMarker));
    // clear the edit id (because this is a new marker)
    setMarkerEditId('');
    // open infowindow modal
    setInfoWindowModal(true);
  }

  const onAddMarkerInfoWindow = async infoWindow => {
    // frontend -> add infowindow for the marker (marker is already on the map)
    setInfoWindows(infoWindows.concat(infoWindow));

    setInfoWindowModal(false);

    // backend
    // show saving prompt in the top right
    setSaving(true);
    // get the marker we need
    const marker = findMarkerByRefId(infoWindow.markerRefId);

    const data = await addMarkerInfoWindow({ marker: lowerSnakalize(marker), info_window: lowerSnakalize(infoWindow), map_id: id || undefined, map_name: mapName }, token);

    setSaving(false);

    setState('');

    if (data.error) return setError(data.error);

    // set the map id in the router if the id is not provided already
    if (!id) {
      Router.replace(`/manage/maps/${data.mapId}`);
    }
  }

  const onUpdateMarkerInfoWindow = async newInfoWindow => {
    // frontend
    const oldInfoWindow = findInfoWindowByMarkerRefId(markerEditId);
    const index = infoWindows.indexOf(oldInfoWindow);
    
    if (index !== -1) {
      const newInfoWindowArr = infoWindows;
      newInfoWindowArr[index] = newInfoWindow;
      setInfoWindows(newInfoWindowArr);
    } else {
      return setError('info window cannot be found');
    }
    setInfoWindowModal(false);

    // backend
    const marker = findMarkerByRefId(newInfoWindow.markerRefId);

    setSaving(true);

    const data = await updateMarkerInfoWindow({ marker: lowerSnakalize(marker), info_window: lowerSnakalize(newInfoWindow) }, marker.id, token);

    setSaving(false);

    if (data.error) return setError(data.error);
  }

  const onRemoveMarker = async () => {
    const answer = window.confirm('Are you sure?');

    if (answer) {
      // frontend
      setMarkers(markers.filter(marker => marker.refId !== markerEditId));
      setMarkerEditId('');
      setInfoWindowModal(false);

      // backend
      setSaving(true);

      const data = await removeMarker(markerEditId, token);

      setSaving(false);

      if (data.error) return setError(data.error);
    }
  }

  // line crud
  const onAddLine = async () => {
    setLineModal(false);
    setSaving(true);
    // clear the selectedLine (no need to display it anymore)
    setSelectedLine({
      strokeColor: '#000000',
      strokeOpacity: 1,
      strokeWeight: 1,
      coords: []
    });
    
    const data = await addLine(selectedLine, id, token);
    
    setSaving(false);

    // concat the line to the lines arr
    setLines(lines.concat(data.line));
    
    if (data.error) setError(data.error);
  }

  const onUpdateLine = async () => {
    // frontend
    setLineModal(false);

    // replace the line in the lines array
    const oldLine = lines.find(line => line.id === selectedLine.id);
    const index = lines.indexOf(oldLine);
    const newLines = lines;
    newLines[index] = selectedLine;
    setLines(newLines);

    // backend
    setSaving(true);
    
    const data = await updateLine(selectedLine, selectedLine.id, token);
    
    setSaving(false);

    if (data.error) setError(data.error);

    // clear the selectedLine (no need to display it anymore)
    setSelectedLine({
      strokeColor: '#000000',
      strokeOpacity: 1,
      strokeWeight: 1,
      coords: []
    });
  }

  const onRemoveLine = async () => {
    const answer = window.confirm('Are you sure?');

    if (answer) {
      // frontend
      setLineModal(false);
      setLines(lines.filter(line => selectedLine.id !== line.id));
      setSelectedLine({
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWeight: 1,
        coords: []
      });

      // backend
      setSaving(true);

      const data = await removeLine(selectedLine.id, token);

      setSaving(false);

      if (data.error) setError(data.error);
    }
  }

  const onRemoveMap = async () => {
    const answer = window.confirm(`Are you sure you want to remove ${mapName}?`);

    if (answer) {
      setLoading(true);

      const data = await removeMap(id, token);

      if (data.error) {
        setLoading(false);
        setError(data.error);
      }

      Router.push('/dashboard');
    }
  }
  
  return (
    <MapContext.Provider
      value={{
        id,
        state,
        saving,
        isSelectedMarkerIconModal,
        mapName,
        isMenu,
        isMoreMenu,
        buttonsAppear,
        loading,
        error,
        modalLoading,
        modalError,
        lineError,
        markerIcons,
        markers,
        lines,
        selectedLine,
        selectedMarkerIcon,
        isInfoWindowModal,
        isLineModal,
        isKmlModal,
        markerEditId,
        infoWindowError,
        isMapNameModal,
        initMapName,
        initMarkerEdit,
        setSelectedMarkerIconModal,
        setInfoWindowModal,
        setLineModal,
        setKmlModal,
        setIWError,
        setLineError,
        setSelectedLine,
        setMenu,
        setMoreMenu,
        setError,
        setState,
        toggleMenu,
        toggleMoreMenu,
        setMarkers,
        findMarkerIconById,
        findMarkerByRefId,
        findInfoWindowByMarkerRefId,
        onSelectMarkerIcon,
        onAddMarker,
        onAddMarkerInfoWindow,
        onUpdateMarkerInfoWindow,
        onRemoveMarker,
        onAddLine,
        onUpdateLine,
        onRemoveLine,
        onRemoveMap
      }}>
      {children}
    </MapContext.Provider>
  )
}