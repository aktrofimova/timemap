import React, { Component } from 'react';
// import '../assets/stylesheets/main.scss'

class Footer extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="footer">
        <h1 className="footer_header">Contacts</h1>
        <div className="footer_sections">
          <section className="footer_left">
            <p>This project was originally developed as a part of diploma work for a Master's Degree</p>
            <p>Author: Anna Trofimova</p>
            <p>English name of paper: "Development of a web-application for tracking employees' working hours"</p>
            <p>Ukrainian name of paper: "Розробка веб-додатку обліку робочого часу співробітників"</p>
          </section>
          <section className="footer_right">
            <a href="https://docs.google.com/document/d/1h9ougJbHx0-x3wYmidEQufosz9qJJPxVmj3aP5nqc-Y/edit">See Diploma paper</a>
            <a href="https://github.com/aktrofimova/timemap">See project on GitHub</a>
            <a href="mailto: anita.trofim@gmail.com">Send Email if you have any questions</a>
          </section>
        </div>
      </div>
    );
  }
}

export default Footer;
