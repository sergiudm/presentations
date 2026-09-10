'use client';

import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react';

const slideCount = 8;
const presentationSeconds = 6 * 60;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return <span aria-hidden="true">{direction === 'left' ? '←' : '→'}</span>;
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(presentationSeconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const touchStart = useRef<number | null>(null);
  const timerEnd = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(Math.min(slideCount - 1, Math.max(0, index)));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  }, []);

  const toggleTimer = useCallback(() => {
    setTimerRunning((running) => !running);
  }, []);

  const resetTimer = useCallback(() => {
    timerEnd.current = null;
    setTimerRunning(false);
    setRemaining(presentationSeconds);
  }, []);

  useEffect(() => {
    if (!timerRunning) return;
    if (remaining === 0) setRemaining(presentationSeconds);

    timerEnd.current = Date.now() + (remaining === 0 ? presentationSeconds : remaining) * 1000;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil(((timerEnd.current ?? Date.now()) - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) setTimerRunning(false);
    };
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        setCurrent((slide) => Math.min(slideCount - 1, slide + 1));
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        setCurrent((slide) => Math.max(0, slide - 1));
      }
      if (event.key === 'Home') goTo(0);
      if (event.key === 'End') goTo(slideCount - 1);
      if (event.key.toLowerCase() === 'f') toggleFullscreen();
      if (event.key.toLowerCase() === 't') toggleTimer();
      if (event.key.toLowerCase() === 'r') resetTimer();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goTo, resetTimer, toggleFullscreen, toggleTimer]);

  const onPointerDown = (event: PointerEvent) => {
    touchStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent) => {
    if (touchStart.current === null) return;
    const distance = event.clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 50) return;
    setCurrent((slide) =>
      distance < 0 ? Math.min(slideCount - 1, slide + 1) : Math.max(0, slide - 1),
    );
  };

  return (
    <main className="deck-shell">
      <div
        className="deck"
        aria-label="Auto-Research Systems presentation"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <section className={`slide title-slide ${current === 0 ? 'is-active' : ''}`} aria-hidden={current !== 0}>
          <div className="title-orbit orbit-one" />
          <div className="title-orbit orbit-two" />
          <div className="hero-title">
            <span>Auto-Research</span>
            <strong>Systems</strong>
          </div>
          <p className="hero-subtitle">What happens when AI starts doing research?</p>
          <div className="title-footer">
            <span>Sergiu</span>
          </div>
        </section>

        <section className={`slide agenda-slide ${current === 1 ? 'is-active' : ''}`} aria-hidden={current !== 1}>
          <header className="slide-header">
            <p className="eyebrow">Today</p>
            <h2>Three questions</h2>
          </header>
          <div className="question-list">
            <div><b>01</b><p>What is<br /><strong>auto-research?</strong></p></div>
            <div><b>02</b><p>Where does it<br /><strong>work best?</strong></p></div>
            <div><b>03</b><p>What do humans<br /><strong>still do?</strong></p></div>
          </div>
        </section>

        <section className={`slide process-slide ${current === 2 ? 'is-active' : ''}`} aria-hidden={current !== 2}>
          <header className="slide-header compact">
            <p className="eyebrow">Introduction: From Chatbot to Research Agent</p>
            <h2>Auto-research: goal-centered, long running AI agents</h2>
          </header>
          <div className="process-track" aria-label="Goal, Search, Use tools, Check">
            <div className="process-node"><span>01</span><strong>Goal</strong></div>
            <i>→</i>
            <div className="process-node"><span>02</span><strong>Search</strong></div>
            <i>→</i>
            <div className="process-node"><span>03</span><strong>Use tools</strong></div>
            <i>→</i>
            <div className="process-node accent"><span>04</span><strong>Check</strong></div>
          </div>
          <p className="process-caption">Reads sources · Plans steps · Runs experiments or analysis · Produces a report</p>
        </section>

        <section className={`slide verify-slide ${current === 3 ? 'is-active' : ''}`} aria-hidden={current !== 3}>
          <div className="verify-statement">
            <p className="eyebrow">AI Shines When Results Are Verifiable</p>
            <h2>Easy to check <span>=</span> easier to automate</h2>
          </div>
          <div className="fit-lines">
            <div className="fit-good">
              <p>Good fit</p>
              <ul><li>Code can run</li><li>Data can be measured</li><li>Sources can be traced</li></ul>
            </div>
            <div className="fit-hard">
              <p>Harder fit</p>
              <ul><li>Vague goals</li><li>Weak evidence</li><li>Novelty is uncertain</li></ul>
            </div>
          </div>
        </section>

        <section className={`slide human-slide ${current === 4 ? 'is-active' : ''}`} aria-hidden={current !== 4}>
          <p className="eyebrow">Human Role Changes</p>
          <h2>From doing every step to <span>judging the result</span></h2>
          <ul className="human-points">
            <li>Ask important questions</li>
            <li>Set values and constraints</li>
            <li>Review evidence carefully</li>
            <li>Validate before real-world use</li>
          </ul>
        </section>

        <section className={`slide summary-slide ${current === 5 ? 'is-active' : ''}`} aria-hidden={current !== 5}>
          <p className="eyebrow">Summary</p>
          <h2>Auto-research can speed up discovery, but verification is the <span>bottleneck.</span></h2>
          <ol className="summary-points">
            <li><b>01</b><p>Auto-research: goal-centered, long running AI agents.</p></li>
            <li><b>02</b><p>They work best when answers can be (easily) verified.</p></li>
            <li><b>03</b><p>Humans remain essential as reviewers and validators.</p></li>
          </ol>
        </section>

        <section className={`slide discussion-slide ${current === 6 ? 'is-active' : ''}`} aria-hidden={current !== 6}>
          <header>
            <p className="eyebrow">Discussion</p>
            <h2>Questions for<br />the audience</h2>
          </header>
          <div className="discussion-questions">
            <p><b>01</b><span>What research tasks are difficult to automate?</span></p>
            <p><b>02</b><span>If machines can do research, should we still spend years training human scientists?</span></p>
            <p><b>03</b><span>If an AI discovers a treatment but humans cannot fully explain it, would you take it?</span></p>
          </div>
        </section>

        <section className={`slide closing-slide ${current === 7 ? 'is-active' : ''}`} aria-hidden={current !== 7}>
          <div className="closing-motion" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h2>Thank you!</h2>
          <div className="closing-line" />
          <small>Sergiu</small>
        </section>
      </div>

      <nav className="deck-controls" aria-label="Presentation controls">
        <button onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous slide"><Arrow direction="left" /></button>
        <div className="progress" aria-label={`Slide ${current + 1} of ${slideCount}`}>
          {Array.from({ length: slideCount }, (_, index) => (
            <button key={index} onClick={() => goTo(index)} className={current === index ? 'active' : ''} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
        <div className={`timer ${remaining <= 60 ? 'is-urgent' : ''} ${remaining === 0 ? 'is-finished' : ''}`}>
          <button onClick={toggleTimer} aria-label={timerRunning ? 'Pause six-minute timer' : 'Start six-minute timer'} title="Start / pause timer (T)">
            <span className="timer-dot" aria-hidden="true" />
            {formatTime(remaining)}
          </button>
          <button className="timer-reset" onClick={resetTimer} aria-label="Reset timer" title="Reset timer (R)">↺</button>
        </div>
        <span className="slide-number">{String(current + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}</span>
        <button onClick={() => goTo(current + 1)} disabled={current === slideCount - 1} aria-label="Next slide"><Arrow direction="right" /></button>
        <button className="fullscreen" onClick={toggleFullscreen} aria-label="Toggle fullscreen">⛶</button>
      </nav>
      <p className="keyboard-hint">Arrows / swipe to navigate · F fullscreen · T timer</p>
    </main>
  );
}
