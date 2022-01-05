import React from 'react';
import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import styles from './AddNewSkill.module.css';

const Modal = () => {
    const dispatch = useDispatch();
    return ReactDom.createPortal(
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <header className={styles.modal_header}>
                    <h2 className={styles.title}>Add a new skill:</h2>
                </header>
                <input type="text" className={styles.inputModal} />
                <footer className={styles.modal_footer}>
                    <button
                        className={styles.modal_discard}
                        onClick={() => dispatch(close())}
                    >
                        Discard
                    </button>
                    <button className={styles.modal_add}>Add</button>
                </footer>
            </div>
        </div>,
        document.getElementById('modal')!
    );
};

export default Modal;
