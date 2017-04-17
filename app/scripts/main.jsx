import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import ReactDOM from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppComponent from './AppComponent.jsx';

const App = () => (
  <MuiThemeProvider>
    <AppComponent />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
