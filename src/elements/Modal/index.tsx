import { Http2ServerResponse } from 'http2';
import styles from './Modal.module.css';
import { IModalProps } from './types';

const Modal = ({ children, title }: IModalProps) => {
    return (
        <div className={styles.modal_container}>
            <h2 className={styles.modal_title}>{title}</h2>
            <section className={styles.modal_body}>{children}</section>
        </div>
    );
};

export default Modal;
