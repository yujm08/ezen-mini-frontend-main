'use client';

import '../components/TypingEffect.css';

export default function HomePage() {
  return (
    <div className="flex h-screen">
      {/* 왼쪽: 게시판 버튼 및 텍스트 */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white space-y-4">
        <a
          href="/question/list"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          게시판
        </a>
        <h1 className="text-black text-xl font-serif">
          Welcome to My Board! It's made by JM
        </h1>

        {/* Typing Effect 추가 */}
        <div className="typing text-lg text-gray-700">
          I'll show you my board!
        </div>
      </div>

      {/* 오른쪽: 배경 이미지 */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/winter-town.webp')",
        }}
      ></div>
    </div>
  );
}
