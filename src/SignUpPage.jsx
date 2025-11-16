import React, { useState } from 'react';
import './signUpPage.css';
//usados para autenticacao
import { auth,db } from './firebaseConfig';
import { createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
//usados para inserir os dados no Firestore
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignUpPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error,setError] = useState('');

    const navigate = useNavigate();

  const handleNavigate = (event) =>{
    navigate("/")
  }

    //funcao que cadastra o usuario no firebase
    const cadastra = async (event)=>{
        setError('');
        event.preventDefault();
        try{
            //cria o autenticador do usuario no auth
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            //a colecao em que o usuario vai ser colocado
            const colecaoUsuarios = doc(db,"usuarios", user.uid)
            //funcao para adicionar as informacoes do usuario
            await setDoc(colecaoUsuarios,{
                username:username,
                email:user.email,
                password:password,
                dataCadastro:new Date()
            });

            await sendEmailVerification(user);
        }catch (err){

            if(err.code == "auth/email-already-in-use"){
                setError("Email ja esta em uso");
            }
            else if(err.code == "auth/weak-password"){
                setError("A senha deve conter pelo menos 6 caracteres");
            }else
            if(err.code == "auth/invalid-email"){
                setError("Email inválido");
            }else{
                setError("Ocorreu um erro, tente novamente mais tarde");
            }
        }

    }

    return (
        <div className='signup-container'>
            <form className="signup-form" onSubmit={cadastra}>
                <h2>Cadastro</h2>
                
                
                {error && <p className="erro-txt">{error}</p>}
                
                <div className="input-group">
                <label htmlFor="text">Nome</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
                </div>
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
                {/* ... (o resto do seu input de senha) ... */}
                <label htmlFor="password">Senha</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                </div>
                
                <button type="submit" className="signup-button">Entrar</button>
                <button type="button" onClick={handleNavigate}></button>
            </form>
    </div>
    )
}

export default SignUpPage