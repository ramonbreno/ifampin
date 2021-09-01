import { Container, Grid, Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        marginTop: '20px',
    },
    fixedHeight: {
        height: 'auto',
    },
}));

interface Props {
    subtitle?: String,
    recommendations?: String,
    children?: React.ReactNode,
}

const Scaffold: React.FC<Props> = ({ subtitle, recommendations, children }) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                    {children}
                    <span style={{ color: '#d6913c' }}>*O ponto amarelo é você</span>
                </Paper>
                <Paper className={fixedHeightPaper}>
                    <Title title='Recomendações' />
                    {recommendations}
                </Paper>
            </Grid>
        </Container>
    );

}

export default Scaffold;