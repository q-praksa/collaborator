import styles from './Profile.module.css';
import AddNewSkill from '@components/modals/AddNewSkill';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxStore/reducers';
import { open } from '@reduxStore/actions/modal';
import { useTranslation } from 'react-i18next';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import OpenModalButton from '@elements/Buttons/OpenModalButton';
import { useApi } from '@hooks/useApi';
import { getUserByToken, updateUser } from '@api/userService';
import { useEffect, useState } from 'react';
import SaveButton from '@elements/Buttons/SaveButton';
import { statuses } from '@constants/status';

function Profile() {
    const dispatch = useDispatch();
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewSkill]
    );
    const { t } = useTranslation();
    const token: any = localStorage.getItem('accessToken');
    const [editedUser, setEditedUser] = useState({
        fullname: '',
        email: '',
        job: '',
        address: '',
        status: statuses[0],
        skills: {},
    });
    const patchApi = useApi(updateUser);

    const getCurrentUser = async () => {
        const response = await getUserByToken(token);
        setEditedUser({
            ...editedUser,
            ...response?.data,
        });
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    function handleSave() {
        patchApi.request(editedUser);
        alert('Profile updated.');
    }
    return (
        <div className={styles['main-div']}>
            <div className={styles['profile-data']}>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.fullname')}:</label>
                    <input
                        className={styles['input']}
                        value={editedUser.fullname}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                fullname: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.address')}:</label>
                    <input
                        className={styles['input']}
                        value={editedUser.address}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                address: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>Email:</label>
                    <input
                        className={styles['input']}
                        value={editedUser.email}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                email: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.job')}:</label>
                    <input
                        className={styles['input']}
                        value={editedUser.job}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                job: e.target.value,
                            })
                        }
                    />
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label className={styles['select-label']}>
                        {t('description.status')}:
                    </label>
                    <select
                        className={styles['select']}
                        placeholder="Status"
                        name="status"
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                status: (e.target as HTMLSelectElement).value,
                            })
                        }
                    >
                        {statuses.map((status) => {
                            const selected =
                                status === editedUser.status ? true : false;
                            return (
                                <option selected={selected} key={status}>
                                    {status}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className={styles['profile-img-skills']}>
                <div className={styles['img-wrapper']}></div>
                <div className={styles['skills-wrapper']}>
                    <div className={styles['label-add-role-btn-wrapper']}>
                        <label>{t('description.skills')}:</label>
                        <OpenModalButton
                            onClick={() =>
                                dispatch(open(modalTypes.addNewSkill))
                            }
                        />
                    </div>
                </div>
                <SaveButton onClick={handleSave}>
                    {t('description.save')}
                </SaveButton>
            </div>
            <div>{modal ? <AddNewSkill /> : null}</div>
        </div>
    );
}

export default Profile;
