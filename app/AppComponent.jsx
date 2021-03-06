import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  CardTitle,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar,
  TextField
} from 'material-ui';
import axios from 'axios';
import classNames from 'classnames';

// Components
import AmazonAffiliateGameLinks from './AmazonAffiliateGameLinks.jsx';
import Comparisons from './Comparisons.jsx';
import PriceButtons from './PriceButtons.jsx';
import Loader from './Loader.jsx';

require('./styles.scss');

class AppComponent extends React.Component {


  constructor(props) {
    super(props);

    this.CONSOLES = [ 'playstation', 'xbox' ];

    this.state = {
      isLoading: false,
      pricing: {
        vanilla: '',
        tdb: '',
        how: '',
        ttk: '',
        roi: ''
      },
      activeCurrency: '',
      apiData: null,
      consoleSelectorExpanded: false,
      selectedConsole: null,
      snackbarMessage: '',
      total: 0,
      username: '',
      valuePerHour: 0
    };

    this.snackbarStyle = {
      height: 'auto',
      lineHeight: '1.5em',
      padding: '10px 24px 5px'
    };
  }

  currencyValue(amount) {
    return this.state.pricing.currency ?
              this.state.pricing.currency.replace('%amount', amount.toFixed(2)) :
              amount.toFixed(2);
  }

  showError(newState) {
    this.setState(newState);

    window.setTimeout(() => {
      this.setState({ snackbarMessage: '' });
    }, 4000);
  }

  handleCalculate() {
    this.setState({ isLoading: true });

    let total = Number(this.vanillaInput.input.value) +
                Number(this.tdbInput.input.value) +
                Number(this.howInput.input.value) +
                Number(this.ttkInput.input.value) +
                Number(this.roiInput.input.value) +
                Number(this.microInput.input.value) +
                Number(this.otherInput.input.value);

    if (total === 0) {
      this.showError({
        isLoading: false,
        snackbarMessage: 'It looks like you forgot to enter values for how much Destiny has cost you thus far.'
      });

      return;
    }

    axios.get(`https://www.wastedondestiny.com/api/?console=${ this.state.selectedConsole }&user=${ this.state.username }`)
      .then(({ data }) => {
        if (!data || !data.Response) {
          this.showError({
            isLoading: false,
            snackbarMessage: 'Please provide your console and PSN/Xbox username.'
          });
        } else {
          const hoursPlayed = (Number(data.Response.totalTimePlayed || 0) + Number(data.Response.totalTimeWasted || 0)) / (60 * 60);
          const consoleName = this.CONSOLES[this.state.selectedConsole % 2];
          const otherConsoleName = this.CONSOLES[(this.state.selectedConsole + 1) % 2];
          const valuePerHour = total / hoursPlayed;

          if ((isNaN(valuePerHour) || valuePerHour === Infinity) && Raven && Raven.captureMessage) {
            Raven.captureMessage('valuePerHour isNaN', {
              extra: { total, hoursPlayed, consoleName, valuePerHour, username: this.state.username },
              level: 'info' // one of 'info', 'warning', or 'error'
            });
          }

          this.setState({
            apiData: {
              primary: this.decorateConsoleResults(data.Response, consoleName),
              secondary: this.decorateConsoleResults(data.Response, otherConsoleName)
            },
            isLoading: false,
            total: this.currencyValue(total),
            valuePerHour: this.currencyValue(valuePerHour)
          });

          window.scrollTo(0, 0);
        }
      }).catch((err) => {
        this.showError({
          isLoading: false,
          snackbarMessage: err.message
        });
      });
  }

  decorateConsoleResults(responseData, consoleName) {
    const consoleData = responseData[consoleName];

    if (!consoleData) return null;

    return {
      icon: `https://www.bungie.net${ consoleData.iconPath }`,
      displayName: consoleData.displayName,
      clan: consoleData.clan ? `${ consoleData.clan.name } [${ consoleData.clan.tag }]` : null,
      consoleName
    };
  }

  handleCurrencyClick(pricing, activeCurrency) {
    this.setState({
      pricing: Object.assign({}, pricing),
      activeCurrency,
      valuePerHour: null
    });
  }

  handleChange(e, value) {
    let updated = {
      pricing: this.state.pricing,
      valuePerHour: null
    };
    const field = e.currentTarget.name.replace('price-', '');

    updated.pricing[field] = value;

    this.setState(updated);
  }

  handleConsoleChange(expanded) {
    this.setState({ consoleSelectorExpanded: expanded });
  }

  clearValuePerHourSection() {
    this.setState({
      valuePerHour: null
    });
  }

