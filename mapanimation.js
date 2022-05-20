
var position = [[],[]];
var markers = [];

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2licmFuYWxjYXphciIsImEiOiJjbDMyYTl2NjIwaG12M2NsY2poOTFqZmNqIn0.lUJQyIB_0hxcqAm4yrNzPA';
    
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 15
});

async function move(){
        const locations2 = await getBusLocations();
        console.log(new Date());
        console.log(locations2);
        position[0] =locations2[0].attributes.longitude;
        position[1] =locations2[0].attributes.latitude;
        console.log(position),
        //marker.setLngLat(position);
        map.flyTo({
            center: (position),
            speed: 0.5
            });
            
          const el = document.createElement('div');
          el.className = 'marker';
        markers.push(new mapboxgl.Marker(el).setLngLat(position).addTo(map));
        setTimeout(move, 15000);
}

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json(response);
    //console.log(json.data);
    return json.data;
}

move();