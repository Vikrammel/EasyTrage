import React, { Component } from 'react';
import './tabl.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import axios from 'axios'
import env from '../../../../config/env';

var exchangeData = [];
export default class TableExampleComplex extends Component {

  constructor(props) {
  super(props);
  this.state = {
      render: false //Set render state to false
    }
  }

  componentWillMount() {
    axios.get(env.API_URL + '/api/price')
    .then( (res) => {
      //use res from back-end server and check status code
      //forwarded from external API server

      for (var exchange in res.data) {
          if (res.data.hasOwnProperty(exchange)) {
            var pairs = ['XRPBTC','XRPUSD','XRPETH','XRPUSDT'];
            for(var pair in pairs){
              if (!(res.data[exchange][pairs[pair]] === undefined)) {
                // console.log(exchange + " XRPBTC -> " + JSON.stringify(res.data[exchange].XRPBTC.APIStatusCode));
                if (res.data[exchange][pairs[pair]].APIStatusCode === 200) {
                  // console.log(exchange + res.data[exchange]);
                  const pairText = pairs[pair].slice(0, 3) + '/' + pairs[pair].slice(3);
                  exchangeData.push({
                    exchange: exchange,
                    price: JSON.stringify(res.data[exchange][pairs[pair]].prices.last),
                    pair: pairText
                  });
                }
              }
            }
          }
      }
    })
    }

    componentDidMount() {
    setTimeout(function() { //Start the timer
        this.setState({render: true}) //After 1 second, set render to true
    }.bind(this), 1000)
  }


  state = {
  fixedHeader: false,
  fixedFooter: false,
  stripedRows: false,
  showRowHover: false,
  selectable: false,
  // multiSelectable: false,
  // enableSelectAll: false,
  // deselectOnClickaway: false,
  // showCheckboxes: false,
  height: '500px',
};


  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    let renderContainer = false
    if(this.state.render){
    // console.log("I AM RENDERING NOW");

    return (
      <div id="container">
      <div style={{width: '100%'}}>
        <Table style={{width: '75%',textAlign: 'center', margin: 'auto'}}
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={false}
        // multiSelectable={this.state.multiSelectable}
        >
          <TableHeader style={{textAlign: 'center'}}
          displaySelectAll={false}
          adjustForCheckbox={false}
          // enableSelectAll={this.state.enableSelectAll}

          >
            <TableRow style={{textAlign: 'center'}}>
              <TableHeaderColumn style={{color:"#FF1744", fontSize:"32"}} tooltip="The Exchange">Exchange</TableHeaderColumn>
              <TableHeaderColumn style={{color:"#FF1744" , fontSize:"32"}} tooltip="The Price">Price</TableHeaderColumn>
              <TableHeaderColumn style={{color:"#FF1744" , fontSize:"32"}} tooltip="Currency Pair">Pair</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} style={{textAlign: 'center'}}
          // displayRowCheckbox={this.state.showCheckboxes}
          // deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          // stripedRows={this.state.stripedRows}
          // adjustForCheckbox={this.state.showCheckboxes}
          >
            {exchangeData.map( (row, index) => (

              <TableRow key={index}>
                <TableRowColumn>{row.exchange}</TableRowColumn>
                <TableRowColumn>{row.price}</TableRowColumn>
                <TableRowColumn>{row.pair}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      </div>
    );
  }
  return (
  renderContainer //Render the dom elements, or, when this.state == false, nothing.
)

}

}
