import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Scaffold from '../../../Scaffold';
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
                //setRecommendation('O aluno n??o teve um ??ndice de assertividade boa, por??m o aluno estava o n??vel de d??vidas, pode ser que o aluno n??o estava levando o simulado a s??rio, marcando sem ter aten????o as quest??es');
                setRecommendation('Voc?? precisa estudar mais, para obter ??xito nas avalia????es');
            } else if (duvida >= 0 && duvida <= maiorDuvida / 2 &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo2.push(dadosItem);
                //setRecommendation('O aluno apresentava poucas d??vidas em rela????o as quest??es e possuiu um n??vel aceit??vel de assertividade, parecendo que estava seguro durante o simulado.')
                setRecommendation('Continue assim, continue estudando, assim ter?? menos d??vidas ao responder as quest??es')
            } else if (duvida > maiorDuvida / 2 && duvida <= maiorDuvida &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {
                grupo3.push(dadosItem);
                //setRecommendation('O aluno demonstrou inseguran??a ao responder as quest??es com alto n??vel de d??vida e uma baixa assertividade, o que se leva a crer que o aluno ainda se esfor??ou, por??m n??o tinha a confian??a ou o conhecimento necess??rio no simulado.')
                setRecommendation('?? necess??rio mais estudo, quando for estudar evite distra????es para um melhor aproveitamento');
            } else if (duvida > maiorDuvida / 2 && duvida <= maiorDuvida &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo4.push(dadosItem);
                setRecommendation('O aluno demonstrou conhecimento do conte??do, por??m respondeu as quest??es com alguma d??vida, necess??rio que se sinta mais seguro ao responder as quest??es.')
            }
        });

        /* setGrupo1(grupo1);
        setGrupo2(grupo2);
        setGrupo3(grupo3);
        setGrupo4(grupo4); */
    }, [grupo0, grupo1, grupo2, grupo3, grupo4]);

    const content = (
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
                <Scatter className="2018139340118" data={grupo2} fill="#8884d8" />{/* lil??s */}
                <Scatter className="2018139340118" data={grupo3} fill="#ff0000" />{/* vermelho */}
                <Scatter className="2018139340118" data={grupo4} fill="#0000ff" />{/* azul */}
                <Scatter className="2018139340119" data={grupo0} fill="#ffff21" />{/* amarelo */}
            </ScatterChart>
        </React.Fragment>
    );

    return (
        <Scaffold recommendations={recommendation}>
            {content}
        </Scaffold>
    );
}

export default DuvidaAssertividadeChart;