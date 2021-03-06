import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Scaffold from '../../../Scaffold';
import Title from '../../../Title';

const CompreensaoAssertividadeChart: React.FC<any> = ({ title }) => {
    const [grupo0/* , setGrupo0 */] = useState<Array<Object>>([]);
    const [grupo1/* , setGrupo1 */] = useState<Array<Object>>([]);
    const [grupo2/* , setGrupo2 */] = useState<Array<Object>>([]);
    const [grupo3/* , setGrupo3 */] = useState<Array<Object>>([]);
    const [grupo4/* , setGrupo4 */] = useState<Array<Object>>([]);
    const [recommendation, setRecommendation] = useState<String>('');

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorComp = 0,
            maiorAssert = 0,
            registrationLocal = window.localStorage.getItem('registration');
        ;

        DadosGeraisData.forEach(item => {
            let compreensao = parseFloat(item.compreensao.toFixed(2));
            let assertividade = parseFloat(item.assertividade.toFixed(2));

            if (compreensao > maiorComp)
                maiorComp = compreensao;
            if (assertividade > maiorAssert)
                maiorAssert = assertividade;

            let kmensItem = [];
            kmensItem.push(compreensao);
            kmensItem.push(assertividade);
            kmensItem.push(item.id_estudante);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const compreensao = item[0],
                assertividade = item[1],
                registration = item[2]
                ;

            dadosItem = {
                "x": compreensao,
                "y": assertividade
            };

            if (registrationLocal != null && parseInt(registrationLocal) === registration) {
                console.log(registration);
                grupo0.push(dadosItem);
            }
            else if (compreensao >= 0 && compreensao <= maiorComp / 2 &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {
                grupo1.push(dadosItem);
                setRecommendation('Voc?? precisa ler mais, melhorar a sua compreens??o das quest??es para fazer uma prova melhor');
            } else if (compreensao >= 0 && compreensao <= maiorComp / 2 &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo2.push(dadosItem);
                setRecommendation('Voc?? precisa estudar mais, procure um local mais calmo para estudar, melhor a assimila????o dos conte??dos');
            } else if (compreensao > maiorComp / 2 && compreensao <= maiorComp &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {
                grupo3.push(dadosItem);
                setRecommendation('Voc?? precisa ler mais, melhorar a sua compreens??o das quest??es para fazer uma prova melhor');
            } else if (compreensao > maiorComp / 2 && compreensao <= maiorComp &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo4.push(dadosItem);
                setRecommendation('Continue assim, est?? compreendendo bem os assuntos ministrados');
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
                /* margin={{ top: 20, right: 20, bottom: 10, left: 10 }} */
                style={{
                    margin: '10px auto'
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="compreens??o" unit="c" />
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

export default CompreensaoAssertividadeChart;