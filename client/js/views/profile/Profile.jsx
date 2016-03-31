'use strict';
import React from 'react';
import store from 'store';
import storeMixin from 'mixins/storeMixin';
import Map from 'components/map/Map';
import UserNotes from './components/userNotes';
import UserInfo from './components/userInfo';
import Icon from 'react-fa';


let Profile = React.createClass({
    fetchModel: function () {
        return {
            name: 'notes',
            params: {
                userId: this.props.params.username
            }
        };
    },

    mixins: [
        storeMixin
    ],

    render() {
        return (
            <div className="container">
                <div className="row"  style={{marginTop: '25px'}}>
                    <div className="col-md-6">
                        <UserInfo user={this.props.params.username} />
                    </div>
                    <div className="col-md-6">
                        {this.state.net.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : <UserNotes notes={this.state.notes}/>}
                    </div>
                </div>
                <div className="row" style={{position: 'relative', height: '600', width: '100%', margin: '0'}}>
                    {this.state.net.isFetching ? <div className="spinner"><Icon name="circle-o-notch" spin/></div> : <Map markers={this.state.notes} type="fullscreen"/>}
                </div>
            </div>
        );
    }
});

module.exports = Profile;
