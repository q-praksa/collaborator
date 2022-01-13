import {
    faClock,
    faIdCard,
    faUsers,
    faProjectDiagram,
    faChartLine,
    faStreetView,
} from '@fortawesome/free-solid-svg-icons';

const sidebarData = [
    {
        id: 1,
        icon: faStreetView,
        styleName: 'link-style-white',
        label: 'overview',
        route: '/admin-overview',
        role: 'admin',
    },
    {
        id: 2,
        icon: faStreetView,
        styleName: 'link-style-white',
        label: 'overview',
        route: '/user-overview',
        role: 'user',
    },
    {
        id: 3,
        icon: faIdCard,
        styleName: 'link-style-white',
        label: 'profile',
        route: '/profile',
        role: 'user',
    },
    {
        id: 4,
        icon: faClock,
        styleName: 'link-style-white',
        label: 'timesheet',
        route: '/timesheet',
        role: 'user',
    },
    {
        id: 5,
        icon: faUsers,
        styleName: 'link-style-white',
        label: 'people',
        route: '/people',
        role: 'admin',
    },
    {
        id: 6,
        icon: faProjectDiagram,
        styleName: 'link-style-white',
        label: 'projects',
        route: '/projects',
        role: 'admin',
    },
    {
        id: 7,
        icon: faChartLine,
        styleName: 'link-style-grey',
        label: 'stats',
        route: '/stats',
        role: 'admin',
    },
    {
        id: 8,
        icon: faProjectDiagram,
        styleName: 'link-style-white',
        label: 'clients',
        route: '/clients',
        role: 'admin',
    },
];

export default sidebarData;
