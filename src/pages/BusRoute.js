import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';

import { db } from '../firebase'
import { doc, getDoc } from "firebase/firestore";

import { MapContainer, Marker, Popup, TileLayer,Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { stationIcon } from '../Marker';
import Routing from 'leaflet';

function BusRoute() {
   const [loc,setLoc] =  useState([0,0]);
   const [loading,setLoading] =  useState(false);
   const [bus,setBus] =  useState();
   const [map, setMap] = useState(null);

   let { id } = useParams();


   function setLines(stations){
    let lines = [];
        stations.forEach((station,index)=>{
            lines.push([station.lat,station.long])
        })
    
        return lines;
   }    

  useEffect(() => {
    async function run(){
        const docRef = doc(db, "buses", id);
        const docSnap = await getDoc(docRef);
        setBus(docSnap.data());
        setLoc([docSnap.data().stations[0].lat,docSnap.data().stations[0].long])
        setLoading(true);
    }
    run();
  })
  

  return (
    loading &&
      <div>
    <MapContainer center={loc} zoom={10} scrollWheelZoom={false} style={{height:"100vh"}} whenCreated={setMap}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  
  <Routing map={map} />
  {
    bus.stations.map((station,index)=>{
      return(
        <Marker position={[station.lat,station.long]} icon={stationIcon} key={index}>
            <Popup>
                {station.time}
            </Popup>
        </Marker>
      )
    })

    
  }
<Polyline pathOptions={{ color: 'lime' }} positions={setLines(bus.stations)} />

</MapContainer>
<div className="bg-white text-black fixed left-0 bottom-0 p-10 z-[400]">
    <h1 className='text-xl mb-2'>Routes</h1>
 {
     bus.stations.map((station,index)=>{
        return(
            <div key={index}> {index+1}. {station.time}</div>
        )
      })
 }
</div>
</div>
  )
}

export default BusRoute