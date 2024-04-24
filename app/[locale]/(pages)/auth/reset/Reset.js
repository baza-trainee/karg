'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Logo, HideShow, EyeSlashFill } from '@/public/assets/icons';
import styles from './styles/reset.module.scss';
import variables from "@/app/[locale]/variables.module.scss";

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
    'faildValidation': 'Ви ввели невідповідний пароль',
    'passwordMismatch': 'Паролі не співпадають, переконайтеся, що обидва паролі введено правильно',
    'reusedPassword': 'Цей пароль вже використовувался раніше. Будь ласка, виберіть іншій пароль',
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
      errorMessage = errorMessages.faildValidation;
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
      const response = await fetch('https://localhost:3000/api/resetPassword', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to change password");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during password reset:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = form.password.value;
    const { token } = router.query;
    const data = {
      token,
      newPassword,
    };
    try {
      const result = await sendNewPassword(data);
      //result = {success: boolean, message:'errorMessage'}
      if (!result.success) {
        if (result.message === 'Password previously used') {
          setServerErrorMessage(errorMessages.reusedPassword)
        } else {
          console.error(result.message);
        }
      } else {
        router.push('/auth/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/"><Logo className={styles.logo} /></Link>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <div className={styles.email}>
            <p className={`${styles.title} ${variables.font24w700}`}>{blockCaptions.pageTitle}</p>
            <p className={`${variables.font16w300} ${serverErrorMessage ? styles.error : styles.subtitle}`}>
              {serverErrorMessage || blockCaptions.pageSubtitle}
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
          {(form.repeatPassword.repeatPasswordVisited && form.repeatPassword.repeatPasswordError) && <p className={`${styles.mistmatchError} ${variables.font20w400}`}>{form.repeatPassword.repeatPasswordError}</p>}
          <button
            className={`${!isFormValid ? styles.buttonSendDesabled : styles.buttonSend} ${variables.font20w700}`}
            disabled={!isFormValid}
            type='submit'
          >{blockCaptions.save}
          </button>
        </div>
      </form>
    </div>
  )
}
