import React from 'react';
import ReactDOM from 'react-dom';
import WidgetLayout from '../../Modules/WidgetLayout';
import Loader from '../Loader';

export default class WidgetBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      isClosed: false
    }
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  toggleClose() {
    var wgStatus = WidgetLayout.getWidgetStatus()
    var currentWidget = wgStatus.find(x => x.key == this.props.widgetKey)
    currentWidget.enable = false
    WidgetLayout.saveWidgetStatus(wgStatus)

    if (this.state.isMounted) {
      this.setState(prevState => ({
        isClosed: !prevState.isClosed
      }));
    }
  }

  render() {
    return <div className={`widgetbox ${this.state.isClosed ? 'is-closed' : ''}`}>
      <div className={`widgetbox-header ${this.props.widgetName}`}>
        <span className="title">
          {this.props.title}
        </span>

        <span className="icon-wrapper right">
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



