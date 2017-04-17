import React from 'react';
import { RaisedButton } from 'material-ui';

import PRICES from './prices.js';

class PriceButtons extends React.Component {

  render() {
    let priceButtons = [];
    
    for (let currency in PRICES) {
      priceButtons.push(
        <RaisedButton
          label={ currency }
          key={ currency }
          onTouchTap={ this.props.onCurrencyClick.bind(this, PRICES[currency], currency) }
          primary={ this.props.activeCurrency === currency } />
      );
    }

    return (
      <span className="price-buttons">
        { priceButtons }
      </span>
    );
  }
}

export default PriceButtons;