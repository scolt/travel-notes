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
import {setMenuStatus} from 'actions/menu';
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

    logout() {
        store.dispatch(logoutUser(this.state));
    },

    openMenuItem(hash) {
        location.hash = hash;
        store.dispatch(setMenuStatus(false));
    },

    render() {
        let user = store.getState().user;

        let userBlock = null;
        let actionsBlock =
            <div className="col-md-12">
                <RaisedButton
                    label="Login"
                    primary={true}
                    style={{width: '100%'}}
                    linkButton={true}
                    href="/#/login"
                    onTouchTap={() => store.dispatch(setMenuStatus(false))}
                />
                <br/><br/>
                <RaisedButton
                    label="Register"
                    secondary={true}
                    style={{width: '100%'}}
                    linkButton={true}
                    href="/#/register"
                    onTouchTap={() => store.dispatch(setMenuStatus(false))}
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
                        onTouchTap={() => {this.logout(); store.dispatch(setMenuStatus(false));}}
                    />
                </div>;
        }


        return (
            <AppBar
                title={`TravelNote ${this.props.count || ''}`}
                onLeftIconButtonTouchTap={() => store.dispatch(setMenuStatus(true))}
                iconElementRight={
                    <IconButton
                        tooltip="Home"
                        onTouchTap={() => location.hash='#/'}>
                        <ActionHome />
                    </IconButton>
                }>
                <LeftNav open={this.state.menu.open}
                         onRequestChange={open => store.dispatch(setMenuStatus(open))}
                         docked={false}>
                    {userBlock}
                    {this.props.menu.items.map((menuItem, key) => (
                        <MenuItem
                            key={key}
                            primaryText={menuItem.title}
                            leftIcon={<Icon name={menuItem.icon} />}
                            onTouchTap={this.openMenuItem.bind(this, menuItem.hash)}
                        />
                    ))}
                    {actionsBlock}
                </LeftNav>
            </AppBar>

        );
    }
});

module.exports = Menu;
