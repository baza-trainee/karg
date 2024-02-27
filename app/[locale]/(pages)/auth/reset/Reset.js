'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Logo, HideShow, EyeSlashFill } from '@/public/assets/icons';
import styles from './styles/reset.module.scss';


export default function ResetPassword() {

  const blockCaptions = {
    'pageTitle':'Створіть новий пароль',
    'pageSubtitle':'Ваш новий пароль повинен відрізнятися від попереднього пароля, який ви використовували.',
    'passwordPlaceholder':'Введіть пароль',
    'passwordLabel':'Пароль',
    'repeatPasswordLabel':'Повторіть пароль',
    'save':'Зберегти',
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,30}$/;

  const router = useRouter();

  const [form, setForm] = useState({ 
    password: {value: '', passwordError: '', passwordVisited: false, passwordVisible: false},
    repeatPassword:{value: '', repeatPasswordError: '', repeatPasswordVisited: false, passwordVisible: false},
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [loginStatus, setLoginStatus] = useState('');


  useEffect(() => {
    if(form.password.passwordError || form.repeatPassword.repeatPasswordError){
      setIsFormValid(false);
    }else {
      setIsFormValid(true);
    }
  }, [form.password.passwordError, form.repeatPassword.repeatPasswordError])

  const { password } = form.password.value;
  const { repeatPassword } = form.repeatPassword.value;

  const passwordHandler = (e) => {
    setLoginStatus('');
    setForm({ ...form, password: { ...form.password, value: e.target.value}});
  
    if(!e.target.value){
      setForm({ ...form, password: { ...form.password, passwordError: 'Поле для пароля пусте'}});
    }
    else if(passwordRegex.test(e.target.value)){
      setForm({ ...form, password: { ...form.password, value: e.target.value, passwordError: ''}});
    }
    else{
      setForm({ ...form, password: { ...form.password, value: '', passwordError: 'Пароль виключно латиницею повинен мати хоча б одну велику літеру, одну цифру та мати довжину від 6 до 30 символів'}});
    }}

  const blurHandler = (e) => {
    switch(e.target.name){
      case 'password':
          setForm({ ...form, email: { ...form.password, emailVisited: true}});
          break;
      case 'repeatPassword':
          setForm({ ...form, repeatPassword: { ...form.repeatPassword, repeatPasswordVisited: true}});
          break;
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/"><Logo className={styles.logo} /></Link>

      <div className={styles.form}>
        <div className={styles.email}>
          <p className={styles.title}>{blockCaptions.pageTitle}</p>
          <p className={styles.subtitle}>{blockCaptions.pageSubtitle}</p>
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
                <HideShow className={styles.icon} onClick={()=>setIsRepeatPasswordVisible(!isRepeatPasswordVisible)} />   
            </label>
            {(form.password.passwordVisited && form.password.passwordError) && <p className={styles.error}>{form.password.passwordError}</p>} 
        </div>

        <div className={styles.password}>
            <label htmlFor = 'repeatPassword'>
                {blockCaptions.resetPassword}
                <input
                    className={(form.repeatPassword.repeatPasswordVisited && form.repeatPassword.repeatPasswordError) ? styles.errorBorder : styles.ordinaryBorder}
                    type= {isPasswordVisible ? 'text' : 'password'} 
                    aria-label='repeatPassword'
                    id='repeatPassword'
                    name='repeatPassword'
                    placeholder={blockCaptions.passwordPlaceholder}
                    value={repeatPassword} 
                    onChange={(e) => passwordHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                <HideShow className={styles.icon} onClick={()=>setIsRepeatPasswordVisible(!isRepeatPasswordVisible)} />   
            </label>
            {(form.repeatPassword.repeatPasswordVisited && form.repeatPassword.repeatPasswordError) && <p className={styles.error}>{form.repeatPassword.repeatPasswordError}</p>} 
        </div>
        
        <button 
            className={!isFormValid ? styles.buttonSendDesabled : styles.buttonSend}
            disabled={!isFormValid}
            onClick={() => {}} 
        >{blockCaptions.save}
        </button>

      </div>
    </div>
  )
}
