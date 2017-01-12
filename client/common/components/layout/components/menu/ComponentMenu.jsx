import React from 'react';
import Icon from 'react-fa';
import {AppBar, MenuItem, Drawer, RaisedButton, FlatButton, Paper} from 'material-ui';

import UserTile from '../user/ComponentUserTile';
import LogoutButton from '../logoutButton/ComponentLogoutButton';
import withStore from 'common/components/withStore/withStore';

import './styl/menu.styl';

const buttonStyle = {
    color: '#fff',
    marginTop: '7px'
};


const Menu = React.createClass({
    componentWillMount() {
        document.addEventListener('scroll', () => {
            this.forceUpdate();
        });
    },

    setMenuStatus(status) {
        this.props.store.dispatch({
            type: 'updateMenuStatus',
            status: status
        });
    },

    openMenuItem(hash) {
        this.props.store.dispatch({
            type: 'openMenuItem',
            path: hash
        });
    },

    render() {
        const {menuItems, menuOpen: menuStatus } = this.props.data.menu;
        const {user} = this.props.data.users;
        const flatRoutes = ['/', '/profile/:id'.replace(':id', this.props.route.params.id)];
        const zDepth = flatRoutes.includes(this.props.route.path) && document.body.scrollTop === 0 ? 0 : 1;

        return (
            <AppBar
                zDepth={zDepth}
                title={
                    <a className="logo" onClick={this.openMenuItem.bind(this, '#/main')}>TravelNote</a>
                }
                onLeftIconButtonTouchTap={this.setMenuStatus.bind(this, true)}
                iconElementRight={ !user.email ?
                    <div>
                        <FlatButton label="Log In" style={buttonStyle} onClick={this.openMenuItem.bind(this, '#/login')}/>
                        <FlatButton label="Sign Up" style={buttonStyle} onClick={this.openMenuItem.bind(this, '#/register')}/>
                    </div> : <span></span>

                }>
                <Drawer open={menuStatus}
                         onRequestChange={this.setMenuStatus}
                         docked={false}>
                    <div>
                        {user.email ?
                            <div onClick={this.openMenuItem.bind(this, `#/profile/${user.username}`)}>
                                <UserTile />
                            </div> : <span></span>}
                    </div>
                    <div>
                        {menuItems.map((menuItem, key) => (
                        <MenuItem
                            key={key}
                            primaryText={menuItem.title}
                            leftIcon={<Icon name={menuItem.icon} />}
                            onTouchTap={this.openMenuItem.bind(this, menuItem.hash)}
                        />
                        ))}
                    </div>
                    <div>
                        {user.email ? <LogoutButton onClick={this.setMenuStatus.bind(this, false)}/> : <span></span>}
                    </div>
                </Drawer>
            </AppBar>
        );
    }
});

export default withStore(Menu);
