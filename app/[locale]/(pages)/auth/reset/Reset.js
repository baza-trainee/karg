'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import { Logo, HideShow, EyeSlashFill } from '@/public/assets/icons';
import styles from './styles/reset.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
import { AdminContext } from '@/app/adminProvider';
import Spinner from "@/components/Spinner/Spinner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_AUTH = 'api/authentication';

export default function ResetPassword() {
  const blockCaptions = {
    'pageTitle': 'Створіть новий пароль',
    'pageSubtitle': 'Ваш новий пароль повинен відрізнятися від попереднього пароля, який ви використовували.',
    'passwordPlaceholder': 'Введіть пароль',
    'passwordLabel': 'Пароль',
    'repeatPasswordLabel': 'Повторіть пароль',
    'save': 'Зберегти',
  }
  const errorMessages = {
    'emptyFieldError': 'Це поле не може бути пустим',
    'failedValidation': 'Ви ввели невідповідний пароль',
    'passwordMismatch': 'Паролі не співпадають, переконайтеся, що обидва паролі введено правильно',
  }

  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [form, setForm] = useState({
    password: { value: '', passwordError: '', passwordVisited: false, passwordVisible: false },
    repeatPassword: { value: '', repeatPasswordError: '', repeatPasswordVisited: false, passwordVisible: false },
  });
  const { isLoading, setIsLoading } = useContext(AdminContext);
  const password = form.password.value;
  const repeatPassword = form.repeatPassword.value;

  useEffect(() => {
    const isPasswordValid = form.password.value && !form.password.passwordError && form.password.passwordVisited;
    const isRepeatPasswordValid = form.repeatPassword.value && !form.repeatPassword.repeatPasswordError && form.repeatPassword.repeatPasswordVisited;
    if (isPasswordValid && isRepeatPasswordValid && repeatPassword === password) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [form])

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d~!?@#$%^&*_\-+(){}\[\]>\\/<|"'.,:;]{6,64}$/;
    let errorMessage = '';
    if (!value) {
      errorMessage = errorMessages.emptyFieldError;
    } else if (!passwordRegex.test(value)) {
      errorMessage = errorMessages.failedValidation;
    }
    return errorMessage;
  }

  const passwordHandler = (e) => {
    const { name, value } = e.target;
    setServerErrorMessage('');
    if (name === 'password') {
      const errorMessage = validatePassword(value);
      const repeatPasswordError = form.repeatPassword.value !== value ? errorMessages.passwordMismatch : '';
      setForm(prevForm => ({
        ...prevForm,
        password: {
          ...prevForm.password,
          value: value,
          passwordError: errorMessage,
          passwordVisited: true,
        },
        repeatPassword: {
          ...prevForm.repeatPassword,
          repeatPasswordError: repeatPasswordError,
        }
      }));
    }
    if (name === 'repeatPassword') {
      let errorMessage = value !== form.password.value ? errorMessages.passwordMismatch : '';
      setForm(prevForm => ({
        ...prevForm,
        repeatPassword: {
          ...prevForm.repeatPassword,
          value: value,
          repeatPasswordError: errorMessage,
          repeatPasswordVisited: true,
        }
      }));
    }
  }

  const blurHandler = (e) => {
    const name = e.target.name;
    setForm({
      ...form,
      [name]: { ...form[name], [`${name}Visited`]: true },
    });
  }

  const sendNewPassword = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_AUTH}/resetpassword`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during password reset:", error);
      throw error;
    }
  };

  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = form.password.value;
    const token = searchParams.get('token');
    localStorage.setItem('auth-token', token);
    const data = {
      'password': newPassword,
      'token': token
    };

    try {
      setIsLoading(true);
      const result = await sendNewPassword(data);

      if (result.status === 1) {
        router.push('/dashboard');
      } else {
        setServerErrorMessage(result.message)
      }
    } catch (error) {
      setServerErrorMessage(error.message);
      console.error(error);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    isLoading ? (
      < Spinner />
    ) : (
      <div className={styles.container}>
        <Link href="/"><Logo className={styles.logo} /></Link>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.email}>
              <p className={`${styles.title} ${variables.font24w700}`}>{blockCaptions.pageTitle}</p>
              <p className={`${variables.font16w300} ${serverErrorMessage ? styles.error : styles.subtitle}`}>
                {blockCaptions.pageSubtitle}
              </p>
            </div>
            <div className={styles.password}>
              <label htmlFor='password' className={variables.font20w400}>
                {blockCaptions.passwordLabel}
                <input
                  className={`${(form.password.passwordVisited && form.password.passwordError) ? styles.errorBorder : styles.ordinaryBorder} ${variables.font18w500}`}
                  type={isPasswordVisible ? 'text' : 'password'}
                  aria-label='password'
                  id='password'
                  name='password'
                  placeholder={blockCaptions.passwordPlaceholder}
                  value={password}
                  onChange={(e) => passwordHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                />
                {isPasswordVisible ? (
                  <HideShow className={styles.icon} onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                ) : (
                  <EyeSlashFill className={styles.icon} onClick={() => setIsPasswordVisible(!isPasswordVisible)} />)}
              </label>
              {(form.password.passwordVisited && form.password.passwordError) && <p className={`${styles.error} ${variables.font14w400}`}>{form.password.passwordError}</p>}
            </div>
            <div className={styles.password}>
              <label htmlFor='repeatPassword' className={variables.font20w400}>
                {blockCaptions.repeatPasswordLabel}
                <input
                  className={`${(form.repeatPassword.repeatPasswordVisited && form.repeatPassword.repeatPasswordError) ? styles.errorBorder : styles.ordinaryBorder} ${variables.font18w500}`}
                  type={isRepeatPasswordVisible ? 'text' : 'password'}
                  aria-label='repeatPassword'
                  id='repeatPassword'
                  name='repeatPassword'
                  placeholder={blockCaptions.passwordPlaceholder}
                  value={repeatPassword}
                  onChange={(e) => passwordHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                />
                {isRepeatPasswordVisible ? (
                  <HideShow className={styles.icon} onClick={() => setIsRepeatPasswordVisible(!isRepeatPasswordVisible)} />
                ) : (
                  <EyeSlashFill className={styles.icon} onClick={() => setIsRepeatPasswordVisible(!isRepeatPasswordVisible)} />)}
              </label>
            </div>
            {(serverErrorMessage || (form.repeatPassword.repeatPasswordVisited && form.repeatPassword.repeatPasswordError)) && (
              <p className={`${styles.mismatchError} ${variables.font20w400}`}>
                {serverErrorMessage || form.repeatPassword.repeatPasswordError}
              </p>
            )}
            <button
              className={`${!isFormValid ? styles.buttonSendDisabled : styles.buttonSend} ${variables.font20w700}`}
              disabled={!isFormValid}
              type='submit'
            >{blockCaptions.save}
            </button>
          </div>
        </form>
      </div>)
  )
}
