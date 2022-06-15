import React, { useEffect } from 'react';
import { AuthenticationType } from 'azure-maps-control';
import atlasMap from 'azure-maps-control';

interface AtlasWindow extends Window {
  atlas: any;
}
declare let window: AtlasWindow;
function GetMap() {
  //Initialize a map instance.
  let map: atlasMap.Map;
  const atlas = window.atlas;
  console.log(atlas);
  map = new atlas.Map('myMap', {
    center: [85.32767705161245, 27.705308474955412],
    zoom: 13,
    view: 'Auto',
    style: 'satellite',
    showLogo: false,
    showFeedbackLink: false,
    //Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: 'Wsh5kbtxkT8Poz2ojh8uCMRLvZSMrp1MOP-VOdULq90',
    },
  });

  //Wait until the map resources are ready.
  map.events.add('ready', function () {
    //Create a marker and add it to the map.
    if (document.querySelector('.azure-map-copyright')) {
      //@ts-ignore
      document.querySelector('.azure-map-copyright').style.display = 'none';
    }
    let marker = new atlas.HtmlMarker({
      position: [85.32767705161245, 27.705308474955412],
    });
    map.markers.add(marker);

    //When the map is clicked, animate the marker to the new position.
    map.events.add('click', function (e) {
      map.markers.remove(marker);
      marker = new atlas.HtmlMarker({
        position: e.position,
      });
      map.markers.add(marker);
    });
  });
}
const DefaultMap: React.FC = () => {
  useEffect(() => {
    GetMap();
  });
  return (
    <div
      id="myMap"
      style={{
        width: '500px',
        height: '500px',
      }}
    ></div>
  );
};

export default DefaultMap;
