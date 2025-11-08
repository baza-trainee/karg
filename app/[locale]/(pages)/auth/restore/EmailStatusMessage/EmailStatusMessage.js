'use client';

import { Logo } from '@/public/assets/icons';
import Link from 'next/link';
import variables from "@/app/[locale]/variables.module.scss";
import styles from './styles/emailStatusMessage.module.scss';

function EmailStatusMessage({ emailStatus, handleResend, handleReturnToRestore }) {
    const titlesSuccess = {
        title: 'Перевірте пошту',
        text: 'Перевірте свою електронну пошту для інструкцій з відновлення пароля. Якщо лист не надійшов, перевірте папку спам',
        buttonText: 'Надіслати повторно'
    }
    const titlesError = {
        title: 'Лист не надіслано',
        text: 'З технічних причин лист не було надіслано. Будь ласка, спробуйте здійснити скидання паролю ще раз. Дякуємо за ваше розуміння та терпіння.',
        buttonText: 'Спробувати ще раз'
    }

    let titles;
    if (emailStatus === 'success') {
        titles = titlesSuccess;
    } else {
        titles = titlesError;
    }

    return (
        <div className={styles.container}>
            <Link href="/"><Logo className={styles.logo} /></Link>
            <div className={styles.desk}>
                <div className={`${styles.title} ${variables.font32w700}`}>{titles.title}</div>
                <div className={`${styles.text} ${variables.font24w400}`}>{titles.text}</div>
                <button
                    className={`${styles.button} ${variables.font20w700}`}
                    onClick={emailStatus === 'success' ? handleResend : handleReturnToRestore}
                >{titles.buttonText}</button>
            </div>
        </div >
    );
}

export default EmailStatusMessage;