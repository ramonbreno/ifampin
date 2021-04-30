import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
/* import LayersIcon from '@material-ui/icons/Layers'; */
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <div>
        <Link to="/nivel-confusao" style={{
            textDecoration: 'none',
            color: '#000000DE'
        }}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Gráficos" />
        </ListItem>
        {/* <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItem> */}
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);

const linkRoute = (route: any, text: String) =>
    <Link to={route} style={{
        textDecoration: 'none',
        color: '#000000DE'
    }}>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    </Link>;

const routes = [
    {
        path: '/dashboard',
        title: 'Nível de Confusão'
    },
    {
        path: '/tempo-resposta',
        title: 'Tempo de resposta'
    },
    {
        path: '/Desordem x Assertividade',
        title: 'Desordem x Assertividade'
    },
    {
        path: '/duvida-assertividade',
        title: 'Dúvida x Assertividade'
    },
    {
        path: '/compreensao-assertividade',
        title: 'Compreensão x Assertividade'
    },
    {
        path: '/desordem-tempo',
        title: 'Desordem x Tempo'
    },
    {
        path: '/desordem-duvida',
        title: 'Desordem x Dúvida'
    },
    {
        path: '/duvida-tempo',
        title: 'Dúvida x Tempo'
    },
    {
        path: '/compreensao-media',
        title: 'Compreensão x Média Simulado'
    },
    {
        path: '/duvida-media',
        title: 'Dúvida x Média Simulado'
    },
    {
        path: '/desordem-media',
        title: 'Desordem x Média Simulado'
    },
    {
        path: '/tempo-media',
        title: 'Tempo x Média Simulado'
    },
];

export const chartListItems = (
    <div>
        <ListSubheader inset>Gráficos</ListSubheader>
        {
            routes.map((route, index) => (
                linkRoute(route.path, route.title)
            ))
        }
    </div>
);