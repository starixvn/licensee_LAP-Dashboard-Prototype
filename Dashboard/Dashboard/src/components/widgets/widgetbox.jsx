import React from 'react';
import ReactDOM from 'react-dom';
import WidgetApi from '../../Modules/WidgetApi';
import Loader from '../Loader';

export default class WidgetBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      isMinimized: false,
      isClosed: false
    }
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  toggleMinimize() {
    if (this.state.isMounted) {
      this.setState(prevState => ({
        isMinimized: !prevState.isMinimized
      }));
    }
  }
  toggleClose() {
    var wgStatus = WidgetApi.getWgStatus()
    var currentWidget = wgStatus.find(x => x.key == this.props.widgetKey)
    currentWidget.enable = false
    WidgetApi.saveWgStatus(wgStatus)

    if (this.state.isMounted) {
      this.setState(prevState => ({
        isClosed: !prevState.isClosed
      }));
    }
  }

  render() {
    return <div className={`widgetbox ${this.state.isClosed ? 'is-closed' : `${this.state.isMinimized ? 'is-minimize' : ''}`}`}>
      <div className={`widgetbox-header ${this.props.widgetName}`}>
        <span className="title">
          {this.props.title}
        </span>

        <span className="icon-wrapper right">
          <span onClick={(e) => this.toggleMinimize(e)} className="icon icon-minimize"></span>
          <span onClick={(e) => this.toggleClose(e)} className="icon icon-close"></span>
        </span>
      </div>
      <div className={`widgetbox-content ${this.props.widgetName}`}>
        <Loader isLoading={this.props.isLoading} widgetKey={this.props.widgetKey} />
        {this.props.children}
      </div>
    </div>
      ;
  }
};



