import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import AssertividadeData from '../../../contracts/modules/charts/assertividade.json';
import ResponseTimeData from '../../../contracts/modules/charts/tempo_resposta.json';
import Title from '../../../Title';

const AssertividadeChart: React.FC<any> = ({ title }) => {
    const [grupo1] = useState<Array<Object>>([]);
    const [grupo2] = useState<Array<Object>>([]);
    const [grupo3] = useState<Array<Object>>([]);
    const [grupo4] = useState<Array<Object>>([]);

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

            if (item.id_estudante !== currentStudant
                || index + 1 === ResponseTimeData.length
            ) {
                if (index + 1 === ResponseTimeData.length) {
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

            if (item.id_estudante !== currentStudant
                || index + 1 === AssertividadeData.length
            ) {
                if (index + 1 === AssertividadeData.length) {
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