import { useState } from 'react';
import { useHistory, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
/* import Box from '@material-ui/core/Box'; */
//import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
//import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
/* import Link from '@material-ui/core/Link'; */
import List from '@material-ui/core/List';
//import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { chartListItems } from './listItems';
import AssertividadeChart from './modules/dashboard/charts/AssertividadeChart';
//import ConfusionLevelChart from './modules/dashboard/charts/ConfusionLevelChart';
/* import ChartTest from './modules/dashboard/charts/ChartTest'; */
import CompreensaoAssertividadeChart from './modules/dashboard/charts/CompreensaoAssertividadeChart';
import CompreensaoMediaChart from './modules/dashboard/charts/CompreensaoMediaChart';
/* import ComprehensionChart from './modules/dashboard/charts/ComprehensionChart.'; */
import DesordemAssertividadeChart from './modules/dashboard/charts/DesordemAssertividadeChart';
import DesordemDuvidaChart from './modules/dashboard/charts/DesordemDuvidaChart';
import DesordemMediaChart from './modules/dashboard/charts/DesordemMediaChart';
import DesordemTempoChart from './modules/dashboard/charts/DesordemTempoChart';
import DuvidaAssertividadeChart from './modules/dashboard/charts/DuvidaAssertividadeChart';
import DuvidaMediaChart from './modules/dashboard/charts/DuvidaMediaChart';
import DuvidaTempoChart from './modules/dashboard/charts/DuvidaTempoChart';
//import ResponseTimeChart from './modules/dashboard/charts/ResponseTimeChart';
import TempoMediaChart from './modules/dashboard/charts/TempoMediaChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
/* import Orders from './Orders';
import Deposits from './Deposits'; */

/* function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Signal Dashboard
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
} */

const drawerWidth = 300;//default 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 'auto',
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const logout = () => {
        window.localStorage.setItem('registration', '');
        history.push('/login');
    }
    /* const chartElement = (children: React.ReactNode, subtitle: string) =>
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                    {children}
                    <span style={{ color: '#d6913c' }}>{subtitle}</span>
                </Paper>
            </Grid>
        </Container>; */
    const routes = [
        {
            path: '/dashboard',
            main: () => <AssertividadeChart title={'Assertividade'} />,
        },
        /* {
            path: '/nivel-confusao',
            main: () => chartElement(<ConfusionLevelChart title={'Nível de Confusão'} />, ''),
        },
        {
            path: '/tempo-resposta',
            main: () => chartElement(<ResponseTimeChart title={'Tempo de resposta'} />, ''),
        }, */
        {
            path: '/Desordem x Assertividade',
            main: () => <DesordemAssertividadeChart title={'Desordem x Assertividade'} />,
        },
        {
            path: '/duvida-assertividade',
            main: () => <DuvidaAssertividadeChart title={'Dúvida x Assertividade'} />,
        },
        {
            path: '/compreensao-assertividade',
            main: () => <CompreensaoAssertividadeChart title={'Compreensão x Assertividade'} />,
        },
        {
            path: '/desordem-tempo',
            main: () => <DesordemTempoChart title={'Desordem x Tempo'} />,
        },
        {
            path: '/desordem-duvida',
            main: () => <DesordemDuvidaChart title={'Desordem x Dúvida'} />,
        },
        {
            path: '/duvida-tempo',
            main: () => <DuvidaTempoChart title={'Dúvida x Tempo'} />,
        },
        {
            path: '/compreensao-media',
            main: () => <CompreensaoMediaChart title={'Compreensão x Média Simulado'} />,
        },
        {
            path: '/duvida-media',
            main: () => <DuvidaMediaChart title={'Dúvida x Média Simulado'} />,
        },
        {
            path: '/desordem-media',
            main: () => <DesordemMediaChart title={'Desordem x Média Simulado'} />,
        },
        {
            path: '/tempo-media',
            main: () => <TempoMediaChart title={'Tempo x Média Simulado'} />,
        },
    ];

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={logout} >
                        <ExitToAppIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        {/* <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge> */}
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Router>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    {/* <Divider />
                    <List>{mainListItems}</List> */}
                    <Divider />
                    <List>{chartListItems}</List>

                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Switch>
                        {
                            routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    children={<route.main />}
                                />
                            ))
                        }
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default Dashboard;