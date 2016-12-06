/**
 * Created by Vovan on 14.11.2016.
 */
import React from "react";

import ApplicationStateStore from "../stores/ApplicationStateStore";

export default class LoadingOverlay extends React.Component {

    constructor() {
        super();
        this.state = {loading: ApplicationStateStore.isLoading()}
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));

        ApplicationStateStore.on("change", () => {
            this.setState({
                loading: ApplicationStateStore.isLoading()
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrolledHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolledHeight > 50 && !this.state.headerScrolled) {
            this.setState({headerScrolled: true});
        } else if (scrolledHeight <= 50 && this.state.headerScrolled) {
            this.setState({headerScrolled: false});
        }
    }

    render() {
        let classes = "loadingContainer";
        if (this.state.loading) {
            classes += " enabled";
        }

        if (this.state.headerScrolled) {
            classes += " stick";
        }

        return (
            <div className={classes}>
                <div className="bar"></div>
            </div>
        );
    }
}