import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../hoc/Aux';
import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

const timeoff_types = {
  vac: 'Vacation',
  ill: 'Illness'
}

class TimeoffCard extends Component {
  state = {

  }

  componentDidMount() {

  }

  handleSubmit = (event) => {

  }

  handleReject = (event) => {

  }

  getDateInWords = (rawDate) => {
    var date = new Date(rawDate) || new Date();
    var dateArr = date.toDateString().split(' ');
    return dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
  }

  render() {
    let isCurrentManager = this.props.currentUser.role == "manager";
    let isCurrentEmployee = this.props.currentUser.role == "employee";
    let isPending = this.props.timeoff.status == "pending";
    let showApproveBtns = isCurrentManager && isPending;
    let showCancelBtns = isCurrentEmployee && isPending ;
    let ctaClass = isCurrentManager ? "timeoff_cta_manager" : isCurrentEmployee ? "timeoff_cta_employee" : "timeoff_cta_client";

    return (
      <div className="timeoff_wrapper">
        <div className="timeoff" data-id={this.props.timeoff.id}>
          <p className="timeoff_name timeoff_item">{this.props.timeoff.project + ': '} <span className="primary_colour">{timeoff_types[this.props.timeoff.name_identifier]}</span></p>
          <p className="timeoff_time timeoff_item"><span>{this.getDateInWords(this.props.timeoff.start_date)}</span> - <span>{this.getDateInWords(this.props.timeoff.end_date)}</span></p>
          <p className="timeoff_days timeoff_item"><span style={{fontSize: '14px'}}>Total days:</span> <span className="primary_colour">{this.props.timeoff.total_days}</span></p>
          <div className="timeoff_right">
            <p className={"timeoff_item " + "timeoff_status_" + this.props.timeoff.status}>{this.props.timeoff.status}</p>
          </div>
        </div>

        <div className={"timeoff_cta " + ctaClass}>
          { showApproveBtns ? <Aux>
              <IconButton title="Reject request" onClick={this.handleReject}>
                {/*<CancelOutlinedIcon className="secondary_colour"/>*/}
                <CancelOutlinedIcon/>
              </IconButton>
              <IconButton title="Approve request" onClick={this.handleSubmit}>
                <CheckCircleOutlinedIcon className="primary_colour"/>
              </IconButton>
            </Aux> :
            showCancelBtns ?
              <IconButton className="timeoff_delete" title="Cancel request" onClick={()=>{axios.delete(window.base_api_url + '/timeoffs/' + this.props.timeoff.id);}}>
                <CancelOutlinedIcon fontSize="small"/>
              </IconButton> : null}
        </div>
      </div>
    );
  }
}

export default TimeoffCard;
