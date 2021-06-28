import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';

export function useDelete(roomID: string) {
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date(),
    })
    
    history.push('/');

    setTimeout(async function deletar(){
      await database.ref(`rooms/${roomID}`).remove()
    }, 5000);
  }

  return {handleEndRoom};
}