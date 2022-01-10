import styles from './Profile.module.css';
import AddNewSkill from '@components/modals/AddNewSkill';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxStore/reducers';
import { open } from '@reduxStore/actions/modal';
import { useTranslation } from 'react-i18next';

function Profile() {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal.show);
    const { t } = useTranslation();

    return (
        <div className={styles['main-div']}>
            <div className={styles['profile-data']}>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.firstName')}</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.lastName')}</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.address')}</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>Email:</label>
                    <input className={styles['input']}></input>
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.contactNo')}</label>
                    <input className={styles['input']}></input>
                </div>
            </div>
            <div className={styles['profile-img-skills']}>
                <div className={styles['img-wrapper']}></div>
                <div className={styles['skills-wrapper']}>
                    <div className={styles['label-add-role-btn-wrapper']}>
                        <label>{t('description.skills')}</label>
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
