import { makeStyles } from '@material-ui/core/styles';
import background from '../../assets/images/background.jpg';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },/* 
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }, */
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        marginTop: theme.spacing(8),
        border: '1px solid rgb(195, 195, 195)',
        borderRadius: '10px',
        padding: '15px',
        background: 'white'
    },
    image: {
        backgroundImage: `url(${background})`,
        /* backgroundColor: 'rgb(33,150,243)', */
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }
}));