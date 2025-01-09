import axios from 'axios';

const BASE_URL = process.env.BACKEND_BASE_URL;

export async function getQuestions(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/questions`, {
      params: { page }, // page 파라미터 추가
    });
    return response.data; // 전체 응답 데이터
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return null;
  }
}

export async function getAnswers(questionId) {
  try {
    const response = await axios.get(`${BASE_URL}/answers`, {
      params: { questionId }, // 질문 ID 추가
    });
    return response.data; // 전체 응답 데이터 반환
  } catch (error) {
    console.error("Failed to fetch answers:", error);
    return null;
  }
}
