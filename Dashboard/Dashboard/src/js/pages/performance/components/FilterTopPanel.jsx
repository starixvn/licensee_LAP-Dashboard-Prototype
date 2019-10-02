import React from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import languageApi from '../../../lib/languageApi';
import { connect } from 'react-redux';
import { defaultData } from '../lib/constants'
import { langCode } from '../../../lib/constants'
import { generalService } from '../lib/service';
import CoupleMonthRangePicker from '../../../components/CoupleMonthRangePicker';

class FilterTopPanel extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrencyInfo();
  }

  _onChangeBaseCurrency = e => {
    this.props.setBaseCurrency(e.target.value);
  }

  _onChangeMeasurement = e => {
    const value = defaultData.measurements.find(_ => _.id == e.target.value);
    this.props.setMeasurement(value);
  }

  _onChangeRangeOfTwoPeriod = ({ currentPeriod, previousPeriod }) => {
    this.props.setComparePeriods({ currentPeriod, previousPeriod });
  }

  _onSubmit = () => {
    const { currentChildTabKey, selectedComparePeriods, selectedBaseCurrency, selectedMeasurement } = this.props;
    const filterData = generalService.getFilterData({ selectedComparePeriods, selectedBaseCurrency, selectedMeasurement });
    this.props.getAnalyticData(filterData, currentChildTabKey);
  }

  _getFilterData() {

    return filterData;
  }

  render() {
    const { selectedComparePeriods } = this.props;

    return (
      <div className="filter-top-panel">
        <div className="filter-item">
          <CoupleMonthRangePicker onChangeRangeOfTwoPeriod={this._onChangeRangeOfTwoPeriod}
            currentPeriod={selectedComparePeriods.currentPeriod}
            previousPeriod={selectedComparePeriods.previousPeriod}
          />
        </div>
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "Based")}</div>
          <select
            className="select-filter"
            onChange={(e) => this._onChangeBaseCurrency(e)}
            value={this.props.selectedBaseCurrency}>
            {this.props.currencyInfo.BaseCurrency.map((item, i) => {
              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "measurement")}</div>
          <select
            className="select-filter"
            onChange={(e) => this._onChangeMeasurement(e)}
            value={this.props.selectedMeasurement.id}>
            {defaultData.measurements.map((item, i) => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        <a className="btn-submit" href="#" onClick={this._onSubmit}>{languageApi.getRes(langCode, "submit")}</a>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { getCurrencyInfo, setBaseCurrency, setMeasurement, setComparePeriods, getAnalyticData } = ActionCreators;
  return bindActionCreators({
    getCurrencyInfo,
    getAnalyticData,
    setBaseCurrency,
    setMeasurement,
    setComparePeriods
  }, dispatch);
}

function mapStateToProps(state) {
  const { selectedBaseCurrency, selectedMeasurement, currencyInfo, selectedComparePeriods, currentChildTabKey } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    selectedComparePeriods,
    currencyInfo,
    currentChildTabKey
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTopPanel)
