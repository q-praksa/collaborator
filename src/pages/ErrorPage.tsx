import ErrorBoundary from '@components/ErrorBoundary';

function ErrorComponent(): React.ReactElement {
    throw new Error('some error');
}

function TestError() {
    return (
        <ErrorBoundary>
            <ErrorComponent />
        </ErrorBoundary>
    );
}

export default TestError;
