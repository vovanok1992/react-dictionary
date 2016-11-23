/**
 * Created by Vovan on 14.11.2016.
 */

import React from 'react';

export default class LoadingOverlay extends React.Component {

    render() {
    	let classes = "loadingContainer"; 
	    if(this.props.enabled){
		    classes += " enabled";
		}

	    if(this.props.stick){
			classes += " stick";
	     }

        return (
            <div className={classes}>
                <div className="bar"></div>
            </div>
        );
    }
}