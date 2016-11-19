/**
 * Created by Vovan on 14.11.2016.
 */

import React from 'react';

export default class LoadingOverlay extends React.Component {
    render() {
        return (
            <div className={this.props.enabled ? 'loadingContainer enabled' : 'loadingContainer'}>
                <div className="bar"></div>
            </div>
        );
    }
}