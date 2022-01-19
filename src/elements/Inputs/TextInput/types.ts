import { InputHTMLAttributes } from 'react';

export interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type: string;
}
