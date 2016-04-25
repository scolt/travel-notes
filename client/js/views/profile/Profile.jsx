'use strict';
import React from 'react';
import store from 'store';
import storeMixin from 'mixins/storeMixin';
import Map from 'components/map/Map';
import UserNotes from './components/userNotes';
import UserInfo from './components/userInfo';
import Icon from 'react-fa';
import restApi from 'actions/restApi';


let Profile = React.createClass({

    mixins: [
        storeMixin
    ],

    render() {
        return (
            <div className="container">
                <div className="row"  style={{margin: '25px 0'}}>
                    <div className="col-md-12">
                        <UserInfo user={this.props.params.username} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;
