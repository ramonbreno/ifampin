import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Title from '../../../Title';

const DuvidaAssertividadeChart: React.FC<any> = ({ title }) => {
    const [grupo1/* , setGrupo1 */] = useState<Array<Object>>([]);
    const [grupo2/* , setGrupo2 */] = useState<Array<Object>>([]);
    const [grupo3/* , setGrupo3 */] = useState<Array<Object>>([]);
    const [grupo4/* , setGrupo4 */] = useState<Array<Object>>([]);

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorDuvida = 0,
            maiorAssert = 0
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
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const duvida = item[0],
                assertividade = item[1];

            dadosItem = {
                "x": duvida,
                "y": assertividade
            };

            if (duvida >= 0 && duvida <= maiorDuvida / 2 &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {
                grupo1.push(dadosItem);
            } else if (duvida >= 0 && duvida <= maiorDuvida / 2 &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo2.push(dadosItem);
            } else if (duvida > maiorDuvida / 2 && duvida <= maiorDuvida &&
                assertividade >= 0 && assertividade <= maiorAssert / 2) {
                grupo3.push(dadosItem);
            } else if (duvida > maiorDuvida / 2 && duvida <= maiorDuvida &&
                assertividade > maiorAssert / 2 && assertividade <= maiorAssert) {
                grupo4.push(dadosItem);
            }
        });

        /* setGrupo1(grupo1);
        setGrupo2(grupo2);
        setGrupo3(grupo3);
        setGrupo4(grupo4); */
    }, [grupo1, grupo2, grupo3, grupo4]);

    return (
        <React.Fragment>
            <Title title={title} />
            <ScatterChart width={730} height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="duvida" unit="d" />
                <YAxis type="number" dataKey="y" name="assertividade" unit="a" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <Scatter className="2018139340207" data={grupo1} fill="#82ca9d" />
                <Scatter className="2018139340118" data={grupo2} fill="#8884d8" />
                <Scatter className="2018139340118" data={grupo3} fill="#ff0000" />
                <Scatter className="2018139340118" data={grupo4} fill="#0000ff" />
            </ScatterChart>
        </React.Fragment>
    );
}

export default DuvidaAssertividadeChart;