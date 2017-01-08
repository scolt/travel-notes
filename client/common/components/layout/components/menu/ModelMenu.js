const menu = {
    menuOpen: false,
    menuItems: [
        {
            name: 'main',
            title: 'News',
            hash: '#/main',
            icon: 'home'
        },
        {
            name: 'gallery',
            title: 'Gallery',
            hash: '#/gallery',
            icon: 'camera-retro'
        },
        {
            name: 'landingPage',
            title: 'Main Page',
            hash: '#/landingPage',
            icon: 'globe'
        },
        {
            name: 'map',
            title: 'Map',
            hash: '#/map',
            icon: 'map-marker'
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
