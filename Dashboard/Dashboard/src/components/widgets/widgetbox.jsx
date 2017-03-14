import React from 'react';
import ReactDOM from 'react-dom';
import Loader from '../Loader';

export default class WidgetBox extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleClose() {
    var item = Object.assign({}, this.props.wgItem);
    item.enable = !item.enable;

    this
      .props
      .callbackParent({action: 'wgSyncStatus', items: [item]});
  }

  render() {
    const isClosed = this.props.wgItem.enable
      ? ''
      : 'is-closed';
    return <div className={`widgetbox ${isClosed}`}>
      <div className={`widgetbox-header ${this.props.widgetName}`}>
        <span className="title">
          {this.props.title}
        </span>
        <span className="icon-wrapper right">
          <span onClick={() => this.toggleClose()} className="icon icon-close"></span>
        </span>
      </div>
      <div className={`widgetbox-content ${this.props.widgetName}`}>
        <Loader isLoading={this.props.isLoading} widgetKey={this.props.widgetKey}/> {this.props.children}
      </div>
    </div>;
  }
}
