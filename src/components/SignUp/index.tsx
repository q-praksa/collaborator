import { useState } from 'react';
import signUp from '@api/signupService';

export default function SignUp(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button onClick={() => signUp({ email, password })}>Sign up</button>
        </div>
    );
}
