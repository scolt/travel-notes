'use strict';

import React from 'react';
import Icon from 'react-fa';
import Paper from 'material-ui/lib/paper';

import './DeveloperBox.styl';

let {PropTypes: propTypes} = React;

let DeveloperBox = React.createClass({
    propTypes: {
        name: propTypes.string,
        photo: propTypes.string,
        contacts: propTypes.object
    },

    getDefaultProps() {
        return {
            contacts: {}
        };
    },

    render() {
        return (
            <div>
                <div className="row developer">
                    <div className="col-xs-12">
                        <Paper zDepth={1} circle={true} className="image-developer">
                            <img className="img-rounded" src={this.props.photo}/>
                        </Paper>
                    </div>
                    <div className="col-xs-12 developer-info">
                        <h3>{this.props.name}</h3>
                        <p>{this.props.role}</p>
                        <div className="additional-developer-info">
                            {Object.keys(this.props.contacts).map((contact, i)=>{
                                switch (contact) {
                                case 'skype': return <a key={i} href={'skype:' + this.props.contacts[contact]}><Icon name="skype" /></a>;
                                case 'github': return <a key={i} target="_blank" href={'http://github.com/' +  this.props.contacts[contact]}><Icon name="github" /></a>;
                                case 'bitbucket': return <a key={i} target="_blank" href={'https://bitbucket.org/' + this.props.contacts[contact]}><Icon name="bitbucket" /></a>;
                                }
                                return <a href="" className="fa fa-skype">{contact}</a>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = DeveloperBox;
