// @ts-check
import { defineConfig } from 'astro/config';

// 公開先のURLは GitHub Actions が自動で設定します（.github/workflows/deploy.yml）。
// ・独自ドメイン使用時：https://example.com （base は空）
// ・未使用時：https://ユーザー名.github.io/リポジトリ名
// ローカルで確認するときは下の既定値が使われます。
const site = process.env.SITE_URL || 'https://example.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
