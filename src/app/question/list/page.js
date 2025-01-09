'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter 훅 가져오기
import { getQuestions } from '../../../lib/api'; // lib/api.js에서 getQuestions 함수 가져옴

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter(); // useRouter 훅 초기화

  useEffect(() => {
    async function fetchData() {
      const response = await getQuestions(currentPage); // 현재 페이지 번호 전달
      if (response && response.data) {
        setQuestions(response.data.content); // 질문 데이터 설정
        setTotalPages(response.data.totalPages); // 총 페이지 수
      } else {
        setQuestions([]);
      }
    }

    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleQuestionClick = (id) => {
    router.push(`/question/detail/${id}`); // 상세 페이지로 이동
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Question List</h1>
      <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
        {questions.map((question) => (
          <li
            key={question.id}
            style={{
              marginBottom: '10px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              position: 'relative',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
            }}
            onClick={() => handleQuestionClick(question.id)}
          >
            <h3 style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
              {question.subject}
              {question.answers && question.answers.length > 0 && (
                <span
                  style={{
                    marginLeft: '8px',
                    backgroundColor: '#ff5f5f',
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: '12px',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {question.answers.length}
                </span>
              )}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              작성자: {question.author || 'Unknown'}
            </p>
            <p
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontSize: '12px',
                color: '#999',
              }}
            >
              {new Date(question.createDate).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '5px 10px',
            marginRight: '5px',
            backgroundColor: currentPage === 1 ? '#ddd' : '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          이전
        </button>
        {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
          const pageNumber = currentPage - 1 + index;
          if (pageNumber < 1 || pageNumber > totalPages) return null;
          return (
            <button
              key={`page-${pageNumber}`}
              onClick={() => handlePageChange(pageNumber)}
              style={{
                padding: '5px 10px',
                margin: '0 5px',
                backgroundColor: pageNumber === currentPage ? '#000' : '#fff',
                color: pageNumber === currentPage ? '#fff' : '#000',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: '5px 10px',
            marginLeft: '5px',
            backgroundColor: currentPage === totalPages ? '#ddd' : '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
