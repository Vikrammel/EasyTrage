import React, { Component } from 'react';
import arrow from './arrowcropped.png';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import env from '../../../../config/env';
import Alert from 'react-s-alert';

import './Suggestions.css';

const tradeButtonStyle = {
  backgroundColor: "#67c26f"
};



// When the user clicks on <span> (x), close the modal
// spanOnClick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// windowOnClick = function(event) {
//   if (event.target == modal) {
//       modal.style.display = "none";
//   }
// } 

export default class Suggestions extends Component {

  constructor(props) {
    super(props);

    this.alertOptions = {
      offset: 100,
      position: 'top',
      theme: 'dark',
      timeout: 5000,
      transition: 'scale',
      html: true
    };

    this.state = {
      trades: {},
      cards: [],
      open: false,
      modalStyle:{
        display: "none"
      },
      modalCardIndex: null
    };
  }


  handleOpen = (index) => {
    this.setState({open: true, modalCardIndex: index});
    // this.setState({eName: n});
  };

  handleClose = () => {
    this.setState({open: false, modalCardIndex: null});
  };

  componentDidMount() {
    axios.get(env.API_URL + '/api/suggestions')
      .then((res) => {
        // console.log(res.data);
        this.setState({trades:res.data});
        let suggestionsArray = res.data.map((prices, index) => {
          // console.log(prices);
          return (
            <span className="Cards" key={index}>
              <span className="card card-1">
                <table>
                  <tbody>
                    <tr>
                      <td>
                      <br/>
                        <span className="red"><b>Buy</b></span></td>
                    </tr>
                    <tr>
                      <td>Exchange: <b className="red">{prices.ask.exchange}</b></td>
                    </tr>
                    <tr>
                      <td>Price: <span className="red">({prices.ask.price})</span></td>
                    </tr>
                    <tr>
                      <td>Pair: <b className="red">({prices.pair})</b></td>
                    </tr>

                    <tr>
                      <td>
                        <span><img src={arrow} className="arrow" alt="logo" /></span></td>
                    </tr>

                    <tr>
                      <td>
                      <RaisedButton label="Trade" type="submit" onClick={this.handleOpen.bind(this,index)} buttonStyle={tradeButtonStyle} />
                      <br/>
                      <br/>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="green"><b>Sell</b></span></td>
                    </tr>
                    <tr>
                      <td>Exchange: <b className="green">{prices.bid.exchange}</b></td>
                    </tr>
                    <tr>
                      <td>Price: <span className="green">({prices.bid.price})</span></td>
                    </tr>
                    <tr>
                      <td>Pair: <b className="green">({prices.pair})</b></td>
                    </tr>
                    <tr>
                      <td className="green2Bed">
                        Profit: <b>{prices.profit}%</b></td>
                    </tr>
                    
                  </tbody>
                </table>
                <br/>
              </span>
            </span>
          )
        })
        this.setState({ cards: suggestionsArray });

      })
      .catch((err) => {
        Alert.error("<span style='color:red'>" + String(err) + "</span>", this.alertOptions);
      })
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="Suggestedtrades">
        <Alert stack={{ limit: 1, spacing: 50 }} />
        {this.state.cards}

        <Dialog
          title="Make Trade"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField name="sellExchange"
                      type="text"
                      placeholder="Sell Wallet Key"
                    />
        <p>{JSON.stringify(this.state.trades[this.state.modalCardIndex])}</p>
        </Dialog>

      </div>
       

    );
  }
}
