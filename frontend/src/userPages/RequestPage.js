import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Img1 from '../images/text1.jpg'
import Img2 from '../images/voice.jpg'
import Img3 from '../images/sos.png'
import '../css/RequestPage.css'

function RequestPage() {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate=useNavigate()
  const location=useLocation()
  const id=(location.pathname.split('/'))[3]
  const role=(location.pathname.split('/'))[2]
  // Define the style for the selected and unselected options
  const optionStyle = {
    border: '2px solid #333',
    padding: '20px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: '#fff',
  };

  const selectedOptionStyle = {
    ...optionStyle,
    backgroundColor: '#4CAF50', // Green background for the selected option
    color: '#fff', // White text for the selected option
  };

  // Handle click events for each option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option);

    // Perform actions based on the selected option
    if (option === 'text') {
      // Handle text option
      navigate(`/textRequest/${role}/${id}`)
    } else if (option === 'voice') {
      // Handle voice option
      navigate('/voiceRequest')
    } else if (option === 'sos') {
      // Handle SOS option
      navigate('/sosRequest')
    }
  };

  return (
    <div className='requestPageBody'>
      <div className="out">
        <div className="d1">
          <h1>REPORT CRISIS</h1>
        </div>
        <div className="d2">
            <div className="item i1">
                <img className="img1" src={Img1} alt=""
                onClick={() => handleOptionClick('text')}/>
            </div>
            <div className="item i2" onClick={() => handleOptionClick('voice')}>
                <img className="img2" src={Img2} alt=""/>
            </div>
        </div>
        <div className="d3">
            <div id="outerContainer">
                <div className="container radialStripes">
                  <div className="img">
                      <img className='im3' src={Img3} alt="" onClick={() => handleOptionClick('sos')}/>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPage;
