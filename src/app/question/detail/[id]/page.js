"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]); // 빈 배열로 초기화
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

        // 데이터 유효성 검사 후 상태 설정
        setQuestion(questionData?.data || null);
        setAnswers(answersData?.data || []);
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

  const containerStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
  };

  const cardStyle = {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const answerCardStyle = {
    ...cardStyle,
    backgroundColor: "#e9ecef", // 더 진한 색으로 조정
  };

  const cardFooterStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#999",
    marginTop: "10px",
  };

  const noAnswersTextStyle = {
    textAlign: "center",
    color: "#666",
  };

  const answerHeaderStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd", // 얇은 가로선
    paddingBottom: "5px",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      {/* 질문 카드 */}
      <div style={cardStyle}>
        <p style={{ marginBottom: "10px" }}>
          {question.content || "내용 없음"}
        </p>
        <div style={cardFooterStyle}>
          <span>작성자: {question.author || "Unknown"}</span>
          <span>
            {question.createDate
              ? new Date(question.createDate).toLocaleString()
              : "Invalid Date"}
          </span>
        </div>
      </div>

      {/* 답변 목록 헤더 */}
      <div style={answerHeaderStyle}>
        {answers.length > 0
          ? `${answers.length}개의 답변이 있습니다`
          : "답변이 없습니다"}
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
        <p style={noAnswersTextStyle}>아직 답변이 없습니다.</p>
      )}
    </div>
  );
}
