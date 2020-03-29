import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import dashboard from './images/dashboard.png'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import AirplayIcon from '@material-ui/icons/Airplay';
import HelpIcon from '@material-ui/icons/Help';
import InboxIcon from '@material-ui/icons/Inbox';
import '../App.css'

function DashboardNavbar() {
    return <div>
        <div style={{ padding: "20px 2px 20px", width: "80px" }}>
            <img src="https://ok2static.oktacdn.com/fs/bco/4/fs0amebisreoB7xDi0x7"
                alt="SJSU Single Sign-on"
                class="logo sanjosestateuniversity_devshibbolethsp_1"
                style={{ height: "24px", width: "60px" }} />
        </div>
        <div className="leftnav" style={{ backgroundColor: "#0055a2", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 15px 0px", margin: "0px" }}>
                <Avatar variant="circle" src="https://sjsu.instructure.com/images/messages/avatar-50.png"
                    style={{ padding: "0px", margin: "0px", cursor: "pointer", width: "30px", height: "30px",border:"2px solid white" }} />
            </div>
            <p style={{ color: "#fff", margin: "0px", paddingLeft: "5px", paddingBottom: "5px" }}>Account</p>
        </div>
        <div style={{ backgroundColor: "#fff", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 10px 0px", margin: "0px" }}>
                <img src={dashboard}
                    style={{ padding: "0px", margin: "0px", width: "40px", height: "30px" }} />
            </div>
            <p style={{ color: "#0055a2", margin: "0px", fontWeight: "600", paddingLeft: "3px", paddingBottom: "5px", fontSize: "12px" }}>Dashboard</p>
        </div>
        <div className="leftnav" style={{ backgroundColor: "#0055a2", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 8px 0px", margin: "0px" }}>
                <MenuBookIcon
                    style={{ padding: "0px", margin: "0px", width: "45px", height: "35px", color: "white" }} />
            </div>
            <p style={{ color: "#fff", margin: "0px", paddingLeft: "5px", paddingBottom: "5px" }}>Courses</p>
        </div>
        <div className="leftnav" style={{ backgroundColor: "#0055a2", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 8px 0px", margin: "0px" }}>
                <GroupIcon
                    style={{ padding: "0px", margin: "0px", width: "45px", height: "35px", color: "white" }} />
            </div>
            <p style={{ color: "#fff", margin: "0px", paddingLeft: "9px", paddingBottom: "5px" }}>Groups</p>
        </div>
        <div className="leftnav" style={{ backgroundColor: "#0055a2", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 8px 0px", margin: "0px" }}>
                <EventIcon
                    style={{ padding: "0px", margin: "0px", width: "45px", height: "35px", color: "white" }} />
            </div>
            <p style={{ color: "#fff", margin: "0px", paddingLeft: "5px", paddingBottom: "5px" }}>Calendar</p>
        </div>
        <div className="leftnav" style={{ backgroundColor: "#0055a2", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 8px 0px", margin: "0px" }}>
                <InboxIcon
                    style={{ padding: "0px", margin: "0px", width: "45px", height: "35px", color: "white" }} />
            </div>
            <p style={{ color: "#fff", margin: "0px", paddingLeft: "12px", paddingBottom: "5px" }}>Inbox</p>
        </div>
        <div className="leftnav" style={{ backgroundColor: "#0055a2", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 8px 0px", margin: "0px" }}>
                <AirplayIcon
                    style={{ padding: "0px", margin: "0px", width: "45px", height: "35px", color: "white" }} />
            </div>
            <p style={{ color: "#fff", margin: "0px", paddingLeft: "10px", paddingBottom: "5px" }}>Studio</p>
        </div>
        <div className="leftnav" style={{ backgroundColor: "#0055a2", width: "65px", cursor: "pointer" }}>
            <div style={{ padding: "5px 8px 0px", margin: "0px" }}>
                <HelpIcon
                    style={{ padding: "0px", margin: "0px", width: "45px", height: "35px", color: "white" }} />
            </div>
            <p style={{ color: "#fff", margin: "0px", paddingLeft: "15px", paddingBottom: "5px" }}>Help</p>
        </div>
    </div>;
}

export default DashboardNavbar;