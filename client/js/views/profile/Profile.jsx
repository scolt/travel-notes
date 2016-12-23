'use strict';
import React from 'react';
import storeMixin from 'mixins/storeMixin';
import Map from 'components/map/Map';
import UserNotes from './components/userNotes';
import UserInfo from './components/userInfo';
import Icon from 'react-fa';

let Profile = React.createClass({

    mixins: [
        storeMixin
    ],

    render() {
        return (
            <div className="container">
                <div className="row"  style={{margin: '25px 0'}}>
                    <div className="col-md-6 col-xs-12">
                        <UserInfo user={this.props.params.username}  />
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <UserNotes user={this.props.params.username} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;
