"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 질문 데이터 가져오기
        const questionResponse = await fetch(
          `${process.env.BACKEND_BASE_URL}/questions/${id}`
        );
        const questionData = await questionResponse.json();

        // 답변 데이터 가져오기
        const answersResponse = await fetch(
          `${process.env.BACKEND_BASE_URL}/answers?questionId=${id}`
        );
        const answersData = await answersResponse.json();

        console.log("Question Data:", questionData);
        console.log("Answers Data:", answersData);

        // 데이터를 상태에 저장
        setQuestion(questionData.data); // 응답의 data 필드 사용
        setAnswers(answersData.data);   // 응답의 data 필드 사용
      } catch (error) {
        console.error("데이터를 가져오는 도중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>로딩 중...</p>;
  }

  if (!question) {
    return <p style={{ textAlign: "center" }}>질문을 가져올 수 없습니다.</p>;
  }

  const cardStyle = {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
  };

  const answerCardStyle = {
    ...cardStyle,
    backgroundColor: "#f1f1f1",
  };

  const cardFooterStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#999",
    marginTop: "10px",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* 질문 카드 */}
      <div style={cardStyle}>
        <p style={{ marginBottom: "10px" }}>{question.content || "내용 없음"}</p>
        <div style={cardFooterStyle}>
          <span>작성자: {question.author || "Unknown"}</span>
          <span>
            {question.createDate
              ? new Date(question.createDate).toLocaleString()
              : "Invalid Date"}
          </span>
        </div>
      </div>

      {/* 답변 카드 */}
      {answers.length > 0 ? (
        answers.map((answer) => (
          <div key={answer.id} style={answerCardStyle}>
            <p style={{ marginBottom: "10px" }}>{answer.content}</p>
            <div style={cardFooterStyle}>
              <span>작성자: {answer.author || "Unknown"}</span>
              <span>
                {answer.createDate
                  ? new Date(answer.createDate).toLocaleString()
                  : "Invalid Date"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          아직 답변이 없습니다.
        </p>
      )}
    </div>
  );
}
