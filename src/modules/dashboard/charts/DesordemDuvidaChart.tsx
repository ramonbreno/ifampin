import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Scaffold from '../../../Scaffold';
import Title from '../../../Title';

const DesordemDuvidaChart: React.FC<any> = ({ title }) => {
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
            let duvida = parseFloat(item.duvida.toFixed(2));

            if (desordem > maiorX)
                maiorX = desordem;
            if (duvida > maiorY)
                maiorY = duvida;

            let kmensItem = [];
            kmensItem.push(desordem);
            kmensItem.push(duvida);
            kmensItem.push(item.id_estudante);
            kmensList.push(kmensItem);

        });

        kmensList.forEach(item => {
            let dadosItem = {};
            const desordem = item[0],
                duvida = item[1],
                registration = item[2]
                ;

            dadosItem = {
                "x": desordem,
                "y": duvida
            };

            if (registrationLocal != null && parseInt(registrationLocal) === registration) {
                console.log(registration);
                grupo0.push(dadosItem);
            }
            else if (desordem >= 0 && desordem <= maiorX / 2 &&
                duvida >= 0 && duvida <= maiorY / 2) {//verde
                setRecommendation('Parece que voc?? teve poucas d??vidas e seguiu a ordem das quest??es, continue estudando para melhorar seu desempenho nas avalia????es');
                grupo1.push(dadosItem);
            } else if (desordem >= 0 && desordem <= maiorX / 2 &&
                duvida > maiorY / 2 && duvida <= maiorY) {//lilas
                setRecommendation('Voc?? apresentou alguma d??vida em rela????o as quest??es, procure melhorar a interpreta????o refazendo os exerc??cios que o professor passou');
                grupo2.push(dadosItem);
            } else if (desordem > maiorX / 2 && desordem <= maiorX &&
                duvida >= 0 && duvida <= maiorY / 2) {//vermelho
                setRecommendation('Segundo os dados, voc?? teve poucas d??vidas, por??m respondeu as quest??es que provavelmente teve mais conhecimento, procure estudar e refazer as atividades propostas pelo professor');
                grupo3.push(dadosItem);
            } else if (desordem > maiorX / 2 && desordem <= maiorX &&
                duvida > maiorY / 2 && duvida <= maiorY) {//azul
                setRecommendation('Voc?? precisa reler os assuntos, estudar mais para que seu desempenho melhore');
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
                <XAxis type="number" dataKey="x" name="desordem" unit="de" />
                <YAxis type="number" dataKey="y" name="duvida" unit="du" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <Scatter className="2018139340207" data={grupo1} fill="#82ca9d" />{/* verde */}
                <Scatter className="2018139340118" data={grupo2} fill="#8884d8" />{/* lil??s */}
                <Scatter className="2018139340118" data={grupo3} fill="#ff0000" />{/* vermelho */}
                <Scatter className="2018139340118" data={grupo4} fill="#0000ff" />{/* azul */}
                <Scatter className="2018139340119" data={grupo0} fill="#ffff21" />{/* amarelo */}
            </ScatterChart>

        </React.Fragment>
    );
    return (
        <Scaffold recommendations={recommendation}>
            {content}
        </Scaffold>
    );
}

export default DesordemDuvidaChart;