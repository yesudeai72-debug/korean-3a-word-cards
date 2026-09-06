'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, ImageIcon, RotateCcw, RotateCw, Type } from 'lucide-react';

type LearningStep = 'picture' | 'easy' | 'contrast';
type ContrastPair = 'apply' | 'participate';

const words = [
  { noun: '대학교', particle: '에', verb: '지원하다', image: 'apply-university-online', alt: '노트북에서 대학 입학 지원서를 작성하고 온라인으로 제출하는 학생', easyBefore: '대학교에 들어가고 싶어서 온라인으로 ', easyFocus: '원서를 내요.', easyAfter: '' },
  { noun: '시험', particle: '에', verb: '합격하다', image: 'pass-exam', alt: '시험 합격 결과를 보고 기뻐하는 학생', easyBefore: '시험을 잘 봐서 기준을 ', easyFocus: '통과했어요.', easyAfter: '' },
  { noun: '입학식', particle: '에', verb: '참석하다', image: 'attend-ceremony-v2', alt: '입학식 플랜카드가 있는 강당에서 환영 인사를 듣는 학생', easyBefore: '입학식에 ', easyFocus: '가서 자리에 앉아', easyAfter: ' 함께해요.' },
  { noun: '동아리', particle: '에', verb: '가입하다', image: 'join-club', alt: '사진 동아리의 새 구성원이 되는 학생', easyBefore: '동아리에 들어가서 ', easyFocus: '회원이 돼요.', easyAfter: '' },
  { noun: '체육 대회', particle: '에', verb: '참가하다', image: 'sports-meet', alt: '체육 대회 계주에 직접 참여하는 학생', easyBefore: '체육대회에서 ', easyFocus: '선수로 직접 경기해요.', easyAfter: '' },
  { noun: '장학금', particle: '을', verb: '신청하다', image: 'scholarship', alt: '장학금 신청서를 제출하는 학생', easyBefore: '장학금을 받고 싶어서 학교에 ', easyFocus: '서류를 내요.', easyAfter: '' },
];

type ContrastQuestion = {
  sentenceBefore: string;
  sentenceAfter?: string;
  options: Array<{ verb: string; label: string }>;
  answer: string;
  clue: string;
};

const contrastGroups: Record<ContrastPair, {
  label: string;
  heading: string;
  hintLead: string;
  hintFirst: string;
  hintMiddle: string;
  hintSecond: string;
  summary: string;
  questions: ContrastQuestion[];
}> = {
  apply: {
    label: '지원하다 / 신청하다',
    heading: '지원하다와 신청하다 구별하기',
    hintLead: '뽑히기 위한 ',
    hintFirst: '경쟁·도전',
    hintMiddle: '인가요? 조건에 맞아 서비스나 혜택을 받기 위한 ',
    hintSecond: '요청',
    summary: '지원하다는 선발을 위한 경쟁·도전, 신청하다는 조건에 맞아 서비스나 혜택을 요청하는 상황에 사용해요.',
    questions: [
      { sentenceBefore: '이 대학교는 100명만 뽑지만 500명이', options: [{ verb: '지원하다', label: '지원했어요' }, { verb: '신청하다', label: '신청했어요' }], answer: '지원하다', clue: '정해진 인원 안에 뽑히기 위해 많은 사람과 경쟁하는 상황이에요.' },
      { sentenceBefore: '수진 씨는 경쟁이 심해도 교환 학생 프로그램에', options: [{ verb: '지원하다', label: '지원하려고 해요' }, { verb: '신청하다', label: '신청하려고 해요' }], answer: '지원하다', clue: '경쟁이 있어도 선발에 도전하는 상황이에요.' },
      { sentenceBefore: '저는 성적이 3.5 이상이라서 장학금을', options: [{ verb: '지원하다', label: '지원했어요' }, { verb: '신청하다', label: '신청했어요' }], answer: '신청하다', clue: '장학금을 받을 수 있는 성적 조건에 맞아 혜택을 요청하는 상황이에요.' },
      { sentenceBefore: '민수 씨는 집이 학교에서 멀어서 기숙사 입사를', options: [{ verb: '지원하다', label: '지원할 수 있어요' }, { verb: '신청하다', label: '신청할 수 있어요' }], answer: '신청하다', clue: '집이 멀다는 이용 조건에 맞아 기숙사 입사를 요청하는 상황이에요.' },
    ],
  },
  participate: {
    label: '참가하다 / 참석하다',
    heading: '참가하다와 참석하다 구별하기',
    hintLead: '경기나 활동에 ',
    hintFirst: '직접 함께하기',
    hintMiddle: '인가요? 행사나 모임이 열리는 자리에 ',
    hintSecond: '가기',
    summary: '참가하다는 경기나 활동에 직접 함께할 때, 참석하다는 행사나 모임이 열리는 자리에 갈 때 사용해요.',
    questions: [
      { sentenceBefore: '저는 체육 대회에서 달리기 선수로 경기에', options: [{ verb: '참가하다', label: '참가했어요' }, { verb: '참석하다', label: '참석했어요' }], answer: '참가하다', clue: '선수로 직접 경기를 하는 상황이에요.' },
      { sentenceBefore: '동생은 학교 축제의 댄스 대회에', sentenceAfter: '1등을 했어요', options: [{ verb: '참가하다', label: '참가하여' }, { verb: '참석하다', label: '참석하여' }], answer: '참가하다', clue: '댄스 대회에 직접 나가서 춤을 추고 1등을 한 상황이에요.' },
      { sentenceBefore: '신입생들은 강당에서 열린 입학식에', options: [{ verb: '참가하다', label: '참가했어요' }, { verb: '참석하다', label: '참석했어요' }], answer: '참석하다', clue: '입학식이 열리는 자리에 가서 함께하는 상황이에요.' },
      { sentenceBefore: '교수님과 학생들은 다음 주 학과 회의에', options: [{ verb: '참가하다', label: '참가할 거예요' }, { verb: '참석하다', label: '참석할 거예요' }], answer: '참석하다', clue: '회의가 열리는 자리에 가는 상황이에요.' },
    ],
  },
};

