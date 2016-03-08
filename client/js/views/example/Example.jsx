'use strict';

let React = require('react');

let Layout = require('components/layout/Layout');

let myMixin = {

};

let Example = React.createClass({
    model: {},

    displayName: 'Example',

    mixins: [
        myMixin
    ],

    statics: {
        static() {
            alert('static');
        }
    },

    propTypes: {

    },

    getDefaultProps() {

    },

    getInitialState() {
        return {value: ''};
    },

    componentWillMount() {

    },

    componentDidMount() {

    },

    componentWillReceiveProps(nextProps) {

    },

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },

    componentWillUpdate(nextProps, nextState) {

    },

    componentDidUpdate(prevProps,  prevState) {

    },

    componentWillUnmount() {

    },

    label: 'label',
    defaultValue: 'defaultValue',
    style: {
        margin: 20
    },

    onChange(e) {
        let {value} = e.target;
        if (!/^\d*$/.test(value)) return;
        this.setState({value});
    },

    render() {
        return (
            <form style={this.style}>
            {this.displayName}
                <label>{this.label}
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                />
                </label>
            </form>
        );
    }
});

module.exports = Example;

// let HelloWorld = (props) => <div>Hello {props.value}</div>;
// render(<HelloWorld value="World"/>, document.getElementById('app'));


// let HelloWorld = (props) => <div>Hello {props.value}</div>;
// render(HelloWorld ({value: 'World'}), document.getElementById('app'));

// class HelloWorld extends React.Component {
//     render() {
//         return <div>Hello {this.props.value}</div>;
//     }
// }
// render(<HelloWorld value="World"/>, document.getElementById('app'));

// let Hello = React.createElement('div', null, 'Hello World');
// render(Hello, document.getElementById('app'));


// let HelloWorld = (props) => `<div>Hello ${props.value}</div>`;
// document.getElementById('app').innerHTML = HelloWorld({value: 'World'});
