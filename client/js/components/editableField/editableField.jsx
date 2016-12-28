import React from 'react';
import {TextField} from 'material-ui';

const editableField = React.createClass({
    render() {
        return (
            <div className="inputBoxWrapper">
                {this.props.editMode ?
                <TextField hintText={this.props.hintText}
                           name={this.props.name}
                           disabled={this.props.disabled}
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

export default editableField;
