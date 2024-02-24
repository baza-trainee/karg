'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Logo, HideShow } from '@/public/assets/icons';
import styles from './styles/login.module.scss';


export default function LoginPage() {

 const blockCaptions = {
  'emailLabel':'Логін',
  'emailPlaceholder': 'Введіть електронну адресу',
  'passwordLabel': 'Пароль',
  'passwordPlaceholder': 'Введіть пароль',
  'loginButton': 'Увійти',
  'resetButton': 'Забули пароль?',
  'actualUser': 'kargthebest2024@gmail.com',
 }

  const router = useRouter();

  const [form, setForm] = useState({ 
    email: 
    {value: '', emailError: '', emailVisited: false},
    password: 
    {value: '', passwordError: '', passwordVisited: false},
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); 

  const [loginStatus, setLoginStatus] = useState('');
  const [correctUser, setCorrectUser] = useState('');

  const { email} = form.email.value;
  const { password } = form.password.value;


  useEffect(() => {
    console.log(isFormValid );
    if(form.email.emailError || form.password.passwordError || form.email.value == ''|| form.password.value == '' ){
      setIsFormValid(false);
    }else {
      setIsFormValid(true);
    }
  }, [form.email.emailError, form.password.passwordError])


  const emailHandler = (e) => {
    setLoginStatus('');
    setForm({ ...form, email: { ...form.email, value: e.target.value}});

    const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(String(e.target.value).toLowerCase())){
        setForm({ ...form, email: { ...form.email, emailError: 'Надана Вами електронна адреса має неправильний формат.'}});
    }else {        
        setForm({ ...form, email: { ...form.email, value: e.target.value, emailError: ''}});
    }
    if(!e.target.value){
        setForm({ ...form, email: { ...form.email, emailError: 'Поле для електронної пошти пусте'}});
  }
};

  const passwordHandler = (e) => {

    setLoginStatus('');
    setForm({ ...form, password: { ...form.password, value: e.target.value}});
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,30}$/;

    if(!e.target.value){
      setForm({ ...form, password: { ...form.password, passwordError: 'Поле для пароля пусте'}});
    }
    else if(passwordRegex.test(e.target.value)){
      setForm({ ...form, password: { ...form.password, value: e.target.value, passwordError: ''}});
    }
    else{
      setForm({ ...form, password: { ...form.password, value: '', passwordError: 'Пароль виключно латиницею повинен мати хоча б одну велику літеру, одну цифру та мати довжину від 6 до 30 символів'}});
    }

  }

  const blurHandler = (e) => {
    switch(e.target.name){
      case 'email':
          setForm({ ...form, email: { ...form.email, emailVisited: true}});
          break;
      case 'password':
          setForm({ ...form, password: { ...form.password, passwordVisited: true}});
          break;
    }
  }

  const handleSubmit = async () => {
    try {

      const response = await fetch('http://localhost:3333/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email.value, password: form.password.value}),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if(response.status === 200){
        setLoginStatus(`${data.user.email}, Ви успішно увійшли до адмінпанелі`);
          if(data.user.email===blockCaptions.actualUser){
            setCorrectUser(data.user);
            router.push("/dashboard", { email: form.email.value });           
        }return
      }
      if((response.status === 400)){
        setLoginStatus("Електронна адреса або пароль невірні.");
      }
      else if(response.status === 401){
        setLoginStatus("Електронна адреса або пароль невірні.");
      }
    }
    catch(e){
      console.log(e);
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
                    className={(form.email.emailVisited && form.email.emailError) ? styles.errorBorder: styles.ordinaryBorder}
                    aria-label='email'
                    id='email'
                    name = 'email'
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
            <label htmlFor = 'password'>
                {blockCaptions.passwordLabel}
                <input
                    className={(form.password.passwordVisited && form.password.passwordError) ? styles.errorBorder : styles.ordinaryBorder}
                    type= {isPasswordVisible ? 'text' : 'password'} 
                    aria-label='password'
                    id='password'
                    name='password'
                    placeholder={blockCaptions.passwordPlaceholder}
                    value={password} 
                    onChange={(e) => passwordHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                <HideShow className={styles.icon} onClick={()=>setIsPasswordVisible(!isPasswordVisible)} />   
            </label>
            {(form.password.passwordVisited && form.password.passwordError) && <p className={styles.error}>{form.password.passwordError}</p>} 
        </div>
        
        {(loginStatus && isFormValid) && <p className={correctUser ? styles.success : styles.error}>{loginStatus}</p>}

        <button className={styles.buttonReset} onClick={() => router.push("/restore")}>{blockCaptions.resetButton}</button>
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
