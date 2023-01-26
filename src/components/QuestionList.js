import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function questionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((e) => {
          if (e.id === updatedQuestion.id) return updatedQuestion;
          return e;
        });
        setQuestions(updatedQuestions);
      });
  }

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((e) => e.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((e) => (
    <QuestionItem
      key={e.id}
      question={e}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default questionList;
