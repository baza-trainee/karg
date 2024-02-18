'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { login } from '../../utils/login';
import  Form  from './Form';

export default function LoginPage() {
  
  const actualUser = 'kargthebest2024@gmail.com';

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Введіть логін, будь ласка');
  const [passwordError, setPasswordError] = useState('Введіть пароль, будь ласка');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [loginStatus, setLoginStatus] = useState('');
  const [correctUser, setCorrectUser] = useState('');

  useEffect(() => {
    if(emailError || passwordError || email == ''|| password == '' ){
      setIsFormValid(false);
    }else {
      setIsFormValid(true);
    }
  }, [emailError, passwordError])


  const emailHandler = (e) => {
    setLoginStatus('');
    setEmail(e.target.value);
    const re=/^\S+@\S+\.\S+$/;
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
    setLoginStatus('');
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

  const handleSubmit = async () => {
    try{
      const response = await login('http://localhost:3333/api/auth/login',{email, password});
      const data = await response.json();

      if(response.status === 200){
        setLoginStatus(`${data.user.email}, Ви успішно увійшли до адмінпанелі`);
          if(data.user.email===actualUser){
            setCorrectUser(data.user);
            router.push("/dashboard");          
        }return
      }
      if((response.status === 400) && (data.message ==='User not found')){
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

    <Form 
        email={email}
        emailDirty = {emailDirty} 
        emailError = {emailError}
        emailHandler = {emailHandler}
        password = {password}
        blurHandler = {blurHandler}
        passwordHandler = {passwordHandler}
        passwordDirty = {passwordDirty}
        passwordError = {passwordError}
        setIsPasswordVisible = {setIsPasswordVisible}
        isPasswordVisible = {isPasswordVisible}
        loginStatus = {loginStatus}
        isFormValid = {isFormValid}
        resetButton = "Забули пароль"
        handleSubmit = {handleSubmit}
    />
  )
}
