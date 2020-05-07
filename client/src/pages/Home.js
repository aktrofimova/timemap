import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

class Home extends Component {

  render() {
    let linkLabel = this.props.loggedInStatus ? 'Go To Task Tracker' : 'Start Tracking Your Time';
    let path = this.props.loggedInStatus ? '/profile/' + this.props.currentUserId + '/tasks' : '/login';

    return (
      <div className="home">

        <section className="home_section">
          <h1 className="header home_header">TimeMap</h1>
          <p className="home_sub_header">All yoy need to manage your team's time in one tool</p>
          <Link className="cta_btn primary" to={path}>{linkLabel}</Link>
        </section>

        <section className="home_section" style={{padding: '80px 0 40px'}}>
          <h4>Being confident with what you do</h4>
          <p>Create task scope, record work hours, manage time offs and keep everything on track with the insightful data</p>
        </section>

        <section className="home_section">
          <h4>The most efficient and modern technologies are used to make you work process easier</h4>
          <p>The system is created with means of web-application framework Ruby on rails and JavaScript library React</p>
        </section>


        <Footer />

      </div>
    );
  }
}

export default Home;
