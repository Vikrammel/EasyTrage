import React, { Component } from 'react';
import Navbar from '../NavbarComponent/Navbar';
import axios from 'axios';

class Dashboard extends Component {
    


  componentDidMount() {
    console.log('I was triggered during componentDidMount')
    this.getCoinPrice();
  }
  
  render() {
      return (
        <div className="Dashboard">
            <Navbar />
            <h1>Dashbord placeholder</h1>
        </div>
      );
    }

    
    
    getCoinPrice() {
      // $.getJSON('https://localhost:3000/coinprice/')
      //   .then(({ results }) => this.setState({ person: results }));
      console.log('I was triggered during getCoinPrice')
            axios.get('https://localhost:3000/coinprice/')
        .then(({ results }) => console.log(results));

    }

}

export default Dashboard;