import React, { useEffect, useState } from 'react';
import DadosGeraisData from '../../../contracts/modules/charts/dados_gerais.json';
import Title from '../../../Title';

const AssertividadeChart: React.FC<any> = ({ title }) => {
    const [mediaAssertividadeTurma, setMediaAssertividadeTurma] = useState<number>(0);
    const [mediaAssertividadeStudant, setMediaAssertividadeStudant] = useState<number>(0);

    useEffect(() => {

        let registrationLocal = window.localStorage.getItem('registration'),
            studanteClass = whatIsClass(parseInt(registrationLocal || '')),
            cont = 0,
            mediaAssertividade = DadosGeraisData.reduce((acc, cur) => {
                let assert = 0;
                if (studanteClass != null && cur.turma === studanteClass) {
                    cont++;
                    assert = cur.assertividade;
                }
                return acc + assert;
            }, 0);

        mediaAssertividade = parseFloat((mediaAssertividade / cont).toFixed(2));

        setMediaAssertividadeTurma(mediaAssertividade);

    }, [mediaAssertividadeTurma]);

    const whatIsClass = (registration: number): number => {
        let studantClass = 0;
        for (let item of DadosGeraisData) {
            if (item.id_estudante === registration) {
                setMediaAssertividadeStudant(parseFloat(item.assertividade.toFixed(2)));
                studantClass = item.turma;
                break;
            }
        }
        return studantClass;
    }

    return (
        <React.Fragment>
            <Title title={title} />
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                textAlign: 'center',
            }}>
                <div >
                    <span style={{
                        color: '#787878'
                    }}>Média da turma</span>
                    <h1 style={{ margin: 0, fontSize: '50px', color: '#2b2b2b' }}>
                        {mediaAssertividadeTurma}M
                    </h1>
                </div>
                <div>
                    <span style={{
                        color: '#787878'
                    }}>Sua média</span>
                    <h1 style={{ margin: 0, fontSize: '50px', color: '#2b2b2b' }}>
                        {mediaAssertividadeStudant}M
                    </h1>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AssertividadeChart;