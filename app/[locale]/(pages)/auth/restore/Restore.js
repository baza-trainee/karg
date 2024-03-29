'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Logo } from '@/public/assets/icons';
import styles from './styles/restore.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
import EmailStatusMessage from "./EmailStatusMessage/EmailStatusMessage"

export const sendEmailForm = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/api/sendEmail", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    });
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


export default function Restore() {
  const router = useRouter();
  const blockTitles = {
    'pageTitle': 'Зміна паролю',
    'pageSubtitle': 'Введіть електронну пошту, повязану з вашим обліковим записом,і ми надішлемо лист з посиланням для зміни пароля',
    'emailPlaceholder': 'Введіть електронну пошту',
    'addressLabel': 'Email address',
    'sendNewEmail': 'Надіслати',
    'goToLogin': 'Повернутися до входу',
    'emailErrorMessage': 'Ви ввели невідповідну електронну адресу.',
    'emptyFieldErrorMessage': 'Це поле не може бути пустим',
  }
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    setIsFormValid(email && !emailError);
  }, [email, emailError, emailDirty]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const blurHandler = (e) => {
    if (e.target.name === 'email') {
      setEmailDirty(true);
      validateEmail(e.target.value);
    }
  }

  const validateEmail = (value) => {
    const re = /^(?![_.-])[a-zA-Z0-9]+([.-](?![.-])[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+)*?@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/;
    if (!value) {
      setEmailError(blockTitles.emptyFieldErrorMessage);
    }
    else if (!re.test(value.toLowerCase())) {
      setEmailError(blockTitles.emailErrorMessage);
    } else {
      setEmailError('');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const emailObj = { 'email': email }
      try {
        const response = await sendEmailForm(emailObj);
        if (response.success) {
          setEmailStatus('success');
        } else {
          setEmailStatus('failure');
        }
      } catch (error) {
        setEmailStatus('failure');
        console.error('Processing error:', error);
      } finally {
        setEmailSent(true);
      }
    }
  }

  const handleReturnToRestore = () => {
    setEmailSent(false);
  }

  return (
    <>
      {(!emailSent) ? (
        <div className={styles.container}>
          <Link href="/"><Logo className={styles.logo} /></Link>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <div className={styles.email}>
                <p className={`${styles.title} ${variables.font24w700}`}>{blockTitles.pageTitle}</p>
                <p className={`${styles.subtitle} ${variables.font16w300}`}>{blockTitles.pageSubtitle}</p>
              </div>
              <label htmlFor='email' className={variables.font20w400}>{blockTitles.addressLabel}
                <input
                  className={`${(emailDirty && emailError) ? styles.errorBorder : styles.ordinaryBorder} ${variables.font18w500}`}
                  aria-label='email'
                  name='email'
                  id='email'
                  type='email'
                  value={email}
                  placeholder={blockTitles.emailPlaceholder}
                  onChange={(e) => emailHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                />
                {(emailDirty && emailError) && <p className={`${styles.error} ${variables.font14w400}`}>{emailError}</p>}
              </label>
              <button
                className={`${!isFormValid ? styles.buttonSendDesabled : styles.buttonSend} ${variables.font20w700}`}
                type='submit'
                disabled={!isFormValid}
              >{blockTitles.sendNewEmail}
              </button>
              <button
                className={`${styles.goToLogin} ${variables.font20w700}`}
                onClick={() => router.push('/auth/login')}
              >{blockTitles.goToLogin}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <EmailStatusMessage emailStatus={emailStatus} handleResend={handleSubmit} handleReturnToRestore={handleReturnToRestore} />
      )}
    </>
  );
}

