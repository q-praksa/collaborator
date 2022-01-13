Definition:
An Error Boundary is a component that allows us to catch any errors that might happen in the child components tree, log those errors, and show a fallback UI.

Note:
Error boundaries do not catch errors for:

1. Event handlers
2. Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
3. Server side rendering
4. Errors thrown in the error boundary itself (rather than its children)

Also, keep in mind that while developing, React doesn’t show your Error Boundary fallback UI by default. To view that, hit the close button on the top right.

If you want to test it, you can go in your Test page and type: throw new Error("...")

Exemple:
TestMB, would look like this:

import Charts from '@components/Charts';

function TestMB() {
throw new Error("test")
return <Charts />;
}

export default TestMB;

further reading:
https://serverless-stack.com/chapters/setup-an-error-boundary-in-react.html

and npm package for react-error-boundary
https://www.npmjs.com/package/react-error-boundary
