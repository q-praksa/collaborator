import React from 'react';
import ReactDom from 'react-dom';
import styles from './AddNewTimeSheet.module.css';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';

const AddNewTimesheet = () => {
    const dispatch = useDispatch();
    return ReactDom.createPortal(
        <div className={styles.container}>
            <div className={styles.modal_time}>
                <header className={styles.modal_time_header}>
                    <h2 className={styles.title}>Log work:</h2>
                </header>
                <section className={styles.mid}>
                    <label id={styles.date}>Date:</label>
                    <select className={styles.date}>
                        <option value="date">03/01/2022</option>
                    </select>
                    <label id={styles.client}>Client:</label>
                    <select className={styles.client}>
                        <option value="client">Select A Client</option>
                    </select>
                    <label id={styles.project}>Project</label>
                    <select className={styles.project}>
                        <option value="project">Select Project</option>
                    </select>
                    <label id={styles.time}>Time Spent</label>
                    <input className={styles.time} type="text" />
                    <label id={styles.description}>Descritpion:</label>
                    <textarea
                        className={styles.description}
                        cols={30}
                        rows={10}
                    ></textarea>
                </section>

                <footer className={styles.modal_time_footer}>
                    <button
                        className={styles.modal_time_discard}
                        onClick={() => dispatch(close())}
                    >
                        Discard
                    </button>
                    <button className={styles.modal_time_add}>Add</button>
                </footer>
            </div>
        </div>,
        document.getElementById('timeSheet')!
    );
};

export default AddNewTimesheet;
