import React, { FC, useState, useEffect } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, ZAxis, Scatter,
} from 'recharts';
import Title from '../../../Title';
import ResponseTimeData from '../../../contracts/modules/charts/tempo_resposta.json';
import Compreensao from '../../../contracts/modules/charts/compreensao_questao.json';

const data01 = [
    {
        "x": 100,
        "y": 200,
        "z": 200
    },
    {
        "x": 120,
        "y": 100,
        "z": 260
    },
    {
        "x": 170,
        "y": 300,
        "z": 400
    },
    {
        "x": 140,
        "y": 250,
        "z": 280
    },
    {
        "x": 150,
        "y": 400,
        "z": 500
    },
    {
        "x": 110,
        "y": 280,
        "z": 200
    }
];
const data02 = [
    {
        "x": 200,
        "y": 260,
        "z": 240
    },
    {
        "x": 240,
        "y": 290,
        "z": 220
    },
    {
        "x": 190,
        "y": 290,
        "z": 250
    },
    {
        "x": 198,
        "y": 250,
        "z": 210
    },
    {
        "x": 180,
        "y": 280,
        "z": 260
    },
    {
        "x": 210,
        "y": 220,
        "z": 230
    }
];

const ComprehensionChart: React.FC<any> = ({ title }) => {
    const [dadosAluno1, setDadosAluno1] = useState<Array<Object>>([]);
    const [dadosAluno2, setDadosAluno2] = useState<Array<Object>>([]);

    useEffect(() => {

        let kmensList: Array<Array<number>> = [];

        let compreensaoAluno1 = Compreensao.filter((item) => item.id_estudante === '2018139340118' && item.id_simulado === 1/*  && item.questao == 1 */);
        let tempoAluno1 = ResponseTimeData.filter((item) => item.id_estudante === '2018139340118' && item.id_simulado === 1/*  && item.questao == 1 */);
        let dadosAluno1Aux: { _id: { $oid: string; }; id_estudante: string; id_simulado: number; questao: number; tempo: number; }[] = [];

        Compreensao.forEach(item => {
            for (var i = 0; i < ResponseTimeData.length; i++) {
                let kmensItem = [];
                if (item.id_simulado !== 1) break;
                if (item.questao !== 2) break;

                if (item.id_estudante === ResponseTimeData[i].id_estudante &&
                    item.id_simulado === ResponseTimeData[i].id_simulado &&
                    item.questao === ResponseTimeData[i].questao
                ) {
                    kmensItem.push(parseFloat(item.comprensao.toFixed(2)));
                    kmensItem.push(ResponseTimeData[i].tempo);
                    kmensList.push(kmensItem);
                    break;
                }
            }
        });

        //console.log(JSON.stringify(kmensList));

        tempoAluno1.forEach((item) => {
            let objComp: {
                _id: {
                    $oid: string;
                };
                id_estudante: string;
                id_simulado: number;
                questao: number;
                comprensao: number;
            }[] = [];
            objComp = compreensaoAluno1.filter((i) => i.questao === item.questao);

            dadosAluno1Aux.push({
                ...item, ...{ comprensao: objComp[0].comprensao }
            });
        });

        let compreensaoAluno2 = Compreensao.filter((item) => item.id_estudante === '2018139340207' && item.id_simulado === 1/*  && item.questao == 1 */);
        let tempoAluno2 = ResponseTimeData.filter((item) => item.id_estudante === '2018139340207' && item.id_simulado === 1/*  && item.questao == 1 */);
        let dadosAluno2Aux: { _id: { $oid: string; }; id_estudante: string; id_simulado: number; questao: number; tempo: number; }[] = [];

        tempoAluno2.forEach((item) => {
            let objComp: {
                _id: {
                    $oid: string;
                };
                id_estudante: string;
                id_simulado: number;
                questao: number;
                comprensao: number;
            }[] = [];
            objComp = compreensaoAluno2.filter((i) => i.questao === item.questao);

            dadosAluno2Aux.push({
                ...item, ...{ comprensao: objComp[0].comprensao }
            });
        });
        /* console.log(dadosAluno1Aux);
        console.log(dadosAluno2Aux); */
        setDadosAluno1(dadosAluno1Aux);
        setDadosAluno2(dadosAluno2Aux);

    }, []);

    return (
        <React.Fragment>
            <Title title={title} />
            <ScatterChart width={730} height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="comprensao" name="compreensão" unit="c" />
                <YAxis dataKey="tempo" name="tempo" unit="s" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <Scatter className="2018139340207" data={dadosAluno2} fill="#82ca9d" />
                <Scatter className="2018139340118" data={dadosAluno1} fill="#8884d8" />
            </ScatterChart>
            {/* <ScatterChart width={730} height={250}
                style={{
                    margin: '20px auto'
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                <YAxis dataKey="y" name="weight" unit="kg" />
                <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter className="A school" data={data01} fill="#8884d8" />
                <Scatter className="B school" data={data02} fill="#82ca9d" />
            </ScatterChart> */}
        </React.Fragment>
    );
}

export default ComprehensionChart;