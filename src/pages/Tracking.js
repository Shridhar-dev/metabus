import React, { useState,useEffect } from 'react'

import { db } from '../firebase'
import { updateDoc,doc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authenticate } from '../utilities/auth';
import { useBeforeunload } from 'react-beforeunload';

function Tracking() {
  const [id, setId] = useState()
  const [track, setTrack] = useState(false)
  const [location, setLocation] = useState({})
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

    /*function chunkize(arr, length){
      let chunkArr=[];
      let chotaChunkArr=[]
      let x = 1;  
      arr.forEach((ele)=>{
        if(x > length){
          chunkArr.push(chotaChunkArr);
          chotaChunkArr=[];
          x=1;
        }
        chotaChunkArr.push(ele);
        x++;
      })
      chunkArr.push(chotaChunkArr);
      return chunkArr;
    }
    console.log(chunkize([1, 2, 3, 4, 5, 6,7,8,9],3))*/
  },[])

  useBeforeunload((event) => {
    event.preventDefault();
    updateDoc(doc(db, "buses", id), {
      isTracking: false,
    });
  });
  
  async function startTracking() {
    setTrack(!track)
   
    gid = navigator.geolocation.watchPosition((pos)=>{setLocation({lat:pos.coords.latitude,long:pos.coords.longitude})});
    console.log(location)
    updateDoc(doc(db, "buses", id), {
      isTracking:true,
      currentLocation: {
          lat: location.lat,
          long: location.long,
      },
    
    });
  }


  async function stopTracking(){
    setTrack(!track)
    navigator.geolocation.clearWatch(gid);
      updateDoc(doc(db, "buses", id), {
        isTracking: false,
    });
  }
  

  return (
    <div className='flex items-center justify-center flex-col text-2xl h-screen'>
        Your Bus id: {id}
        <button className='mt-5 bg-blue-700 text-white p-3 rounded' onClick={track ? stopTracking : startTracking}>{track?"Stop":"Start"} Tracking!</button>
    </div>
  )
}

export default Tracking