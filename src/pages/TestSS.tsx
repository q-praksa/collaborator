import Profile from '@components/Profile';
import Employees from '@components/Employees';
import AddClientModal from '@components/modals/AddNewClient';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { open } from '@reduxStore/actions/modal';
import { RootState } from '@reduxStore/reducers';
import AddProject from '@components/modals/AddProject';

function TestSS() {
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewProject]
    );
    const dispatch = useDispatch();
    return (
        <div style={{ width: '50px', height: '50px' }}>
            <button
                style={{ width: '50px', height: '50px' }}
                onClick={() => dispatch(open(modalTypes.addNewProject))}
            >
                BATN
            </button>
            {modal ? <AddProject /> : null}
        </div>
    );
}

export default TestSS;
