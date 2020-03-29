import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { createCard, toggleCreateCard } from "../redux/actions/index"

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.enableCreate = this.props.enableCreate;
        this.state = {
            name: "",
            department: "",
            semester: "",
            postBookError: false
        }
        this.handleCreateCourseClose = this.handleCreateCourseClose.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.validateDetails = this.validateDetails.bind(this);
    }

    addCourse = (event) => {
        event.preventDefault();
        var data = {
            "name": this.state.name,
            "department": this.state.department,
            "semester": this.state.semester
        }
        this.props.createCard(data)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateDetails = (event) => {
        if (this.state.name !== "" && this.state.department !== "" && this.state.semester !== "") return false
        else return true
    }

    handleCreateCourseClose = () => {
        this.props.toggleCreateCard();
    }
    render() {
        return (
            <div>
                <Dialog  open={this.props.enableCreateCard} onClose={this.handleCreateJobClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New Course</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                            <TextField
                                margin="dense"
                                id="department"
                                name="department"
                                label="Department"
                                type="text"
                                fullWidth
                                autoComplete="off"
                                variant="outlined"
                                required
                                onChange={this.handleChange}
                            />
                            <TextField
                                margin="dense"
                                id="semester"
                                name="semester"
                                label="Semester"
                                type="text"
                                fullWidth
                                autoComplete="off"
                                variant="outlined"
                                required
                                onChange={this.handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCreateCourseClose} color="primary">
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.addCourse}
                            disabled={this.validateDetails()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        enableCreateCard: state.enableCreateCard,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        toggleCreateCard: payload => dispatch(toggleCreateCard(payload)),
        createCard: payload => dispatch(createCard(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
