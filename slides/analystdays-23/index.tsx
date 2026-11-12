import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type React from 'react';

import bgContent from '@assets/ad23/bg-content.png';
import bgSection from '@assets/ad23/bg-section.png';
import bgDark from '@assets/ad23/bg-dark.png';
import logo from '@assets/ad23/logo.png';

import speakerImg from './assets/speaker.png';
import clientsImg from './assets/clients.svg';
import spekList from './assets/spek-list.png';
import spekChange from './assets/spek-change.png';

// ─────────────────────────────────────────────────────────────
// Analyst Days / 23 — тема снята с analystdays23_speaker_template_ru.pptx
// 960×540 pt → 1920×1080 px (1 pt = 2 px). Минимум по требованиям — 18 pt = 36 px.
// ─────────────────────────────────────────────────────────────

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#071122', accent: '#F56429' },
  fonts: {
    display: 'Arial, "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif',
    body: 'Arial, "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif',
  },
  typeScale: { hero: 84, body: 38 },
  radius: 24,
};

const C = {
  text: '#071122',
  accent: '#F56429',
  muted: '#5E6B7D',
  line: '#EDD0C9',
  tint: '#EAF5FF',
  peach: '#FFF1EB',
  brown: '#3D190A',
  onDark: '#DDE6F0',
  ok: '#1F8A5B',
  bad: '#C0392B',
};
const FONT = 'var(--osd-font-body)';
const MONO = '"JetBrains Mono", Consolas, "DejaVu Sans Mono", "Courier New", monospace';
const TALK = 'Сквозной SDD начинается с аналитика';

// ─────────────── Каркас ───────────────

const Stage = ({
  bg,
  fade = 0,
  dark = false,
  children,
}: {
  bg: string;
  fade?: number;
  dark?: boolean;
  children: React.ReactNode;
}) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: `${dark ? '#000' : '#fff'} url(${bg}) left top / 1920px 1080px no-repeat`,
      color: dark ? '#fff' : C.text,
      fontFamily: FONT,
    }}
  >
    {fade > 0 && (
      <div style={{ position: 'absolute', inset: 0, background: `rgba(255,255,255,${fade})` }} />
    )}
    {children}
  </div>
);

const Footer = () => {
  const { current } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 0, top: 956, width: 1920, height: 124, background: '#000' }}>
      <img src={logo} alt="Analyst Days" style={{ position: 'absolute', left: 60, top: 30, height: 65 }} />
      <div style={{ position: 'absolute', left: 446, top: 31, width: 2, height: 63, background: '#3a3a3a' }} />
      <div
        style={{
          position: 'absolute', left: 482, top: 0, height: 124,
          display: 'flex', alignItems: 'center', fontSize: 28, color: '#fff',
        }}
      >
        {TALK}
      </div>
      <div
        style={{
          position: 'absolute', left: 1721, top: 30, width: 115, height: 65, boxSizing: 'border-box',
          border: `3px solid ${C.accent}`, color: C.accent, fontSize: 38, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {String(current).padStart(2, '0')}
      </div>
    </div>
  );
};

/** Стандартный контентный слайд: метка, заголовок, тело 79..1841 × 200..920, футер. */
const Slide = ({
  title,
  fade = 0.72,
  children,
}: {
  title: React.ReactNode;
  fade?: number;
  children: React.ReactNode;
}) => (
  <Stage bg={bgContent} fade={fade}>
    <div style={{ position: 'absolute', left: 79, top: 30, fontSize: 28, fontWeight: 700, color: C.accent }}>
      Analyst Days / 23
    </div>
    <h1
      style={{
        position: 'absolute', left: 79, top: 76, width: 1600, margin: 0,
        fontSize: 60, fontWeight: 700, lineHeight: 1.1, color: C.text,
      }}
    >
      {title}
    </h1>
    <div style={{ position: 'absolute', left: 79, top: 210, width: 1762, height: 715 }}>{children}</div>
    <Footer />
  </Stage>
);

const Section = ({ n, title, sub }: { n: string; title: React.ReactNode; sub: string }) => (
  <Stage bg={bgSection} dark>
    <img src={logo} alt="Analyst Days" style={{ position: 'absolute', left: 79, top: 63, height: 72 }} />
    <div
      style={{
        position: 'absolute', left: 104, top: 0, bottom: 120, width: 980,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36,
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, color: C.accent, lineHeight: 1 }}>{n}</div>
      <h1 style={{ margin: 0, fontSize: 80, fontWeight: 700, lineHeight: 1.1, maxWidth: 820 }}>{title}</h1>
      <p style={{ margin: 0, fontSize: 40, lineHeight: 1.35, color: C.onDark, maxWidth: 820 }}>{sub}</p>
    </div>
    <div style={{ position: 'absolute', left: 65, top: 988, width: 1742, height: 1, background: '#555' }} />
    <div style={{ position: 'absolute', left: 65, top: 1008, fontSize: 28, fontWeight: 700 }}>Analyst Days / 23</div>
  </Stage>
);

// ─────────────── Примитивы ───────────────

const Card = ({
  children,
  style,
  tone = 'white',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  tone?: 'white' | 'peach' | 'tint' | 'brown' | 'black';
}) => {
  const bg = { white: '#fff', peach: C.peach, tint: C.tint, brown: C.brown, black: '#0d0d0d' }[tone];
  const dark = tone === 'brown' || tone === 'black';
  return (
    <div
      style={{
        boxSizing: 'border-box',
        background: bg,
        color: dark ? '#fff' : C.text,
        border: dark ? 'none' : `2px solid ${C.line}`,
        borderRadius: 24,
        padding: '36px 44px',
        boxShadow: dark ? 'none' : '0 10px 30px rgba(7,17,34,0.06)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Check = ({ children, mark = '✓', color = C.accent, size = 38 }: {
  children: React.ReactNode; mark?: string; color?: string; size?: number;
}) => (
  <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
    <div
      style={{
        flex: '0 0 46px', width: 46, height: 46, borderRadius: 10, marginTop: 2,
        background: color, color: '#fff', fontSize: 28, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {mark}
    </div>
    <div style={{ fontSize: size, lineHeight: 1.3 }}>{children}</div>
  </div>
);

const Num = ({ n, title, sub }: { n: string; title: React.ReactNode; sub?: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
    <div style={{ flex: '0 0 80px', fontSize: 44, fontWeight: 700, color: C.accent, lineHeight: 1.1 }}>{n}</div>
    <div>
      <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
      {sub && <div style={{ fontSize: 36, color: C.muted, lineHeight: 1.3, marginTop: 8 }}>{sub}</div>}
    </div>
  </div>
);

const H = ({ children, color = C.text, size = 44 }: { children: React.ReactNode; color?: string; size?: number }) => (
  <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.2, color }}>{children}</div>
);

const P = ({ children, color = C.muted, size = 38, style }: {
  children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties;
}) => <div style={{ fontSize: size, lineHeight: 1.35, color, ...style }}>{children}</div>;

const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: C.accent }}>{children}</span>
);

