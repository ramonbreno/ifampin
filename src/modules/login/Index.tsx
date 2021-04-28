import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useStyles } from "./Style";

const initialValues = {
    registration: '',
    password: ''
};

const alertConfig = {
    message: '',
    hasAlert: false
}

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const [alert, setAlert] = useState(alertConfig);

    const onChange = (event: any) => {
        const { value, name } = event.target;

        setValues({
            ...values,
            [name]: value
        });

        setAlert({
            message: '',
            hasAlert: false
        });
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        //console.log(attempt(values));
        if (attempt()) {
            return history.push('/dashboard');
        }

    }

    const attempt = () => {
        if (values.registration.length === 0 && values.password.length === 0) {

            setAlert({
                message: 'Os campos devem ser preenchidos',
                hasAlert: true
            });

            return false;
        } else if (values.password !== '123456') {
            setAlert({
                message: 'Campo senha incorreto',
                hasAlert: true
            });
            return false
        }

        return true;
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} >
                <Box style={{ height: '100%', backgroundColor: '#2196F3', width: '100%', mixBlendMode: 'multiply' }}>
                </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div className={classes.paper}>

                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={onSubmit}
                        style={{ display: "block" }}
                    >
                        <Typography component="h1" variant="h5" style={{ alignSelf: 'flex-start', color: '#858585', fontWeight: 500 }}>
                            Login
                        </Typography>
                        <Grid container>
                            <Grid item xs>
                                {alert.hasAlert ? <Alert severity={"error"} >{alert.message}</Alert> : <></>}
                            </Grid>
                        </Grid>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            //disabled={firstAccess}
                            id="standard-basic"
                            label="Matrícula"
                            name={"registration"}
                            autoFocus
                            onChange={onChange}
                            //value={values.registration}
                            type={"text"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name={"password"}
                            label="Senha"
                            type="password"
                            id="standard-basic"
                            autoComplete="current-password"
                            onChange={onChange}
                        //value={values.password}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.submit}
                        >
                            {"Entrar"}
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid >
    )
}

export default Login;