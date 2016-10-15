'use strict';

let React = require('react');

let AppBar = require('material-ui/lib/app-bar');
let MenuItem = require('material-ui/lib/menus/menu-item');

import storeMixin from 'mixins/storeMixin';

import LeftNav from 'material-ui/lib/left-nav';
import {RaisedButton, FlatButton} from 'material-ui';
import {logoutUser} from 'actions/users';
import {setMenuStatus} from 'actions/menu';
import Paper from 'material-ui/lib/paper';
import Icon from 'react-fa';
import './Menu.styl';
import 'avatar.jpg';

const buttonStyle = {
    color: '#fff',
    marginTop: '7px'
};

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
        if (user.email) {
            userBlock =
                <div>
                    <Paper className="image-developer clickable"
                           zDepth={1}
                           circle={true}
                           onTouchTap={this.openProfile}>
                        <img className="img-rounded" src={user.avatar || 'client/assets/avatar.jpg'}/>
                        <div className="edit">Edit Profile</div>
                    </Paper>
                    <p className="user-name">{user.email}</p>
                </div>;
        }


        return (
            <AppBar
                title={
                    <a className="logo" onClick={this.openMenuItem.bind(this, '#/main')}>TravelNote</a>
                }
                onLeftIconButtonTouchTap={() => this.store.dispatch(setMenuStatus(true))}
                iconElementRight={ !user.email ?
                    <div>
                        <FlatButton label="Log In" style={buttonStyle} onClick={this.openMenuItem.bind(this, '#/login')}/>
                        <FlatButton label="Sign Up" style={buttonStyle} onClick={this.openMenuItem.bind(this, '#/register')}/>
                    </div> : null

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
                    {user.email ?
                        <div className="col-md-12">
                            <RaisedButton
                                label="Logout"
                                primary={true}
                                style={{width: '100%'}}
                                onTouchTap={() => {this.logout(); this.store.dispatch(setMenuStatus(false));}}
                            />
                        </div> : null}
                </LeftNav>
            </AppBar>

        );
    }
});

module.exports = Menu;