const Tag = ({ children, tone = 'accent' }: { children: React.ReactNode; tone?: 'accent' | 'dark' | 'light' }) => {
  const s = {
    accent: { background: C.accent, color: '#fff' },
    dark: { background: C.text, color: '#fff' },
    light: { background: C.peach, color: C.accent },
  }[tone];
  return (
    <span
      style={{
        display: 'inline-block', padding: '6px 18px', borderRadius: 12,
        fontSize: 30, fontWeight: 700, fontFamily: MONO, ...s,
      }}
    >
      {children}
    </span>
  );
};

/** Блок кода: тёмно-коричневый, как на слайде «Фрагмент кода» в шаблоне. */
const Code = ({ children, size = 32, style }: { children: React.ReactNode; size?: number; style?: React.CSSProperties }) => (
  <pre
    style={{
      boxSizing: 'border-box', margin: 0, background: C.brown, color: '#FFE9DF',
      borderRadius: 24, padding: '36px 44px', fontFamily: MONO, fontSize: size,
      lineHeight: 1.45, whiteSpace: 'pre', ...style,
    }}
  >
    {children}
  </pre>
);
const K = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#FF9A6B', fontWeight: 700 }}>{children}</span>;
const Dim = ({ children }: { children: React.ReactNode }) => <span style={{ color: '#B99C8F' }}>{children}</span>;

// Схемы потока ролей

const Role = ({
  title, sub, tone = 'white', w = 330, h = 170,
}: { title: string; sub?: React.ReactNode; tone?: 'white' | 'accent' | 'grey'; w?: number; h?: number }) => {
  const s = {
    white: { background: '#fff', color: C.text, border: `2px solid ${C.line}` },
    accent: { background: C.accent, color: '#fff', border: `2px solid ${C.accent}` },
    grey: { background: '#F1F3F6', color: C.muted, border: '2px dashed #B8C0CC' },
  }[tone];
  return (
    <div
      style={{
        boxSizing: 'border-box', width: w, height: h, borderRadius: 22, padding: '20px 24px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', gap: 10, ...s,
      }}
    >
      <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
      {sub && <div style={{ fontSize: 30, lineHeight: 1.2, opacity: 0.9, fontFamily: MONO }}>{sub}</div>}
    </div>
  );
};

const Arrow = ({ w = 70, color = C.accent }: { w?: number; color?: string }) => (
  <svg width={w} height={40} viewBox={`0 0 ${w} 40`} style={{ flex: `0 0 ${w}px` }}>
    <line x1={2} y1={20} x2={w - 16} y2={20} stroke={color} strokeWidth={5} />
    <polygon points={`${w - 18},8 ${w - 2},20 ${w - 18},32`} fill={color} />
  </svg>
);

const Gate = () => (
  <div
    style={{
      flex: '0 0 auto', width: 64, height: 64, transform: 'rotate(45deg)', background: C.text,
      borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
  >
    <span style={{ transform: 'rotate(-45deg)', color: '#fff', fontSize: 30, fontWeight: 700 }}>QA</span>
  </div>
);

const Row = ({ children, gap = 18, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap, ...style }}>{children}</div>
);

const Col = ({ children, gap = 32, style }: { children: React.ReactNode; gap?: number; style?: React.CSSProperties }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>{children}</div>
);

/** Итоговая плашка внизу тела слайда (как «Вывод» в шаблоне). */
const Bottom = ({ children, tone = 'tint' }: { children: React.ReactNode; tone?: 'tint' | 'brown' }) => (
  <div
    style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, boxSizing: 'border-box',
      borderRadius: 20, padding: '24px 40px', fontSize: 38, fontWeight: 700, lineHeight: 1.3,
      background: tone === 'tint' ? C.tint : C.brown, color: tone === 'tint' ? C.text : '#fff',
      border: tone === 'tint' ? `2px solid #CFE3F7` : 'none',
    }}
  >
    {children}
  </div>
);

// ═════════════════════════════════════════════════════════════
// ОТКРЫТИЕ
// ═════════════════════════════════════════════════════════════

const Cover: Page = () => (
  <Stage bg={bgDark} dark>
    <img src={logo} alt="Analyst Days" style={{ position: 'absolute', left: 79, top: 69, height: 72 }} />
    <div
      style={{
        position: 'absolute', left: 1346, top: 65, width: 562, height: 141, background: '#fff',
        clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#000', fontSize: 52, fontWeight: 700, lineHeight: 1.05,
      }}
    >
      <div>20–21/11/2026</div>
      <div>Москва</div>
    </div>
    <div style={{ position: 'absolute', left: 72, top: 290, width: 1000 }}>
      <h1 style={{ margin: 0, fontSize: 92, fontWeight: 700, lineHeight: 1.08 }}>
        Сквозной SDD начинается <Hl>с&nbsp;аналитика</Hl>
      </h1>
      <p style={{ margin: '44px 0 0', fontSize: 40, lineHeight: 1.35, color: C.onDark, width: 900 }}>
        Как одна спецификация проходит путь от&nbsp;требований заказчика до&nbsp;автотестов
      </p>
      <p style={{ margin: '90px 0 0', fontSize: 38, color: '#fff', fontWeight: 700 }}>Иван Поддубный</p>
      <p style={{ margin: '10px 0 0', fontSize: 36, color: C.onDark }}>CTO · Вебпрактик · Ростов-на-Дону, Россия</p>
    </div>
  </Stage>
);

const About: Page = () => (
  <Slide title="О спикере">
    <Card style={{ position: 'absolute', left: 0, top: 0, width: 470, height: 600, padding: 0, overflow: 'hidden' }}>
      <img src={speakerImg} alt="Иван Поддубный" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Card>
    <div style={{ position: 'absolute', left: 540, top: 0, width: 1000 }}>
      <div style={{ fontSize: 64, fontWeight: 700 }}>Иван Поддубный</div>
      <div style={{ fontSize: 40, fontWeight: 700, color: C.accent, marginTop: 12 }}>CTO · Вебпрактик</div>
      <Col gap={30} style={{ marginTop: 56 }}>
        <Check>15+ лет в IT: fullstack → тимлид → CTO</Check>
        <Check>Полтора года перестраиваю SDLC под AI-агентов</Check>
        <Check>Масштабирую сквозной SDD на все команды студии</Check>
        <Check>Организатор ростовских сообществ аналитиков и разработчиков</Check>
      </Col>
      <div style={{ marginTop: 56, fontSize: 38, color: C.muted }}>
        Telegram: <b style={{ color: C.text }}>@northleshiy</b>
      </div>
    </div>
  </Slide>
);

