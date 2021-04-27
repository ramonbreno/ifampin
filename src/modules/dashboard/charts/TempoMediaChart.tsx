import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Title from '../../../Title';

const TempoMediaChart: React.FC<any> = ({ title }) => {
    const [grupo1/* , setGrupo1 */] = useState<Array<Object>>([]);
    const [grupo2/* , setGrupo2 */] = useState<Array<Object>>([]);
    const [grupo3/* , setGrupo3 */] = useState<Array<Object>>([]);
    const [grupo4/* , setGrupo4 */] = useState<Array<Object>>([]);

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorX = 0,
            maiorY = 0
            ;

        DadosGeraisData.forEach(item => {
            let tempo = parseFloat(item.tempo_medio.toFixed(2));
            let mediaSimu = parseFloat(item.media_simulado.toFixed(2));

            if (tempo > maiorX)
                maiorX = tempo;
            if (mediaSimu > maiorY)
                maiorY = mediaSimu;

            let kmensItem = [];
            kmensItem.push(tempo);
            kmensItem.push(mediaSimu);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const tempo = item[0],
                mediaSimu = item[1];

            dadosItem = {
                "x": tempo,
                "y": mediaSimu
            };

            if (tempo >= 0 && tempo <= maiorX / 2 &&
                mediaSimu >= 0 && mediaSimu <= maiorY / 2) {
                grupo1.push(dadosItem);
            } else if (tempo >= 0 && tempo <= maiorX / 2 &&
                mediaSimu > maiorY / 2 && mediaSimu <= maiorY) {
                grupo2.push(dadosItem);
            } else if (tempo > maiorX / 2 && tempo <= maiorX &&
                mediaSimu >= 0 && mediaSimu <= maiorY / 2) {
                grupo3.push(dadosItem);
            } else if (tempo > maiorX / 2 && tempo <= maiorX &&
                mediaSimu > maiorY / 2 && mediaSimu <= maiorY) {
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
                <XAxis type="number" dataKey="x" name="tempo" unit="s" />
                <YAxis type="number" dataKey="y" name="média" unit="m" />

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

export default TempoMediaChart;