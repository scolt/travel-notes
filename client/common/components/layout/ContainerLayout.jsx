import 'flexboxgrid/dist/flexboxgrid.min.css';

import '../../../assets/favicon.png';

import React from 'react';

import Menu from './components/menu/ComponentMenu';
import Footer from './components/footer/Footer';

import Alert from '../alerts/ComponentAlert';
import withStore from '../withStore/withStore';
import restApi from '../../actions/restApi';

const Layout = React.createClass({
    componentWillMount() {
        this.request = this.props.store.dispatch(restApi({
            model: 'users',
            action: 'ping',
            type: 'ping'
        }));
    },

    render () {
        const routeParams = {
            path: this.props.location.pathname,
            params: this.props.params
        };

        return (
            <div className={`page-${this.props.location.pathname.replace('/', '')}-route`}>
                <div className="header">
                    <Menu menu={this.props.data.menu} route={routeParams}/>
                </div>
                <div className="col-xs-12">
                    {this.props.children}
                </div>
                <Alert />
                <Footer />
            </div>
        );
    }
});

export default withStore(Layout);
