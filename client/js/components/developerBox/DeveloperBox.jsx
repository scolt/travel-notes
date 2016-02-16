'use strict';

let React = require('react');
let {PropTypes: propTypes} = React;

let DeveloperPhoto = React.createClass({
    propTypes: {
        src: propTypes.string
    },

    render() {
        return (
            <img src={this.props.src}/>
        )
    }
});

let DeveloperInfo = React.createClass({
    propTypes: {
        developer: propTypes.object
    },

    render() {
        var github = this.props.developer.github ? <div><a target="_blank" href={'http://github.com/' + this.props.developer.github}>Github</a></div> : '';
        var bitbucket = this.props.developer.bitbucket ? <div><a target="_blank" href={'https://bitbucket.org/' + this.props.developer.bitbucket}>Bitbucket</a></div> : '';

        return (
            <div>
                <div><b>{this.props.developer.name}</b></div>
                <div>{this.props.developer.role}</div>
                <div>{this.props.developer.skype}</div>
                {github}
                {bitbucket}
            </div>
        )
    }
});

let Developer = React.createClass({
    propTypes: {
        name: propTypes.string,
        photo: propTypes.string,
        projectRole: propTypes.string,
        skype: propTypes.string
    },

    render() {
        return (
            <tr>
                <td><DeveloperPhoto src={this.props.photo}/></td>
                <td><DeveloperInfo developer={this.props.info}/></td>

            </tr>
        );
    }
});

let DeveloperList = React.createClass({
    getDevelopers() {
        return [
            {
                id: 1,
                photo: "http://lorempixel.com/150/150/business",
                info: {
                    name: "Andrei Liubetski",
                    role: "Developer",
                    skype: "andjey.",
                    bitbucket: "NoNeedNoMore"
                }
            },
            {
                id: 2,
                photo: "http://lorempixel.com/150/150/people",
                info: {
                    name: "Viktar Parashchanka",
                    role: "Developer",
                    skype: "xvint.",
                    github: "scolt",
                    bitbucket: "scolt"
                }
            },
            {
                id: 3,
                photo: "http://lorempixel.com/150/150/sports",
                info: {
                    name: "Aliaksei Tsiatsiokin",
                    role: "Developer",
                    skype: "alexei.tetyokin",
                    bitbucket: "Aliaksei_Tsiatsiokin"
                }
            },
            {
                id: 4,
                photo: "http://lorempixel.com/150/150/transport",
                info: {
                    name: "Uladzimir Havenchyk",
                    role: "Developer",
                    skype: "bolodya_pvp.",
                    bitbucket: "havenchyk"
                }
            }
        ]
    },

    render() {
        return (
            <table>
                <tbody>
                {
                    this.getDevelopers().map(function (item) {
                        return <Developer key={item.id} photo={item.photo} info={item.info}/>
                    })
                }
                </tbody>
            </table>
        );
    }
});

module.exports = DeveloperList;
