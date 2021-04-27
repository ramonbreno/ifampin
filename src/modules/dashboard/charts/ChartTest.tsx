import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import Compreensao from '../../../contracts/modules/charts/compreensao_questao.json';
import ResponseTimeData from '../../../contracts/modules/charts/tempo_resposta.json';
import Title from '../../../Title';

const ChartTest: React.FC<any> = ({ title }) => {
    const [grupo1] = useState<Array<Object>>([]);
    const [grupo2] = useState<Array<Object>>([]);
    const [grupo3] = useState<Array<Object>>([]);
    const [grupo4] = useState<Array<Object>>([]);

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],

            mediaCompList: {
                id_estudante: String,
                id_simulado: number,
                comprensao: number
            }[] = [],

            mediaTempoList: {
                id_estudante: String,
                id_simulado: number,
                tempo: number
            }[] = [],

            currentStudant: String = '',
            mediaComp = 0,
            mediaTempo = 0,
            somaComp = 0,
            somaTempo = 0,
            contQuestions = 0,
            maiorTempo = 0,
            maiorComp = 0
            ;
        Compreensao.forEach((item) => {//FALTA O ULTIMO ALUNO
            if (item.id_simulado === 1) {
                if (contQuestions === 0)//rever lógica para esse IF
                    currentStudant = item.id_estudante;

                if (item.id_estudante !== currentStudant /* && somaComp > 0 */) {
                    mediaComp = somaComp / contQuestions;
                    contQuestions = 0
                    somaComp = 0
                    mediaCompList.push({
                        "id_estudante": currentStudant,
                        "id_simulado": item.id_simulado,
                        "comprensao": mediaComp
                    });

                    if (mediaComp > maiorComp)
                        maiorComp = parseFloat(mediaComp.toFixed(2));
                    currentStudant = item.id_estudante;
                }

                somaComp += item.comprensao;
                contQuestions++;
            }

        });
        contQuestions = 0;
        somaTempo = 0;
        ResponseTimeData.forEach((item) => {
            if (item.id_simulado === 1) {
                if (contQuestions === 0)//rever lógica para esse IF
                    currentStudant = item.id_estudante;

                if (item.id_estudante !== currentStudant /* && somaTempo > 0 */) {

                    mediaTempo = somaTempo / contQuestions;
                    contQuestions = 0
                    somaTempo = 0
                    mediaTempoList.push({
                        "id_estudante": currentStudant,
                        "id_simulado": item.id_simulado,
                        "tempo": mediaTempo
                    });

                    if (mediaTempo > maiorTempo)
                        maiorTempo = parseFloat(mediaTempo.toFixed(2));

                    currentStudant = item.id_estudante;
                }

                somaTempo += item.tempo;
                contQuestions++;
            }

        });



        mediaCompList.forEach(item => {
            for (var i = 0; i < mediaTempoList.length; i++) {
                let kmensItem = [];
                //if (item.id_simulado !== 1) break;
                //if (item.questao !== 2) break;

                if (item.id_estudante === mediaTempoList[i].id_estudante
                    /*&& item.id_simulado === ResponseTimeData[i].id_simulado  &&
                    item.questao === ResponseTimeData[i].questao */
                ) {

                    kmensItem.push(parseFloat(item.comprensao.toFixed(2)));
                    kmensItem.push(mediaTempoList[i].tempo);
                    kmensList.push(kmensItem);
                    break;
                }
            }
        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const compreensao = item[0],
                tempo = item[1];

            dadosItem = {
                "x": tempo,
                "y": compreensao
            };

            if (compreensao >= 0 && compreensao <= maiorComp / 2 &&
                tempo >= 0 && tempo <= maiorTempo / 2) {
                grupo1.push(dadosItem);
            } else if (compreensao > maiorComp / 2 && compreensao <= maiorComp &&
                tempo >= 0 && tempo <= maiorTempo / 2) {
                grupo2.push(dadosItem);
            } else if (compreensao >= 0 && compreensao <= maiorComp / 2 &&
                tempo > maiorTempo / 2 && tempo <= maiorTempo) {
                grupo3.push(dadosItem);
            } else if (compreensao > maiorComp / 2 && compreensao <= maiorComp &&
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
                <YAxis dataKey="y" name="compreensão" unit="c" />

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

export default ChartTest;

/* QUANDO TINHAN TODAS AS QUESTÕES - SEM MÉDIA
useEffect(() => {

                        let kmensList: Array<Array<number>> = [];

        Compreensao.forEach(item => {
            for (var i = 0; i < ResponseTimeData.length; {
                            let kmensItem = [];
                if (item.id_simulado !== 1) break;
                //if (item.questao !== 2) break;

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

        kmensList.forEach(item => {
                            let dadosItem = { };
            const compreensao = item[0],
                tempo = item[1];

            dadosItem = {
                            "x": tempo,
                "y": compreensao
            };

            if (compreensao >= 0 && compreensao <= 0.5 &&
                tempo >= 0 && tempo <= 500) {

                            grupo1.push(dadosItem);
            } else if (compreensao > 0.5 && compreensao <= 1 &&
                tempo >= 0 && tempo <= 500) {

                            grupo2.push(dadosItem);
            } else if (compreensao >= 0 && compreensao <= 0.5 &&
                tempo > 500 && tempo <= 1000) {

                            grupo3.push(dadosItem);
            } else if (compreensao > 5 && compreensao <= 1 &&
                tempo > 500 && tempo <= 1000) {
                            console.log('grupo4');
                grupo4.push(dadosItem);
            }else{
                            console.log('teste');
            }
        });

        //console.log(JSON.stringify(grupo4));

        setGrupo1(grupo1);
        setGrupo2(grupo2);
        setGrupo3(grupo3);
        setGrupo4(grupo4);
    }, []);
*/