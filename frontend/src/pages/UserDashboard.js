import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import { ArrowLeft, Navigation2, Bed, Fan, Stethoscope, Car, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  const [directions, setDirections] = useState(null);
  const [routingTo, setRoutingTo] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAjE743pxGE5WrPPM0UBX6OVAuHrvkNyAI"
  });

  useEffect(() => {
    // Updated fallback to New Delhi, India instead of Nairobi, Kenya
    const fallback = { lat: 28.6139, lng: 77.2090 }; 
    
    const fetchHospitals = (lat, lng) => {
      axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/nearest-hospital?lat=${lat}&lng=${lng}`)
        .then(res => setHospitals(res.data))
        .catch(err => console.error("Error fetching hospitals: ", err));
    };

    let locationSet = false;

    if (navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        if (!locationSet) {
          locationSet = true;
          setUserLocation(fallback);
          fetchHospitals(fallback.lat, fallback.lng);
        }
      }, 1000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!locationSet) {
            locationSet = true;
            clearTimeout(timeoutId);
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setUserLocation({ lat, lng });
            fetchHospitals(lat, lng);
          }
        }, 
        (error) => {
          if (!locationSet) {
             locationSet = true;
             clearTimeout(timeoutId);
             console.error("Error getting location: ", error);
             setUserLocation(fallback);
             fetchHospitals(fallback.lat, fallback.lng);
          }
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setUserLocation(fallback);
      fetchHospitals(fallback.lat, fallback.lng);
    }
  }, []);

  const calculateRoute = (destination) => {
    if (!userLocation || !destination || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: destination.coordinates.lat, lng: destination.coordinates.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setRoutingTo(destination);
        } else {
          console.error(`error fetching directions ${status}`);
          if (status === 'ZERO_RESULTS') {
             alert("Could not find a driving route. The hospital may be too far away (e.g. across an ocean) from your current map location!");
          } else if (status === 'REQUEST_DENIED') {
             alert("Google Maps Error: REQUEST_DENIED. You need to enable the 'Directions API' in your Google Cloud Console for this API key!");
          } else {
             alert(`Could not calculate directions. Google Maps Error Status: ${status}`);
          }
        }
      }
    );
  };

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d.toFixed(1);
  };

  if (loadError) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Error Loading Google Maps</h2>
        <p>Your API key might be invalid or missing billing in Google Cloud.</p>
        <button className="btn btn-outline mt-4" onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 73px)', overflow: 'hidden' }}>
      
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)', background: 'white' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--primary)' }}>Nearby Hospitals</h1>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Find emergency facilities near your current location.</p>
        </div>
      </div>

      <div className="dashboard-layout" style={{ paddingTop: '1.5rem' }}>
        
        <div className="dashboard-map">
          {!isLoaded || !userLocation ? (
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--bg-body)' }}>
                <p>Loading map and locating you...</p>
             </div>
          ) : (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={userLocation}
              zoom={14}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeControl: true,
                streetViewControl: false,
              }}
            >
                <Marker 
                  position={userLocation} 
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }}
                />

                {!directions && hospitals.map((h, index) => (
                  <Marker
                    key={index}
                    position={{
                     lat: h.coordinates.lat,
                     lng: h.coordinates.lng
                    }}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    }}
                    onClick={() => setSelectedHospital(h)}
                  />
                ))}

                {selectedHospital && (
                  <InfoWindow
                    position={{
                      lat: selectedHospital.coordinates.lat,
                      lng: selectedHospital.coordinates.lng
                    }}
                    onCloseClick={() => setSelectedHospital(null)}
                  >
                    <div style={{ padding: '0.5rem', maxWidth: '200px' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{selectedHospital.name}</h3>
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem' }}>{selectedHospital.location}</p>
                      <button 
                         className="btn btn-primary"
                         style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: '100%' }}
                         onClick={() => {
                           calculateRoute(selectedHospital);
                           setSelectedHospital(null);
                         }}
                      >
                         <Navigation2 size={14} /> Get Directions
                      </button>
                    </div>
                  </InfoWindow>
                )}

                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                       polylineOptions: { strokeColor: "var(--primary)", strokeWeight: 5 },
                       suppressMarkers: false,
                    }}
                  />
                )}
            </GoogleMap>
          )}
            
          {directions && (
             <button 
                className="btn btn-primary"
                style={{ position: 'absolute', top: '1rem', right: '1rem', boxShadow: 'var(--shadow-lg)' }}
                onClick={() => {
                   setDirections(null);
                   setRoutingTo(null);
                }}
             >
               Clear Route
             </button>
          )}
        </div>

        <div className="dashboard-list">
           {hospitals.length === 0 && userLocation ? (
               <p style={{ textAlign: 'center', padding: '2rem' }}>No hospitals found nearby.</p>
           ) : (
              hospitals.map((hospital, idx) => {
                 const distance = userLocation 
                   ? getDistance(userLocation.lat, userLocation.lng, hospital.coordinates.lat, hospital.coordinates.lng) 
                   : "--";
                 
                 const isRoutingTarget = routingTo && routingTo._id === hospital._id;
                 
                 // Compute Blood Types dynamically based on true values
                 let availableBlood = [];
                 if (hospital.bloodBank) {
                    const bmap = {
                       A_pos: 'A+', A_neg: 'A-', B_pos: 'B+', B_neg: 'B-',
                       O_pos: 'O+', O_neg: 'O-', AB_pos: 'AB+', AB_neg: 'AB-'
                    };
                    Object.keys(bmap).forEach(key => {
                       if (hospital.bloodBank[key]) availableBlood.push(bmap[key]);
                    });
                 }
                 
                 return (
                   <div className="card hospital-item" key={idx} style={{ 
                       borderColor: isRoutingTarget ? 'var(--primary)' : 'var(--border)',
                       boxShadow: isRoutingTarget ? '0 0 0 2px var(--primary-light)' : 'var(--shadow-sm)'
                   }}>
                      <div className="hospital-header">
                         <div>
                            <h3 className="hospital-name">{hospital.name}</h3>
                            <p className="hospital-address" style={{ marginBottom: '0.25rem' }}>
                              <MapPin size={14} /> {hospital.location}
                            </p>
                            {hospital.contactNumber && (
                              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                 <strong>Tel:</strong> {hospital.contactNumber}
                              </p>
                            )}
                         </div>
                         <div style={{ textAlign: 'right' }}>
                            <span className="status-open">Open Now</span>
                            <p style={{ fontSize: '0.875rem', margin: '0.25rem 0 0' }}>{distance} km away</p>
                         </div>
                      </div>

                      <div className="facilities">
                         {hospital.facilities.oxygen && (
                            <span className="facility-tag available"><Fan size={12} /> Oxygen</span>
                         )}
                         {hospital.facilities.icuBeds > 0 && (
                            <span className="facility-tag available"><Bed size={12} /> {hospital.facilities.icuBeds} ICU Beds</span>
                         )}
                         {hospital.facilities.ventilator && (
                            <span className="facility-tag available"><Stethoscope size={12} /> Ventilator</span>
                         )}
                         {hospital.facilities.ambulance && (
                            <span className="facility-tag available"><Car size={12} /> Ambulance</span>
                         )}
                         {hospital.emergency && (
                            <span className="facility-tag available" style={{ background: '#FEE2E2', color: '#DC2626', borderColor: '#FEE2E2' }}>Emergency 24/7</span>
                         )}
                         
                         {availableBlood.length > 0 && (
                            <div style={{ width: '100%', marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
                               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>Blood Available: </span>
                               {availableBlood.map(bt => (
                                  <span key={bt} style={{ background: '#DC2626', color: 'white', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 700 }}>{bt}</span>
                               ))}
                            </div>
                         )}
                      </div>

                      <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         
                         <div>
                            {hospital.facilities.ambulance && hospital.contactNumber && (
                               <a 
                                 href={`tel:${hospital.contactNumber}`}
                                 className="btn btn-outline"
                                 style={{ padding: '0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#059669', borderColor: '#059669', background: '#D1FAE5' }}
                               >
                                  <Car size={14} color="#059669" /> Call Ambulance
                               </a>
                            )}
                         </div>

                         <button  
                           className={isRoutingTarget ? "btn btn-outline" : "btn btn-primary"}
                           onClick={() => calculateRoute(hospital)}
                           style={{ padding: '0.5rem 1rem' }}
                         >
                            <Navigation2 size={16} /> 
                            {isRoutingTarget ? "Routing Active" : "Directions"}
                         </button>
                      </div>
                   </div>
                 );
              })
           )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
