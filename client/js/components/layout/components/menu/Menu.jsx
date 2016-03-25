'use strict';

let React = require('react');

let AppBar = require('material-ui/lib/app-bar');
let IconButton = require('material-ui/lib/icon-button');
let MenuItem = require('material-ui/lib/menus/menu-item');
let ActionHome = require('material-ui/lib/svg-icons/action/home');
let store = require('store');

import LeftNav from 'material-ui/lib/left-nav';
import RaisedButton from 'material-ui/lib/raised-button';
import {logoutUser} from 'actions/users';
import Paper from 'material-ui/lib/paper';
import Icon from 'react-fa';
import './Menu.styl';

let Menu = React.createClass({
    getInitialState() {
        return {
            open: false
        };
    },

    componentWillMount() {
        this.store = store;
        this.unsubscribe = store.subscribe(this.handleStoreChange);
        this.setState(store.getState());
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    handleStoreChange() {
        let state = this.store.getState();
        this.setState(state);
    },

    switchLeftNav() {
        this.state.open = !this.state.open;
        this.setState(this.state);
    },

    logout() {
        store.dispatch(logoutUser(this.state));
    },

    handleClose() {
        this.setState({open: false});
    },

    render() {
        let user = store.getState().user;

        let userBlock = null;
        let actionsBlock =
            <div className="col-md-12">
                <RaisedButton
                    label="Login"
                    style={{width: '100%'}}
                    linkButton={true}
                    href="/#/login"
                    onTouchTap={this.handleClose}
                />
                <br/><br/>
                <RaisedButton
                    label="Register"
                    secondary={true}
                    style={{width: '100%'}}
                    linkButton={true}
                    href="/#/register"
                    onTouchTap={this.handleClose}
                />
            </div>;
        if (user.email) {
            userBlock =
                <div>
                    <Paper className="image-developer" zDepth={1} circle={true}>
                        <img className="img-rounded" src={user.avatar}/>
                    </Paper>
                    <p className="user-name">{user.email}</p>
                </div>;
            actionsBlock =
                <div className="col-md-12">
                    <RaisedButton
                        label="Logout"
                        primary={true}
                        style={{width: '100%'}}
                        onTouchTap={() => {this.logout(); this.handleClose();}}
                    />
                </div>;
        }


        return (
            <AppBar
                title={`TravelNote ${this.props.count || ''}`}
                onLeftIconButtonTouchTap={this.switchLeftNav}
                iconElementRight={
                    <IconButton
                        tooltip="Home"
                        onTouchTap={() => location.hash='#/'}>
                        <ActionHome />
                    </IconButton>
                }>
                <LeftNav open={this.state.open}
                         onRequestChange={open => this.setState({open})}
                         docked={false}>
                    {userBlock}
                    {this.props.menu.map((menuItem, key) => (
                        <MenuItem
                            key={key}
                            primaryText={menuItem.title}
                            leftIcon={<Icon name={menuItem.icon} />}
                            onTouchTap={() => {location.hash = menuItem.hash; this.handleClose();}}
                        />
                    ))}
                    {actionsBlock}
                </LeftNav>
            </AppBar>

        );
    }
});

module.exports = Menu;