const Clients: Page = () => (
  <Slide title="Вебпрактик — веб-интегратор для корпораций" fade={0.85}>
    <Card style={{ position: 'absolute', inset: 0, padding: 0, overflow: 'hidden' }}>
      <img
        src={clientsImg}
        alt="Клиенты Вебпрактик"
        style={{ position: 'absolute', left: '50%', top: '50%', width: 2300, transform: 'translate(-50%, -50%)' }}
      />
    </Card>
  </Slide>
);

const Hook: Page = () => (
  <Slide title="Тезис, с которого всё началось">
    <Card tone="brown" style={{ position: 'absolute', left: 0, top: 0, width: 1500, padding: '56px 64px' }}>
      <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.2 }}>
        Кто не внедрит Spec-Driven Development к&nbsp;2027&nbsp;году, безнадёжно отстанет
      </div>
    </Card>
    <div style={{ position: 'absolute', left: 0, top: 440, width: 1500 }}>
      <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.25 }}>
        Но суть SDD раскрывается, только когда процесс <Hl>начинается с аналитика</Hl>
      </div>
      <P style={{ marginTop: 28 }}>Иначе спека рождается у разработчика — и смысл уже потерян по дороге</P>
    </div>
  </Slide>
);

const Poll: Page = () => (
  <Slide title="Поднимите руку, если это про вас">
    <Col gap={44} style={{ width: 1350 }}>
      <Num n="01" title="Требования живут в Confluence или Jira" />
      <Num n="02" title="Уже обсуждаете требования с AI-агентом" />
      <Num n="03" title="Разработчики у вас на SDD, а аналитика — нет" />
      <Num n="04" title="Автотесты пишут по своим сценариям, а не по вашим" />
    </Col>
  </Slide>
);

const Plan: Page = () => (
  <Slide title="План доклада">
    <Col gap={30} style={{ width: 1300 }}>
      <Num n="01" title="Сквозной SDD" sub="Один артефакт от требований до автотестов" />
      <Num n="02" title="Требования под спеки" sub="Как писать то, что прочитает агент, — на двух проектах" />
      <Num n="03" title="День аналитика с агентом" sub="Что поменялось в ежедневной работе" />
      <Num n="04" title="Команда и заказчик" sub="Что не получилось с первого раза" />
      <Num n="05" title="От спеки к автотестам" sub="Как закрыли разрыв «аналитик — разработка — QA»" />
    </Col>
  </Slide>
);

const TwoProjects: Page = () => (
  <Slide title="Два проекта, на которых всё проверяли">
    <Row gap={40} style={{ alignItems: 'stretch', height: 520 }}>
      <Card style={{ flex: 1 }}>
        <Row gap={20}>
          <Tag>A</Tag>
          <H>Монолит с 10-летней историей</H>
        </Row>
        <Col gap={22} style={{ marginTop: 36 }}>
          <Check>Документации нет — знания в коде и в головах</Check>
          <Check>Поведение системы никто не может описать целиком</Check>
          <Check>Любая доработка начинается с раскопок</Check>
        </Col>
      </Card>
      <Card style={{ flex: 1 }}>
        <Row gap={20}>
          <Tag>B</Tag>
          <H>Система с микросервисами</H>
        </Row>
        <Col gap={22} style={{ marginTop: 36 }}>
          <Check>Фронт, бэк и пачка сервисов — каждый в своём репо</Check>
          <Check>Одна фича задевает несколько сервисов</Check>
          <Check>Контекст размазан между командами</Check>
        </Col>
      </Card>
    </Row>
    <Bottom>Процесс один и тот же — отличается только то, откуда берётся «как есть»</Bottom>
  </Slide>
);

// ═════════════════════════════════════════════════════════════
// 01 — СКВОЗНОЙ SDD
// ═════════════════════════════════════════════════════════════

const Div01: Page = () => (
  <Section n="01" title="Сквозной SDD" sub="Один артефакт, который не теряется в переводах между ролями" />
);

const WhatIsSdd: Page = () => (
  <Slide title="Что такое SDD">
    <div style={{ width: 1500 }}>
      <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.25 }}>
        Spec-Driven Development — подход, где <Hl>спецификация</Hl> становится единственным источником истины
      </div>
    </div>
    <Row gap={36} style={{ position: 'absolute', top: 260, left: 0, right: 0, alignItems: 'stretch' }}>
      <Card style={{ flex: 1 }}>
        <H color={C.accent}>Сначала намерение</H>
        <P style={{ marginTop: 16 }}>Что и зачем меняем фиксируем в спеке до кода</P>
      </Card>
      <Card style={{ flex: 1 }}>
        <H color={C.accent}>Из спеки — всё</H>
        <P style={{ marginTop: 16 }}>Код, тесты и задачи генерирует агент по спеке</P>
      </Card>
      <Card style={{ flex: 1 }}>
        <H color={C.accent}>Рядом с кодом</H>
        <P style={{ marginTop: 16 }}>Спека живёт в репозитории, а не в вики</P>
      </Card>
    </Row>
    <Bottom>Для аналитика: спека — это ваше ТЗ, которое агент исполняет буквально</Bottom>
  </Slide>
);

const AntiPattern: Page = () => (
  <Slide title="Антипаттерн: SDD только у разработчика">
    <Row gap={10} style={{ marginTop: 20 }}>
      <Role title="Заказчик" sub="встречи" tone="grey" w={300} />
      <Arrow />
      <Role title="Аналитик" sub="Confluence" tone="grey" w={330} />
      <Arrow />
      <Role title="Разработчик" sub="своя спека" tone="accent" w={360} />
      <Arrow />
      <Role title="QA" sub="свои кейсы" tone="grey" w={300} />
    </Row>
    <Col gap={22} style={{ marginTop: 60, width: 1600 }}>
      <Check mark="!" color={C.bad}>Требования падают в тикет текстом — агент их пересказывает заново</Check>
      <Check mark="!" color={C.bad}>QA пишет сценарии по своей интерпретации</Check>
      <Check mark="!" color={C.bad}>Спека разработчика не связана с тем, что согласовал заказчик</Check>
    </Col>
    <Bottom tone="brown">Три перевода — три потери смысла. SDD живёт островом</Bottom>
  </Slide>
);

const EndToEnd: Page = () => (
  <Slide title="Сквозной SDD: одна спека на три роли">
    <Card tone="peach" style={{ padding: '22px 40px', textAlign: 'center' }}>
      <span style={{ fontSize: 38, fontWeight: 700 }}>
        Спеки в репозитории проекта — <Hl>единый источник истины</Hl> вместо Confluence
      </span>
    </Card>
    <Row gap={14} style={{ marginTop: 70, justifyContent: 'center' }}>
      <Role title="Аналитик" sub="/explore /propose" tone="accent" w={380} />
      <Arrow w={56} />
      <Gate />
      <Arrow w={56} />
      <Role title="Разработчик" sub="/apply" tone="white" w={360} />
      <Arrow w={56} />
      <Gate />
      <Arrow w={56} />
      <Role title="Прод" sub="merge" tone="white" w={240} />
    </Row>
    <P style={{ marginTop: 44, textAlign: 'center' }}>QA держит quality gate дважды: после аналитика и после разработчика</P>
    <Bottom>Одни спеки, один язык, сквозная трассировка — главный профит именно здесь</Bottom>
  </Slide>
);

