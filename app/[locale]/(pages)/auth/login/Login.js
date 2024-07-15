'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Logo, HideShow, EyeSlashFill } from '@/public/assets/icons';
import styles from './styles/login.module.scss';

export default function LoginPage() {

  const blockCaptions = {
    'emailLabel': 'Логін',
    'emailPlaceholder': 'Введіть електронну адресу',
    'passwordLabel': 'Пароль',
    'passwordPlaceholder': 'Введіть пароль',
    'loginButton': 'Увійти',
    'forgotButton': 'Забули пароль?',
  }

  const router = useRouter();

  const [form, setForm] = useState({
    email:
      { value: '', emailError: '', emailVisited: false },
    password:
      { value: '', passwordError: '', passwordVisited: false },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const [loginStatus, setLoginStatus] = useState('');
  const [correctUser, setCorrectUser] = useState('');

  const { email } = form.email.value;
  const { password } = form.password.value;


  useEffect(() => {
    if (form.email.emailError || form.password.passwordError || form.email.value == '' || form.password.value == '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [form.email.emailError, form.password.passwordError])

  const ActualEyeIcon = () => {
    return (
      (isPasswordVisible) ? <HideShow className={styles.icon} onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
        : <EyeSlashFill className={styles.icon} onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
    )
  }

  const emailHandler = (e) => {
    setLoginStatus('');
    setForm({ ...form, email: { ...form.email, value: e.target.value } });

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setForm({ ...form, email: { ...form.email, emailError: 'Ви ввели невідповідний логін.' } });
    } else {
      setForm({ ...form, email: { ...form.email, value: e.target.value, emailError: '' } });
    }
    if (!e.target.value) {
      setForm({ ...form, email: { ...form.email, emailError: 'Ви ввели невідповідний логін.' } });
    }
  };

  const passwordHandler = (e) => {

    setLoginStatus('');
    setForm({ ...form, password: { ...form.password, value: e.target.value } });
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\u0400-\u04FF\d~!?@#$%^&*(){}\[\]><\/\\|"'.,:;-]{1,64}$/;

    if (!e.target.value) {
      setForm({ ...form, password: { ...form.password, passwordError: 'Ви ввели невідповідний парольі.' } });
    }
    else if (passwordRegex.test(e.target.value)) {
      setForm({ ...form, password: { ...form.password, value: e.target.value, passwordError: '' } });
    }
    else {
      setForm({ ...form, password: { ...form.password, value: '', passwordError: 'Ви ввели невідповідний пароль.' } });
    }

  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setForm({ ...form, email: { ...form.email, emailVisited: true } });
        break;
      case 'password':
        setForm({ ...form, password: { ...form.password, passwordVisited: true } });
        break;
    }
  }

  const handleSubmit = async () => {
    console.log('Start handleSubmit');
    try {
      const response = await fetch('https://karg-backend.onrender.com/karg/authentication/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email.value, password: form.password.value }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (response.status === 200) {
        const authToken = await data.token;
        localStorage.setItem('auth-token', authToken);
        setLoginStatus(`Ви успішно увійшли до адмінпанелі`);
        setCorrectUser(data.user);
        router.push("/dashboard", { email: form.email.value });
      }
      if ((response.status === 400)) {
        setLoginStatus("Введено невірний логін або пароль.");
      }
      // else if (response.status === 401) {
      //   setLoginStatus("Введено невірний логін або пароль.");
      //   //await fetch('https://karg-backend.onrender.com/karg/authentication/refresh');
      //   return;
      // }
    }
    catch (e) {
      console.log(e, 'test this part');
      setLoginStatus("Введено невірний логін або пароль.");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/"><Logo className={styles.logo} /></Link>

      <div className={styles.form}>
        <div className={styles.email}>
          <label htmlFor='email'>
            {blockCaptions.emailLabel}
            <input
              className={(form.email.emailVisited && form.email.emailError) ? styles.errorBorder : styles.ordinaryBorder}
              aria-label='email'
              id='email'
              name='email'
              type='email'
              value={email}
              placeholder={blockCaptions.emailPlaceholder}
              onChange={(e) => emailHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
          </label>
          {(form.email.emailVisited && form.email.emailError) && <p className={styles.error}>{form.email.emailError}</p>}
        </div>

        <div className={styles.password}>
          <label htmlFor='password'>
            {blockCaptions.passwordLabel}
            <input
              className={(form.password.passwordVisited && form.password.passwordError) ? styles.errorBorder : styles.ordinaryBorder}
              type={isPasswordVisible ? 'text' : 'password'}
              aria-label='password'
              id='password'
              name='password'
              placeholder={blockCaptions.passwordPlaceholder}
              value={password}
              onChange={(e) => passwordHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
            {ActualEyeIcon()}

          </label>
          {(form.password.passwordVisited && form.password.passwordError) && <p className={styles.error}>{form.password.passwordError}</p>}
        </div>

        {(loginStatus && isFormValid) && <p className={correctUser ? styles.success : styles.error}>{loginStatus}</p>}

        <button className={styles.buttonForgot} onClick={() => router.push("/auth/restore")}>{blockCaptions.forgotButton}</button>
        <button
          className={!isFormValid ? styles.buttonLoginDesabled : styles.buttonLogin}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >{blockCaptions.loginButton}
        </button>
      </div>
    </div>
  )
}
