import React, { Component } from 'react';

class Footer extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="footer">
        <h1>Contacts</h1>
        <div className="footer_left">
          <p>This project was originally developed as a part of diploma work for a Master's Degree</p>
          <p>Author: Anna Trofimova</p>
          <p>English name of paper: "Development of a web-application for tracking employees' working hours"</p>
          <p>Ukrainian name of paper: "Розробка веб-додатку обліку робочого часу співробітників"</p>
        </div>
        <div className="footer_left">
          <a href="#">See Diploma paper</a>
          <a href="#">See project on GitHub</a>
          <a href = "mailto: anita.trofim@gmail.com">Send Email if you have any questions</a>
        </div>
      </div>
    );
  }
}

export default Footer;