const TwoStates: Page = () => (
  <Slide title="Два состояния контекста">
    <Row gap={40} style={{ alignItems: 'stretch', height: 480 }}>
      <Card style={{ flex: 1 }}>
        <Tag tone="dark">specs/</Tag>
        <div style={{ marginTop: 28, fontSize: 44, fontWeight: 700 }}>Как система работает сейчас</div>
        <P style={{ marginTop: 20 }}>Поддерживаемый источник истины, разложенный по доменам</P>
        <div style={{ marginTop: 36, fontSize: 38, fontWeight: 700, color: C.accent }}>
          Для аналитика — это актуальная документация
        </div>
      </Card>
      <Card style={{ flex: 1 }}>
        <Tag>changes/</Tag>
        <div style={{ marginTop: 28, fontSize: 44, fontWeight: 700 }}>Что и зачем меняем</div>
        <P style={{ marginTop: 20 }}>Активные предложения: каждое — отдельная папка-change</P>
        <div style={{ marginTop: 36, fontSize: 38, fontWeight: 700, color: C.accent }}>
          Для аналитика — это ТЗ на доработку
        </div>
      </Card>
    </Row>
    <Bottom>Change проходит ревью и реализацию → его дельта вливается в specs/</Bottom>
  </Slide>
);

const ChangeAnatomy: Page = () => (
  <Slide title="Анатомия change: кто за что отвечает">
    <Code size={34} style={{ position: 'absolute', left: 0, top: 0, width: 760, height: 560 }}>
      {'changes/\n└── cancel-order/\n    ├── '}<K>proposal.md</K>{'\n    ├── '}<K>specs/</K>{'\n    ├── design.md\n    ├── tasks.md\n    └── test-plan.md'}
      {'\n\n'}<Dim>{'# OpenSpec + наш test-plan'}</Dim>
    </Code>
    <Col gap={20} style={{ position: 'absolute', left: 820, top: 0, width: 940 }}>
      <FileRow file="proposal.md" what="зачем меняем" who="аналитик" own />
      <FileRow file="specs/ (дельта)" what="что меняется" who="аналитик" own />
      <FileRow file="design.md" what="как решаем" who="разработчик" />
      <FileRow file="tasks.md" what="план шагов" who="разработчик" />
      <FileRow file="test-plan.md" what="что проверяем" who="QA" />
    </Col>
    <Bottom>Аналитик владеет «зачем» и «что». «Как» — уже не его зона</Bottom>
  </Slide>
);

const FileRow = ({ file, what, who, own = false }: { file: string; what: string; who: string; own?: boolean }) => (
  <div
    style={{
      display: 'flex', alignItems: 'center', gap: 24, boxSizing: 'border-box', height: 92,
      padding: '0 28px', borderRadius: 18, background: own ? C.peach : '#fff',
      border: `2px solid ${own ? C.accent : C.line}`,
    }}
  >
    <div style={{ width: 290, fontFamily: MONO, fontSize: 30, fontWeight: 700, color: own ? C.accent : C.text }}>{file}</div>
    <div style={{ flex: 1, fontSize: 36, color: C.muted, lineHeight: 1.2 }}>{what}</div>
    <div style={{ fontSize: 36, fontWeight: 700, textAlign: 'right' }}>{who}</div>
  </div>
);

const Lifecycle: Page = () => (
  <Slide title="Жизненный цикл change">
    <Row gap={12} style={{ alignItems: 'stretch' }}>
      <Stage4 cmd="/explore" title="Прожарка" text="Собрать контекст, задать вопросы, накидать варианты" who="аналитик" own />
      <Arrow w={50} />
      <Stage4 cmd="/propose" title="Предложение" text="proposal + дельта спек + test-plan" who="аналитик" own />
      <Arrow w={50} />
      <Stage4 cmd="/apply" title="Реализация" text="Агент пишет код и тесты по tasks" who="разработчик" />
      <Arrow w={50} />
      <Stage4 cmd="/archive" title="Слияние" text="Дельта вливается в specs/" who="автоматически" />
    </Row>
    <Bottom>Archive — момент, когда ваша документация обновилась сама</Bottom>
  </Slide>
);

const Stage4 = ({ cmd, title, text, who, own = false }: {
  cmd: string; title: string; text: string; who: string; own?: boolean;
}) => (
  <Card tone={own ? 'peach' : 'white'} style={{ flex: 1, padding: '32px 30px', border: `2px solid ${own ? C.accent : C.line}` }}>
    <Tag tone={own ? 'accent' : 'dark'}>{cmd}</Tag>
    <div style={{ fontSize: 40, fontWeight: 700, marginTop: 26 }}>{title}</div>
    <P size={36} style={{ marginTop: 14, minHeight: 190 }}>{text}</P>
    <div style={{ fontSize: 32, fontWeight: 700, color: own ? C.accent : C.muted }}>{who}</div>
  </Card>
);

// ═════════════════════════════════════════════════════════════
// 02 — ТРЕБОВАНИЯ ПОД СПЕКИ
// ═════════════════════════════════════════════════════════════

const Div02: Page = () => (
  <Section n="02" title="Требования под спеки" sub="Как писать требования, которые прочитает агент" />
);

const SpecExample: Page = () => (
  <Slide title="Как выглядит требование в спеке">
    <Code size={32} style={{ position: 'absolute', left: 0, top: 0, width: 1110, height: 715 }}>
      <K>## ADDED Requirements</K>{'\n\n'}
      <K>### Requirement:</K>{' Отмена заказа клиентом\n'}
      {'Клиент ДОЛЖЕН иметь возможность отменить\nзаказ до передачи в доставку.\n\n'}
      <K>#### Scenario:</K>{' Заказ ещё собирается\n'}
      {'- '}<K>WHEN</K>{' клиент нажимает «Отменить»\n'}
      {'- '}<K>AND</K>{' статус заказа «Собирается»\n'}
      {'- '}<K>THEN</K>{' статус становится «Отменён»\n'}
      {'- '}<K>AND</K>{' клиенту уходит уведомление'}
    </Code>
    <Col gap={28} style={{ position: 'absolute', left: 1160, top: 0, width: 600 }}>
      <Card style={{ padding: '30px 34px' }}>
        <H size={38} color={C.accent}>Requirement</H>
        <P size={36} style={{ marginTop: 10 }}>Одно правило поведения, коротко и однозначно</P>
      </Card>
      <Card style={{ padding: '30px 34px' }}>
        <H size={38} color={C.accent}>Scenario</H>
        <P size={36} style={{ marginTop: 10 }}>Gherkin: пример, который можно проверить</P>
      </Card>
      <Card tone="brown" style={{ padding: '30px 34px' }}>
        <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>Сценарий = критерий приёмки = будущий тест</div>
      </Card>
    </Col>
  </Slide>
);