  render() {
    let valuePerHourSection;

    if (this.state.valuePerHour) {
      let classes = classNames({
        'card-header--half': this.state.apiData.secondary
      });
      let otherCardHeader;

      if (this.state.apiData.secondary) {
        otherCardHeader = (
          <CardHeader
            className={ classes }
            title={ this.state.apiData.secondary.displayName }
            subtitle={ this.state.apiData.secondary.clan }
            avatar={ this.state.apiData.secondary.icon } />
        );
      }

      valuePerHourSection = (
        <div>
          <Card className="card" onExpandChange={ this.handleConsoleChange.bind(this) }>
            <CardHeader
              className={ classes }
              title={ this.state.apiData.primary.displayName }
              subtitle={ this.state.apiData.primary.clan }
              avatar={ this.state.apiData.primary.icon } />
            { otherCardHeader }
            <CardTitle title={ `You’ve spent a total of ${ this.state.total }, which equates to ${ this.state.valuePerHour } per hour playing Destiny.` } />
            <Comparisons comparisons={ this.state.pricing.comparisons } />
            <CardText>
              <a href={ `https://www.wastedondestiny.com/${ this.state.apiData.primary.consoleName }/${ this.state.apiData.primary.displayName }` } target="_blank">
                Click here
              </a> to see your number of hours on <a href="https://www.wastedondestiny.com" target="_blank">wastedondestiny.com</a>.
            </CardText>
          </Card>

          <AmazonAffiliateGameLinks currency={ this.state.activeCurrency } />
        </div>
      );
    }

    return (
      <div>
        { valuePerHourSection }

        <Card className="card">
        
          <CardTitle title="Cost Details" />

          <CardText className="card-text">

            <h4>
              Pre-fill fields with release day prices<sup>&dagger;</sup>:
              <PriceButtons onCurrencyClick={ this.handleCurrencyClick.bind(this) } activeCurrency={ this.state.activeCurrency } />
            </h4>

            <div className="form-section">
              <small>&dagger; You can update the fields with your own amounts if what you paid is different.</small>
            </div>

            <div className="form-section">
              <TextField
                name="price-vanilla"
                value={ this.state.pricing.vanilla }
                type="number"
                onChange={ this.handleChange.bind(this) }
                floatingLabelText="Vanilla"
                fullWidth={ true }
                floatingLabelFixed={ true }
                ref={(input) => { this.vanillaInput = input; }} />
            </div>
            
            <div className="form-section">
              <TextField
                name="price-tdb"
                value={ this.state.pricing.tdb }
                type="number"
                onChange={ this.handleChange.bind(this) }
                floatingLabelText="The Dark Below"
                fullWidth={ true }
                floatingLabelFixed={ true }
                ref={(input) => { this.tdbInput = input; }} />
            </div>

            <div className="form-section">
              <TextField
                name="price-how"
                value={ this.state.pricing.how }
                type="number"
                onChange={ this.handleChange.bind(this) }
                floatingLabelText="House of Wolves"
                fullWidth={ true }
                floatingLabelFixed={ true }
                ref={(input) => { this.howInput = input; }} />
            </div>

            <div className="form-section">
              <TextField
                name="price-ttk"
                value={ this.state.pricing.ttk }
                type="number"
                onChange={ this.handleChange.bind(this) }
                floatingLabelText="The Taken King"
                fullWidth={ true }
                floatingLabelFixed={ true }
                ref={(input) => { this.ttkInput = input; }} />
            </div>

            <div className="form-section">
              <TextField
                name="price-roi"
                value={ this.state.pricing.roi }
                type="number"
                onChange={ this.handleChange.bind(this) }
                floatingLabelText="Rise of Iron"
                fullWidth={ true }
                floatingLabelFixed={ true }
                ref={(input) => { this.roiInput = input; }} />
            </div>

            <div className="form-section">
              <TextField
                name="price-micro"
                type="number"
                onChange={ this.clearValuePerHourSection.bind(this) }
                floatingLabelText="Amount spent on micro-transactions"
                fullWidth={ true }
                floatingLabelFixed={ true }
                ref={(input) => { this.microInput = input; }} />
            </div>

            <div className="form-section">
              <TextField
                name="price-other"
                type="number"
                onChange={ this.clearValuePerHourSection.bind(this) }
                floatingLabelText="Other costs you want to include (Bungie store purchases, PS+/Xbox Live Gold etc.)"
                fullWidth={ true }
                floatingLabelFixed={ true }
                ref={(input) => { this.otherInput = input; }} />
            </div>
          </CardText>

          <CardTitle title="Account Details" />

          <CardText>
            <div className="form-section">
              <RadioButtonGroup
                name="selectedConsole"
                onChange={ (e, val) => { this.setState({ selectedConsole: Number(val), valuePerHour: null }) } }>
                <RadioButton value="2" label="PS4" />
                <RadioButton value="1" label="XBOX" />
              </RadioButtonGroup>
            </div>

            <div className="form-section">
              <TextField
                floatingLabelText="username"
                fullWidth={ true }
                floatingLabelFixed={ true }
                onChange={ (e, val) => { this.setState({ username: val, valuePerHour: null }) } } />
            </div>
          </CardText>

          <CardActions>
            <RaisedButton
              disabled={ !this.state.selectedConsole || !this.state.username }
              label="Calculate"
              primary={ true }
              fullWidth={ true }
              onTouchTap={ this.handleCalculate.bind(this) } />
          </CardActions>
        </Card>

        <Snackbar
            bodyStyle={ this.snackbarStyle }
            open={ !!this.state.snackbarMessage }
            message={ this.state.snackbarMessage }
            autoHideDuration={ 4000 } />

        <Loader isLoading={ this.state.isLoading } />

        <a href="https://github.com/remybach/destiny-return-on-investment"
           className="github-corner"
           aria-label="View source and contribute on Github">
          <svg width="80" height="80" viewBox="0 0 250 250"
               style={{ fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }}
               aria-hidden="true">
               <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
               <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm"></path>
               <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
          </svg>
        </a>
      </div>
    );
  }
}

export default AppComponent;