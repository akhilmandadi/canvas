import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/index"

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidCredentials: '',
            email: "",
            password: "",
            invalidEmail: false
        }
        this.authenticateUser = this.authenticateUser.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
    }

    authenticateUser = (event) => {
        event.preventDefault();
        this.props.loginUser({ "email": this.state.email, "password": this.state.password })
    }

    emailChangeHandler = (event) => {
        if (/.+@.+\.[A-Za-z]+$/.test(event.target.value)) {
            this.setState({
                invalidEmail: false,
                email: event.target.value
            })
        } else {
            this.setState({
                invalidEmail: true,
                email: event.target.value
            })
        }
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    validateCredentials = (event) => {
        if (!this.state.invalidEmail && this.state.password !== "") return false
        else return true
    }

    render() {
        let home = null;
        if (sessionStorage.getItem("email") !== null) {
            home = <Redirect to="/dashboard" />
        }
        return (
            <div style={{ marginTop: "20px", overflowX: "hidden" }}>
                {home}
                <div class="container" style={{ width: "400px", border: "1px solid #ddd", backgroundColor: "white" }}>
                    <div class="login-form">
                        <div className="row" style={{ width: "400px", borderBottom: "1px solid #ddd", padding: "30px 90px 30px" }}>
                            <img src="https://ok2static.oktacdn.com/fs/bco/1/fs01heub3azJBMXWF0x7"
                                class="auth-org-logo" alt="San Jose State University logo"
                                style={{ width: "200px", height: "40px" }} />
                        </div>
                        <div className="row" >
                            <form className="form" onSubmit={this.authenticateUser} style={{ padding: "0px 42px 0px" }}>
                                <div className="form-group" style={{ padding: "10px 120px 5px" }}>
                                    <h2 style={{ color: "#5E5E5E", fontWeight: "600", fontSize: "15px", fontFamily: "proxima nova,Arial,Helvetica,sans-serif" }}>Sign In</h2>
                                </div>
                                <div class="form-group" style={{ marginBottom: "10px" }}>
                                    <label for="emailId">
                                        <h2 style={{ padding: "0px", margin: "0px", color: "#5E5E5E", fontWeight: "600", fontSize: "14px", fontFamily: "proxima nova,Arial,Helvetica,sans-serif" }}>SJSU Email Id</h2>
                                    </label>
                                    <p style={{ marginBottom: "3px", color: "#a7a7a7", fontWeight: "400", fontSize: "14px", fontFamily: "proxima nova,Arial,Helvetica,sans-serif" }}>#########</p>
                                    <input autoComplete="off" style={{ padding: "6px 8px", height: "40px" }} type="email" onChange={this.emailChangeHandler} class="form-control" name="emailId" placeholder="SJSU Email Id" required />
                                </div>
                                <div class="form-group" style={{ marginBottom: "20px" }}>
                                    <label for="emailId">
                                        <h2 style={{ padding: "0px", margin: "0px", color: "#5E5E5E", fontWeight: "600", fontSize: "14px", fontFamily: "proxima nova,Arial,Helvetica,sans-serif" }}>Password</h2>
                                    </label>
                                    <p style={{ marginBottom: "3px", color: "#a7a7a7", fontWeight: "400", fontSize: "14px", fontFamily: "proxima nova,Arial,Helvetica,sans-serif" }}>SJSUOne Password</p>
                                    <input autoComplete="off" style={{ padding: "6px 8px", height: "40px" }} type="password" onChange={this.passwordChangeHandler} class="form-control" name="password" placeholder="Password" required />
                                </div>
                                <div class="form-group" style={{ "alignItems": "center" }}>
                                    {this.props.invalidCredentials ? <span style={{ color: "red", "font-style": "oblique", "font-weight": "bold", "textAlign": "center" }}>Invalid Username or Password</span> : ''}
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <button disabled={this.validateCredentials()} class="btn btn-primary"
                                        style={{ "width": "100%", color: "#fff", padding: "10px", backgroundColor: "#0b6596" }}>Login</button>
                                </div>
                                <br />
                                <div style={{ textAlign: "center" }}>
                                    <Link to="/signup">Not a User? Sign Up</Link>
                                </div>
                            </form>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        invalidCredentials: state.invalidCredentials
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loginUser: payload => dispatch(loginUser(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
