import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'학교생활 단어 카드 · 한국어 3A',description:'조사와 함께 배우는 여섯 가지 학교생활 표현. 카드를 뒤집어 그림으로 확인해 보세요.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
