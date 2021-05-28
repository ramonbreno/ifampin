import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Title from '../../../Title';

const AssertividadeChart: React.FC<any> = ({ title }) => {
    const [grupo0/* , setGrupo0 */] = useState<Array<Object>>([]);
    const [grupo1/* , setGrupo1 */] = useState<Array<Object>>([]);
    const [grupo2/* , setGrupo2 */] = useState<Array<Object>>([]);
    const [grupo3/* , setGrupo3 */] = useState<Array<Object>>([]);
    const [grupo4/* , setGrupo4 */] = useState<Array<Object>>([]);

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorX = 0,
            maiorY = 0,
            registrationLocal = window.localStorage.getItem('registration');
        ;

        DadosGeraisData.forEach(item => {
            let tempo = parseFloat(item.tempo_medio.toFixed(2));
            let assertividade = parseFloat(item.assertividade.toFixed(2));

            if (tempo > maiorX)
                maiorX = tempo;
            if (assertividade > maiorY)
                maiorY = assertividade;

            let kmensItem = [];
            kmensItem.push(tempo);
            kmensItem.push(assertividade);
            kmensItem.push(item.id_estudante);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const tempo = item[0],
                assertividade = item[1],
                registration = item[2]
                ;

            dadosItem = {
                "x": tempo,
                "y": assertividade
            };

            if (registrationLocal != null && parseInt(registrationLocal) === registration) {
                console.log(registration);
                grupo0.push(dadosItem);
            }
            else if (tempo >= 0 && tempo <= maiorX / 2 &&
                assertividade >= 0 && assertividade <= maiorY / 2) {
                grupo1.push(dadosItem);
            }
            else if (tempo >= 0 && tempo <= maiorX / 2 &&
                assertividade > maiorY / 2 && assertividade <= maiorY) {
                grupo2.push(dadosItem);
            }
            else if (tempo > maiorX / 2 && tempo <= maiorX &&
                assertividade >= 0 && assertividade <= maiorY / 2) {
                grupo3.push(dadosItem);
            }
            else if (tempo > maiorX / 2 && tempo <= maiorX &&
                assertividade > maiorY / 2 && assertividade <= maiorY) {
                grupo4.push(dadosItem);
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
                /* margin={{ top: 20, right: 20, bottom: 10, left: 10 }} */
                style={{
                    margin: '10px auto'
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="tempo" unit="s" />
                <YAxis dataKey="y" name="assertividade" unit="a" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <Scatter className="2018139340207" data={grupo1} fill="#82ca9d" />
                <Scatter className="2018139340118" data={grupo2} fill="#8884d8" />
                <Scatter className="2018139340118" data={grupo3} fill="#ff0000" />
                <Scatter className="2018139340118" data={grupo4} fill="#0000ff" />
                <Scatter className="2018139340119" data={grupo0} fill="#ffff21" />
            </ScatterChart>
        </React.Fragment>
    );
}

export default AssertividadeChart;