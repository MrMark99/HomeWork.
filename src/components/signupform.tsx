import React, { useState } from 'react';
import '../App.css'

export const SignUpForm: React.FC = () => {
    const [inputValueName, setInputValueName] = useState<string>('');
    const [inputValueEmail, setInputValueEmail] = useState<string>('');
    const [inputValuePassword, setInputValuePassword] = useState<string>('');
    const [submitMessage, setSubmitMessage] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);  // Стан для визначення правильності

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValueEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValuePassword(event.target.value);
    };

    // Перевірка валідності email
    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitText = () => {
        if (inputValueName && isEmailValid(inputValueEmail) && inputValuePassword.length >= 8) {
            setSubmitMessage('Реєстрація успішна');
            setIsValid(true);  // Відповідь правильна
        } else {
            setSubmitMessage('Будь ласка, перевірте правильність даних');
            setIsValid(false);  // Відповідь неправильна
        }
    };

    return (
        <div>
            <div className="container">
                <input
                    className="input1"
                    type="text"
                    value={inputValueName}
                    onChange={handleNameChange}
                    placeholder="Введіть ім'я"
                />
                <input
                    className="input2"
                    type="email"
                    value={inputValueEmail}
                    onChange={handleEmailChange}
                    placeholder="Введіть email"
                />
                <input
                    className="input3"
                    type="password"
                    value={inputValuePassword}
                    onChange={handlePasswordChange}
                    placeholder="Введіть пароль"
                />
            </div>

            <button className="buttton" onClick={submitText}>Зареєструватися</button>
            <p className={isValid ? 'success' : 'error'}>{submitMessage}</p>
        </div>
    );
};

