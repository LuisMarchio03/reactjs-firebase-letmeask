import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string |  undefined;
}

export function useRoom(roomID: string) {
  const history = useHistory()
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomID}`);
    roomRef.on('value', room => {
      const databaseRoom = room.val();

      if(databaseRoom?.endedAt) {

        history.push("/");

        return () => {
          roomRef.off("value");
        };
      }

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=> {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, likes]) => likes.authorId === user?.id)?.[0],
        }
      });

      const orderQuestionsByLikeCount = parsedQuestions.sort((roomA, roomB) =>
        roomA.likeCount < roomB.likeCount ? 1 : roomA.likeCount > roomB.likeCount ? -1 : 0
      );

      const orderQuestionByNotAnswer = orderQuestionsByLikeCount.sort((roomA, roomB) => 
        roomA.isAnswered > roomB.isAnswered ? 1 : roomA.isAnswered < roomB.isAnswered ? -1 : 0
      );

      setTitle(databaseRoom.title);
      setQuestions(orderQuestionByNotAnswer);
    })

    return () => {
      roomRef.off('value');
    }
  }, [roomID, user?.id]);

  return { questions, title }

}