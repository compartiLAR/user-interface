import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig.js'; 
import { signOut } from 'firebase/auth'; 
import './header.css';
import logo from './assets/CompartiLARLOGO.png';

function Nav({user}){
    const navigate = useNavigate();
    
    const handleLogout = async(event)=>{
        
        try{
            await signOut(auth);
            navigate("/");
        }catch(error){
            console.error("An error ocurred while logging out");
        }
    }

    return(
    <header className="main-header">
      <div className="logo-container">
         <img src={logo} alt="Logo do App" className="logo-img" />
        <Link to={user ? "/HomePage" : "/"} className="logo-text">
          MeuSite
        </Link> 
      </div>{/*A logo do site, quando clica nela, se estiver logado leva para a pagina de usuario*/}

      <nav className="main-nav">
        {
          // Se (usuário está logado) deixa o botao de logout (sair)
          user ? (
            <>
              <Link to="/HomePage" className="nav-link">Minha Página</Link>
              <Link to="/sobre-nos" className="nav-link">Sobre Nós</Link>
              {/* Botão de Sair não é um 'Link', é um 'button' */}
              <button onClick={handleLogout} className="nav-button-logout">
                Sair
              </button>
            </>
          ) : (
            <>
              {/* Links de QUEM ESTÁ DESLOGADO */}
              <Link to="/sobre-nos" className="nav-link">Sobre Nós</Link>
              <Link to="/SignUpPage" className="nav-link">Cadastre-se</Link>
              <Link to="/" className="nav-link-primary">
                Login
              </Link>
            </>
          )//senão deixa o botão de login no lugar
        }
      </nav>
    </header>
  );
}
export default Nav