import React from 'react';
import { useRouter } from "next/navigation";
import { Logo, HideShow, EyeSlashFill } from '@/public/assets/icons';
import Link from 'next/link';
import styles from './styles/login.module.scss';
import variables from "@/app/[locale]/variables.module.scss";

export default function LoginForm({
    blockCaptions,
    email,
    emailVisited,
    emailError,
    handleEmailChange,
    password,
    onEmailBlur,
    onPasswordBlur,
    handlePasswordChange,
    passwordVisited,
    passwordError,
    isPasswordVisible,
    onTogglePasswordVisibility,
    loginStatus,
    isFormValid,
    handleSubmit
}) {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Link href="/"><Logo className={styles.logo} /></Link>
            <form onSubmit={handleSubmit}>
                <div className={styles.form}>
                    <div className={styles.email}>
                        <label htmlFor='email'>
                            {blockCaptions.emailLabel}
                        </label>
                        <input
                            className={(emailVisited && emailError) ? styles.errorBorder : styles.ordinaryBorder}
                            aria-label='email'
                            id='email'
                            name='email'
                            type='email'
                            value={email}
                            maxLength='254'
                            placeholder={blockCaptions.emailPlaceholder}
                            onChange={(e) => handleEmailChange(e)}
                            onBlur={(e) => onEmailBlur(e)}
                        />
                        {(emailVisited && emailError) && <p className={styles.error}>{emailError}</p>}
                    </div>

                    <div className={styles.password}>
                        <label htmlFor='password'>
                            {blockCaptions.passwordLabel}
                            <input
                                className={(passwordVisited && passwordError) ? styles.errorBorder : styles.ordinaryBorder}
                                type={isPasswordVisible ? 'text' : 'password'}
                                aria-label='password'
                                id='password'
                                name='password'
                                placeholder={blockCaptions.passwordPlaceholder}
                                value={password}
                                onChange={(e) => handlePasswordChange(e)}
                                onBlur={(e) => onPasswordBlur(e)}
                                autoComplete="new-password" 
                            />
                            {isPasswordVisible ? (
                                <HideShow className={styles.icon} onClick={onTogglePasswordVisibility} />
                            ) : (
                                <EyeSlashFill className={styles.icon} onClick={onTogglePasswordVisibility} />)}

                        </label>
                        {(passwordVisited && passwordError) && <p className={`${styles.error} ${variables.font14w400}`}>{passwordError}</p>}
                    </div>

                    {(loginStatus && isFormValid) && <p className={emailError || passwordError ? styles.success : `${styles.authError} ${variables.font20w400}`}>{loginStatus}</p>}
                    <div className={styles.buttonResetContainer}>
                        <button
                            type="button"
                            className={styles.buttonReset}
                            onClick={() => router.push("/auth/restore")}>{blockCaptions.forgotButton}
                        </button>
                    </div>
                    <button
                        type='submit'
                        className={!isFormValid ? styles.buttonLoginDisabled : styles.buttonLogin}
                        disabled={!isFormValid}
                    >{blockCaptions.loginButton}
                    </button>
                </div>
            </form>
        </div>
    )
}
