async function getLocation(lat,lng){
    console.log(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=region&access_token=key`,lat,lng)
    let res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=region&access_token=key`);
    let data =  res.json();
    console.log(data)
}