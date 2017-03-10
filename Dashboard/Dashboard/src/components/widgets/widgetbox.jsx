import React from 'react';
import ReactDOM from 'react-dom';
import LocalStorageHelper from '../../Modules/LocalStorageHelper';
import Loader from '../Loader';

export default class WidgetBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    }
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  toggleClose() {
    var item = Object.assign({}, this.props.wgItem);
    item.enable = !item.enable;

    this.props.callbackParent({ action: 'wgSyncStatus', items: [item] });
  }

  render() {
    return <div className={`widgetbox ${this.props.wgItem.enable ? '' : 'is-closed'}`}>
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



