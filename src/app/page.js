'use client';

import './styles.css'; // CSS 파일 가져오기

export default function HomePage() {
  return (
    <div className="container">
      {/* 왼쪽: 텍스트 및 버튼 */}
      <div className="left-panel">
        <a href="/question/list" className="button">
          게시판
        </a>
        <h1 className="heading">Welcome to My Board! It's made by JM</h1>
        <div className="typing">I'll show you my board!</div>
      </div>

      {/* 오른쪽: 배경 이미지 */}
      <div className="right-panel">
        <img
          src="images/winter-town.webp"
          alt="Background"
          className="background-image"
        />
      </div>
    </div>
  );
}

