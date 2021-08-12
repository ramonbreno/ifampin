import { Container, Grid, Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Title from '../../../Title';
import clsx from 'clsx';

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

const AssertividadeChart: React.FC<any> = ({ title }) => {
    const [mediaAssertividadeTurma, setMediaAssertividadeTurma] = useState<number>(0);
    const [mediaAssertividadeStudant, setMediaAssertividadeStudant] = useState<number>(0);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {

        let registrationLocal = window.localStorage.getItem('registration'),
            studanteClass = whatIsClass(parseInt(registrationLocal || '')),
            cont = 0,
            mediaAssertividade = DadosGeraisData.reduce((acc, cur) => {
                let assert = 0;
                if (studanteClass != null && cur.turma === studanteClass) {
                    cont++;
                    assert = cur.assertividade;
                }
                return acc + assert;
            }, 0);

        mediaAssertividade = parseFloat((mediaAssertividade / cont).toFixed(2));

        setMediaAssertividadeTurma(mediaAssertividade);

    }, []);

    const whatIsClass = (registration: number): number => {
        let studantClass = 0;
        for (let item of DadosGeraisData) {
            if (item.id_estudante === registration) {
                setMediaAssertividadeStudant(parseFloat(item.assertividade.toFixed(2)));
                studantClass = item.turma;
                break;
            }
        }
        return studantClass;
    }

    return (

        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                        <Title title={title} description={'Assertivo é um adjetivo relativo a qualidade de algo que é afirmativo, positivo e certo, como um comportamento ou ação, por exemplo. Uma pessoa assertiva, de acordo com a psicologia comportamental, consiste no modo seguro e confiante de agir, ou seja, um indivíduo que está certo de suas ações, atitudes e comportamento'} />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            textAlign: 'center',
                        }}>
                            <div >
                                <span style={{
                                    color: '#787878'
                                }}>Média da turma</span>
                                <h1 style={{ margin: 0, fontSize: '50px', color: '#2b2b2b' }}>
                                    {mediaAssertividadeTurma}M
                                </h1>
                            </div>
                            <div>
                                <span style={{
                                    color: '#787878'
                                }}>Sua média</span>
                                <h1 style={{ margin: 0, fontSize: '50px', color: '#2b2b2b' }}>
                                    {mediaAssertividadeStudant}M
                                </h1>
                            </div>
                        </div>
                    </React.Fragment>
                    {/* <span style={{ color: '#d6913c' }}>{subtitle}</span> */}
                </Paper>
                <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                        <Title title='Recomendações' />
                        {
                            mediaAssertividadeStudant < mediaAssertividadeTurma
                                ?
                                <p>Que revise o material de estudo e as questões respondidas para verificar quais as questões errou e melhorar a sua assertividade</p>
                                :
                                <p>Continue estudando e fazendo as atividades solicitadas pelo professor</p>
                        }
                    </React.Fragment>
                    {/* <span style={{ color: '#d6913c' }}>{subtitle}</span> */}
                </Paper>
            </Grid>
        </Container>


    );
}

export default AssertividadeChart;