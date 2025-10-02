import React from "react";

const GoogleMap = ({ location }) => {
  const key = 'AIzaSyAvRdFjnBdFTO9-YsVsrUboAnl4cbB-Gqo'; // store key in .env
  return (
    <div className="w-full h-[300px] mt-4">
      <iframe
        title="Google Map"
        className="w-full h-full rounded-lg shadow"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(
          location
        )}`}
      ></iframe>
    </div>
  );
};

export default GoogleMap;
