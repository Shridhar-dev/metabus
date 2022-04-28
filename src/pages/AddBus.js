import React, { createContext, useContext, useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { MultiStepForm, Step } from 'react-multi-form';

import { db } from '../firebase'
import { setDoc, doc} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { MapContainer, Marker, Popup, TileLayer, useMapEvents,Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { stationIcon } from '../Marker';

import { authenticate } from '../utilities/auth';

let DataContext = createContext();



const LocationFinderDummy = () => {
    
    let context = useContext(DataContext);
    /*async function getLocation(lat,lng){
        console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=region&access_token=key`,lat,lng)
        let res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=region&access_token=key`);
        let data =  res.json();
        console.log(data)
    }*/
    const map = useMapEvents({
        
        click(e) {
           // getLocation(e.latlng.lat,e.latlng.lng);
            context.setModal(true);
            context.setLat(e.latlng.lat);
            context.setLng(e.latlng.lng);
            
        },
    });
    return null;
};

function AddBus() {
 
  const [name,setName] =  useState(null);
  const [active, setActive] = useState(1)
  const [time,setTime] = useState(0);
  const [modal,setModal] = useState(false);
  const [stations,setStations] = useState([]);
  const [lat,setLat] = useState(0);
  const [lng,setLng] = useState(0);

  const mapRef = useRef()

  let user;
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        if(user === undefined){
            user = authenticate();
        }
        await setDoc(doc(db, 'buses',user.uid), {
            name: name,	
            stations: stations,
            reports:0,
            user: user.uid,
            isTracking:false
        })

        navigate('/getmap');
      
    } catch (err) {
      alert(err)
    }
  }

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        user = currUser;
        // ...
      } else {
        user = authenticate()
      }
    });
    
  },[])

  useEffect(() => {
      if(mapRef.current !== null && mapRef.current !== undefined){
        setTimeout(() => { 
            mapRef.current.leafletElement.invalidateSize(); 
        }, 250); 
      }
  }, [mapRef.current])
  

    function setLines(){
        let lines = [];
        stations.forEach((station,index)=>{
            lines.push([station.lat,station.long])
        })
       
        return lines;
    }


    
    
  return (
    <DataContext.Provider value={{data:stations,setData:setStations,time:time,setModal:setModal,setLat:setLat,setLng:setLng}}>
      <div className='flex flex-col justify-center items-center w-full my-5' >
        <div className=' w-9/12'>
            <MultiStepForm activeStep={active}>
                <Step label="Details">
                    <div className='w-full'>
                        <input placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>     
                    </div>
                </Step>
                <Step label="Bus stops">
                    <div className='relative'>
                        <MapContainer ref={el => {mapRef.current = el}} center={[10,10]} zoom={10} scrollWheelZoom={false} style={{height:"60vh"}}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationFinderDummy />
                            {
                                stations?.map((station,index)=>(
                                    <Marker position={[station.lat,station.long]} icon={stationIcon}>
                                        <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                ))
                            }
                        </MapContainer>
                        <div>
                            Stations:
                            {
                                stations?.map((station,index)=>(
                                    <div>
                                        {station.lat}, {station.long} - {station.time}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Step>
                <Step label="Confirmation">
                    <div className='relative'>
                        <MapContainer center={[10,10]} zoom={10} scrollWheelZoom={false} style={{height:"60vh"}}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                stations?.map((station,index)=>(
                                    <Marker position={[station.lat,station.long]} icon={stationIcon}>
                                        <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                ))
                            }
                            
                            <Polyline pathOptions={{ color: 'lime' }} positions={setLines()} />
                        </MapContainer>
                        <button className='bg-blue-700 text-white p-5 my-5' onClick={handleSubmit}>Submit</button>
                    </div>
                </Step>
            </MultiStepForm>
            {active !== 1 && (
                <button onClick={() => setActive(active - 1)}>Previous</button>
            )}
            {active !== 3 && (
                <button
                onClick={() => setActive(active + 1)}
                style={{ float: 'right' }}
                >
                Next
                </button>
            )}
            
            
        </div>
        <div className={`${modal ? 'flex flex-col items-center justify-center ' : 'hidden'} h-screen w-screen bg-white z-[400] fixed top-0 left-0`}>
                <div className='border border-black w-3/4 md:w-1/2 py-10 flex flex-col items-center justify-center text-center text-xl'>
                    <div>Enter the timing of the station as <br/> Lat:{lat} and Long:{lng}</div>
                    <input type="time" onChange={(e)=>{setTime(e.target.value)}}/>
                    <button 
                    className='bg-blue-700 text-white p-5 my-5 rounded'
                    onClick={()=>{
                        setModal(false)
                        setStations([...stations,{ lat :lat,long: lng, time:time}])
                        setTime(0);
                        setLat(0);
                        setLng(0);
                    }}>Done</button>
                </div>
        </div>
    </div>
    </DataContext.Provider>
  )
}

export default AddBus