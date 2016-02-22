'use strict';

let React = require('react');
let {PropTypes: propTypes} = React;

require('./ComponentName.styl');

let ComponentName = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        classNameModifiers: propTypes.array,
        value: propTypes.string
    },

    getDefaultProps() {
        return {
            className: 'ComponentName',
            classNameModifiers: [],
            value: 'ComponentValue'
        };
    },

    render() {
        let className = this.props.className;
        let classNameModifiers = this.props.classNameModifiers.map( classNameModifier => `${className}_${classNameModifier}`).join(' ');

        return (
            <div className={`${className} ${classNameModifiers}`}>
                {this.props.value}
            </div>
        );
    }
});

module.exports = ComponentName;
