import React, { useState } from 'react';
import './LoginPage.css'; //css desta pagina
import { auth } from './firebaseConfig.js'; 
import { signInWithEmailAndPassword,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleNavigate = (event) =>{
    navigate("/SignUpPage")
  }

  //função que enviará os dados para o Firebase
  const enviaDados = async(event) => {
    setError('');
    // Impede o formulário de recarregar a página
    event.preventDefault(); 
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if(userCredential.user.emailVerified){
        alert("Logado com sucesso")
        navigate("/homePage")
      }else{

        setError("Seu email não foi verificado ainda. por favor verifique seu email");
        await signOut(auth);

      }
    }catch(err){
        if(err.code == 'auth/invalid-credential'){
          setError("Credenciais incorretas, Tente novamente");
        }else{
          setError("Ocorreu um erro, tente novamente mais tarde");
        }
    }
  };


  //Parte visual do site 
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={enviaDados}>
        <h2>Login</h2>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            value={password} // O valor do campo é controlado pelo "estado"
            onChange={(e) => setPassword(e.target.value)} // Quando digitar, atualiza o "estado"
            required 
          />
        </div>
        {error && <p className='erroTxt'>{error}</p>}
        
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;