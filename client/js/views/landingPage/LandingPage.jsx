'use strict';

let React = require('react');

let LandingPage = React.createClass({
    render() {
        return <div>
		<h1>Welcome to our Landing Page</h1>
		<ul>We provide to you ability to:
			<li>Get fresh news about palces where you are going to</li>
			<li>Send your own opinion about different cities, towns and places for interest</li>
			<li>Look photos from places you are going to and post photos from places you've been</li>
			<li>Plan your vacation more efficiently</li>			
		</ul>
		<a href="/main">Plan wonderful vacation with us!</a>
		</div>;
    }
});

module.exports = LandingPage;
