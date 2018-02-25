import React, { Component } from 'react';
import './tabl.css';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

const tableData = [
  {
    exchange: 'CoinBase',
    price: '100',
    pair: 'BTC',
  },
  {
    exchange: 'Bitterex',
    price: '200',
    pair: 'ETH',
  },
  {
    exchange: 'Bitfenix',
    price: '300',
    pair: 'ETH',
  },
  {
    exchange: 'Gemini',
    price: '400',
    pair: 'ETH',
  },
  {
    exchange: 'Bianace',
    price: '500',
    pair: 'BTC',
  },
  {
    exchange: 'CoinBase',
    price: '600',
    pair: 'ETH',
  },
  {
    exchange: 'BitGrail',
    price: '700',
    pair: 'ETH',
  },
];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {
  state = {
    fixedHeader: false,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
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
    return (
      <div id="container">
      <div style={{width: '100%', backgroundColor: "#FFF"}}>
        <Table style={{width: '75%',textAlign: 'center', backgroundColor: "#15202e", margin: 'auto'}}
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader style={{textAlign: 'center', backgroundColor: "#607D8B"}}
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow style={{textAlign: 'center', backgroundColor: "#E0E0E0"}}>
              <TableHeaderColumn tooltip="The ID">Exchange</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Price</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Btc/Eth</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody style={{textAlign: 'center', backgroundColor: "#fff"}}
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
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
}
