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
          <p className="home_sub_header">Mange your time and bla bla bla</p>
          <Link className="cta_btn primary" to={path}>{linkLabel}</Link>
        </section>

        <section className="home_section">
          <h4>Some marketing text</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>
        </section>

        <section className="home_section">
          <h4>Some features</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>
        </section>

        <section className="home_section">
          <h4>Technologies used</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>
        </section>


        <Footer />

      </div>
    );
  }
}

export default Home;
