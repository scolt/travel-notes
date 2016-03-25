'use strict';

let React = require('react');

let AppBar = require('material-ui/lib/app-bar');
let IconButton = require('material-ui/lib/icon-button');
let NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
let IconMenu = require('material-ui/lib/menus/icon-menu');
let MenuIcon = require('material-ui/lib/svg-icons/navigation/menu');
let MenuItem = require('material-ui/lib/menus/menu-item');
let ActionHome = require('material-ui/lib/svg-icons/action/home');

let Menu = React.createClass({
    render() {
        return (
            <AppBar
                title={`TravelNote`}
                iconElementLeft={
                    <IconMenu
                        iconButtonElement={
                            <IconButton><MenuIcon /></IconButton>
                        }
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        {this.props.menu.map((menuItem, key) => (
                            <MenuItem
                                key={key}
                                primaryText={menuItem.title}
                                onTouchTap={() => location.hash=menuItem.hash}
                            />
                        ))}
                    </IconMenu>
                }
                iconElementRight={
                    <IconButton
                        tooltip="Home"
                        onTouchTap={() => location.hash='#/'}>
                        <ActionHome />
                    </IconButton>
                }
            />
        );
    }
});

module.exports = Menu;
