import React, { Component } from 'react';
import Navbar from '../NavbarComponent/Navbar';
import axios from 'axios';

class Dashboard extends Component {
    


  componentDidMount() {
    console.log('I was triggered during componentDidMount')
    // this.getCoinPrice();

    this.getCoinPrice()
    .then(res => console.log({ res }))
    // .catch(err => console.log(err));
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
            axios.get('localhost:3001/api/coin/')
        .then(({ results }) => console.log(results));
  
    }
    
    getCoinPrice2 = async () => {
      const response = await fetch('localhost:3001/api/coin');
      // const body = await response.json();
  
      // if (response.status !== 200) throw Error(body.message);
  
      return response;
    };

    

}

export default Dashboard;