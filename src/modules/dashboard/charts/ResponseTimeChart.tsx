import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import Title from '../../../Title';
import ResponseTimeData from '../../../contracts/modules/charts/tempo_resposta.json';

const ResponseTimeChart: React.FC<any> = ({ title }) => {
    const [dados, setDados] = useState<Array<Object>>([]);

    useEffect(() => {
        let obj = {},
            obj2 = {},
            dadosAux = [];
        //
        ResponseTimeData.map((item) => {
            if (item.id_simulado === 1 && item.id_estudante === '2018139340118') {
                const othersFields = {
                    "name": '',//`Aluno ${item.id_estudante}`
                    [`Q${item.questao}`]: item.tempo,
                    dataKey: `Q${item.questao}`
                };

                obj = {
                    ...obj, ...othersFields
                };
            }
            if (item.id_simulado === 1 && item.id_estudante === '2018139340207') {
                const othersFields = {
                    "name": '',//`Aluno ${item.id_estudante}`
                    [`Q${item.questao}`]: item.tempo,
                    dataKey: `Q${item.questao}`
                };

                obj2 = {
                    ...obj2, ...othersFields
                };
            }
            return () => { };
        });
        dadosAux.push(obj);
        dadosAux.push(obj2);

        setDados(dadosAux);

    }, []);

    return (
        <React.Fragment>
            <Title title={title} />
            <BarChart
                width={600}
                height={350}
                data={dados}
                style={{
                    margin: '10px auto'
                }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />

                <YAxis type="number" /* tickCount={12} tickSize={5} */ />

                <Tooltip />

                <Legend />

                <Bar dataKey="Q1" stackId="a" fill="#054f77" />
                <Bar dataKey="Q2" stackId="a" fill="#8884d8" />
                <Bar dataKey="Q3" stackId="a" fill="#ff6961" />
                <Bar dataKey="Q4" stackId="a" fill="#03bb85" />
                <Bar dataKey="Q5" stackId="a" fill="#eead2d" />
            </BarChart>
        </React.Fragment>
    );
}

export default ResponseTimeChart;