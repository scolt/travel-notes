import { faHospital, faImage, faEye, faMap } from '@fortawesome/free-regular-svg-icons';

const menu = {
    menuOpen: false,
    menuItems: [
        {
            name: 'main',
            title: 'News',
            hash: '#/main',
            icon: faHospital
        },
        {
            name: 'gallery',
            title: 'Gallery',
            hash: '#/gallery',
            icon: faImage
        },
        {
            name: 'landingPage',
            title: 'Main Page',
            hash: '#/',
            icon: faEye
        },
        {
            name: 'map',
            title: 'Map',
            hash: '#/map',
            icon: faMap
        }
    ],
    footerMenu: {
        'Travel Note': [
            {
                title: 'Main Page',
                url: '#/landingPage'
            },
            {
                title: 'Last Notes',
                url: '#/main'
            }
        ],
        'Helpful links': [
            {
                title: 'Skyscanner',
                url: 'http://www.skyscanner.net/'
            },
            {
                title: 'Eightydays.Me',
                url: 'eightydays.me'
            }
        ]
    }
};

export default menu;
