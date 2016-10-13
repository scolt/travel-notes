'use strict';
import React from 'react';
import Icon from 'react-fa';
import storeMixin from 'mixins/storeMixin';
import {Dialog} from 'material-ui';

const customContentStyle = {
    padding: '0 0'
};

let Modal = React.createClass({
    mixins: [storeMixin],

    closeModal() {
        this.props.onClose();
    },

    render() {
        const modal = this.state.modal;

        return (
            <Dialog
                open={modal.open}
                bodyStyle={customContentStyle}
                className={modal.className}
                onRequestClose={this.closeModal}
            >
                {modal.content}
            </Dialog>
        );
    }
});

module.exports = Modal;
