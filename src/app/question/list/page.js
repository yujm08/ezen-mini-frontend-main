"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 페이지를 0부터 시작
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  // 질문 데이터 가져오기 함수
  const fetchQuestions = async (page) => {
    try {
      const response = await fetch(`${process.env.BACKEND_BASE_URL}/questions?page=${page}`, {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await response.json();

      console.log("Fetched data content:", data.data.content);

      if (data && data.data) {
        setQuestions(data.data.content);
        setTotalPages(data.data.totalPages);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("질문 데이터를 가져오는 중 오류 발생:", error);
      setQuestions([]);
    }
  };

  useEffect(() => {
    fetchQuestions(currentPage); // 페이지 로드 시 데이터 가져오기
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 번호 변경
  };

  const handleQuestionClick = (id) => {
    router.push(`/question/detail/${id}`);
  };

  const handleCreateQuestion = () => {
    router.push("/question/create");
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(currentPage, 0);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

    if (startPage > 0) {
      buttons.push(
        <button
          key={0}
          onClick={() => handlePageChange(0)}
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ddd",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          1
        </button>
      );
      buttons.push(
        <span
          key="start-ellipsis"
          style={{ padding: "5px", margin: "0 5px", color: "#666" }}
        >
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            backgroundColor: i === currentPage ? "#000" : "#fff",
            color: i === currentPage ? "#fff" : "#000",
            border: "1px solid #ddd",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {i + 1} {/* 1 기반으로 보여줌 */}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      buttons.push(
        <span
          key="end-ellipsis"
          style={{ padding: "5px", margin: "0 5px", color: "#666" }}
        >
          ...
        </span>
      );
      buttons.push(
        <button
          key={totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #ddd",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Question List</h1>
        <button
          onClick={handleCreateQuestion}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          질문 등록
        </button>
      </div>

      <ul style={{ textAlign: "left", listStyle: "none", padding: 0 }}>
        {questions.map((question) => (
          <li
            key={question.id}
            style={{
              marginBottom: "10px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              position: "relative",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
            }}
            onClick={() => handleQuestionClick(question.id)}
          >
            <h3 style={{ marginBottom: "5px", display: "flex", alignItems: "center", fontSize: "18px" }}>
              {question.subject}
            </h3>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          style={{
            padding: "5px 10px",
            marginRight: "5px",
            backgroundColor: currentPage === 0 ? "#ddd" : "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
          }}
        >
          이전
        </button>
        {renderPageButtons()}
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          style={{
            padding: "5px 10px",
            marginLeft: "5px",
            backgroundColor: currentPage === totalPages - 1 ? "#ddd" : "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
