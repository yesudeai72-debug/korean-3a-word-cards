'use client';
import { useState } from 'react';
import Image from "next/image";
import { RotateCcw, RotateCw, ArrowUpRight } from 'lucide-react';
const words = [
  { noun: '대학교', particle: '에', verb: '지원하다', image: 'apply-university', alt: '대학교 입학 지원서를 제출하는 학생' },
  { noun: '시험', particle: '에', verb: '합격하다', image: 'pass-exam', alt: '시험 합격 결과를 보고 기뻐하는 학생' },
  { noun: '입학식', particle: '에', verb: '참석하다', image: 'attend-ceremony', alt: '입학식 객석에서 환영 인사를 듣는 학생' },
  { noun: '동아리', particle: '에', verb: '가입하다', image: 'join-club', alt: '사진 동아리의 새 구성원이 되는 학생' },
  { noun: '체육 대회', particle: '에', verb: '참가하다', image: 'sports-meet', alt: '체육 대회 계주에 직접 참여하는 학생' },
  { noun: '장학금', particle: '을', verb: '신청하다', image: 'scholarship', alt: '장학금 신청서를 제출하는 학생' },
];
export default function Home() {
 const [flipped, setFlipped] = useState<string[]>([]);
 const flip = (id: string) => setFlipped(list => list.includes(id) ? list.filter(x => x !== id) : [...list,id]);
 return <main>
  <header className="topbar"><span className="brand">한국어 <b>3A</b></span><span>01 · 학교생활</span></header>
  <section className="intro"><div><p className="eyebrow">조사와 함께 배우는 어휘</p><h1>학교생활 단어 카드</h1><p className="instruction">카드를 누르면 뜻을 그림으로 볼 수 있어요.</p></div><button className="reset" onClick={()=>setFlipped([])} disabled={!flipped.length}><RotateCcw size={17}/> 모두 앞면으로</button></section>
  <div className="legend"><span className="blue-key">에 + 동사</span><span className="amber-key">을 + 신청하다</span></div>
  <section className="cards" aria-label="학교생활 표현 6개">
  {words.map((w,i)=>{const back=flipped.includes(w.image);return <button key={w.image} className={`flip-card ${w.particle==='을'?'object-card':''} ${back?'flipped':''}`} onClick={()=>flip(w.image)} aria-pressed={back} aria-label={`${w.noun}${w.particle} ${w.verb}, ${back?'문자':'그림'} 보기`}>
   <span className="card-inner">
    <span className="face front" aria-hidden={back}><span className="card-top"><span className="number">0{i+1}</span><span className="particle-label">{w.particle} + 동사</span></span><span className="expression"><span className="noun">{w.noun}<strong className="particle">{w.particle}</strong></span><span className="verb">{w.verb}</span></span><span className="card-bottom">그림으로 확인하기 <ArrowUpRight size={20}/></span></span>
    <span className="face back" aria-hidden={!back}><Image unoptimized src={`/images/${w.image}.png`} alt={w.alt} width={1024} height={1024}/><span className="image-footer"><span>0{i+1} · 그림</span><span>문자로 돌아가기 <RotateCw size={16}/></span></span></span>
   </span>
  </button>})}
  </section>
  <aside className="note"><strong>장학금<span>을</span> 신청하다</strong><p>이 표현에서는 <b>‘을’</b>을 써요. 다른 다섯 표현의 <b>‘에’</b>와 비교해 보세요.</p></aside>
  <footer>서울대 한국어 3A · 1과 어휘</footer>
 </main>
}
