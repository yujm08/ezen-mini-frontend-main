/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './.next', // 빌드 결과물 경로 지정
  eslint: {
    ignoreDuringBuilds: true, // (CICD)빌드 중 ESLint 검사 비활성화
  },
  experimental: {
    appDir: true, // src/app 디렉토리 활성화
  },
};

export default nextConfig;
