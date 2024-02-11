'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo} from '@/public/assets/icons';
import styles from './styles/restore.module.scss';


export default function Restore() {

  const pageTitle = 'Зміна паролю';
  const pageSubtitle = 'Введіть електронну пошту, повязану з вашим обліковим записом,і ми надішлемо лист з посиланням для зміни пароля';
  const emailPlaceholder = 'Введіть електронну адресу';
  const addressLabel = 'Email address';
  const sendNewEmail = 'Надіслати';


  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('Введіть електронну адрресу, будь ласка');
  const [isFormValid, setIsFormValid] = useState(false); 

  useEffect(() => {
    if(emailError){
      setIsFormValid(false);
    }else {
      setIsFormValid(true);
    }
  }, [emailError])


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
        setEmailError('Введіть електронну адрресу, будь ласка');
  }
};

  const blurHandler = (e) => {
    if(e.target.name === 'email'){
      setEmailDirty(true);
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/"><Logo className={styles.logo} /></Link>

      <div className={styles.form}>
        <div className={styles.email}>
          <p className={styles.title}>{pageTitle}</p>
          <p className={styles.subtitle}>{pageSubtitle}</p>
            <label htmlFor='email'>
                {addressLabel}
                <input
                    className={(emailDirty && emailError) ? styles.errorBorder: styles.ordinaryBorder}
                    aria-label='email'
                    name = 'email'
                    id='email'
                    type='email' 
                    value={email} 
                    placeholder={emailPlaceholder}
                    onChange={(e) => emailHandler(e)}
                    onBlur={(e) => blurHandler(e)} 
                />
          </label>
         {(emailDirty && emailError) && <p className={styles.error}>{emailError}</p>}
        </div>

        <button 
            className={!isFormValid ? styles.buttonSendDesabled : styles.buttonSend}
            disabled={!isFormValid} 
        >{sendNewEmail}
        </button>
      </div>
    </div>
  )
}
