import styles from './Charts.module.css';
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryStack,
} from 'victory';
import { useTranslation } from 'react-i18next';

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

const Charts = () => {
    const { t } = useTranslation();
    return (
        <div className={styles['internshipChart']}>
            <h1>{t('description.internship')}</h1>
            <p>{t('description.spamSentence')}</p>
            <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
                <VictoryAxis
                    tickValues={[
                        t('description.startInternship'),
                        t('description.endInternship'),
                    ]}
                />
                <VictoryAxis dependentAxis tickFormat={(x) => `GB${x / 100}`} />
                <VictoryStack colorScale={'warm'}>
                    <VictoryBar data={start} x={'month'} y={'space'} />
                    <VictoryBar data={end} x={'month'} y={'space'} />
                </VictoryStack>
            </VictoryChart>
        </div>
    );
};

export default Charts;
