'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, ImageIcon, RotateCcw, RotateCw, Type } from 'lucide-react';

type LearningStep = 'picture' | 'easy';

const words = [
  { noun: '대학교', particle: '에', verb: '지원하다', image: 'apply-university-online', alt: '노트북에서 대학 입학 지원서를 작성하고 온라인으로 제출하는 학생', easyBefore: '대학교에 들어가고 싶어서 온라인으로 ', easyFocus: '원서를 내요.', easyAfter: '' },
  { noun: '시험', particle: '에', verb: '합격하다', image: 'pass-exam', alt: '시험 합격 결과를 보고 기뻐하는 학생', easyBefore: '시험을 잘 봐서 기준을 ', easyFocus: '통과했어요.', easyAfter: '' },
  { noun: '입학식', particle: '에', verb: '참석하다', image: 'attend-ceremony-v2', alt: '입학식 플랜카드가 있는 강당에서 환영 인사를 듣는 학생', easyBefore: '입학식에 ', easyFocus: '가서 자리에 앉아', easyAfter: ' 함께해요.' },
  { noun: '동아리', particle: '에', verb: '가입하다', image: 'join-club', alt: '사진 동아리의 새 구성원이 되는 학생', easyBefore: '동아리에 들어가서 ', easyFocus: '회원이 돼요.', easyAfter: '' },
  { noun: '체육 대회', particle: '에', verb: '참가하다', image: 'sports-meet', alt: '체육 대회 계주에 직접 참여하는 학생', easyBefore: '체육 대회에서 ', easyFocus: '선수로 뛰며', easyAfter: ' 함께 활동해요.' },
  { noun: '장학금', particle: '을', verb: '신청하다', image: 'scholarship', alt: '장학금 신청서를 제출하는 학생', easyBefore: '장학금을 받고 싶어서 학교에 ', easyFocus: '서류를 내요.', easyAfter: '' },
];

export default function Home() {
  const [step, setStep] = useState<LearningStep>('picture');
  const [flipped, setFlipped] = useState<string[]>([]);
  const isPictureStep = step === 'picture';

  const flip = (id: string) => setFlipped((list) => list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  const changeStep = (nextStep: LearningStep) => { setStep(nextStep); setFlipped([]); };

  return (
    <main>
      <header className="topbar"><span className="brand">한국어 <b>3A</b></span><span>01 · 학교생활</span></header>

      <nav className="step-nav" aria-label="어휘 학습 단계">
        <button type="button" className={isPictureStep ? 'active' : ''} onClick={() => changeStep('picture')} aria-current={isPictureStep ? 'step' : undefined}>
          <span className="step-number">1</span><span><strong>그림으로 이해</strong><small>문자 → 이미지</small></span>{isPictureStep && <Check size={18} aria-hidden="true" />}
        </button>
        <span className="step-line" aria-hidden="true" />
        <button type="button" className={!isPictureStep ? 'active' : ''} onClick={() => changeStep('easy')} aria-current={!isPictureStep ? 'step' : undefined}>
          <span className="step-number">2</span><span><strong>쉬운 말로 이해</strong><small>문자 → 쉬운 문장</small></span>{!isPictureStep && <Check size={18} aria-hidden="true" />}
        </button>
      </nav>

      <section className="intro">
        <div>
          <p className="eyebrow">{isPictureStep ? '1단계 · 그림으로 의미 이해' : '2단계 · 쉬운 표현으로 의미 구별'}</p>
          <h1>{isPictureStep ? '학교생활 단어 카드' : '쉬운 말로 뜻 확인하기'}</h1>
          <p className="instruction">{isPictureStep ? '카드를 누르면 뜻을 그림으로 볼 수 있어요.' : '카드를 누르면 익숙한 표현으로 바꾼 문장을 볼 수 있어요.'}</p>
        </div>
        <button className="reset" onClick={() => setFlipped([])} disabled={!flipped.length}><RotateCcw size={17} /> 모두 앞면으로</button>
      </section>

      <div className="legend"><span className="blue-key">에 + 동사</span><span className="amber-key">을 + 신청하다</span></div>

      <section className="cards" aria-label={`학교생활 표현 6개, ${isPictureStep ? '그림' : '쉬운 문장'} 단계`}>
        {words.map((word, index) => {
          const cardId = `${step}-${word.image}`;
          const back = flipped.includes(cardId);
          const backLabel = isPictureStep ? '그림' : '쉬운 문장';
          return (
            <button key={word.image} type="button" className={`flip-card ${word.particle === '을' ? 'object-card' : ''} ${back ? 'flipped' : ''}`} onClick={() => flip(cardId)} aria-pressed={back} aria-label={`${word.noun}${word.particle} ${word.verb}, ${back ? '목표 표현' : backLabel} 보기`}>
              <span className="card-inner">
                <span className="face front" aria-hidden={back}>
                  <span className="card-top"><span className="number">0{index + 1}</span><span className="particle-label">{word.particle} + 동사</span></span>
                  <span className="expression"><span className="noun">{word.noun}<strong className="particle">{word.particle}</strong></span><span className="verb">{word.verb}</span></span>
                  <span className="card-bottom">{isPictureStep ? <><span>그림으로 확인하기</span><ImageIcon size={19} /></> : <><span>쉬운 문장으로 확인하기</span><Type size={19} /></>}</span>
                </span>
                <span className={`face back ${isPictureStep ? 'picture-back' : 'easy-back'}`} aria-hidden={!back}>
                  {isPictureStep ? (
                    <><Image unoptimized src={`/images/${word.image}.png`} alt={word.alt} width={1024} height={1024} /><span className="image-footer"><span>0{index + 1} · 그림</span><span>문자로 돌아가기 <RotateCw size={16} /></span></span></>
                  ) : (
                    <><span className="easy-content"><span className="easy-label">쉬운 말로 바꾸면</span><span className="easy-sentence">{word.easyBefore}<strong>{word.easyFocus}</strong>{word.easyAfter}</span></span><span className="image-footer easy-footer"><span>0{index + 1} · 쉬운 문장</span><span>목표 표현으로 돌아가기 <RotateCw size={16} /></span></span></>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </section>

      {isPictureStep ? (
        <aside className="note"><strong>장학금<span>을</span> 신청하다</strong><p>이 표현에서는 <b>‘을’</b>을 써요. 다른 다섯 표현의 <b>‘에’</b>와 비교해 보세요.</p></aside>
      ) : (
        <aside className="note easy-note"><strong>쉬운 말은 뜻의 열쇠</strong><p>뒷면의 문장은 뜻을 쉽게 이해하기 위한 설명이에요. 실제로 말할 때는 앞면의 목표 표현을 사용해 보세요.</p></aside>
      )}

      <div className="stage-action"><button type="button" onClick={() => changeStep(isPictureStep ? 'easy' : 'picture')}>{isPictureStep ? '2단계 · 쉬운 말로 이해하기' : '1단계 · 그림으로 돌아가기'}<ArrowUpRight size={18} /></button></div>
      <footer>서울대 한국어 3A · 1과 어휘</footer>
    </main>
  );
}
