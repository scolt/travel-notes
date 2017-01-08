import 'sweetalert/dist/sweetalert.css';

import React from 'react';
import SweetAlert from 'sweetalert-react';

import withStore from '../withStore/withStore';

const Alert = React.createClass({
    render() {
        const alertConfig = this.props.data.alert;
        return <SweetAlert
            show={alertConfig.open || false}
            title={alertConfig.title || ''}
            text={alertConfig.message || ''}
            type={alertConfig.type || 'info'}
            showCancelButton={alertConfig.showCancelButton || false}
            html={true}
            onConfirm={() => {
                alertConfig.beforeConfirm();
                this.props.store.dispatch({type: 'alertClose'});
            }}
            onCancel={() => {
                alertConfig.beforeCancel();
                this.props.store.dispatch({type: 'alertClose'});
            }}
            onClose={() => {
                alertConfig.beforeClose();
            }}
        />;
    }
});

export default withStore(Alert);
