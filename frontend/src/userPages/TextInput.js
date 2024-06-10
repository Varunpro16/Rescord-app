import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '../css/TextInput.css'
import axios from 'axios'
import Fire from '../images/fire.jpg'
import Landslide from '../images/landslide.jpeg'
import Flood from '../images/flood.jpeg'
import Avalanche from '../images/avalanche.jpeg'
import Tsunami from '../images/tsunami.jpeg'
import Earthquake from '../images/earthquake.jpeg'

const socket = io('http://localhost:5000', { withCredentials: true });



function TextInput() {

  useEffect(() => {
    const autocomplete = new GeocoderAutocomplete(
      document.getElementById("autocomplete"), 
      'de684c33daa441bc9e3ae6b6580d11c7', 
      { /* Geocoder options */ }
    );
    
    autocomplete.on('select', (location) => {
      // check selected location here 
      setLocationInput(location.geometry.coordinates);
      console.log(location.geometry.coordinates);
    });

    autocomplete.on('suggestions', (suggestions) => {
      // process suggestions here
      console.log(suggestions);
    });
  }, []); // Empty dependency array to ensure this effect runs once


  const [currentLocation, setCurrentLocation] = useState(null);
  const [inputNone,setInputNone]=useState({
    display:'none'
  })
  // State to track the selected div
  const [selectedDiv, setSelectedDiv] = useState(null);
  // State to track the selected location option
  const [selectedLocationOption, setSelectedLocationOption] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const location=useLocation()
  const navigate=useNavigate()
  const id=(location.pathname.split('/'))[3]
  const role=(location.pathname.split('/'))[2]

  // Define the style for the selected and unselected divs
  const divStyle = {
    border: '2px solid #333',
    padding: '5px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
  };

  const selectedDivStyle = {
    ...divStyle,
    backgroundColor: '#4CAF50', // Green background for the selected div
    color: '#fff', // White text for the selected div
  };

  // Handle click events for each div
  const handleDivClick = (div) => {
    setSelectedDiv(div);
  };



  // Handle location option change
  const handleLocationOptionChange = (event) => {
    if(event.target.value==='access'){
      setInputNone({
        display:'none'
      })
    }else if(event.target.value==='enter'){
      setInputNone({
        display:'block'
      })
    }
    setSelectedLocationOption(event.target.value);
  };
  const handleSubmit = async (e) => {
    if(locationInput && selectedDiv){
      console.log("loc: ",locationInput);
      console.log("div: ",selectedDiv);
      const res =await axios.post('http://localhost:5000/requestSubmit',{
        location:locationInput,
        issueType:selectedDiv,
        id:id
      })
      if(res.data.status==="success"){
        navigate(`/onMission/${role}/${res.data.missionId}/${id}`)
      }else{
        alert('Error Occured Resubmit')
        window.location.reload();
      }
    }else if(selectedDiv){
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocationInput({ latitude, longitude });
        });
      } else {
        alert('Geolocation is not supported in this browser.');
      }
    }
  }
   return (
    <>
    <div class="grid-container">
      <div
      class="grid-item"
        style={selectedDiv === 'flood' ? selectedDivStyle : divStyle}
        onClick={() => handleDivClick('flood')}
      >
       <img src={Flood} alt="Image 1"/>
       <span className='heading heading1'>Flood</span>
      </div>
      <div
      class="grid-item"
        style={selectedDiv === 'earthquake' ? selectedDivStyle : divStyle}
        onClick={() => handleDivClick('earthquake')}
      >
        <img src={Earthquake} alt="Image 1"/>
        <span className='heading heading2'>Earthquake</span>
      </div>
      <div
      class="grid-item"
        style={selectedDiv === 'tsunami' ? selectedDivStyle : divStyle}
        onClick={() => handleDivClick('tsunami')}
      >
        <img src={Tsunami} alt="Image 1"/>
        <span className='heading heading3'>Tsunami</span>
      </div>
      <div
      class="grid-item"
        style={selectedDiv === 'avalanche' ? selectedDivStyle : divStyle}
        onClick={() => handleDivClick('avalanche')}
      >
        <img src={Avalanche} alt="Image 1"/>
        <span className='heading heading4'>Avalanche</span>
      </div>
      <div
      class="grid-item"
        style={selectedDiv === 'landslide' ? selectedDivStyle : divStyle}
        onClick={() => handleDivClick('landslide')}
      >
        <img src={Landslide} alt="Image 1"/>
        <span className='heading heading5'>Landslide</span>
      </div>
      <div
      class="grid-item"
        style={selectedDiv === 'fire' ? selectedDivStyle : divStyle}
        onClick={() => handleDivClick('fire')}
      >
        <img src={Fire} alt="Image 1"/>
        <span className='heading heading6'>Fire</span>
      </div>
    </div>
    {/* Options for accessing or entering location */}
      <div>
      <div className="row">
        <div className='locationInput'>
          <label>
            <input

              type="radio"
              name="locationOption"
              value="access"
              onChange={handleLocationOptionChange}
            />{' '}
            Access Current Location
          </label>
        </div>
        <div className='locationInput'>
          <label>
            <input
            
              type="radio"
              name="locationOption"
              value="enter"
              onChange={handleLocationOptionChange}
            />{' '}
            Enter Location
          </label>
        </div>
      </div>
      <div id="autocomplete" className="autocomplete-container" style={inputNone}></div>
      <div className="row">
        <button onClick={handleSubmit} className="span-2">
          Submit
        </button>
      </div>
    </div>
    </>
  );
}

export default TextInput