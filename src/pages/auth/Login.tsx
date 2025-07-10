import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '@contexts/AuthProvider';
import { AuthFormContainer } from './components/AuthFormContainer';
import { AuthCard } from './components/AuthCard';
import { AuthHeader } from './components/AuthHeader';
import { AnimatedForm } from './components/AnimatedForm';
import { AuthInputField } from './components/AuthInputField';
import { ToggleInputTypeButton } from './components/ToggleInputTypeButton';
import { PasswordInputField } from './components/PasswordInputField';
import { SubmitButton } from './components/SubmitButton';
const Login = () => {
    const { loginUser, fcmToken } = useAuth();
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [usePhone, setUsePhone] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { identifier, password } = formData;

        if (!identifier.trim() || !password.trim()) {
            toast.error('Please fill in all fields.');
            return;
        }
        try {
            loginUser.login({ identifier, password, fcmToken })
        } catch (error) {
            console.error('Login error:', error);
            toast.error(loginUser.error?.message || 'Login failed. Please try again.');
            return;
        }
    };

    const toggleInputType = () => setUsePhone((prev) => !prev);
    const clearIdentifier = () => setFormData((prev) => ({ ...prev, identifier: '' }));

    return (
        <AuthFormContainer>
            <AuthCard>
                <AuthHeader
                    title="Welcome Back"
                    subtitle="Sign in to your account"
                />

                <AnimatedForm onSubmit={handleSubmit}>
                    <AuthInputField
                        label={usePhone ? 'Mobile Number' : 'Email'}
                        name="identifier"
                        type={usePhone ? 'tel' : 'email'}
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder={usePhone ? 'Enter your mobile number' : 'Enter your email'}
                        icon={usePhone ? <FaPhoneAlt /> : <FaEnvelope />}
                    />

                    <ToggleInputTypeButton
                        usePhone={usePhone}
                        toggleInputType={toggleInputType}
                        clearIdentifier={clearIdentifier}
                    />

                    <PasswordInputField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                    />

                    <SubmitButton
                        isLoading={loginUser.isLoading}
                        label="Sign in"
                        loadingLabel="Signing in..."
                    />
                </AnimatedForm>
            </AuthCard>
        </AuthFormContainer>
    );
};

export default Login;