'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let {PropTypes: propTypes} = React;

let InputBox = React.createClass({
    propTypes: {
        className: propTypes.string,
        type: propTypes.string,
        value: propTypes.string
    },

    getDefaultProps() {
        return {
            className: 'inputBox',
            classNameModifiers: ['isValid','isTouch','isDirty'],
            value: ''
        };
    },

    handleBlur(e) {
        console.log('blur handled');
        let inputValue = ReactDOM.findDOMNode(this).querySelector('.inputBox').value;
        console.dir(inputValue);
        this.setState(function(previousState, currentProps){
            return {
                isValid: inputValue.length > 0,
                isTouch: true,
                isDirty: inputValue.length === 0
            }
        });
        console.log(this.state);
    },

    componentDidMount() {
        window.addEventListener('blur', this.handleBlur);
        this.setState(function(previousState, currentProps){
            return {
                isValid: false,
                isTouch: false,
                isDirty: false
            }
        });
        console.log('component mounted');
    },

    componentWillUnmount() {
        window.removeEventListener('blur', this.handleBlur);
    },

    render() {
        let stateObject = this.state;
        let className = this.props.className;
        let classNameModifiers = this.props.classNameModifiers.map( classNameModifier => `${stateObject && stateObject[classNameModifier] ? ' ' + classNameModifier : ''}`).join('');
        let messageStyle = stateObject && stateObject.isTouch ? {display : 'block'} : {display : 'none'},
            errorStyle = stateObject && stateObject.isDirty && !stateObject.isValid ? {display : 'block'} : {display : 'none'};

        return (
            <div className="inputBoxWrapper">
                <input className={`${className}${classNameModifiers}`}/>
                <span style={messageStyle}>
                You touch this field.
                </span>
                <span style={errorStyle}>
                This field seems to be invalid.
                </span>
            </div>
        );
    }
});

module.exports = InputBox;
