import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';
import bcrypt from 'bcryptjs'
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/index"

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: true,
            email: "",
            password: "",
            invalidEmail: false,
            invalidPassword: false,
            repeatPassword: "",
            passwordMatch: false,
            name: "",
            college: "",
            redirectToSignIn: false,
            passwordMatchError: false
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(this);
        this.validateDetails = this.validateDetails.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.collegeChangeHandler = this.collegeChangeHandler.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    registerUser = (event) => {
        event.preventDefault();
        let encryptPassword = ""
        const salt = bcrypt.genSaltSync(1);
        encryptPassword = bcrypt.hashSync(this.state.password, salt);
        var data = {
            "email": this.state.email,
            "password": encryptPassword,
            "name": this.state.name,
            "college": this.state.college
        }
        this.props.signUpUser(data);
    }

    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    collegeChangeHandler = (event) => {
        this.setState({
            college: event.target.value
        })
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
        if (event.target.value.length > 5) {
            this.setState({
                password: event.target.value,
                invalidPassword: false
            })
            if (this.state.repeatPassword !== event.target.value && this.state.repeatPassword !== "") {
                this.setState({
                    passwordMatch: false
                })
            }
        } else {
            this.setState({
                password: event.target.value,
                invalidPassword: true
            })
        }
    }

    confirmPasswordChangeHandler = (event) => {
        if (this.state.password === event.target.value) {
            this.setState({
                repeatPassword: event.target.value,
                passwordMatch: true,
                passwordMatchError: false
            })
        } else {
            this.setState({
                repeatPassword: event.target.value,
                passwordMatch: false,
                passwordMatchError: true
            })
        }
    }

    validateDetails = (event) => {
        if (!this.state.invalidEmail && !this.state.invalidPassword && this.state.passwordMatch && this.state.name !== "" && this.state.college !== "") return false
        else return true
    }
    handleDialogClose = () => {
        this.setState({
            redirectToSignIn: true
        })
    }
    render() {
        let redirectToSignIn = null;
        if (this.state.redirectToSignIn) redirectToSignIn = <Redirect to="/signin" />
        return (
            <div style={{ marginTop: "20px" }}>
                {redirectToSignIn}
                <div class="container" style={{ width: "400px", border: "1px solid #ddd", backgroundColor: "white" }}>
                    <div class="login-form">
                        <div className="row" style={{ width: "400px", borderBottom: "1px solid #ddd", padding: "30px 90px 30px" }}>
                            <img src="https://ok2static.oktacdn.com/fs/bco/1/fs01heub3azJBMXWF0x7"
                                class="auth-org-logo" alt="San Jose State University logo"
                                style={{ width: "200px", height: "40px" }} />
                        </div>
                        <div className="row" >
                            <form onSubmit={this.registerUser}  style={{ padding: "0px 42px 0px" }}>
                            <div className="form-group" style={{ padding: "10px 120px 0px" }}>
                                    <h2 style={{ color: "#5E5E5E", fontWeight: "600", fontSize: "15px", fontFamily: "proxima nova,Arial,Helvetica,sans-serif" }}>Sign Up</h2>
                                </div>
                                <div class="form-group">
                                    <input type="text" autoComplete="off" onChange={this.nameChangeHandler} class="form-control" name="name" placeholder="Name" required />
                                </div>
                                <div class="form-group">
                                    <input type="email" autoComplete="off" onChange={this.emailChangeHandler} class="form-control" name="email" placeholder="Email Id" required />
                                </div>
                                <div class="form-group" style={{ "alignItems": "center" }}>
                                    {this.state.invalidEmail ? <span style={{ color: "red", "textAlign": "center" }}>Invalid Email Id. Please check</span> : ''}
                                </div>
                                <div class="form-group">
                                    <input type="password" autoComplete="off" onChange={this.passwordChangeHandler} class="form-control" name="password" placeholder="Password" required />
                                </div>
                                <div class="form-group" style={{ "alignItems": "center" }}>
                                    {this.state.invalidPassword ? <span style={{ color: "red", "textAlign": "center" }}>Password must have atleast 6 characters</span> : ''}
                                </div>
                                <div class="form-group">
                                    <input type="password" autoComplete="off" onChange={this.confirmPasswordChangeHandler} class="form-control" name="repeatPassword" placeholder="Re-Enter Password" />
                                </div>
                                <div class="form-group" style={{ "alignItems": "center" }}>
                                    {this.state.passwordMatchError ? <span style={{ color: "red", "textAlign": "center" }}>Passwords doesn't match</span> : ''}
                                </div>
                                <div class="form-group">
                                    <input type="text" autoComplete="off" onChange={this.collegeChangeHandler} class="form-control" name="college" placeholder="College Name" required />
                                </div>
                                <div class="form-group" style={{ "alignItems": "center" }}>
                                    {this.props.signupFailedError ? <span style={{ color: "red", "font-style": "oblique", "font-weight": "bold", "textAlign": "center" }}>SignUp Failed. Please try again..</span> : ''}
                                </div>
                                <div style={{ textAlign: "center", marginBottom:"10px" }}>
                                    <button disabled={this.validateDetails()} class="btn btn-success" style={{ "width": "100%",padding:"10px" }}>Register</button>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <Link to="/signin">Already a User? Sign In</Link>
                                </div>
                            </form>
                            <br />
                            <div>
                                <Dialog
                                    open={this.props.signUpSuccessful}
                                    onClose={this.handleDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Registered Successfully .!"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Hey {this.state.name},
                                                    You've been signup succesfully. Please go ahead and login
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleDialogClose} color="primary" autoFocus>
                                            Login
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signUpSuccessful: state.signUpSuccessful,
        signupFailedError: state.signupFailedError
    };
};

function mapDispatchToProps(dispatch) {
    return {
        signUpUser: payload => dispatch(signUpUser(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);