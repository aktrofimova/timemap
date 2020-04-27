import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="footer">
        <h1 className="header footer_header">Contacts</h1>
        <div className="footer_sections">
          <section className="footer_left">
            <p>This project was originally developed as a part of diploma work for a Master's Degree</p>
            <p>Author: <span className="cta_link primary">Anna Trofimova</span></p>
            <p>English name of paper: "Development of a web-application for tracking employees' working hours"</p>
            <p>Ukrainian name of paper: "Розробка веб-додатку обліку робочого часу співробітників"</p>
          </section>
          <section className="footer_right">
            <Link className="cta_link primary" to="https://docs.google.com/document/d/1h9ougJbHx0-x3wYmidEQufosz9qJJPxVmj3aP5nqc-Y/edit" target="_blank">See Diploma paper</Link>
            <Link className="cta_link primary" to="https://github.com/aktrofimova/timemap" target="_blank">See project on GitHub</Link>
            <Link className="cta_link primary" to="mailto: anita.trofim@gmail.com">Send Email to the author</Link>
          </section>
        </div>
      </div>
    );
  }
}

export default Footer;
