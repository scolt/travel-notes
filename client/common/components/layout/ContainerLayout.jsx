import 'flexboxgrid/dist/flexboxgrid.min.css';

import 'favicon.png';

import React from 'react';

import Menu from './components/menu/ComponentMenu';
import Footer from './components/footer/Footer';

import Alert from 'common/components/alerts/ComponentAlert';
import withStore from 'common/components/withStore/withStore';
import restApi from 'common/actions/restApi';

const Layout = React.createClass({
    componentWillMount() {
        this.request = this.props.store.dispatch(restApi({
            model: 'users',
            action: 'ping',
            type: 'ping'
        }));
    },

    render () {
        return (
            <div>
                <div className="header">
                    <Menu menu={this.props.data.menu}/>
                </div>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <Alert />
                {/*<Snackbar*/}
                {/*open={this.state.snackbar.open || false}*/}
                {/*message={this.state.snackbar.message || ''}*/}
                {/*autoHideDuration={2000}*/}
                {/*onRequestClose={() => {this.store.dispatch({type: 'snackbarClose'});}}*/}
                {/*/>*/}
                <Footer />
            </div>
        );
    }
});

export default withStore(Layout);
