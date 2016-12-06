/**
 * Created by Vovan on 17.11.2016.
 */
import React from "react";

export default class WordInfoPanel extends React.Component {
    render() {

        const info = this.props.info;

        if (typeof info == 'undefined' || info.length == 0) {
            return <div>No definitions available</div>
        }

        const widget = info.map((element) => <div key={element.id}>
            <div><b>{element.headword}</b>
                {element.pronunciations && element.pronunciations.map((pr) => {
                    return " [" + pr.ipa + "]";
                })}

                { element.senses && element.senses.map((sense) => {
                    return " - " + sense.definition;
                })}
            </div>

        </div>);

        return (
            <div>{widget}</div>
        );
    }
}