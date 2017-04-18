import React from 'react';
import {
  CircularProgress,
  Paper
} from 'material-ui';

import classNames from 'classnames';

class Loader extends React.Component {

  constructor(props) {
    super(props);

    this.loadingPaperStyle = {
      display: 'inline-block',
      margin: 20,
      padding: '0 10px',
      textAlign: 'center',
      width: 300
    };
  }

  render() {
    let classes = classNames({
      'loading-overlay': true,
      'is-visible': this.props.isLoading
    });

    return (
      <div className={ classes }>
        <div className="loading-overlay__indicator">
          <Paper
            style={ this.loadingPaperStyle }
            zDepth={ 2 }>
            <CircularProgress size={ 60 } style={ { marginTop: '20px' } } />
            <p>Please be patient. Calling the Wasted on Destiny API can take a little while.</p>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Loader;