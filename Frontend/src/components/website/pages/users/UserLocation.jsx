import { useEffect, useState } from "react";

const UserLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
  
    const apiKey = 'bb4de8bde47494aa85f5a22834a4de6'; 
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
    const data = await response.json();
    console.log(data);
    const location = data.results[0].components;
  
    console.log("City:", location.city || location.town || location.village);
    console.log("State:", location.state);
    console.log("Country:", location.country);
  });
  

  return (
    <div>
      <h3>User Location</h3>
      {location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default UserLocation;