export default function Home() {
  const [step, setStep] = useState<LearningStep>('picture');
  const [contrastPair, setContrastPair] = useState<ContrastPair>('apply');
  const [flipped, setFlipped] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const isPictureStep = step === 'picture';
  const isEasyStep = step === 'easy';
  const isContrastStep = step === 'contrast';
  const contrastGroup = contrastGroups[contrastPair];
  const contrastQuestions = contrastGroup.questions;
  const answeredCount = Object.keys(answers).length;
  const correctCount = contrastQuestions.filter((question, index) => answers[index] === question.answer).length;

  const flip = (id: string) => setFlipped((list) => list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  const changeStep = (nextStep: LearningStep) => { setStep(nextStep); setFlipped([]); };
  const changeContrastPair = (nextPair: ContrastPair) => { setContrastPair(nextPair); setAnswers({}); };

  return (
    <main>
      <header className="topbar"><span className="brand">한국어 <b>3A</b></span><span>01 · 학교생활</span></header>

      <nav className="step-nav" aria-label="어휘 학습 단계">
        <button type="button" className={isPictureStep ? 'active' : ''} onClick={() => changeStep('picture')} aria-current={isPictureStep ? 'step' : undefined}>
          <span className="step-number">1</span><span><strong>그림으로 이해</strong><small>문자 → 이미지</small></span>{isPictureStep && <Check size={18} aria-hidden="true" />}
        </button>
        <span className="step-line" aria-hidden="true" />
        <button type="button" className={isEasyStep ? 'active' : ''} onClick={() => changeStep('easy')} aria-current={isEasyStep ? 'step' : undefined}>
          <span className="step-number">2</span><span><strong>쉬운 말로 이해</strong><small>문자 → 쉬운 문장</small></span>{isEasyStep && <Check size={18} aria-hidden="true" />}
        </button>
        <span className="step-line" aria-hidden="true" />
        <button type="button" className={isContrastStep ? 'active' : ''} onClick={() => changeStep('contrast')} aria-current={isContrastStep ? 'step' : undefined}>
          <span className="step-number">3</span><span><strong>두 단어 구별</strong><small>비슷한 동사 두 부류</small></span>{isContrastStep && <Check size={18} aria-hidden="true" />}
        </button>
      </nav>

      <section className="intro">
        <div>
          <p className="eyebrow">{isPictureStep ? '1단계 · 그림으로 의미 이해' : isEasyStep ? '2단계 · 쉬운 표현으로 의미 구별' : '3단계 · 비슷한 단어 구별'}</p>
          <h1>{isPictureStep ? '학교생활 단어 카드' : isEasyStep ? '쉬운 말로 뜻 확인하기' : contrastGroup.heading}</h1>
          <p className="instruction">{isPictureStep ? '카드를 누르면 뜻을 그림으로 볼 수 있어요.' : isEasyStep ? '카드를 누르면 익숙한 표현으로 바꾼 문장을 볼 수 있어요.' : '문장의 상황을 읽고 괄호 안에서 알맞은 동사를 선택하세요.'}</p>
        </div>
        {isContrastStep ? <button className="reset" onClick={() => setAnswers({})} disabled={!answeredCount}><RotateCcw size={17} /> 다시 풀기</button> : <button className="reset" onClick={() => setFlipped([])} disabled={!flipped.length}><RotateCcw size={17} /> 모두 앞면으로</button>}
      </section>

      {isContrastStep ? <>
        <div className="pair-selector" role="tablist" aria-label="구별할 동사 선택">
          {(Object.keys(contrastGroups) as ContrastPair[]).map((pair) => <button type="button" role="tab" key={pair} className={contrastPair === pair ? 'active' : ''} aria-selected={contrastPair === pair} onClick={() => changeContrastPair(pair)}>{contrastGroups[pair].label}</button>)}
        </div>
        <div className="contrast-hint">{contrastGroup.hintLead}<b>{contrastGroup.hintFirst}</b>{contrastGroup.hintMiddle}<b>{contrastGroup.hintSecond}</b>인가요?</div>
      </> : <div className="legend"><span className="blue-key">에 + 동사</span><span className="amber-key">을 + 신청하다</span></div>}

      {!isContrastStep ? <section className="cards" aria-label={`학교생활 표현 6개, ${isPictureStep ? '그림' : '쉬운 문장'} 단계`}>
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
      </section> : (
        <section className="contrast-activity" aria-label={`${contrastGroup.label} 선택 문제`}>
          <div className="activity-progress"><strong>{answeredCount} / 4</strong><span>문장 선택 완료</span></div>
          <div className="question-list">
            {contrastQuestions.map((question, index) => {
              const selected = answers[index];
              const isCorrect = selected === question.answer;
              return (
                <article className={`question-card ${selected ? isCorrect ? 'correct' : 'incorrect' : ''}`} key={question.sentenceBefore}>
                  <span className="question-number">문장 {index + 1}</span>
                  <div className="question-sentence">
                    <span>{question.sentenceBefore}</span>
                    <span className="verb-bracket" aria-label="동사 선택 괄호">
                      <span aria-hidden="true">(</span>
                      {question.options.map((option) => (
                        <button type="button" key={option.verb} className={selected === option.verb ? 'selected' : ''} onClick={() => setAnswers((current) => ({ ...current, [index]: option.verb }))} aria-pressed={selected === option.verb}>
                          {option.label}
                        </button>
                      ))}
                      <span aria-hidden="true">)</span>
                    </span>
                    {question.sentenceAfter && <span>{question.sentenceAfter}</span>}
                    <span>.</span>
                  </div>
                  <div className="answer-feedback" aria-live="polite">
                    {selected && <><strong>{isCorrect ? '맞았어요!' : `다시 생각해 보세요. 정답은 ‘${question.options.find((option) => option.verb === question.answer)?.label}’예요.`}</strong><span>{question.clue}</span></>}
                  </div>
                </article>
              );
            })}
          </div>
          {answeredCount === contrastQuestions.length && <div className="score-panel" aria-live="polite"><strong>{correctCount === 4 ? '네 문장을 모두 정확하게 구별했어요!' : `4문장 중 ${correctCount}문장을 맞혔어요.`}</strong><span>{contrastGroup.summary}</span></div>}
        </section>
      )}

      {isPictureStep ? (
        <aside className="note"><strong>장학금<span>을</span> 신청하다</strong><p>이 표현에서는 <b>‘을’</b>을 써요. 다른 다섯 표현의 <b>‘에’</b>와 비교해 보세요.</p></aside>
      ) : isEasyStep ? (
        <aside className="note easy-note"><strong>쉬운 말은 뜻의 열쇠</strong><p>뒷면의 문장은 뜻을 쉽게 이해하기 위한 설명이에요. 실제로 말할 때는 앞면의 목표 표현을 사용해 보세요.</p></aside>
      ) : null}

      <div className="stage-action"><button type="button" onClick={() => changeStep(isPictureStep ? 'easy' : isEasyStep ? 'contrast' : 'picture')}>{isPictureStep ? '2단계 · 쉬운 말로 이해하기' : isEasyStep ? '3단계 · 두 단어 구별하기' : '1단계 · 그림으로 돌아가기'}<ArrowUpRight size={18} /></button></div>
      <footer>서울대 한국어 3A · 1과 어휘</footer>
    </main>
  );
}
