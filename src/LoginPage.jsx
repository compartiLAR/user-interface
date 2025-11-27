import React, { useState } from 'react';
import './LoginPage.css'; //css desta pagina
import { auth,db } from './firebaseConfig.js'; 
import { setDoc,doc,getDoc } from 'firebase/firestore';
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
        const user = userCredential.user;

        //pega a referência para o documento do usuário
        const docUsuario = doc(db,"usuarios", user.uid);
        //carrega ela na variável doc
        const docUser = await getDoc(docUsuario);
        //se ele não tem dados salvo (primeira vez logando), cria os dados e o documento do usuário
        if(!docUser.exists()){
          try{
              //funcao para adicionar as informacoes do usuario
              //só estou criando o usuário na base de dados depois de ele logar pela primeira vez,
              //assim ele precisa autenticar seu email antes de entrar no sistema
              await setDoc(docUsuario,{
                  username:user.displayName||"Usuário",
                  email:user.email,
                  dataCadastro:new Date()
              });
            }catch(err){
              console.error("erro ao criar perfil",err);
            }
        }
        
        alert("Logado com sucesso");
        navigate("/homePage");
      }else{

        setError("Seu email não foi verificado ainda. por favor verifique seu email");
        await signOut(auth);

      }
    }catch(err){
        if(err.code == 'auth/invalid-credential'){
          setError("Credenciais incorretas, Tente novamente");
        }else{
          setError("Ocorreu um erro, tente novamente mais tarde");
          console.log(err);
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