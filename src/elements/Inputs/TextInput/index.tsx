import { FC } from 'react';
import styles from './TextInput.module.css';
import { ITextInputProps } from './types';

const TextInput: FC<ITextInputProps> = ({ name, label, type, ...rest }) => {
    return (
        <div className={styles.input_wrapper}>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <input id={name} type={type} className={styles.input} {...rest} />
        </div>
    );
};

export default TextInput;
