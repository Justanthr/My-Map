// Get the user's coordinates:                                                              
if (!navigator.geolocation){
    console.log('Your browser does not support geolocation feature')
} else {
    navigator.geolocation.getCurrentPosition(getPosition)
}
   function getPosition(position){
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
  
 map = myMap
}

myMap = map

  //forsquare 
  async function fourSquare(business) {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'fsq3rPwgNHEMIlHjA7eHoIJAaKzA0BX5wgcNlSyI0Xw5XcI='
      }
    };

    let limit = 5
    let latitude = getPosition()
    let longitude =  getPosition()
	let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${business}&limit=${limit}&ll=${latitude}%C${longitude}`, options)

	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
  }

  function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await fourSquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})