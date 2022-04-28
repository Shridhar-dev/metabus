import L from 'leaflet';


const myIcon = new L.Icon({
    iconUrl: 'https://emojipedia-us.s3.amazonaws.com/source/skype/289/round-pushpin_1f4cd.png',
    iconRetinaUrl: 'https://emojipedia-us.s3.amazonaws.com/source/skype/289/round-pushpin_1f4cd.png',
    popupAnchor:  [-0, -0],
    iconSize: [40,42],     
});

const stationIcon = new L.Icon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/fuel-pump_26fd.png',
    iconRetinaUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/fuel-pump_26fd.png',
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

const busIcon = new L.Icon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/310/bus_1f68c.png',
    iconRetinaUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/310/bus_1f68c.png',
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});


export default myIcon;
export {stationIcon,busIcon};