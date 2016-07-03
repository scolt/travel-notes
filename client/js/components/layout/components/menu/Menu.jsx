'use strict';

let React = require('react');

let AppBar = require('material-ui/lib/app-bar');
let IconButton = require('material-ui/lib/icon-button');
let MenuItem = require('material-ui/lib/menus/menu-item');
let ActionHome = require('material-ui/lib/svg-icons/action/home');

import storeMixin from 'mixins/storeMixin';

import LeftNav from 'material-ui/lib/left-nav';
import RaisedButton from 'material-ui/lib/raised-button';
import {logoutUser} from 'actions/users';
import {setMenuStatus} from 'actions/menu';
import Paper from 'material-ui/lib/paper';
import Icon from 'react-fa';
import './Menu.styl';

let Menu = React.createClass({
    mixins: [storeMixin],

    logout() {
        this.store.dispatch({type: 'logout'});
    },

    openMenuItem(hash) {
        location.hash = hash;
        this.store.dispatch(setMenuStatus(false));
    },

    openProfile() {
        let user = this.state.users.user;
        location.hash = '#/profile/' + user.username;
        this.store.dispatch(setMenuStatus(false));
    },

    render() {
        let user = this.state.users.user;

        let userBlock = null;
        let actionsBlock =
            <div className="col-md-12">
                <RaisedButton
                    label="Login"
                    primary={true}
                    style={{width: '100%'}}
                    linkButton={true}
                    href="/#/login"
                    onTouchTap={() => this.store.dispatch(setMenuStatus(false))}
                />
                <br/><br/>
                <RaisedButton
                    label="Register"
                    secondary={true}
                    style={{width: '100%'}}
                    linkButton={true}
                    href="/#/register"
                    onTouchTap={() => this.store.dispatch(setMenuStatus(false))}
                />
            </div>;
        if (user.email) {
            userBlock =
                <div>
                    <Paper className="image-developer"
                           zDepth={1}
                           circle={true}
                           onTouchTap={this.openProfile}>
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
                        onTouchTap={() => {this.logout(); this.store.dispatch(setMenuStatus(false));}}
                    />
                </div>;
        }


        return (
            <AppBar
                title={`TravelNote`}
                onLeftIconButtonTouchTap={() => this.store.dispatch(setMenuStatus(true))}
                iconElementRight={
                    <IconButton
                        tooltip="Home"
                        onTouchTap={() => location.hash='#/'}>
                        <ActionHome />
                    </IconButton>
                }>
                <LeftNav open={this.state.menu.open}
                         onRequestChange={open => this.store.dispatch(setMenuStatus(open))}
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
