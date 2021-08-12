import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

const Title: React.FC<any> = ({ title, description }) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        console.log(event.currentTarget);

        setAnchorEl(event.currentTarget);
        console.log(Boolean(anchorEl));

    };

    const handleClose = () => {
        setAnchorEl(null);
        console.log(Boolean(anchorEl));
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                onClick={handleClick}
                gutterBottom
                style={{
                    fontWeight: 600,
                }
                }>
                {/* {props.children} */}
                {title}
            </Typography>
            {!description || description.isEmpty ? <></> : (<Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>{description}</Typography>
            </Popover>)
            }

        </>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};

export default Title;