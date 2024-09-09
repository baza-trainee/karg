'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
// import { login } from '../../utils/login';
import { Logo, HideShow } from '@/public/assets/icons';
import styles from './login.module.scss';


export default function LoginPage() {

    const text = {
        emailLabel: 'Логін',
        emailPlaceholder: 'Введіть електронну адресу',
        passwordLabel: 'Пароль',
        passwordPlaceholder: 'Введіть пароль',
        loginButton: 'Увійти',
        resetButton: 'Забули пароль?',
    };

    const router = useRouter();
    const [form, setForm] = useState({
        email: {
            value: '', valid: false, message: ''
        },
        password: {
            value: '', valid: false, message: ''
        },
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const emailHandler = (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setForm({ ...form, email: { ...form.email, value: email } });

        if (email.length === 0) {
            setForm({ ...form, email: { ...form.email, valid: false, value: email, message: 'Поле для електронноъ пошти пусте' } });
        } else if (emailRegex.test(email)) {
            setForm({ ...form, email: { ...form.email, valid: true, value: email, message: '' } });
        } else {
            setForm({ ...form, email: { ...form.email, valid: false, value: email, message: 'Надана Вами електронна адреса має неправильний формат' } });
        }
    };
    const passwordHandler = (e) => {
        const password = e.target.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,30}$/;

        setForm({ ...form, password: { ...form.password, value: password } });

        if (password.length === 0) {
            setForm({ ...form, password: { ...form.password, valid: false, value: password, message: 'Поле для пароля пусте' } });
        } else if (passwordRegex.test(password)) {
            setForm({ ...form, password: { ...form.password, valid: true, value: password, message: '' } });
        } else {
            setForm({ ...form, password: { ...form.password, valid: false, value: password, message: 'Пароль виключно латиницею повинен мати хоча б одну велику літеру, одну цифру та мати довжину від 6 до 30 символів' } });
        }
    };

    const handleSubmit = async () => {
        const email = form.email.value;
        const response = await fetch('http://localhost:5005/login', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: form.password.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.status === 200) {
            router.push("/dashboard", {
                email: email,
            });
            setServerResponse(data.message);
        } else {
            setServerResponse(data.message);
        }

    };

    return (
        <div className={styles.container}>
            <Link href="/"><Logo className={styles.logo} /></Link>

            <div className={styles.form}>
                <div className={styles.email}>
                    <label htmlFor='email'>
                        {text.emailLabel}
                        <input
                            className={(form.email.valid) ? styles.errorBorder : styles.ordinaryBorder}
                            aria-label='email'
                            id='email'
                            name='email'
                            type='email'
                            value={form.email.value}
                            placeholder={text.emailPlaceholder}
                            onChange={(e) => emailHandler(e)}
                        />
                    </label>
                    {(!form.email.valid) && <p className={styles.error}>{form.email.message}</p>}
                </div>

                <div className={styles.password}>
                    <label htmlFor='password'>
                        {text.passwordLabel}
                        <input
                            className={(form.password.valid) ? styles.errorBorder : styles.ordinaryBorder}
                            type={isPasswordVisible ? 'text' : 'password'}
                            aria-label='password'
                            id='password'
                            name='password'
                            placeholder={text.passwordPlaceholder}
                            value={form.password.value}
                            onChange={(e) => passwordHandler(e)}
                        />
                        <HideShow className={styles.icon} onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                    </label>
                    {(!form.password.valid) && <p className={styles.error}>{form.password.message}</p>}
                </div>

                {(form.email.valid && form.password.valid) && <p className={serverResponse ? styles.success : styles.error}>{serverResponse}</p>}

                <button className={styles.buttonReset} onClick={() => router.push("/restore")}>{text.resetButton}</button>
                <button
                    className={!(form.email.valid && form.password.valid) ? styles.buttonLoginDesabled : styles.buttonLogin}
                    disabled={!(form.email.valid && form.password.valid)}
                    onClick={() => handleSubmit()}
                >{text.loginButton}
                </button>
            </div>
        </div>
    );

};