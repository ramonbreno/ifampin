import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Title from '../../../Title';

const DuvidaAssertividadeChart: React.FC<any> = ({ title }) => {
    const [grupo0/* , setGrupo0 */] = useState<Array<Object>>([]);
    const [grupo1/* , setGrupo1 */] = useState<Array<Object>>([]);
    const [grupo2/* , setGrupo2 */] = useState<Array<Object>>([]);
    const [grupo3/* , setGrupo3 */] = useState<Array<Object>>([]);
    const [grupo4/* , setGrupo4 */] = useState<Array<Object>>([]);
    const [recommendation, setRecommendation] = useState<String>('');

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorDuvida = 0,
            maiorAssert = 0,
            registrationLocal = window.localStorage.getItem('registration');
        ;

        DadosGeraisData.forEach(item => {
            let duvida = parseFloat(item.duvida.toFixed(2));
            let assertividade = parseFloat(item.assertividade.toFixed(2));

            if (duvida > maiorDuvida)
                maiorDuvida = duvida;
            if (assertividade > maiorAssert)
                maiorAssert = assertividade;

            let kmensItem = [];
            kmensItem.push(duvida);
            kmensItem.push(assertividade);
            kmensItem.push(item.id_estudante);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const duvida = item[0],
                assertividade = item[1],
                registration = item[2]
                ;

            dadosItem = {
                "x": duvida,
                "y": assertividade
            };

            if (registrationLocal != null && parseInt(registrationLocal) === registration) {
                console.log(registration);
                grupo0.push(dadosItem);
            }
            if (duvida >= 0 && duvida <= maiorDuvida / 2 &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {
                grupo1.push(dadosItem);
                //setRecommendation('O aluno não teve um índice de assertividade boa, porém o aluno estava o nível de dúvidas, pode ser que o aluno não estava levando o simulado a sério, marcando sem ter atenção as questões');
                setRecommendation('Você precisa estudar mais, para obter êxito nas avaliações');
            } else if (duvida >= 0 && duvida <= maiorDuvida / 2 &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo2.push(dadosItem);
                //setRecommendation('O aluno apresentava poucas dúvidas em relação as questões e possuiu um nível aceitável de assertividade, parecendo que estava seguro durante o simulado.')
                setRecommendation('Continue assim, continue estudando, assim terá menos dúvidas ao responder as questões')
            } else if (duvida > maiorDuvida / 2 && duvida <= maiorDuvida &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {
                grupo3.push(dadosItem);
                //setRecommendation('O aluno demonstrou insegurança ao responder as questões com alto nível de dúvida e uma baixa assertividade, o que se leva a crer que o aluno ainda se esforçou, porém não tinha a confiança ou o conhecimento necessário no simulado.')
                setRecommendation('É necessário mais estudo, quando for estudar evite distrações para um melhor aproveitamento');
            } else if (duvida > maiorDuvida / 2 && duvida <= maiorDuvida &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo4.push(dadosItem);
                setRecommendation('O aluno demonstrou conhecimento do conteúdo, porém respondeu as questões com alguma dúvida, necessário que se sinta mais seguro ao responder as questões.')
            }
        });

        /* setGrupo1(grupo1);
        setGrupo2(grupo2);
        setGrupo3(grupo3);
        setGrupo4(grupo4); */
    }, [grupo0, grupo1, grupo2, grupo3, grupo4]);

    return (
        <React.Fragment>
            <Title title={title} />
            <ScatterChart width={730} height={250}
                /*  margin={{ top: 20, right: 20, bottom: 10, left: 10 }} */
                style={{
                    margin: '10px auto'
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="duvida" unit="d" />
                <YAxis type="number" dataKey="y" name="assertividade" unit="a" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <Scatter className="2018139340207" data={grupo1} fill="#82ca9d" />{/* verde */}
                <Scatter className="2018139340118" data={grupo2} fill="#8884d8" />{/* lilás */}
                <Scatter className="2018139340118" data={grupo3} fill="#ff0000" />{/* vermelho */}
                <Scatter className="2018139340118" data={grupo4} fill="#0000ff" />{/* azul */}
                <Scatter className="2018139340119" data={grupo0} fill="#ffff21" />{/* amarelo */}
            </ScatterChart>
            <span style={{ color: '#d6913c' }}>{recommendation}</span>
        </React.Fragment>
    );
}

export default DuvidaAssertividadeChart;