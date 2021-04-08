import React, { FC, useState, useEffect } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, ZAxis, Scatter,
} from 'recharts';
import Title from '../../../Title';
import ResponseTimeData from '../../../contracts/modules/charts/tempo_resposta.json';
import AssertividadeData from '../../../contracts/modules/charts/assertividade.json';

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

const AssertividadeChart: React.FC<any> = ({ title }) => {
    const [grupo1, setGrupo1] = useState<Array<Object>>([]);
    const [grupo2, setGrupo2] = useState<Array<Object>>([]);
    const [grupo3, setGrupo3] = useState<Array<Object>>([]);
    const [grupo4, setGrupo4] = useState<Array<Object>>([]);

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],

            mediaAssertList: {
                id_estudante: String,
                id_simulado: number,
                assertividade: number
            }[] = [],

            mediaTempoList: {
                id_estudante: String,
                id_simulado: number,
                tempo: number
            }[] = [],
            id_estudante: String,
            currentStudant: String,
            mediaAssert = 0,
            mediaTempo = 0,
            somaAssert = 0,
            somaTempo = 0,
            contSimu = 0,
            maiorTempo = 0,
            maiorAssert = 0
            ;

        contSimu = 0;
        somaTempo = 0;
        ResponseTimeData.forEach((item, index) => {

            if (contSimu === 0)
                currentStudant = item.id_estudante;

            if (item.id_estudante != currentStudant
                || index + 1 == ResponseTimeData.length
            ) {
                if (index + 1 == ResponseTimeData.length) {
                    somaTempo += item.tempo;
                    contSimu++;
                }

                mediaTempo = somaTempo / contSimu;

                mediaTempoList.push({
                    "id_estudante": item.id_estudante,
                    "id_simulado": item.id_simulado,
                    "tempo": parseFloat(mediaTempo.toFixed(2))
                });

                if (mediaTempo > maiorTempo)
                    maiorTempo = parseFloat(mediaTempo.toFixed(2));

                contSimu = 0;
            } else {
                somaTempo += item.tempo;
                contSimu++;
            }


        });

        AssertividadeData.forEach((item, index) => {

            if (contSimu === 0)
                currentStudant = item.id_estudante;

            if (item.id_estudante != currentStudant
                || index + 1 == AssertividadeData.length
            ) {
                if (index + 1 == AssertividadeData.length) {
                    somaAssert += item.assertividade;
                    contSimu++;
                }

                mediaAssert = somaAssert / contSimu;

                mediaAssertList.push({
                    "id_estudante": item.id_estudante,
                    "id_simulado": item.id_simulado,
                    "assertividade": parseFloat(mediaAssert.toFixed(2))
                });

                if (mediaAssert > maiorAssert)
                    maiorAssert = parseFloat(mediaAssert.toFixed(2));

                contSimu = 0;
            } else {
                somaAssert += item.assertividade;
                contSimu++;
            }

        });

        //console.log(mediaAssertList);

        mediaAssertList.forEach(item => {
            for (var i = 0; i < mediaTempoList.length; i++) {
                let kmensItem = [];

                if (item.id_estudante === mediaTempoList[i].id_estudante
                    //&& item.id_simulado === mediaTempoList[i].id_simulado
                ) {
                    kmensItem.push(parseFloat(item.assertividade.toFixed(2)));
                    kmensItem.push(mediaTempoList[i].tempo);
                    kmensList.push(kmensItem);
                    break;
                }
            }
        });
        //console.log(kmensList);

        kmensList.forEach(item => {
            let dadosItem = {};
            const compreensao = item[0],
                tempo = item[1];

            dadosItem = {
                "x": tempo,
                "y": compreensao
            };

            if (compreensao >= 0 && compreensao <= maiorAssert / 2 &&
                tempo >= 0 && tempo <= maiorTempo / 2) {
                grupo1.push(dadosItem);
            } else if (compreensao > maiorAssert / 2 && compreensao <= maiorAssert &&
                tempo >= 0 && tempo <= maiorTempo / 2) {
                grupo2.push(dadosItem);
            } else if (compreensao >= 0 && compreensao <= maiorAssert / 2 &&
                tempo > maiorTempo / 2 && tempo <= maiorTempo) {
                grupo3.push(dadosItem);
            } else if (compreensao > maiorAssert / 2 && compreensao <= maiorAssert &&
                tempo > maiorTempo / 2 && tempo <= maiorTempo) {
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
                <XAxis type="number" dataKey="x" name="tempo" unit="s" />
                <YAxis dataKey="y" name="assertividade" unit="a" />

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

export default AssertividadeChart;