const Delta: Page = () => (
  <Slide title="Пишем дельту, а не документ целиком">
    <Row gap={30} style={{ alignItems: 'stretch' }}>
      <DeltaCard tag="ADDED" title="Новое требование" text="Новое правило со своими сценариями" />
      <DeltaCard tag="MODIFIED" title="Изменённое" text="Требование переписываем целиком, а не «добавить пункт 3»" />
      <DeltaCard tag="REMOVED" title="Удалённое" text="Обязательно с причиной и планом миграции" />
    </Row>
    <Col gap={20} style={{ marginTop: 50, width: 1600 }}>
      <Check>Аналитик описывает только изменение — archive сам собирает целое</Check>
      <Check>Ревьюеры видят ровно то, что меняется, а не 40 страниц ТЗ</Check>
    </Col>
  </Slide>
);

const DeltaCard = ({ tag, title, text }: { tag: string; title: string; text: string }) => (
  <Card style={{ flex: 1 }}>
    <Tag>{tag}</Tag>
    <div style={{ fontSize: 42, fontWeight: 700, marginTop: 26 }}>{title}</div>
    <P style={{ marginTop: 14 }}>{text}</P>
  </Card>
);

const CaseMonolith: Page = () => (
  <Slide title="Кейс A: монолит без документации">
    <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.25, width: 1500 }}>
      Не описываем систему заранее — <Hl>источник истины нарастает</Hl> с каждым change
    </div>
    <Col gap={30} style={{ marginTop: 56, width: 1450 }}>
      <Num n="01" title="specs/ стартовали пустыми" sub="Никакого «сначала опишем всё», это месяцы без пользы" />
      <Num n="02" title="Перед change — /explore по коду" sub="Агент восстанавливает текущее поведение в зоне изменений" />
      <Num n="03" title="Фиксируем «как есть», потом «как надо»" sub="Аналитик проверяет восстановленное с заказчиком" />
    </Col>
  </Slide>
);

const CaseMicro: Page = () => (
  <Slide title="Кейс B: микросервисы и мета-репозиторий">
    <Code size={30} style={{ position: 'absolute', left: 0, top: 0, width: 980, height: 715 }}>
      {'meta-repo/\n├── Makefile        '}<Dim>{'# make up → клон всех реп'}</Dim>
      {'\n├── agents.md       '}<Dim>{'# карта проектов'}</Dim>
      {'\n├── '}<K>openspec/</K>{'       '}<Dim>{'# спеки на всю систему'}</Dim>
      {'\n├── frontend/\n│   └── agents.md\n├── backend/\n│   └── agents.md\n├── service-auth/\n│   └── agents.md\n└── service-billing/\n    └── agents.md'}
    </Code>
    <Col gap={30} style={{ position: 'absolute', left: 1040, top: 10, width: 720 }}>
      <Check>Спеки живут в мета-репо, а не в каждом сервисе</Check>
      <Check>Агент видит все сервисы как один монорепо</Check>
      <Check>Аналитик описывает поведение системы, а не сервиса</Check>
      <Check>agents.md в каждой репе работают рекурсивно</Check>
    </Col>
  </Slide>
);

const Sprawl: Page = () => (
  <Slide title="Нюанс: расползание доменов в спеках">
    <P size={40} color={C.text} style={{ width: 1500 }}>
      Без контроля агент на каждый change заводит новый домен — и источник истины дробится
    </P>
    <Row gap={40} style={{ marginTop: 50, alignItems: 'stretch' }}>
      <Code size={32} style={{ width: 640, height: 400 }}>
        {'specs/\n├── orders/\n├── order-cancel/  '}<span style={{ color: '#FF8A80' }}>← дубль</span>
        {'\n├── cancellation/  '}<span style={{ color: '#FF8A80' }}>← дубль</span>{'\n└── payments/'}
      </Code>
      <Col gap={26} style={{ flex: 1, paddingTop: 10 }}>
        <Check>Список доменов фиксирует человек, а не агент</Check>
        <Check>На /propose сначала ищем готовый домен</Check>
        <Check>Новый домен — только с обоснованием на ревью</Check>
        <Check>Дубли регулярно сливаем обратно</Check>
      </Col>
    </Row>
  </Slide>
);

const Gherkin: Page = () => (
  <Slide title="UseCase против Gherkin">
    <Col gap={30} style={{ width: 1500 }}>
      <Num n="01" title="Аналитики попросили UseCase вместо Gherkin" sub="Человеку он читается удобнее" />
      <Num n="02" title="Автотесты деградировали" sub="Gherkin точнее работает как приёмочный критерий" />
      <Num n="03" title="Вернули Gherkin как основу" sub="UseCase генерируем отдельным файлом в change — где он нужен людям" />
    </Col>
    <Bottom tone="brown">Спека пишется в первую очередь для агента и теста, удобство чтения — производное</Bottom>
  </Slide>
);

const SpecQuality: Page = () => (
  <Slide title="Проверка качества спеки до реализации">
    <P size={40} color={C.text} style={{ width: 1500 }}>
      Отдельный скил гоняет change до /apply — ошибка в спеке дешевле ошибки в коде
    </P>
    <Row gap={36} style={{ marginTop: 50, alignItems: 'stretch' }}>
      <Card style={{ flex: 1 }}>
        <H color={C.accent}>Полнота</H>
        <Col gap={16} style={{ marginTop: 22 }}>
          <P>Есть негативные сценарии</P>
          <P>Есть граничные случаи</P>
          <P>Gherkin корректен</P>
        </Col>
      </Card>
      <Card style={{ flex: 1 }}>
        <H color={C.accent}>Критические вопросы</H>
        <Col gap={16} style={{ marginTop: 22 }}>
          <P>Роли и права</P>
          <P>Миграция данных</P>
          <P>Интеграции и нагрузка</P>
        </Col>
      </Card>
      <Card style={{ flex: 1 }}>
        <H color={C.accent}>Связность</H>
        <Col gap={16} style={{ marginTop: 22 }}>
          <P>Нет противоречий со specs/</P>
          <P>Домен не задублирован</P>
          <P>Сценарии есть в test-plan</P>
        </Col>
      </Card>
    </Row>
  </Slide>
);

// ═════════════════════════════════════════════════════════════
// 03 — ДЕНЬ АНАЛИТИКА С АГЕНТОМ
// ═════════════════════════════════════════════════════════════

