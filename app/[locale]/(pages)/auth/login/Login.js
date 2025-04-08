'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/navigation";
import authService from './authService';
import { AdminContext } from '@/app/adminProvider';
import LoginForm from './LoginForm';
import Spinner from "@/components/Spinner/Spinner";

export default function LoginPage() {

  const blockCaptions = {
    'emailLabel': 'Логін',
    'emailPlaceholder': 'Введіть електронну адресу',
    'passwordLabel': 'Пароль',
    'passwordPlaceholder': 'Введіть пароль',
    'loginButton': 'Увійти',
    'forgotButton': 'Забули пароль?',
  };

  const errorMessages = {
    'emailError': 'Ви ввели невідповідний логін.',
    'passwordError': 'Ви ввели невідповідний пароль.',
    'authError': 'Введено невірний логін або пароль.'
  };

  const router = useRouter();
  const [emailVisited, setEmailVisited] = useState(false);
  const [passwordVisited, setPasswordVisited] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const { setAccountId, setActiveSection, isLoading, setIsLoading } = useContext(AdminContext);
  const [form, setForm] = useState({
    email: { value: '', emailError: '' },
    password: { value: '', passwordError: '' },
  });
  const email = form.email.value;
  const password = form.password.value;

  useEffect(() => {
    const isEmailValid = form.email.value && !form.email.emailError;
    const isPasswordValid = form.password.value && !form.password.passwordError;

    if (isEmailValid && isPasswordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [form]);

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value.toLowerCase())) {
      return errorMessages.emailError;
    }
    return '';
  }

  const emailHandler = (e) => {
    const value = e.target.value;
    const errorMessage = validateEmail(value);
    setForm((prev) => ({ ...prev, email: { ...prev.email, value: value, emailError: errorMessage } }));
    setEmailVisited(true);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-ZА-ЯЁЇІЄҐ])(?=.*[a-zа-яёїієґ])(?=.*\d)[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\d~!?@#$%^&*_\-+()\[\]{}><\/\\|"'.,:;]{6,64}$/u;
    if (!passwordRegex.test(value)) {
      return errorMessages.passwordError;
    }
    return '';
  }

  const passwordHandler = (e) => {
    const value = e.target.value;
    const errorMessage = validatePassword(value);
    setForm((prev) => ({ ...prev, password: { ...prev.password, value: value, passwordError: errorMessage } }));
    setPasswordVisited(true);
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailVisited(true);
        break;
      case 'password':
        setPasswordVisited(true);
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setLoginStatus(errorMessages.authError);
      return;
    }
    try {
      setIsLoading(true);
      const response = await authService.login(form.email.value, form.password.value);

      if (response && response.status === 1) {
        const authToken = await response.token;
        const accountId = await response.rescuerId;

        localStorage.setItem('auth-token', authToken);
        localStorage.setItem('accountId', accountId);
        setAccountId(accountId);
        setActiveSection('Мій акаунт');
        router.push("/dashboard", { email: form.email.value });
      }
      else if (response.status === 400 || (!response.status)) {
        setLoginStatus(response.message || errorMessages.authError);
      }
      else if ((response.status === 500)) {
        setLoginStatus(response.message || "Виникла помилка на сервері. Будь ласка, спробуйте пізніше.");
      }
    } catch (error) {
      setLoginStatus(errorMessages.authError);
      console.error("Error:", error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    isLoading ? (
      < Spinner />
    ) : (
      <LoginForm
        blockCaptions={blockCaptions}
        email={email}
        emailVisited={emailVisited}
        emailError={form.email.emailError}
        handleEmailChange={emailHandler}
        password={password}
        onEmailBlur={blurHandler}
        onPasswordBlur={blurHandler}
        handlePasswordChange={passwordHandler}
        passwordVisited={passwordVisited}
        passwordError={form.password.passwordError}
        isPasswordVisible={isPasswordVisible}
        onTogglePasswordVisibility={() => setIsPasswordVisible((prev) => !prev)}
        loginStatus={loginStatus}
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
      />
    )
  )
}
