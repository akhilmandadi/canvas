import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/index"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = () => {
        this.props.logoutUser({})
    }

    render() {
        let redirectVar = <Redirect to="/signin" />
        let navBar = null;
        if (sessionStorage.getItem("email") === null) {
            navBar = (
                <div style={{ verticalAlign: "center", width: "98%" }}>
                    {redirectVar}
                    <div class="row" style={{
                        height: "40px", backgroundColor: "#fff",
                        boxShadow: "0 0 2px 1px hsla(0,0%,69%,.3)", textAlign: "center"
                    }}>
                        <Typography color="textSecondary" gutterBottom variant=""
                            style={{ display: "inline", marginRight: "5px", fontSize: "22px", fontWeight: "600" }}>
                            Connecting To
                    </Typography>
                        <img src="https://ok2static.oktacdn.com/fs/bco/4/fs0amebisreoB7xDi0x7"
                            alt="SJSU Single Sign-on"
                            class="logo sanjosestateuniversity_devshibbolethsp_1"
                            style={{ height: "30px" }} />
                    </div>
                </div>
            )
        } else {
            navBar = null;
        }
        return (
            <div>
                {navBar}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: payload => dispatch(logoutUser(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);