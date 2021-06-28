import { FormEvent, useState } from 'react'
import { Link, useHistory }  from 'react-router-dom';
import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoImgDarkMode from '../assets/images/logo-dark-mode.svg';

import { Button } from '../components/Button';

import '../styles/pages/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const [newRoom, setNewRoom] = useState('');

  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}