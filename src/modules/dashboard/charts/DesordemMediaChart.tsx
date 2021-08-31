import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Title from '../../../Title';

const DesordemMediaChart: React.FC<any> = ({ title }) => {
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
            let desordem = parseFloat(item.desordem.toFixed(2));
            let mediaSimu = parseFloat(item.media_simulado.toFixed(2));

            if (desordem > maiorX)
                maiorX = desordem;
            if (mediaSimu > maiorY)
                maiorY = mediaSimu;

            let kmensItem = [];
            kmensItem.push(desordem);
            kmensItem.push(mediaSimu);
            kmensItem.push(item.id_estudante);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const desordem = item[0],
                mediaSimu = item[1],
                registration = item[2];

            dadosItem = {
                "x": desordem,
                "y": mediaSimu
            };
            if (registrationLocal != null && parseInt(registrationLocal) === registration) {
                console.log(registration);
                grupo0.push(dadosItem);
            } else if (desordem >= 0 && desordem <= maiorX / 2 &&
                mediaSimu >= 0 && mediaSimu <= maiorY / 2) {//verde
                setRecommendation('Você precisa estudar mais e procurar refazer os exercícios');
                grupo1.push(dadosItem);
            } else if (desordem >= 0 && desordem <= maiorX / 2 &&
                mediaSimu > maiorY / 2 && mediaSimu <= maiorY) {//lilas
                setRecommendation('continue estudando, que poderá melhorar maus ainda seu desempenho');
                grupo2.push(dadosItem);
            } else if (desordem > maiorX / 2 && desordem <= maiorX &&
                mediaSimu >= 0 && mediaSimu <= maiorY / 2) {//vermeho
                setRecommendation('Você precisa organizar seu tempo, aumentar o tempo de estudos em casa, e procurar mais os professores para tirar possíveis dúvidas');
                grupo3.push(dadosItem);
            } else if (desordem > maiorX / 2 && desordem <= maiorX &&
                mediaSimu > maiorY / 2 && mediaSimu <= maiorY) {//azul
                setRecommendation('Continue estudando, que poderá melhorar mais ainda seu desempenho');
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
                <XAxis type="number" dataKey="x" name="desordem" unit="d" />
                <YAxis type="number" dataKey="y" name="média" unit="m" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <Scatter className="2018139340207" data={grupo1} fill="#82ca9d" />
                <Scatter className="2018139340118" data={grupo2} fill="#8884d8" />
                <Scatter className="2018139340118" data={grupo3} fill="#ff0000" />
                <Scatter className="2018139340118" data={grupo4} fill="#0000ff" />
                <Scatter className="2018139340119" data={grupo0} fill="#ffff21" />
            </ScatterChart>
            <span style={{ color: '#d6913c' }}>{recommendation}</span>
        </React.Fragment>
    );
}

export default DesordemMediaChart;