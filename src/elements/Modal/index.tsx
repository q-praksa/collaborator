import React from 'react';
import styles from './Modal.module.css';
import { IModalProps } from './types';

const Modal = ({ children, title }: IModalProps) => {
    return (
        <React.Fragment>
            <div className={styles.backdrop}></div>
            <div className={styles.modal_container}>
                <h2 className={styles.modal_title}>{title}</h2>
                <section className={styles.modal_body}>{children}</section>
            </div>
        </React.Fragment>
    );
};

export default Modal;
