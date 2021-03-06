import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Scaffold from '../../../Scaffold';
import Title from '../../../Title';

const DuvidaTempoChart: React.FC<any> = ({ title }) => {
    const [grupo0/* , setGrupo0 */] = useState<Array<Object>>([]);
    const [grupo1/* , setGrupo1 */] = useState<Array<Object>>([]);
    const [grupo2/* , setGrupo2 */] = useState<Array<Object>>([]);
    const [grupo3/* , setGrupo3 */] = useState<Array<Object>>([]);
    const [grupo4/* , setGrupo4 */] = useState<Array<Object>>([]);
    const [recommendation, setRecommendation] = useState<String>('');

    useEffect(() => {

        let kmensList: Array<Array<number>> = [],
            maiorX = 0,
            maiorY = 0,
            registrationLocal = window.localStorage.getItem('registration');
        ;

        DadosGeraisData.forEach(item => {
            let duvida = parseFloat(item.duvida.toFixed(2));
            let tempo = parseFloat(item.tempo_medio.toFixed(2));

            if (duvida > maiorX)
                maiorX = duvida;
            if (tempo > maiorY)
                maiorY = tempo;

            let kmensItem = [];
            kmensItem.push(duvida);
            kmensItem.push(tempo);
            kmensItem.push(item.id_estudante);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const duvida = item[0],
                tempo = item[1],
                registration = item[2]
                ;

            dadosItem = {
                "x": duvida,
                "y": tempo
            };

            if (registrationLocal != null && parseInt(registrationLocal) === registration) {
                console.log(registration);
                grupo0.push(dadosItem);
            }
            else if (duvida >= 0 && duvida <= maiorX / 2 &&
                tempo >= 0 && tempo <= maiorY / 2) {//verde
                setRecommendation('Voc?? fez sua prova com poucas d??vidas e dentro do tempo recomendado.');
                grupo1.push(dadosItem);
            } else if (duvida >= 0 && duvida <= maiorX / 2 &&
                tempo > maiorY / 2 && tempo <= maiorY) {//lilas
                setRecommendation('Voc?? estava com poucas d??vidas, por??m precisa ler mais e melhorar a compreens??o das quest??es em menos tempos, pois lembre que as provas de vestibular possuem tempos para a sua realiza????o');
                grupo2.push(dadosItem);
            } else if (duvida > maiorX / 2 && duvida <= maiorX &&
                tempo >= 0 && tempo <= maiorY / 2) {//vermelho
                setRecommendation('');
                grupo3.push(dadosItem);
            } else if (duvida > maiorX / 2 && duvida <= maiorX &&
                tempo > maiorY / 2 && tempo <= maiorY) {//azul
                setRecommendation('Voc?? precisa estudar um pouco mais e prestar aten????o ao tempo gasto para realiza????o da prova');
                grupo4.push(dadosItem);
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
                <XAxis type="number" dataKey="x" name="duvida" unit="d" />
                <YAxis type="number" dataKey="y" name="tempo" unit="s" />

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
    return (
        <Scaffold recommendations={recommendation}>
            {content}
        </Scaffold>
    );
}

export default DuvidaTempoChart;