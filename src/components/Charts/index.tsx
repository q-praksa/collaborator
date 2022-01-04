import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Charts.module.css';
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryStack,
} from 'victory';

const start = [
    { month: 1, space: 1 },
    { month: 2, space: 2 },
    { month: 3, space: 3 },
];

const end = [
    { month: 1, space: 10 },
    { month: 2, space: 50 },
    { month: 3, space: 80 },
];

class Charts extends React.Component {
    render() {
        return (
            <div className={styles['internshipChart']}>
                <h1>Internship chart</h1>
                <p>
                    Spam mail folder next to the time line spent in internship
                </p>
                <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
                    <VictoryAxis
                        tickValues={['Start internship', 'End internship']}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => `GB${x / 100}`}
                    />
                    <VictoryStack colorScale={'warm'}>
                        <VictoryBar data={start} x={'month'} y={'space'} />
                        <VictoryBar data={end} x={'month'} y={'space'} />
                    </VictoryStack>
                </VictoryChart>
            </div>
        );
    }
}

export default Charts;
