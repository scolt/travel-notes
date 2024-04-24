import React from 'react';

import withStore from '../../../withStore/withStore';
import './styl/foot.styl';

const Footer = React.createClass({
    render() {
        const menu = this.props.data.menu.footerMenu;
        return (
            <div className="footer">
                <div className="logoColumn">
                    TravelNote
                </div>
                <div className="footer-menu">
                    {Object.keys(menu).map((title, key) => <div key={key} className="footer-menu-item">
                        <strong>{title}</strong>
                        <ul>
                            {menu[title].map((val, vkey) => <li key={vkey}>
                                <a href={val.url}>{val.title}</a>
                            </li>)}
                        </ul>
                    </div>)}
                </div>
            </div>
        );
    }
});

export default withStore(Footer);
