// Get the user's coordinates:                                                              
if (!navigator.geolocation){
    console.log('Your browser does not support geolocation feature')
  } else {
    navigator.geolocation.getCurrentPosition(getPosition)
  }
   async function getPosition(position){
     const lat = position.coords.latitude
     const lng = position.coords.longitude
     console.log(lat, lng)
    
     // Create map:                                                 
    const myMap = L.map('map', {
      center: [lat, lng],
      zoom: 12,
    })
  
    //userLocation marker
    L.marker([lat, lng]).addTo(myMap).bindPopup('<p1><b>You are here</b></p1>').openPopup()
  
    // Add OpenStreetMap tiles:
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap)
  
  //markers
  const polygon = L.polygon(map, {
  color: 'blue', 
  fillOpacity: 0.0
  }).addTo(myMap)
   }
  
  //forsquare 
  async function fourSquare() {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'fsq3rPwgNHEMIlHjA7eHoIJAaKzA0BX5wgcNlSyI0Xw5XcI='
      }
    };
  
  }
