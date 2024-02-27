'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Logo} from '@/public/assets/icons';
import styles from './styles/restore.module.scss';


export default function Restore() {

  const blockTitles = {
    'pageTitle':'Зміна паролю',
    'pageSubtitle':'Введіть електронну пошту, повязану з вашим обліковим записом,і ми надішлемо лист з посиланням для зміни пароля',
    'emailPlaceholder':'Введіть електронну пошту',
    'addressLabel':'Email address',
    'sendNewEmail':'Надіслати',
    'goToLogin': 'Повернутися до входу'
  }

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('Ви ввели невідповідну електнонну адресу.');
  const [isFormValid, setIsFormValid] = useState(false); 

  const [ resetPassword, setResetPassword ] = useState(false);
  const [ success, setSucceess ] = useState(false);
 
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
       setEmailError('Ви ввели невідповідну електнонну адресу.');
    }else {
        setEmail(e.target.value);
        setEmailError('');
    }
    if(!e.target.value){
        setEmailError('Ви ввели невідповідну електнонну адресу.');
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
          <p className={styles.title}>{blockTitles.pageTitle}</p>
          <p className={styles.subtitle}>{blockTitles.pageSubtitle}</p>
        </div>
        <label htmlFor='email'>{blockTitles.addressLabel}
            <input
                className={(emailDirty && emailError) ? styles.errorBorder: styles.ordinaryBorder}
                aria-label='email'
                name = 'email'
                id='email'
                type='email' 
                value={email} 
                placeholder={blockTitles.emailPlaceholder}
                onChange={(e) => emailHandler(e)}
                onBlur={(e) => blurHandler(e)} 
            />
          {(emailDirty && emailError) && <p className={styles.error}>{emailError}</p>}
         </label>
        
        <div className={!success ? styles.info : ''}>Success! Please, check your email to reset your password</div>
        <button 
            className={!isFormValid ? styles.buttonSendDesabled : styles.buttonSend}
            disabled={!isFormValid}
            onClick={() => router.push('/auth/reset')} 
        >{blockTitles.sendNewEmail}
        </button>
        <button 
            className={styles.goToLogin}
            onClick={() => router.push('/auth/login')} 
        >{blockTitles.goToLogin}
        </button>
      </div>
    </div>
  )
}
