import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../hooks/useRoom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import { Question } from '../components/Question';

import '../styles/room.scss'; 

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory()
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  
  const roomID = params.id;
  
  const { title, questions } = useRoom(roomID)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date(),
    })
    
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
    }
  }
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomID} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>
        
       <div className="question-list">
        {questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
       </div>
      </main>
    </div>
  )
}