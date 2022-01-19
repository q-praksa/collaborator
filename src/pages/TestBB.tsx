import Modal from '@elements/Modal';
import ProjectCard from '@components/ProjectCard';
import { ProjectStatus } from '@components/ProjectCard/types';
import TextInput from '@elements/Inputs/TextInput';
import styles from './testbb.module.css';
import FilterButton from '@elements/Buttons/FilterButton';
import ActiveFilterButton from '@elements/Buttons/ActiveFilterButton';
import OpenModalButton from '@elements/Buttons/OpenModalButton';

function TestBB() {
    return (
        <div style={{ height: '100vh' }}>
            <ProjectCard
                status={ProjectStatus.inactive}
                client={'Colaborator'}
                lead={'Kim Novak'}
                manager={'Kim Novak'}
                teamType={'Frontend'}
                startDate={'01-01-2021'}
                endDate={'N/A'}
            />

            <Modal title="testtt">
                <div className={styles.input_wrapper}>
                    <FilterButton
                        onClick={() => console.log('this not active')}
                    >
                        alfsjls
                    </FilterButton>
                    <ActiveFilterButton onClick={() => console.log('btn')}>
                        hello
                    </ActiveFilterButton>

                    <OpenModalButton onClick={() => console.log('modal btn')} />
                </div>
            </Modal>
        </div>
    );
}

export default TestBB;
