'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: '#333333', // 차콜그레이 색상
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* 왼쪽: 홈 이미지 버튼 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link href="/" passHref>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <Image
              src="/images/home.png" // public/images/home.png 이미지 경로
              alt="Home"
              width={30}
              height={30}
              style={{
                filter: 'invert(100%)', // 흰색으로 변환
                borderRadius: '10%', // 둥글게
                padding: '3px', // 테두리와 간격
              }}
            />
          </button>
        </Link>

        {/* 게시판 버튼 */}
        <div style={{ display: menuOpen ? 'none' : 'flex', gap: '15px' }}>
          <Link
            href="/question/list"
            style={{
              fontSize: '14px',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            게시판
          </Link>
        </div>
      </div>

      {/* 오른쪽: 햄버거 메뉴 */}
      <button
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* 햄버거 메뉴 내용 */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            backgroundColor: '#333333', // 차콜그레이 색상
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'block',
              textDecoration: 'none',
              color: '#fff',
              padding: '5px 0',
            }}
            onClick={() => setMenuOpen(false)}
          >
            홈
          </Link>
          <Link
            href="/question/list"
            style={{
              display: 'block',
              textDecoration: 'none',
              color: '#fff',
              padding: '5px 0',
            }}
            onClick={() => setMenuOpen(false)}
          >
            게시판
          </Link>
        </div>
      )}
    </nav>
  );
}
