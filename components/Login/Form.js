import React from 'react';
import { useRouter } from "next/navigation";
import { Logo, HideShow } from '@/public/assets/icons';
import Link from 'next/link';
import styles from './styles/login.module.scss';


export default function Form({
    email,
    emailDirty, 
    emailError, 
    emailHandler, 
    password,
    blurHandler, 
    passwordHandler, 
    passwordDirty, 
    passwordError, 
    setIsPasswordVisible, 
    isPasswordVisible,
    loginStatus,
    isFormValid,
    resetButton,
    handleSubmit
}) 

{
    const router = useRouter();

  return (
    <div className={styles.container}>
    <Link href="/"><Logo className={styles.logo} /></Link>

    <div className={styles.form}>
      <div className={styles.email}>
          <label htmlFor='email'>
                Логін
          </label>
              <input
                  className={(emailDirty && emailError) ? styles.errorBorder: styles.ordinaryBorder}
                  aria-label='email'
                  id='email'
                  name = 'email'
                  type='email' 
                  value={email} 
                  placeholder='Введіть електронну адресу'
                  onChange={(e) => emailHandler(e)}
                  onBlur={(e) => blurHandler(e)} 
              />
       {(emailDirty && emailError) && <p className={styles.error}>{emailError}</p>}
      </div>
      
      <div className={styles.password}>
          <label htmlFor = 'password'>
                Пароль
          </label>
              <input
                  className={(passwordDirty && passwordError) ? styles.errorBorder : styles.ordinaryBorder}
                  type= {isPasswordVisible ? 'text' : 'password'} 
                  aria-label='password'
                  id='password'
                  name='password'
                  placeholder="Введіть пароль"
                  value={password} 
                  onChange={(e) => passwordHandler(e)}
                  onBlur={(e) => blurHandler(e)}
              />
              <HideShow className={(passwordDirty && passwordError) ? styles.icon_error : styles.icon} onClick={()=>setIsPasswordVisible(!isPasswordVisible)} />   
          {(passwordDirty && passwordError) && <p className={styles.error}>{passwordError}</p>} 
      </div>
      
      {(loginStatus && isFormValid) && <p className={correctUser ? styles.success : styles.error}>{loginStatus}</p>}

      <button className={styles.buttonReset} onClick={() => router.push("/restore")}>{resetButton}</button>
      <button 
          className={!isFormValid ? styles.buttonLoginDesabled : styles.buttonLogin}
          disabled={!isFormValid} 
          onClick={handleSubmit}
      >Увійти
      </button>
    </div>
  </div>
  )
}
