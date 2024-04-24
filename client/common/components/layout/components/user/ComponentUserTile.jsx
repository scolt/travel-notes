import avatar from '../../../../../assets/avatar.jpg';
import React from 'react';
import {Paper} from 'material-ui';

import withStore from '../../../withStore/withStore';

import './usertile.styl';

const UserTile = React.createClass({
    openProfile() {

    },

    render() {
        const { user } = this.props.data.users;
        return <a title="Open Your Profile">
            <Paper className="image-developer clickable"
                   zDepth={1}
                   circle={true}
                   onTouchTap={this.openProfile}>
                <img className="img-rounded" src={user.avatar || avatar}/>
                <div className="edit">Edit Profile</div>
            </Paper>
            <p className="user-name">{user.email}</p>
        </a>;
    }
});

export default withStore(UserTile);