const Div03: Page = () => (
  <Section n="03" title="День аналитика с агентом" sub="Что изменилось в ежедневной работе" />
);

const BeforeAfter: Page = () => (
  <Slide title="Было и стало">
    <Row gap={40} style={{ alignItems: 'stretch', height: 600 }}>
      <Card style={{ flex: 1, background: '#F6F7F9' }}>
        <Row gap={20}>
          <Tag tone="dark">Было</Tag>
        </Row>
        <Col gap={24} style={{ marginTop: 32 }}>
          <Check color="#8A95A5">Пишу ТЗ в Confluence</Check>
          <Check color="#8A95A5">Хожу к разработчикам: «а как сейчас работает?»</Check>
          <Check color="#8A95A5">Отвечаю на вопросы в тикетах</Check>
          <Check color="#8A95A5">Дока устаревает на второй день</Check>
        </Col>
      </Card>
      <Card tone="peach" style={{ flex: 1, border: `2px solid ${C.accent}` }}>
        <Row gap={20}>
          <Tag>Стало</Tag>
        </Row>
        <Col gap={24} style={{ marginTop: 32 }}>
          <Check>Спрашиваю агента по коду и спекам</Check>
          <Check>Change вместо ТЗ — в репозитории</Check>
          <Check>Ревьюю дельту и test-plan</Check>
          <Check>Дока обновляется на archive</Check>
        </Col>
      </Card>
    </Row>
  </Slide>
);

const Explore: Page = () => (
  <Slide title="/explore: агент отвечает на «как сейчас»">
    <Code size={31} style={{ position: 'absolute', left: 0, top: 0, width: 1250, height: 715, background: '#14100E' }}>
      <K>{'> '}</K>{'Заказчик хочет отменять заказ после оплаты.\n  Что сейчас мешает и что сломается?\n\n'}
      <K>●</K>{' Ищу в спеках…\n'}<Dim>{'  ⎿ specs/orders — «отмена до передачи в доставку»\n'}</Dim>
      <K>●</K>{' Смотрю код…\n'}<Dim>{'  ⎿ orders/Cancel.php — возврат денег не реализован\n'}</Dim>
      <Dim>{'  ⎿ billing — нет частичного возврата\n\n'}</Dim>
      <K>●</K>{' Вопросы к заказчику:\n'}
      {'  1. Возврат полный или за вычетом доставки?\n  2. До какого статуса отмена разрешена?\n  3. Кто инициирует возврат: клиент или менеджер?'}
    </Code>
    <Col gap={30} style={{ position: 'absolute', left: 1300, top: 10, width: 460 }}>
      <H size={40}>Агент разбирается в «как есть»</H>
      <H size={40} color={C.accent}>Аналитик решает «как надо»</H>
      <P>Вопросы к реализации больше не ждут разработчика</P>
    </Col>
  </Slide>
);

const Editor: Page = () => (
  <Slide title="Аналитик из автора становится редактором">
    <Row gap={36} style={{ alignItems: 'stretch' }}>
      <Card style={{ flex: 1 }}>
        <Tag tone="light">proposal.md</Tag>
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 24 }}>Зачем?</div>
        <P style={{ marginTop: 14 }}>Цель и ценность совпадают с тем, что хотел заказчик</P>
      </Card>
      <Card style={{ flex: 1 }}>
        <Tag tone="light">specs/</Tag>
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 24 }}>Что?</div>
        <P style={{ marginTop: 14 }}>Сценарии полны, нет лишнего и противоречий</P>
      </Card>
      <Card style={{ flex: 1 }}>
        <Tag tone="light">test-plan.md</Tag>
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 24 }}>Проверим?</div>
        <P style={{ marginTop: 14 }}>Каждый сценарий спеки покрыт тестом</P>
      </Card>
    </Row>
    <Bottom tone="brown">Черновик пишет агент. Ответственность за смысл — на аналитике</Bottom>
  </Slide>
);

const ChangeNotTask: Page = () => (
  <Slide title="Change — это не задача в трекере">
    <Row gap={40} style={{ alignItems: 'stretch', height: 520 }}>
      <Card style={{ flex: 1, background: '#F6F7F9' }}>
        <H color={C.muted}>Задача в Jira</H>
        <Col gap={20} style={{ marginTop: 28 }}>
          <P>Появляется, когда всё решено</P>
          <P>Хранит «что сделать»</P>
          <P>Живёт отдельно от кода</P>
          <P>Закрыли — смысл потерян</P>
        </Col>
      </Card>
      <Card tone="peach" style={{ flex: 1, border: `2px solid ${C.accent}` }}>
        <H color={C.accent}>Change</H>
        <Col gap={20} style={{ marginTop: 28 }}>
          <P color={C.text}>Начинается ещё на дискавери</P>
          <P color={C.text}>Хранит «зачем» и «как решали»</P>
          <P color={C.text}>Лежит рядом с кодом</P>
          <P color={C.text}>После archive смысл в specs/</P>
        </Col>
      </Card>
    </Row>
    <Bottom>Задачу в трекере можно оставить — но источником истины она больше не является</Bottom>
  </Slide>
);

const NotEverything: Page = () => (
  <Slide title="Не всё нужно проводить через change">
    <Row gap={36} style={{ alignItems: 'stretch' }}>
      <Card style={{ flex: 1 }}>
        <H>Без change</H>
        <Col gap={20} style={{ marginTop: 26 }}>
          <Check>Косметика UI</Check>
          <Check>Баг, когда поведение уже описано в спеке</Check>
        </Col>
      </Card>
      <Card style={{ flex: 1 }}>
        <H>Технический change</H>
        <Col gap={20} style={{ marginTop: 26 }}>
          <Check>Рефакторинг: спека не меняется</Check>
          <Check>Смысл, решение и план всё равно фиксируем</Check>
        </Col>
      </Card>
      <Card tone="peach" style={{ flex: 1, border: `2px solid ${C.accent}` }}>
        <H color={C.accent}>Обычный change</H>
        <Col gap={20} style={{ marginTop: 26 }}>
          <Check>Всё, что меняет поведение системы</Check>
        </Col>
      </Card>
    </Row>
    <Bottom>Границы закреплены в регламенте разрешённых операций</Bottom>
  </Slide>
);

// ═════════════════════════════════════════════════════════════
// 04 — КОМАНДА И ЗАКАЗЧИК
// ═════════════════════════════════════════════════════════════

const Div04: Page = () => (
  <Section n="04" title="Команда и заказчик" sub="Как адаптировали аналитиков и что не получилось с первого раза" />
);

const AnalystsIn: Page = () => (
  <Slide title="Как заходили аналитики">
    <Col gap={36} style={{ width: 1500 }}>
      <Num n="01" title="Опора на то, что уже было" sub="У многих стоял локальный агент для вопросов к реализации" />
      <Num n="02" title="Серия встреч про риски" sub="Главный страх — отказ от Confluence как источника истины" />
      <Num n="03" title="Честно про цену" sub="Docs as code дороже на старте, но работа с агентом окупает это кратно" />
    </Col>
  </Slide>
);

