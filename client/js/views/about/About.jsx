'use strict';

let React = require('react');
let storeMixin = require('mixins/storeMixin');
let Developer = require('components/developerBox/DeveloperBox');

let About = React.createClass({

    render() {
        var developers = [
            {
                key: 1,
                name: 'Aliaksei Tsiatsiokin',
                photo: 'http://lorempixel.com/400/400/business/9/',
                role: 'Developer',
                contacts: {
                    skype: 'skype',
                    github: 'github',
                    bitbucket: 'bitbucket'
                }
            },
            {
                key: 2,
                name: 'Andrei Liubetski',
                photo: 'http://lorempixel.com/400/400/business/8/',
                role: 'Developer',
                contacts: {
                    skype: 'skype',
                    github: 'github',
                    bitbucket: 'bitbucket'
                }
            },
            {
                key: 3,
                name: 'Denis Spartak',
                photo: 'http://lorempixel.com/400/400/sports/3',
                role: 'Developer',
                contacts: {
                    skype: 'skype',
                    github: 'github',
                    bitbucket: 'bitbucket'
                }
            },
            {
                key: 4,
                name: 'Uladzimir Havenchyk',
                photo: 'http://lorempixel.com/400/400/sports/2',
                role: 'Developer',
                contacts: {
                    skype: 'skype',
                    github: 'github',
                    bitbucket: 'bitbucket'
                }
            },
            {
                key: 5,
                name: 'Viktar Parashchanka',
                photo: 'http://lorempixel.com/400/400/sports/1',
                role: 'Developer',
                contacts: {
                    skype: 'skype',
                    github: 'github',
                    bitbucket: 'bitbucket'
                }
            }
        ];

        return <div>
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec molestie justo, nec gravida purus. Phasellus tincidunt quis mi sed porttitor. Aliquam suscipit lacus bibendum eros vulputate, et feugiat augue feugiat. Mauris blandit id felis ac elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec porta, purus et imperdiet ullamcorper, metus mauris aliquet lectus, in condimentum nunc nisi quis nulla. Integer vitae ex luctus, finibus tellus tincidunt, vehicula est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin aliquet, dolor vitae varius euismod, quam ipsum lobortis purus, non volutpat leo nunc et eros. Integer interdum sem a dolor pretium, ac condimentum tortor dapibus. Nullam vel nunc nisi. Fusce ac eros lorem. Quisque dictum orci sed accumsan porta. Pellentesque lacinia facilisis nisl, ac fringilla nulla.</p>
            <h2>Team</h2>
            <div className="row">
                {developers.map(developer => {
                    return  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={developer.key}><Developer {...developer}/></div>;
                })}
            </div>
        </div>;
    }
});

module.exports = About;
