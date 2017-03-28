import React from 'react';
import {TextField} from 'material-ui';

const styles = {
    underlineStyle: {
        borderColor: '#ff4081',
        borderWidth: '2px'
    }
};

const EditableField = React.createClass({
    render() {
        const inputProperties = this.props.field;
        const textField = <TextField
            className="editable-text-field"
            hintText={inputProperties.label}
            floatingLabelText={inputProperties.label}
            name={inputProperties.name}
            disabled={inputProperties.disabled || false}
            value={inputProperties.value}
            multiLine={inputProperties.type === 'textarea'}
            fullWidth={inputProperties.type === 'textarea'}
            onChange={this.props.onChange}
            underlineStyle={styles.underlineStyle}
            errorText={inputProperties.errorText}/>;

        return (
            <span className="input-box-wrapper" id={`${inputProperties.name.replace(' ', '').toLowerCase()}Input`}>
                {this.props.editMode ? textField : this.props.children}
            </span>
        );
    }
});

export default EditableField;