const Rakes: Page = () => (
  <Slide title="Что не получилось с первого раза">
    <Col gap={20}>
      <Rake what="UseCase вместо Gherkin" why="автотесты деградировали — вернули Gherkin" />
      <Rake what="Висящие changes" why="источник истины расходился с продом" />
      <Rake what="У каждого свой набор скилов" why="один change давал разный результат" />
      <Rake what="Агент плодил новые домены" why="спеки дробились и дублировались" />
      <Rake what="Правка заказчика посреди цикла" why="заново гоняли через все роли" />
    </Col>
  </Slide>
);

const Rake = ({ what, why }: { what: string; why: string }) => (
  <div
    style={{
      display: 'flex', alignItems: 'center', gap: 30, boxSizing: 'border-box', height: 112,
      padding: '0 36px', borderRadius: 20, background: '#fff', border: `2px solid ${C.line}`,
    }}
  >
    <div
      style={{
        flex: '0 0 46px', height: 46, borderRadius: 10, background: C.bad, color: '#fff',
        fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      ×
    </div>
    <div style={{ width: 720, fontSize: 38, fontWeight: 700 }}>{what}</div>
    <div style={{ flex: 1, fontSize: 36, color: C.muted }}>{why}</div>
  </div>
);

const Practices: Page = () => (
  <Slide title="Практики, которые прижились">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <Practice tag="гигиена" title="Разбор открытых changes" text="Висящий change — рассинхрон источника истины" />
      <Practice tag="качество входа" title="Скил проверки спеки" text="Прогоняем до /apply, а не после" />
      <Practice tag="воспроизводимость" title="Один harness на всех" text="Одни версии скилов, правил и OpenSpec" />
      <Practice tag="ритм" title="Еженедельный разбор" text="Проблемы проектов по SDD — на общей встрече" />
    </div>
  </Slide>
);

const Practice = ({ tag, title, text }: { tag: string; title: string; text: string }) => (
  <Card style={{ height: 320 }}>
    <div style={{ fontSize: 30, fontWeight: 700, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{tag}</div>
    <div style={{ fontSize: 42, fontWeight: 700, marginTop: 18 }}>{title}</div>
    <P style={{ marginTop: 14 }}>{text}</P>
  </Card>
);

const Customer: Page = () => (
  <Slide title="Заказчик не готов к новым артефактам">
    <P size={40} color={C.text} style={{ width: 1600 }}>
      Заказчик не читает markdown и не ходит в git. Он согласует, как привык, — страницу в Confluence
    </P>
    <Row gap={14} style={{ marginTop: 60, justifyContent: 'center' }}>
      <Role title="Спеки" sub="specs/" tone="accent" w={330} h={180} />
      <Arrow w={70} />
      <Role title="Скил экспорта" sub="человекочитаемо" tone="white" w={420} h={180} />
      <Arrow w={70} />
      <Role title="Confluence" sub="при каждой правке" tone="white" w={380} h={180} />
      <Arrow w={70} />
      <Role title="Заказчик" sub="согласует" tone="grey" w={300} h={180} />
    </Row>
    <Bottom>Правим спеку → страница пересобирается. Параллельной доки, которая устаревает, нет</Bottom>
  </Slide>
);

const CustomerTalk: Page = () => (
  <Slide title="Как договаривались с заказчиком">
    <Col gap={36} style={{ width: 1550 }}>
      <Num n="01" title="Формат согласования не меняем" sub="Заказчик видит ту же страницу, только собранную из спек" />
      <Num n="02" title="Продаём актуальность" sub="Документация обновляется вместе с кодом, а не «когда-нибудь»" />
      <Num n="03" title="Правка = новый change" sub="Видно, что поменялось и зачем, без пересогласования всего ТЗ" />
    </Col>
  </Slide>
);

// ═════════════════════════════════════════════════════════════
// 05 — ОТ СПЕКИ К АВТОТЕСТАМ
// ═════════════════════════════════════════════════════════════

const Div05: Page = () => (
  <Section n="05" title="От спеки к автотестам" sub="Как закрыли разрыв «аналитик — разработка — QA»" />
);

const E2eMistake: Page = () => (
  <Slide title="Ошибка: e2e отдельным шагом QA">
    <FlowLabel tone="bad">Было · v1</FlowLabel>
    <Row gap={12} style={{ marginTop: 18 }}>
      <Role title="Аналитик" sub="/propose" tone="accent" w={300} h={150} />
      <Arrow w={50} />
      <Role title="Разработчик" sub="/apply" tone="white" w={330} h={150} />
      <Arrow w={50} />
      <Role title="QA" sub="пишет e2e" tone="grey" w={300} h={150} />
      <Arrow w={50} />
      <Role title="Прод" tone="white" w={200} h={150} />
    </Row>
    <FlowLabel tone="ok" style={{ marginTop: 50 }}>Стало · v2</FlowLabel>
    <Row gap={12} style={{ marginTop: 18 }}>
      <Role title="Аналитик" sub="/propose" tone="accent" w={300} h={150} />
      <Arrow w={50} />
      <Role title="Разработчик" sub="/apply · код ⇄ e2e" tone="white" w={500} h={150} />
      <Arrow w={50} />
      <Role title="Прод" tone="white" w={200} h={150} />
    </Row>
    <Bottom tone="brown">Агент пишет тесты и правит код в одном цикле. Вынести e2e в отдельную роль — разорвать этот цикл</Bottom>
  </Slide>
);

const FlowLabel = ({ children, tone, style }: { children: React.ReactNode; tone: 'ok' | 'bad'; style?: React.CSSProperties }) => (
  <div style={{ fontSize: 34, fontWeight: 700, color: tone === 'ok' ? C.ok : C.bad, ...style }}>{children}</div>
);

const TestPlan: Page = () => (
  <Slide title="test-plan.md: тест отвечает на сценарий спеки">
    <Row gap={20} style={{ alignItems: 'center' }}>
      <Code size={30} style={{ width: 800, height: 330 }}>
        <Dim>{'specs/orders/spec.md\n\n'}</Dim>
        <K>Scenario:</K>{' Заказ ещё собирается\n'}
        <K>Scenario:</K>{' Заказ уже в доставке\n'}
        <K>Scenario:</K>{' Заказ оплачен'}
      </Code>
      <Arrow w={90} />
      <Code size={30} style={{ width: 800, height: 330 }}>
        <Dim>{'test-plan.md\n\n'}</Dim>
        {'e2e   cancel-while-picking\n'}
        {'e2e   cancel-in-delivery-denied\n'}
        {'integ refund-on-cancel'}
      </Code>
    </Row>
    <Col gap={20} style={{ marginTop: 50 }}>
      <Check>Генерирует агент из proposal и дельты спек</Check>
      <Check>Пирамида: юнит и интеграция, компонентные, e2e</Check>
      <Check>QA ревьюит план, а не пишет тесты руками</Check>
    </Col>
  </Slide>
);

const Trace: Page = () => (
  <Slide title="Трассировка: от строки кода к смыслу">
    <Row gap={14} style={{ marginTop: 30, alignItems: 'stretch' }}>
      <TraceStep n="1" title="Код или тест" text="Строка, которую нужно понять" />
      <Arrow w={56} />
      <TraceStep n="2" title="Коммит" text="git blame → подписан id change" />
      <Arrow w={56} />
      <TraceStep n="3" title="Change" text="Зачем писали и как решали" />
      <Arrow w={56} />
      <TraceStep n="4" title="Спека" text="Как система должна работать" own />
    </Row>
    <Bottom>«Почему здесь так?» — ответ локально, без археологии в трекере</Bottom>
  </Slide>
);

const TraceStep = ({ n, title, text, own = false }: { n: string; title: string; text: string; own?: boolean }) => (
  <Card tone={own ? 'peach' : 'white'} style={{ flex: 1, padding: '32px 30px', border: `2px solid ${own ? C.accent : C.line}` }}>
    <div style={{ fontSize: 30, fontWeight: 700, color: C.accent }}>шаг {n}</div>
    <div style={{ fontSize: 40, fontWeight: 700, marginTop: 14 }}>{title}</div>
    <P size={36} style={{ marginTop: 14 }}>{text}</P>
  </Card>
);

const Spek: Page = () => (
  <Slide title="spek: спеки и changes глазами человека" fade={0.85}>
    <Row gap={30} style={{ alignItems: 'flex-start' }}>
      <Card style={{ padding: 12, width: 1130, height: 700 }}>
        <img src={spekList} alt="spek: список changes" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block', borderRadius: 14 }} />
      </Card>
      <Col gap={26} style={{ flex: 1, paddingTop: 10 }}>
        <Check>Changes с прогрессом по задачам</Check>
        <Check>proposal, design, specs и tasks в одном окне</Check>
        <Check>Коммиты привязаны к change</Check>
      </Col>
    </Row>
  </Slide>
);

const SpekChange: Page = () => (
  <Slide title="spek: один change целиком" fade={0.85}>
    <Card style={{ padding: 12, height: 700 }}>
      <img src={spekChange} alt="spek: просмотр change" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block', borderRadius: 14 }} />
    </Card>
  </Slide>
);

// ═════════════════════════════════════════════════════════════
// ФИНАЛ
// ═════════════════════════════════════════════════════════════

const Bottleneck: Page = () => (
  <Slide title="Узкое место сместилось ближе к аналитике">
    <Row gap={40} style={{ alignItems: 'stretch' }}>
      <Card style={{ width: 560, textAlign: 'center', padding: '48px 30px' }}>
        <div style={{ fontSize: 110, fontWeight: 700, color: C.accent, lineHeight: 1 }}>0–600%</div>
        <P style={{ marginTop: 24 }}>ускорение по типам задач на нашем бейзлайне оценок</P>
      </Card>
      <Col gap={28} style={{ flex: 1, paddingTop: 20 }}>
        <Check>Разработка больше не всегда узкое место</Check>
        <Check>Теперь упираемся в бэклог без DoR</Check>
        <Check>И в путь изменений до прода</Check>
      </Col>
    </Row>
    <Bottom tone="brown">Когда код пишется быстро, качество спеки становится главным ограничением</Bottom>
  </Slide>
);

const Takeaways: Page = () => (
  <Slide title="Главные выводы">
    <Col gap={44} style={{ width: 1600 }}>
      <Num
        n="01"
        title="Начинайте SDD с аналитика"
        sub="Спека, которая рождается у разработчика, уже потеряла смысл заказчика"
      />
      <Num
        n="02"
        title="Одна спека от требований до автотестов"
        sub="Gherkin-сценарий = критерий приёмки = тест"
      />
      <Num
        n="03"
        title="Заказчику — привычный формат, собранный из спек"
        sub="Меняйте источник истины, а не артефакт согласования"
      />
    </Col>
  </Slide>
);

const Thanks: Page = () => (
  <Stage bg={bgDark} dark>
    <img src={logo} alt="Analyst Days" style={{ position: 'absolute', left: 79, top: 69, height: 72 }} />
    <h1 style={{ position: 'absolute', left: 79, top: 380, margin: 0, fontSize: 84, fontWeight: 700 }}>
      Спасибо за внимание!
    </h1>
    <p style={{ position: 'absolute', left: 84, top: 520, margin: 0, fontSize: 44, color: C.onDark }}>
      Вопросы и обратная связь
    </p>
    <p style={{ position: 'absolute', left: 84, top: 880, margin: 0, fontSize: 38, color: C.onDark }}>
      Иван Поддубный · Telegram <b style={{ color: '#fff' }}>@northleshiy</b>
    </p>
    <div
      style={{
        position: 'absolute', left: 1102, top: 338, width: 490, height: 400, boxSizing: 'border-box',
        background: C.brown, border: `2px solid ${C.accent}`, borderRadius: 24, padding: 40,
      }}
    >
      <div style={{ fontSize: 38, fontWeight: 700 }}>Место для QR-кода</div>
      <div style={{ fontSize: 30, color: C.onDark, marginTop: 24, lineHeight: 1.35 }}>
        Организаторы пришлют QR-код для вопросов и обсуждения доклада
      </div>
    </div>
  </Stage>
);

export const meta: SlideMeta = {
  title: 'Сквозной SDD начинается с аналитика · Analyst Days 23',
  createdAt: '2026-11-12T22:31:49.080Z',
};

export default [
  Cover,
  About,
  Clients,
  Hook,
  Poll,
  Plan,
  TwoProjects,
  // 01 — Сквозной SDD
  Div01,
  WhatIsSdd,
  AntiPattern,
  EndToEnd,
  TwoStates,
  ChangeAnatomy,
  Lifecycle,
  // 02 — Требования под спеки
  Div02,
  SpecExample,
  Delta,
  CaseMonolith,
  CaseMicro,
  Sprawl,
  Gherkin,
  SpecQuality,
  // 03 — День аналитика
  Div03,
  BeforeAfter,
  Explore,
  Editor,
  ChangeNotTask,
  NotEverything,
  // 04 — Команда и заказчик
  Div04,
  AnalystsIn,
  Rakes,
  Practices,
  Customer,
  CustomerTalk,
  // 05 — От спеки к автотестам
  Div05,
  E2eMistake,
  TestPlan,
  Trace,
  Spek,
  SpekChange,
  // Финал
  Bottleneck,
  Takeaways,
  Thanks,
] satisfies Page[];
