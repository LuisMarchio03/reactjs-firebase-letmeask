import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoImgDarkMode from '../assets/images/logo-dark-mode.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/pages/auth.scss';

export function Home() {
  const history = useHistory();

  const { signInWithGoogle, user } = useAuth();
  const { theme } = useTheme();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if(!user) { // caso não esteja logado, devera se logar
      await signInWithGoogle()
    }
    //Caso contrario, é só redirecionar o usuario.
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = database.ref(`rooms/${roomCode}`).get();

    if (!(await roomRef).exists()) {
      alert('Room does not exists');
      return;
    }

    if((await roomRef).val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A  ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          {theme === 'light' ? (
            <img src={logoImg} alt="Letmeask" />
          ) : (
            <img src={logoImgDarkMode} alt="Letmeask" />
          )}
          
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o codigo da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}