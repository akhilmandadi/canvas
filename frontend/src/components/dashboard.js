import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { fetchCards, toggleCreateCard, logoutUser } from "../redux/actions/index";
import '../App.css'
import DashboardNavbar from './dashboardNavbar';
import CreateCourse from "./createCourse";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.toggleCreateCard = this.toggleCreateCard.bind(this)
  }

  componentDidMount() {
    this.props.fetchCards();
  }

  toggleCreateCard = () => {
    this.props.toggleCreateCard()
  }
  render() {
    let cards = null;
    const colors = ["#3c4f36", "#626e7b", "#254284", "teal", "#003300"]
    cards = (
      <div>
        {this.props.cards.map((card, index) => {
          return (
            <div className="col-md-3" style={{ width: "260px", marginRight: "5px", marginTop: "5px", marginBottom: "15px", paddingLeft: "0px" }}>
              <Card className="cardBox">
                <CardHeader style={{ backgroundColor: colors[index % 5] }}
                  avatar={
                    <div style={{ height: "100px" }}></div>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon style={{ fontSize: "30px", color: "#fff" }} />
                    </IconButton>
                  }
                />
                <CardContent className="cardBoxColor" style={{ paddingBottom: "0px", paddingTop: "10px" }}>
                  <div title={card.name} style={{ fontSize: "14px", color: "#3c4f36", fontWeight: "600", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {card.name}
                  </div>
                  <div title={card.department} style={{ fontSize: "16px", color: "#6c757c", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {card.department}
                  </div>
                  <div title={card.semester} style={{ fontSize: "12px", color: "#6c757c", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {card.semester}
                  </div>
                </CardContent>
                <CardActions disableSpacing style={{ paddingTop: "0px" }}>
                  <IconButton aria-label="add to favorites">
                    <span class="glyphicon glyphicon-bullhorn" style={{ fontSize: "19px", marginRight: "17px" }}></span>
                  </IconButton>
                  <IconButton aria-label="share">
                    <span class="glyphicon glyphicon-list-alt" style={{ fontSize: "18px", marginRight: "17px" }}></span>
                  </IconButton>
                  <IconButton aria-label="share">
                    <QuestionAnswerIcon style={{ fontSize: "20px", marginRight: "17px" }} />
                  </IconButton>
                  <IconButton aria-label="share">
                    <span class="glyphicon glyphicon-folder-open" style={{ fontSize: "15px" }}></span>
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          )
        })}
      </div>
    )
    let createDialog = null;
    if (this.props.enableCreateCard) createDialog = (<CreateCourse />)
    return (
      <div>
        {createDialog}
        <div className="row">
          <div className="col-md-1" style={{ width: "80px", borderRight: "1px solid black" }}>
            <DashboardNavbar />
          </div>
          <div className="col-md-10" style={{ marginLeft: "25px" }}>
            <div className="row" style={{ borderBottom: "0.5px solid", marginTop: "10px", marginBottom: "15px" }}>
              <div className="col-md-11" style={{ paddingLeft: "0px" }}>
                <p style={{ fontSize: "28px", color: "#2d3b45", display: "inline", fontWeight: "500" }}>Dashboard</p>
              </div>
              <div className="col-md-1" style={{ paddingTop: "5px" }}>
                <Button variant="outlined" color="secondary" onClick={this.props.logoutUser} style={{backgroundColor:"#ffe6ee"}}>
                  <p style={{fontSize:"10px", fontWeight:"500",margin:"0px",padding:"0px"}}>Logout</p>
                </Button>
              </div>
            </div>
            <div className="row">
              {cards}
              <div onClick={this.toggleCreateCard} className="col-md-3 addNew" style={{ cursor: "pointer", width: "245px", marginRight: "5px", marginTop: "5px", marginBottom: "15px", paddingLeft: "0px" }}>
                <div class="container" style={{ paddingTop: "80px", paddingLeft: "60px", width: "240px", height: "253px", position: "relative" }}>
                  <div style={{ width: "120px", height: "120px", textAlign: "center", verticalAlign: "middle", lineHeight: "15px" }} >
                    <LibraryAddIcon style={{ width: "70px", height: "70px", color: "teal" }} /><br />
                    <p style={{ fontWeight: "500" }}>Add New Course</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    enableCreateCard: state.enableCreateCard,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleCreateCard: payload => dispatch(toggleCreateCard(payload)),
    fetchCards: payload => dispatch(fetchCards(payload)),
    logoutUser: payload => dispatch(logoutUser(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);