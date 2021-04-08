import React, { FC, useState, useEffect } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, ZAxis, Scatter,
} from 'recharts';
import Title from '../../../Title';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';

const DesordemDuvidaChart: React.FC<any> = ({ title }) => {
    const [grupo1, setGrupo1] = useState<Array<Object>>([]);
    const [grupo2, setGrupo2] = useState<Array<Object>>([]);
    const [grupo3, setGrupo3] = useState<Array<Object>>([]);
    const [grupo4, setGrupo4] = useState<Array<Object>>([]);

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorX = 0,
            maiorY = 0
            ;

        DadosGeraisData.forEach(item => {
            let desordem = parseFloat(item.desordem.toFixed(2));
            let duvida = parseFloat(item.duvida.toFixed(2));

            if (desordem > maiorX)
                maiorX = desordem;
            if (duvida > maiorY)
                maiorY = duvida;

            let kmensItem = [];
            kmensItem.push(desordem);
            kmensItem.push(duvida);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const desordem = item[0],
                duvida = item[1];

            dadosItem = {
                "x": desordem,
                "y": duvida
            };

            if (desordem >= 0 && desordem <= maiorX / 2 &&
                duvida >= 0 && duvida <= maiorY / 2) {
                grupo1.push(dadosItem);
            } else if (desordem >= 0 && desordem <= maiorX / 2 &&
                duvida > maiorY / 2 && duvida <= maiorY) {
                grupo2.push(dadosItem);
            } else if (desordem > maiorX / 2 && desordem <= maiorX &&
                duvida >= 0 && duvida <= maiorY / 2) {
                grupo3.push(dadosItem);
            } else if (desordem > maiorX / 2 && desordem <= maiorX &&
                duvida > maiorY / 2 && duvida <= maiorY) {
                grupo4.push(dadosItem);
            }
        });


        setGrupo1(grupo1);
        setGrupo2(grupo2);
        setGrupo3(grupo3);
        setGrupo4(grupo4);
    }, []);

    return (
        <React.Fragment>
            <Title title={title} />
            <ScatterChart width={730} height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="desordem" unit="de" />
                <YAxis type="number" dataKey="y" name="duvida" unit="du" />

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

export default DesordemDuvidaChart;