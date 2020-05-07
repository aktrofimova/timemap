import React, { Component } from 'react';

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
    let showApproveBtns = this.props.currentUser.role == "manager" && this.props.timeoff.status == "pending";
    return (
      <div className="timeoff" data-id={this.props.timeoff.id}>
        <p className="timeoff_name timeoff_item">{this.props.timeoff.project + ': ' + timeoff_types[this.props.timeoff.name_identifier]}</p>
        <p className="timeoff_time timeoff_item"><span>{this.getDateInWords(this.props.timeoff.start_date)}</span> - <span>{this.getDateInWords(this.props.timeoff.end_date)}</span></p>
        <p className="timeoff_hours timeoff_item"><span style={{fontSize: '14px'}}>Total days:</span> {this.props.timeoff.total_days}</p>
        <form className="timeoff_right">
          <p className={"timeoff_hours timeoff_item " + "timeoff_status_" + this.props.timeoff.status}>{this.props.timeoff.status}</p>
          { showApproveBtns ? <div className="timeoff_buttons">
            <button className="timeoff_cancel" onClick={this.handleReject}>Reject</button>
            <button className="timeoff_submit" onClick={this.handleSubmit} type="submit">Approve</button>
          </div> : null}
        </form>

      </div>
    );
  }
}

export default TimeoffCard;
