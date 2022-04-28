import React,{ useEffect,useState } from 'react'
import { Link } from 'react-router-dom';

import { collection,query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import myIcon,{busIcon} from '../Marker';


function BusMap() {
   const [loc,setLoc] =  useState([0,0]);
   const [loading,setLoading] =  useState(false);
   const [buses,setBuses] =  useState({});
 

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos)=>{
            setLoc([pos.coords.latitude,pos.coords.longitude])
            setLoading(true)
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
  },[])


  async function run(){
    
    const q = query(collection(db, "buses"), where("isTracking", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    if(doc.data().currentLocation !== undefined){
      let bus = {
        id:doc.id,
        coords:[doc.data().currentLocation.lat,doc.data().currentLocation.long],
        name:doc.data().name,
      }
      let stateCopy = Object.assign({}, buses);
      stateCopy[doc.id] = bus;
  
      setBuses(stateCopy);
      
    }
    });
  }

  useEffect(() => {
    run();
  },[])
  

  return (
    loading &&
      <div>
        <MapContainer center={loc} zoom={10} scrollWheelZoom={false} style={{height:"100vh"}} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={loc} icon={myIcon}>
            <Popup>
              Your Location
            </Popup>
          </Marker>
          
          {
            Object.keys(buses).map((key, i)=>{
       
              return(
                <Marker position={buses[key].coords} icon={busIcon} key={i}>
                  <Popup>
                    {buses[key].name}
                    <br/>
                    <Link to={`/busroute/${buses[key].id}`}>Check Routes and Timings</Link>
                  </Popup>
                </Marker>
              )
            })

          }
        </MapContainer>
        <div className="bg-white text-black fixed left-5 bottom-5 p-10 z-[400] rounded shadow-md max-w-xs">
          <h1 className='text-xl font-semibold mb-5'>Your Location:</h1>
          <div>Latitude: {loc[0]}</div>
          <div className='mb-2'>Longitude: {loc[1]}</div>
          Click on the Bus Icon on map for more information
        </div>
    </div>
  )
}

export default BusMap