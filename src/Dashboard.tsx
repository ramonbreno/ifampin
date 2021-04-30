import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { mainListItems } from './listItems';
import AssertividadeChart from './modules/dashboard/charts/AssertividadeChart';
import Chart from './modules/dashboard/charts/Chart';
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
import ResponseTimeChart from './modules/dashboard/charts/ResponseTimeChart';
import TempoMediaChart from './modules/dashboard/charts/TempoMediaChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Copyright() {
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
}

const drawerWidth = 240;

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
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const logout = () => {
        window.localStorage.setItem('registration', '');
        history.push('/login');
    }
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
                <Divider />
                <List>{mainListItems}</List>
                {/* <Divider />
                <List>{secondaryListItems}</List> */}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        {<Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <Chart title={'Nível de Confusão'} />
                            </Paper>
                        </Grid>}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <ResponseTimeChart title={'Tempo de resposta'} />
                            </Paper>
                        </Grid>
                        {/* <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <ComprehensionChart title={'Agrupamento'} />
                            </Paper>
                        </Grid> */}
                        {/* <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <ChartTest title={'Gráfico'} />
                            </Paper>
                        </Grid> */}

                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <AssertividadeChart title={'Tempo x Assertividade'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <DesordemAssertividadeChart title={'Desordem x Assertividade'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <DuvidaAssertividadeChart title={'Dúvida x Assertividade'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <CompreensaoAssertividadeChart title={'Compreensão x Assertividade'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <DesordemTempoChart title={'Desordem x Tempo'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <DesordemDuvidaChart title={'Desordem x Dúvida'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <DuvidaTempoChart title={'Dúvida x Tempo'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <CompreensaoMediaChart title={'Compreensão x Média Simulado'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <DuvidaMediaChart title={'Dúvida x Média Simulado'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <DesordemMediaChart title={'Desordem x Média Simulado'} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <TempoMediaChart title={'Tempo x Média Simulado'} />
                            </Paper>
                        </Grid>

                        {/* Recent Deposits */}
                        {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
                        {/* Recent Orders */}
                        {/* <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Orders />
                            </Paper>
                        </Grid> */}
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default Dashboard;