import React, { Component } from 'react';
import arrow from './arrowcropped.png';
import axios from 'axios'
import env from '../../../config/env';

import './Suggestions.css';

class Suggestions extends Component {

    render() {
      axios.get(env.API_URL + 'api/suggestions')
      .then( (res) => {
        var suggestionsArray = res.data;
        console.log(suggestionsArray);
      })
      return (
        <div className="Suggestedtrades">

        </div>
        );
      }
  }

export default Suggestions;
