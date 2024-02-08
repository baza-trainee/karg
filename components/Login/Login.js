'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Logo, HideShow } from '@/public/assets/icons';
import styles from './styles/login.module.scss';


export default function LoginPage() {

  const emailLabel = 'Логін';
  const emailPlaceholder = 'Введіть електронну адресу';
  const passwordLabel = 'Пароль';
  const passwordPlaceholder = 'Введіть пароль';
  const loginButton = 'Увійти';
  const resetButton = 'Забули пароль?';

  const experementalUser = 'Sincere@april.biz';

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Введіть логін, будь ласка');
  const [passwordError, setPasswordError] = useState('Введіть пароль, будь ласка');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [authError, setAuthError] = useState('');
  const [correctUser, setCorrectUser] = useState('');

  useEffect(() => {
    if(emailError || passwordError || email == ''|| password == '' ){
      setIsFormValid(false);
    }else {
      setIsFormValid(true);
    }
  }, [emailError, passwordError])


  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re=/^\S+@\S+\.\S+$/;
    //const re =/^[A-Za-z0-9]*([A-Za-z][0-9]|[0-9][A-Za-z])[A-Za-z0-9]*$/i;
    if(!re.test(String(e.target.value).toLowerCase())){
       setEmailError('Надана Вами електронна адреса має неправильний формат.');
    }else {
        setEmail(e.target.value);
        setEmailError('');
    }
    if(!e.target.value){
        setEmailError('Введіть логін, будь ласка');
  }
};

  
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if(e.target.value.length < 6 ){
        setPasswordError('Довжина пароля має бути від 6 до 30 символів');
          if(!e.target.value){
            setPasswordError('Введіть пароль, будь ласка');
          }
    }
    else if(e.target.value.length > 30){
      setPasswordError('Довжина пароля має бути від 6 до 30 символів');
      setPassword('');
    }
    else {
      setPassword(e.target.value);
      setPasswordError('');
    }
  }

  const blurHandler = (e) => {
    switch(e.target.name){
      case 'email':
          setEmailDirty(true);
          break;
      case 'password':
          setPasswordDirty(true);
          break;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await fetch("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      //видалити, коли буде потрібний endpoint
      const response = await fetch ('https://jsonplaceholder.typicode.com/users/1',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
      }) 
      const user = await response.json();
      console.log('receiving data', user);
      if (response.status === 200) {
        if(user.email === experementalUser){
            setCorrectUser(user.email);
            router.push("/dashboard");
        }
      } 
      else if(response.status === 401){
        setAuthError("Електронна адреса або пароль невірні.");
      }
    } catch (error) {
      setAuthError("Електронна адреса або пароль невірні.");
    }
  }; 

  return (
    <div className={styles.container}>
      <Link href="/"><Logo className={styles.logo} /></Link>

      <form className={styles.form}>
        <div className={styles.email}>
            <label htmlFor='email'>
                {emailLabel}
                <input
                    className={(emailDirty && emailError) ? styles.errorBorder: styles.ordinaryBorder}
                    aria-label='email'
                    name = 'email'
                    type='email' 
                    value={email} 
                    placeholder={emailPlaceholder}
                    onChange={(e) => emailHandler(e)}
                    onBlur={(e) => blurHandler(e)} 
                />
          </label>
         {(emailDirty && emailError) && <p className={styles.error}>{emailError}</p>}
        </div>
        
        <div className={styles.password}>
            <label htmlFor = 'password'>
                {passwordLabel}
                <input
                    className={(passwordDirty && passwordError) ? styles.errorBorder : styles.ordinaryBorder}
                    type= {isPasswordVisible ? 'text' : 'password'} 
                    aria-label='password'
                    name='password'
                    placeholder={passwordPlaceholder}
                    value={password} 
                    onChange={(e) => passwordHandler(e)}
                    onBlur={(e) => blurHandler(e)}
                />
                <HideShow className={styles.icon} onClick={()=>setIsPasswordVisible(!isPasswordVisible)} />   
            </label>
            {(passwordDirty && passwordError) && <p className={styles.error}>{passwordError}</p>} 
        </div>

        <button className={styles.buttonReset} onClick={() => router.push("/restore")}>{resetButton}</button>
        <button 
            className={!isFormValid ? styles.buttonLoginDesabled : styles.buttonLogin}
            disabled={!isFormValid} 
            onClick={handleSubmit}
        >{loginButton}
        </button>
      </form>
    </div>
  )
}
