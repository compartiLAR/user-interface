import React, { useState, useEffect } from 'react';
import './HomePage.css'; 
import { db } from './firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore'; 


function HomePage({ user }) {
  
  
  const [profile, setProfile] = useState(null); //estado que guarda os dados do usuario
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return; // Se não tiver usuário, não faz nada

    const fetchProfile = async () => {
      try {
        //cria a referencia para o documento dos usuarios
        const docRef = doc(db, "usuarios", user.uid);
        
        //Tenta buscar o documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //Se existir puxa os dados
          setProfile(docSnap.data());
        } else {
          //Se não existir da erro
          console.error("Erro: Perfil não encontrado no Firestore!");
          setError("Não conseguimos encontrar seu perfil.");
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError("Ocorreu um erro ao carregar seu perfil.");
      } finally {
        setIsLoading(false); // Termina de carregar (dando erro ou sucesso)
      }
    };

    fetchProfile();
  }, [user]); // Roda de novo se o 'user' (prop) mudar

  //Estado de Carregamento
  if (isLoading) {
    return <div className="loading-container">Carregando seu perfil...</div>;
  }

  // Estado de Erro
  if (error) {
    return <div className="loading-container error">{error}</div>;
  }
  
  //caso carregue com sucesso
  //user salva os dados como email e senha, e profile os demais dados do usuario
  return (
    <div className="profile-page-container">
      
      {/*BARRA LATERAL (SIDEBAR)*/}
      <aside className="profile-sidebar">
        <div className="profile-pic-placeholder">
          {/* Mostra a primeira letra do nome, tipo o Google */}
          <span>{profile.nome ? profile.nome[0] : '?'}</span>
        </div>
        
        <h2 className="profile-name">{profile.username}</h2>
        
        <p className="profile-email">{user.email}</p>

        <nav className="profile-nav">
          <ul>
            <li><a href="#" className="active">Meu Painel</a></li>
            <li><a href="#">Minhas Estatísticas</a></li>
            <li><a href="#">Amigos</a></li>
            <li><a href="#">Configurações</a></li>
          </ul>
        </nav>
      </aside>

      {/*CONTEÚDO PRINCIPAL*/}
      <main className="profile-content">
        <h1>Bem-vindo de volta, {profile.nome}!</h1>
        <p>Aqui está um resumo da sua atividade.</p>

        {/* Grid com "cards" de estatísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Pontuação Total</h3>
            
            <p>{profile.pontuacao}</p>
          </div>

          <div className="stat-card">
            <h3>Jogos Jogados</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Conquistas</h3>
            <p>0 / 50</p>
          </div>
        </div>

        <div className="actions-area">
          <h3>Ações Rápidas</h3>
          <button className="cta-button">Iniciar Novo Jogo</button>
        </div>
      </main>

    </div>
  );
}

export default HomePage;