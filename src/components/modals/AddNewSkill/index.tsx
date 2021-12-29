import React from 'react';
import ReactDom from 'react-dom';
import styles from './AddNewSkill.module.css';

const Modal = () => {
    return ReactDom.createPortal(
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <header className={styles.modal_header}>
                    <h2 className={styles.title}>Add new skill:</h2>
                </header>
                <input type="text" />
                <footer className={styles.modal_footer}>
                    <button className={styles.modal_discard}>Discard</button>
                    <button className={styles.modal_add}>Add</button>
                </footer>
            </div>
        </div>,
        document.getElementById('modal')!
    );
};

export default Modal;
