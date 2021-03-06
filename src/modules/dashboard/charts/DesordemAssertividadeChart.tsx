import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Scaffold from '../../../Scaffold';
import Title from '../../../Title';

const DesordemAssertividadeChart: React.FC<any> = ({ title }) => {
    const [grupo0/* , setGrupo0 */] = useState<Array<Object>>([]);
    const [grupo1/* , setGrupo1 */] = useState<Array<Object>>([]);
    const [grupo2/* , setGrupo2 */] = useState<Array<Object>>([]);
    const [grupo3/* , setGrupo3 */] = useState<Array<Object>>([]);
    const [grupo4/* , setGrupo4 */] = useState<Array<Object>>([]);
    const [recommendation, setRecommendation] = useState<String>('');

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorDesordem = 0,
            maiorAssert = 0,
            registrationLocal = window.localStorage.getItem('registration');
        ;

        DadosGeraisData.forEach(item => {
            let desordem = parseFloat(item.desordem.toFixed(2));
            let assertividade = parseFloat(item.assertividade.toFixed(2));

            if (desordem > maiorDesordem)
                maiorDesordem = desordem;
            if (assertividade > maiorAssert)
                maiorAssert = assertividade;

            let kmensItem = [];
            kmensItem.push(desordem);
            kmensItem.push(assertividade);
            kmensItem.push(item.id_estudante);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const desordem = item[0],
                assertividade = item[1],
                registration = item[2]
                ;

            dadosItem = {
                "x": desordem,
                "y": assertividade
            };

            if (registrationLocal != null && parseInt(registrationLocal) === registration) {
                console.log(registration);
                grupo0.push(dadosItem);
            }
            if (desordem >= 0 && desordem <= maiorDesordem / 2 &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {//baixa assertividade e baixa desordem - grupo 1 
                grupo1.push(dadosItem);
                //setRecommendation('O aluno n??o teve um ??ndice de assertividade boa, mas o aluno seguiu a ordem de quest??es propostas pelo professor')
                setRecommendation('voc?? precisa estudar um pouco mais, voc?? consegue')
            } else if (desordem >= 0 && desordem <= maiorDesordem / 2 &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {//alta assertividade e baixa desordem - grpo 3
                grupo2.push(dadosItem);
                //setRecommendation('O aluno demonstrou conhecimento das quest??es na ordem apresentada pelo professor no simulado');
                setRecommendation('Continue assim, voc?? est?? no caminho certo');
            } else if (desordem > maiorDesordem / 2 && desordem <= maiorDesordem &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {//baixa asseitivdade e alta desordem - grupo 2
                grupo3.push(dadosItem);
                //setRecommendation('O aluno estava inseguro com as respostas, ?? necess??rio rever o conte??do para responder com mais seguran??a');
                setRecommendation('Voc?? precisa estudar mais, assim conseguir?? melhorar, e tamb??m se concentrar mais na hora de responder as quest??es');
            } else if (desordem > maiorDesordem / 2 && desordem <= maiorDesordem &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {//alta assertividade e alta desordem - grupo 4
                grupo4.push(dadosItem);
                //setRecommendation('O aluno demonstrou conhecimento do conte??do, por??m respondeu as quest??es na ordem que sentiu mais confian??a em responder');
                setRecommendation('Tente se concentrar melhor na hora de responder as quest??es');
            }

        });

        /* setGrupo1(grupo1);
        setGrupo2(grupo2);
        setGrupo3(grupo3);
        setGrupo4(grupo4); */
    }, [grupo0, grupo1, grupo2, grupo3, grupo4]);

    const content = (<React.Fragment>
        <Title title={title} />
        <ScatterChart width={730} height={250}
            /* margin={{ top: 20, right: 20, bottom: 10, left: 10 }} */
            style={{
                margin: '10px auto'
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="desordem" unit="d" />
            <YAxis type="number" dataKey="y" name="assertividade" unit="a" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />

            <Scatter className="2018139340207" data={grupo1} fill="#82ca9d" />
            <Scatter className="2018139340118" data={grupo2} fill="#8884d8" />
            <Scatter className="2018139340118" data={grupo3} fill="#ff0000" />
            <Scatter className="2018139340118" data={grupo4} fill="#0000ff" />
            <Scatter className="2018139340119" data={grupo0} fill="#ffff21" />
        </ScatterChart>

    </React.Fragment>);

    return (
        <Scaffold recommendations={recommendation}>
            {content}
        </Scaffold>
    );
}

export default DesordemAssertividadeChart;