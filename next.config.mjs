/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const repositoryName = 'Unlimited-Math-Problem-Bank';

const nextConfig = {
  // 1. 啟用靜態 HTML 匯出模式 (打包後會生成 out/ 資料夾)
  output: 'export',

  // 2. 設定 GitHub Pages 的子路徑 (若部署在 user.github.io/repo-name 需要此設定)
  basePath: isProd ? `/${repositoryName}` : '',
  assetPrefix: isProd ? `/${repositoryName}/` : '',

  // 3. 靜態匯出不支援 Next.js 伺服器端圖片優化，必須停用
  images: {
    unoptimized: true,
  },

  // 4. 確保靜態路由尾端包含斜線 (避免 GitHub Pages 重新導向 404 問題)
  trailingSlash: true,
};

export default nextConfig;