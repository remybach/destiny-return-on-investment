import React from 'react';
import {
  CardText,
  CardTitle
} from 'material-ui';
import ActionCached from 'material-ui/svg-icons/action/cached';

import classNames from 'classnames';

class Comparisons extends React.Component {

  constructor(props) {
    super(props);

    let currentComparison = 0;

    if (props.comparisons && props.comparisons.length) {
      currentComparison = this.getNextComparison();
    }

    this.state = { currentComparison };
  }

  refreshComparison() {
    let nextComparison = this.getNextComparison();

    while (nextComparison === this.state.currentComparison) {
      nextComparison = this.getNextComparison();
    }

    this.setState({ currentComparison: nextComparison });
  }

  getNextComparison() {
    return this.getRandomInt(0, this.props.comparisons.length - 1)
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {
    const hasComparisons = this.props.comparisons && this.props.comparisons.length;
    let classes = classNames({
      'comparisons': true,
      'is-visible': hasComparisons
    });

    let refreshIcon;
    let comparisonText;

    if (hasComparisons) {
      comparisonText = `${ this.props.comparisons[this.state.currentComparison].title } would provide ${ this.props.comparisons[this.state.currentComparison].approximateCostPerHour } worth of entertainment per hour.`;

      if (this.props.comparisons.length > 1) {
        refreshIcon = (<ActionCached className="refresh-icon" onClick={ this.refreshComparison.bind(this) } />);
      }
    }

    let comparison = (
      <div className="comparisons__item">
        { refreshIcon }
        { comparisonText }
      </div>
    );

    return (
      <div>
        <CardText className={ classes }>
          { comparison }
        </CardText>
      </div>
    );
  }
}

export default Comparisons;