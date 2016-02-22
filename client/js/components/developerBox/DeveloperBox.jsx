'use strict';

let React = require('react');
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
            <div className="developer">
                <div className="row">
                    <div className="col-md-3">
                        <img className="img-rounded" src={this.props.photo}/>
                    </div>
                    <div className="col-md-9">
                        <h3>{this.props.name}</h3>
                        <p>{this.props.role}</p>
                        <div className="additional-developer-info">
                            {Object.keys(this.props.contacts).map((contact, i)=>{
                                switch (contact) {
                                    case "skype": return <a key={i} href={'skype:' + this.props.contacts[contact]} className="fa fa-skype"></a>;
                                    case "github": return <a key={i} target="_blank" href={'http://github.com/' +  this.props.contacts[contact]} className="fa fa-github"></a>;
                                    case "bitbucket": return <a key={i} target="_blank" href={'https://bitbucket.org/' + this.props.contacts[contact]} className="fa fa-bitbucket"></a>;
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
