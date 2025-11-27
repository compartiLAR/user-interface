import React, { useState } from 'react';
import './LoginPage.css'; //css desta pagina
import { auth } from './firebaseConfig.js'; 
import { signInWithEmailAndPassword,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function VerificationCode() {
  const navigate = useNavigate();
  //Parte visual do site 
  return (
    <div className='login-container'>
        <p>Um email de verificação foi enviado. Para prosseguir clique no link enviado antes de fazer login</p>
    </div>
  );
}

export default VerificationCode;