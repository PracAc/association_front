import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // 글로벌 함수 사용 가능
    environment: 'jsdom', // React 테스트에 필요한 jsdom 환경
    coverage: {
      provider: 'istanbul', // 코드 커버리지 설정
    },
  },
})
