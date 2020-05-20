import React, { Component } from 'react';
import axios from 'axios';
import Aux from '../hoc/Aux';
import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

const timeoff_types = {
  p_vac: 'Paid Vacation',
  up_vac: 'Unpaid Vacation',
  p_ill: 'Paid Illness',
  up_ill: 'Unpaid Illness'
}

class TimeoffCard extends Component {

  handleApprove = (event) => {
    axios.put(window.base_api_url + '/timeoffs/' + this.props.timeoff.id, {
      status: "approved"
    })
      .then(response => {
        console.log('timeoff updated');
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleReject = (event) => {
    axios.put(window.base_api_url + '/timeoffs/' + this.props.timeoff.id, {
      status: "conflict"
    })
      .then(response => {
        console.log('timeoff updated');
      })
      .catch(error => {
        console.log(error);
      });
  }

  getDateInWords = (rawDate) => {
    var date = new Date(rawDate) || new Date();
    var dateArr = date.toDateString().split(' ');
    return dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
  }

  render() {
    let isCurrentManager = this.props.currentUser.role == "manager",
      isCurrentEmployee = this.props.currentUser.role == "employee",
      isPending = this.props.timeoff.status == "pending",
      isConflict = this.props.timeoff.status == "conflict";
    let showApproveBtns = isCurrentManager && (isPending || isConflict),
      showCancelBtn = isCurrentEmployee && (isPending || isConflict);
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
              <IconButton title="Reject Request" onClick={this.handleReject}>
                {/*<CancelOutlinedIcon className="secondary_colour"/>*/}
                <CancelOutlinedIcon/>
              </IconButton>
              <IconButton title="Approve Request" onClick={this.handleApprove}>
                <CheckCircleOutlinedIcon className="primary_colour"/>
              </IconButton>
            </Aux> :
            showCancelBtn && this.props.isSameUser ?
              <IconButton className="timeoff_delete" title="Cancel request" onClick={()=>{axios.delete(window.base_api_url + '/timeoffs/' + this.props.timeoff.id);}}>
                <CancelOutlinedIcon fontSize="small"/>
              </IconButton> : null}
        </div>
      </div>
    );
  }
}

export default TimeoffCard;
