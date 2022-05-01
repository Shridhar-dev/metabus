import { useEffect, useState } from "react";
import L, { point } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import "lrm-graphhopper"



L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/fuel-pump_26fd.png",
  iconSize: [32,45],  
});

  const Routing = ({ stations }) => {
  const map = useMap();
  

 
  

    useEffect(() => {
      if (!map) return;

          //console.log(stations)
          const routingControl = L.Routing.control({
          waypoints: 
            stations
          ,
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: "#1d4ed8", weight: 4 }]
          },
          router: L.Routing.graphHopper(process.env.REACT_APP_MAP_KEY),
          show: true,
          showAlternatives: true,
          addWaypoints: true, 
          fitSelectedRoutes: true,
        }).addTo(map);
        routingControl.hide();
        return () => map.removeControl(routingControl);
      
      


    }, [map, stations]);   

  return null;
}

export default Routing;