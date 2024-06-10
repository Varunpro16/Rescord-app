import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/WaitingPage.css'

const socket = io('http://localhost:5000', { withCredentials: true});



const WaitingPage = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const id=(location.pathname.split('/'))[3]
    const role=(location.pathname.split('/'))[2]
    const [popup,setPopup]=useState(false)
    const [detail,setDetail]=useState(null)

    // useEffect(() => {
    //     // Check if the page has been reloaded before
    //     if (!localStorage.getItem('pageReloaded')) {
    //     // The page has not been reloaded before, so set the flag
    //     localStorage.setItem('pageReloaded', 'true');
    //     } else {
    //     // The page has already been reloaded once, so prevent further reloads
    //     // You can display a message or take other actions as needed
    //     console.log('Page already reloaded once');
    //     }
    // }, []); // Empty dependency array means this effect runs once on mount

    useEffect(()=>{
            socket.on('connect', () => {
                console.log(`${role} connected`);
            });
            socket.on("pageConnect",(data)=>{
                if(data.neededTypes.includes(role)){
                    setPopup(true)
                    setDetail(data)
                }
            })
            socket.on('disconnect', () => {
                console.log(`${role} disconnected`);
            });
        }
    )
    const handleAccept = async () => {
        const res =await axios.post('http://localhost:5000/addAgency',{
            agencyId:id,
            missionId:detail.missionId
        })
        if(res.data.status==='success'){
            navigate(`/onMission/${role}/${res.data.missionId}/${id}`)
        }else{
            alert('error occured')
            window.location.reload()
        }
    }
    const handleReject = async () => {
        window.location.reload()
    }
    return (
        <div>
            <div className="waiting-page">
                WaitingPage
                {popup && (
                <div className="popup-box">
                    <div className="popup-content">
                    <div className="popup-text">
                        <div>Location:{' '}{detail.location[1]}{', '}{detail.location[0]}</div>
                        <div>IssueType:{' '}{detail.issueType}</div>
                        <div>MissionId:{' '}{detail.missionId}</div>
                    </div>
                    <div className="popup-buttons">
                        <button className="accept-button" onClick={handleAccept}>
                        Accept
                        </button>
                        <button className="reject-button" onClick={handleReject}>
                        Reject
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </div>

    )
}

export default WaitingPage