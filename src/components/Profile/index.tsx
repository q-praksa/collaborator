import styles from './Profile.module.css';
import AddNewSkill from '@components/modals/AddNewSkill';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxStore/reducers';
import { open } from '@reduxStore/actions/modal';

function Profile() {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal.show);

    return (
        <div className={styles['main-div']}>
            <div className={styles['profile-data']}>
                <div className={styles['label-input-wrapper']}>
                    <label>First name:</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>Last name:</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>Address:</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>Email:</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>Contact number:</label>
                    <input className={styles['input']}></input>
                </div>
            </div>
            <div className={styles['profile-img-skills']}>
                <div className={styles['img-wrapper']}></div>
                <div className={styles['skills-wrapper']}>
                    <div className={styles['label-add-role-btn-wrapper']}>
                        <label>Skills:</label>
                        <button
                            onClick={() => dispatch(open())}
                            className={styles['add-role-btn']}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div>{modal ? <AddNewSkill /> : null}</div>
        </div>
    );
}

export default Profile;
