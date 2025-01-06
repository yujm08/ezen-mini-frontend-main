import axios from 'axios';

const BASE_URL = process.env.BACKEND_BASE_URL;

export async function getQuestions(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/questions`, {
      params: { page }, // page 파라미터 추가
    });
    return response.data; // 전체 응답 데이터
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return null;
  }
}
