"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "../../i18n/en";
import { popFile } from "../../assets";
import Scene from "../Scene";
import { useOnScreen, useReducedMotion } from "../useReducedMotion";

// A short conversation, staged: three asks, each with a beat of thinking, the reply, and
// the Pop changing with it. Every state is the same Studio Pop captured in DockPops 6.0
// after that message, and every reply is the Assistant's own answer (on-device).
const SHOTS = [
  { src: "assistant/step-0.webp", width: 590, height: 914 }, // Ocean, Grid
  { src: "assistant/step-1.webp", width: 758, height: 914 }, // + Pages
  { src: "assistant/step-2.webp", width: 894, height: 658 }, // List
  { src: "assistant/step-3.webp", width: 906, height: 670 }, // Gold Leaf
];
const STAGE = { width: 906, height: 914 };
const START = 600; // ms before the first ask
const EXCHANGE = 3400; // ms per exchange
const BEATS = [0, 800, 2000]; // ms from an ask to: the ask, the thinking dots, the reply

/** Just ask: the Assistant changing a Pop over a short conversation. */
export default function AssistantScene({ t }: { t: Dict }) {
  const scene = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(scene, "-20% 0px");
  const reduce = useReducedMotion();
  const exchanges = t.assistant.exchanges;
  const last = exchanges.length * BEATS.length;
  const [beat, setBeat] = useState(0);
  const [run, setRun] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    if (reduce) {
      setBeat(last);
      return;
    }
    if (!onScreen || (played.current && run === 0)) return;
    played.current = true;
    setBeat(0);
    const timers = exchanges.flatMap((_, i) =>
      BEATS.map((offset, j) =>
        window.setTimeout(() => setBeat(i * BEATS.length + j + 1), START + i * EXCHANGE + offset),
      ),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [onScreen, reduce, run, exchanges, last]);

  const answered = Math.floor(beat / BEATS.length); // replies shown = the Pop's state
  const done = beat >= last;
  return (
    <Scene
      id="assistant"
      wallpaper="shutters"
      title={t.assistant.title}
      body={<p>{t.assistant.body}</p>}
      note={t.assistant.note}
      layout="side"
      sectionRef={scene}
    >
      <div className="dp-assistant">
        <div className="dp-assistant-pop" style={{ aspectRatio: `${STAGE.width} / ${STAGE.height}` }}>
          {SHOTS.map((shot, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={shot.src}
              src={popFile(shot.src)}
              alt=""
              width={shot.width / 2}
              height={shot.height / 2}
              style={{ width: `${(shot.width / STAGE.width) * 100}%` }}
              data-shown={i === answered}
            />
          ))}
        </div>
        <div className="dp-chat" aria-live="polite">
          <div className="dp-chat-head">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
              <path d="M8 1l1.4 4.1L13.5 6.5 9.4 7.9 8 12 6.6 7.9 2.5 6.5l4.1-1.4z M13 10.5l.6 1.5 1.4.5-1.4.5-.6 1.5-.6-1.5-1.4-.5 1.4-.5z" fill="currentColor" />
            </svg>
            {t.assistant.panel}
          </div>
          <div className="dp-chat-log">
            {exchanges.map((x, i) => {
              const at = beat - i * BEATS.length;
              if (at < 1) return null;
              return (
                <div key={x.ask} className="dp-chat-exchange">
                  <p className="dp-chat-ask">{x.ask}</p>
                  {at === 2 && (
                    <p className="dp-chat-thinking" aria-label="…">
                      <i />
                      <i />
                      <i />
                    </p>
                  )}
                  {at >= 3 && (
                    <>
                      <p className="dp-chat-reply">{x.reply}</p>
                      <p className="dp-chat-changed">{x.changed}</p>
                      {/* The app offers Undo on the latest change only. */}
                      {i === answered - 1 && (
                        <p className="dp-chat-undo">
                          <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden>
                            <path d="M6 3L2.5 6.5 6 10M3 6.5h6.5a4 4 0 010 8H7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {t.assistant.undo}
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="dp-chat-input">{t.assistant.placeholder}</div>
        </div>
        {done && !reduce && (
          <button type="button" className="dp-replay dp-on-wall" onClick={() => setRun((r) => r + 1)}>
            {t.assistant.replay}
          </button>
        )}
      </div>
    </Scene>
  );
}
