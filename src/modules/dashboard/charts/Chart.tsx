import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Title from '../../../Title';

const data = [
    {
        name: 'Aluno 1', Q1: 1, Q2: 4, Q3: 1, Q4: 1, Q5: 3
    },
    {
        name: 'Aluno 2', Q1: 1, Q2: 1, Q3: 1, Q4: 1, Q5: 2
    },
    {
        name: 'Aluno 3', Q1: 1, Q2: 2, Q3: 3, Q4: 1, Q5: 1
    },
    {
        name: 'Aluno 4', Q1: 1, Q2: 1, Q3: 1, Q4: 6, Q5: 2
    },
    {
        name: 'Aluno 5', Q1: 1, Q2: 2, Q3: 1, Q4: 1, Q5: 1
    },
    {
        name: 'Aluno 6', Q1: 1, Q2: 1, Q3: 1, Q4: 2, Q5: 1
    },
];

const Chart: React.FC<any> = ({ title }) => {

    return (
        <React.Fragment>
            <Title title={title} />
            <BarChart
                width={600}
                height={300}
                data={data}
                style={{
                    margin: '10px auto'
                }}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />

                <YAxis type="number" tickCount={12} tickSize={5} />

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

export default Chart;