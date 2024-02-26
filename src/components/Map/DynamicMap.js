import { useEffect } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { BaseLayer } = LayersControl;

const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
        //iconUrl: 'leaflet/images/layers.png'
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
        </BaseLayer>
        <BaseLayer name="Black and White">
          <TileLayer
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
        </BaseLayer>
        {/* Adicione outras camadas BaseLayer conforme necessário */}
      </LayersControl>
      {children}
    </MapContainer>
  );
};

export default Map;
