import { useEffect } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, LayersControl, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { BaseLayer } = LayersControl;

const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  const coordinates = [
    [-48.294766598235, -19.865821391011355],
    [-47.689350034557, -19.865821391011355],
    [-47.689350034557, -19.54544833169645],
    [-48.294766598235, -19.54544833169645],
    [-48.294766598235, -19.865821391011355]
  ];

  const bounds = [
    [Math.min(...coordinates.map(coord => coord[1])), Math.min(...coordinates.map(coord => coord[0]))], 
    [Math.max(...coordinates.map(coord => coord[1])), Math.max(...coordinates.map(coord => coord[0]))]  
  ];

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
        <LayersControl.Overlay checked name="TIFF Layer">
          <ImageOverlay
          // url="https://i.imgur.com/GT7VF8x.png" 
           url="https://i.imgur.com/GGPbf2Y.png" 

            bounds={bounds} 
          />
        </LayersControl.Overlay>
        {/* Adicione outras camadas Overlay conforme necessário */}
      </LayersControl>
      {children}
    </MapContainer>
  );
};

export default Map;
