import React from 'react';
import Icon from 'react-fa';
import storeMixin from 'mixins/storeMixin';
import {Dialog} from 'material-ui';

const customContentStyle = {
    padding: '0 0'
};

const Modal = React.createClass({
    mixins: [storeMixin],

    closeModal() {
        this.props.onClose();
    },

    render() {
        const {modal} = this.state;

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

export default Modal;
