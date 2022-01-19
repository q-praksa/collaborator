import React from 'react';

export interface IButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    children?: React.ReactNode;
}
