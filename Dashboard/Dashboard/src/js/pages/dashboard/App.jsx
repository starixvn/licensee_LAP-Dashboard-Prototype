import React from 'react';
import ReactDOM from 'react-dom';

const summary = 'summary';
const performance = 'performance';
export default class DashboardApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: summary,
            isSelectedSummary: true
        }
    }

    handleChangeMenu = (name) => {
        const isSelectedSummary = name === summary;
        this.setState({ url: name, isSelectedSummary });
    }

    render() {
        const { url, isSelectedSummary } = this.state;
        return (
            <div>
                <ul>
                    <li>
                        <a className={isSelectedSummary ? "active" : ""} href="javascript:;" onClick={() => this.handleChangeMenu(summary)}>Summary</a>
                    </li>
                    <li>
                        <a className={isSelectedSummary ? "" : "active"} href="javascript:;" onClick={() => this.handleChangeMenu(performance)}>Performance</a>
                    </li>
                </ul>

                <iframe src={`${url}.html`} width="100%" height="815px"></iframe>
            </div>
        );
    };
}

ReactDOM.render(<DashboardApp />, document.getElementById("dashboard"));