import Profile from '@components/Profile';
import Employees from '@components/Employees';
import AddClientModal from '@components/modals/AddNewClient';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { open } from '@reduxStore/actions/modal';
import { RootState } from '@reduxStore/reducers';

function TestSS() {
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewClient]
    );
    const dispatch = useDispatch();
    return (
        <div style={{ width: '50px', height: '50px' }}>
            <button
                style={{ width: '50px', height: '50px' }}
                onClick={() => dispatch(open(modalTypes.addNewClient))}
            >
                BATN
            </button>
            {modal ? <AddClientModal /> : null}
        </div>
    );
}

export default TestSS;
