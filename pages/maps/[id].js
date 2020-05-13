import { getMapName } from "../../actions/map";
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../config';
import MapShow from '../../components/map/MapShow';

const MapId = ({ mapName, id }) => {
  const head = () => (
    <Head>
      <title>{mapName} - {APP_NAME}</title>
      <meta name="description" content={`View my map ${mapName} on ${APP_NAME}!`} />
      <link rel="canonical" href={`${DOMAIN}/maps/${id}`} />
      <meta property="og:title" content={`${mapName} - ${APP_NAME}`} />
      <meta property="og:description" content={`View my map ${mapName} on ${APP_NAME}!`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/maps/${id}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/map3.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/map3.jpg`} />
      <meta property="og:image:type" content="image/jpg" />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content={DOMAIN} />
      <meta name='twitter:title' content={APP_NAME} />
      <meta name='twitter:description' content={`View my map ${mapName} on ${APP_NAME}!`} />
      <meta name='twitter:image' content={`${DOMAIN}/map3.jpg`} />
      <meta name='twitter:creator' content='@travelingtice' />
    </Head>
  )
  return (
    <>
      {head()}
      <MapShow id={id} />
    </>
  )
}

MapId.getInitialProps = ({ query }) => {
  return getMapName(query.id).then(data => {
    if (data.error) return console.log(data.error);

    return { mapName: data.mapName, id: query.id }
  });
}

export default MapId;