"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function QuestionCreatePage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST 요청으로 질문 등록
      const response = await fetch(`${process.env.BACKEND_BASE_URL}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      if (response.ok) {
        // 질문 등록 성공 후 question/list 페이지로 이동 및 새로고침
        router.replace("/question/list");
      } else {
        console.error("질문 등록 실패:", response.status);
      }
    } catch (error) {
      console.error("질문 등록 중 오류 발생:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        질문 등록
      </h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          제목:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            rows="5"
            required
          />
        </label>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        등록하기
      </button>
    </form>
  );
}
