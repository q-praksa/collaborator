import React, { ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles['error-message']}>
                    <h1 data-testid="errorboundary">
                        Ups... something went wrong.
                    </h1>
                    <p>Just kick back and relax</p>
                    <p>Our elfs are working on it</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
