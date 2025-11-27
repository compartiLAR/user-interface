// /src/App.js
import React,{useEffect, useState} from 'react';
import LoginPage from './LoginPage.jsx'; // Importa a pagina de login
import SignUpPage from './SignUpPage.jsx'; // Importa a pagina de cadastro
import VerificationCode from './VerificationCode.jsx'; // Importa a pagina do codigo de verificacao
import HomePage from './homePage.jsx'; //Importa a homePage
import { Route,Routes } from 'react-router-dom';
import Nav from './header.jsx';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      setIsLoading(false); 
    });
    return () => unsubscribe();
  }, []);
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/SignUpPage" element={<SignUpPage/>}/>
        <Route path="/VerificationCode" element={<VerificationCode/>}/>
        <Route path="/HomePage" element={<HomePage user ={user}/>}/>
      </Routes>
      {/*<footer/>*/}

    </div>
    
    
  );
}

export default App; 