import React, { useState,useEffect } from 'react'

import { db } from '../firebase'
import { updateDoc,doc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authenticate } from '../utilities/auth';

function Tracking() {
  const [id, setId] = useState()
  const [track, setTrack] = useState(false)
  let gid;

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setId(currUser.uid)
      } else {
        let user = authenticate();
        setId(user.uid);
      }
    });
    
  },[])

  

  async function tracker(e){

      setTrack(!track)
      if(e){
        gid = navigator.geolocation.watchPosition(
            position => {
             const { latitude, longitude } = position.coords;
                updateDoc(doc(db, "buses", id), {
                    isTracking:true,
                    currentLocation: {
                        lat: latitude,
                        long: longitude,
                    },
                    
                });
            }, 
            error => console.log(error),
            { 
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
              distanceFilter: 10
            }
           );
      }
      else{
        navigator.geolocation.clearWatch(gid);
        updateDoc(doc(db, "buses", id), {
          isTracking: false,
        });
      }
  }

  return (
    <div className='flex items-center justify-center flex-col text-2xl h-screen'>
        Your Bus id: {id}
        <button className='mt-5 bg-blue-700 text-white p-3 rounded' onClick={()=>{tracker(!track);}}>{track?"Stop":"Start"} Tracking!</button>
    </div>
  )
}

export default Tracking