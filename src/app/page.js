export default function HomePage() {
  return (
    <div className="flex h-screen">
      {/* 왼쪽: 게시판 버튼 및 텍스트 */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <a
          href="/question/list"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          게시판
        </a>
        <h1 className="text-black text-xl font-serif mt-4">
          Welcome to Our Board! It's made by JM
        </h1>
      </div>
      
      {/* 오른쪽: 배경 이미지 */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/winter-town.webp')",
        }}
      >
      </div>
    </div>
  );
}
