'use strict';

let React = require('react');
let {PropTypes: propTypes} = React;
import TextField from 'material-ui/lib/text-field';

let editableField = React.createClass({
    render() {
        return (
            <div className="inputBoxWrapper">
                {this.props.editMode ?
                <TextField hintText={this.props.hintText}
                           name={this.props.name}
                           floatingLabelText={this.props.hintText}
                           value={this.props.value}
                           onChange={this.props.onChange}
                           errorText={this.props.errorText}/> : <div style={{lineHeight: '40px'}}>
                    <strong>{this.props.hintText} :</strong> {this.props.value}
                </div>
                }
            </div>
        );
    }
});

module.exports = editableField;
