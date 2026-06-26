import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import confetti from "canvas-confetti";
import { StarFrame } from "@/components/birthday/StarFrame";
import { FloatingHearts } from "@/components/birthday/FloatingHearts";

import bgm from "@/assets/birthday-bgm.mp3";
import sadia1 from "@/assets/sadia1.jpg";
import sadia2 from "@/assets/sadia2.jpg";
import sadia3 from "@/assets/sadia3.jpg";
import sadia4 from "@/assets/sadia4.jpg";
import sadia5 from "@/assets/sadia5.jpg";
import sadia6 from "@/assets/sadia6.jpg";
import couple1 from "@/assets/couple1.jpg";
import eyeAsset from "@/assets/eye.jpg";
import biteNew from "@/assets/bite-new.gif";
import hugNew from "@/assets/hug-new.gif";
import duduWave from "@/assets/dudu.gif";

const EXTRA_VIDEO_URL = "https://mohammadmurtazaqanie.github.io/SadiaBirthday/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Sadia 🎂" },
      { name: "description", content: "A little surprise for Sadia from Murtaza ❤️" },
      { property: "og:title", content: "Happy Birthday Sadia 🎂" },
      { property: "og:description", content: "A little surprise for Sadia from Murtaza ❤️" },
    ],
  }),
  component: BirthdayApp,
});

const PASSCODE = "2004";

// Bubu & Dudu only — verified live Tenor URLs
const GIFS = {
  idle: "https://media1.tenor.com/m/mKr-KcMW9RcAAAAC/cute-bears.gif",
  pout: "https://media1.tenor.com/m/Jh24-ZQ2JL4AAAAC/tkthao219-bubududu.gif",
  bite: "https://media1.tenor.com/m/9JnPXvtvArIAAAAC/tkthao219-bubududu.gif",
  peek: "https://media1.tenor.com/m/ylPEHnS2vRsAAAAC/tkthao219-bubududu.gif",
  cake: "https://media1.tenor.com/m/ewl74fH1nM0AAAAC/dudu-and-bubu-eating-dudu-and-bubu-cake.gif",
  hug: "https://media1.tenor.com/m/2HDPlXxcWDcAAAAC/tkthao219-bubududu.gif",
  love: "https://media1.tenor.com/m/LGIdSmr7qUQAAAAC/bubu-love-bubu-dudu-love.gif",
  flowers: "https://media1.tenor.com/m/0cNM_9li440AAAAC/dudu-giving-flowers-bubu-flowers.gif",
  birthday: "https://media1.tenor.com/m/H0OY828LSDQAAAAC/happy-birthday.gif",
};

type Screen =
  | "lock"
  | "wrong"
  | "surprise"
  | "whyno"
  | "birthday"
  | "wish"
  | "hug";

function BirthdayApp() {
  const [screen, setScreen] = useState<Screen>("lock");
  const [code, setCode] = useState("");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleDigit = (d: string) => {
    if (code.length >= 4) return;
    setCode((c) => c + d);
  };
  const handleClear = () => setCode("");
  const handleUnlock = () => {
    if (code === PASSCODE) {
      setScreen("surprise");
      setCode("");
      audioRef.current?.play().catch(() => {});
    } else {
      setScreen("wrong");
    }
  };

  // Auto-show unlock once 4 digits typed, attempt
  useEffect(() => {
    if (code.length === 4) {
      const t = setTimeout(handleUnlock, 350);
      return () => clearTimeout(t);
    }
  }, [code]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <audio ref={audioRef} src={bgm} loop />
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {screen === "lock" && (
            <Slide key="lock">
              <LockScreen code={code} onDigit={handleDigit} onClear={handleClear} onUnlock={handleUnlock} />
            </Slide>
          )}
          {screen === "wrong" && (
            <Slide key="wrong">
              <WrongScreen onRetry={() => { setCode(""); setScreen("lock"); }} />
            </Slide>
          )}
          {screen === "surprise" && (
            <Slide key="surprise">
              <SurpriseScreen
                onYes={() => setScreen("birthday")}
                onNo={() => setScreen("whyno")}
                noPos={noPos}
                setNoPos={setNoPos}
              />
            </Slide>
          )}
          {screen === "whyno" && (
            <Slide key="whyno">
              <WhyNoScreen onRetry={() => setScreen("surprise")} />
            </Slide>
          )}
          {screen === "birthday" && (
            <Slide key="birthday">
              <BirthdayScreen onNext={() => setScreen("wish")} />
            </Slide>
          )}
          {screen === "wish" && (
            <Slide key="wish">
              <WishScreen onNext={() => setScreen("hug")} />
            </Slide>
          )}
          {screen === "hug" && (
            <Slide key="hug">
              <HugScreen />
            </Slide>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- LOCK ---------------- */
function LockScreen({
  code,
  onDigit,
  onClear,
  onUnlock,
}: {
  code: string;
  onDigit: (d: string) => void;
  onClear: () => void;
  onUnlock: () => void;
}) {
  return (
    <StarFrame>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center">
          <div className="relative w-56 h-64 rounded-[50%] overflow-hidden border-[6px] border-pink-strong shadow-lg bg-pink-soft">
            <img src={GIFS.idle} alt="Bubu and Dudu" className="w-full h-full object-cover" />
          </div>
          <p className="mt-3 font-hand text-2xl text-pink-deep">for my Sadia ♥</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-hand text-2xl text-pink-deep mb-3">Enter a passcode</p>
          <div className="flex gap-3 mb-5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-9 h-11 rounded-md border-2 border-pink-strong flex items-center justify-center text-xl font-bold text-pink-deep ${
                  code.length > i ? "bg-pink-mid" : "bg-white"
                }`}
              >
                {code.length > i ? "•" : ""}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["1","2","3","4","5","6","7","8","9"].map((d) => (
              <KeypadBtn key={d} onClick={() => onDigit(d)}>{d}</KeypadBtn>
            ))}
            <KeypadBtn onClick={onClear} small>↺</KeypadBtn>
            <KeypadBtn onClick={() => onDigit("0")}>0</KeypadBtn>
            <KeypadBtn onClick={onUnlock} small>✓</KeypadBtn>
          </div>
          <p className="mt-4 text-xs text-pink-deep/70 font-hand text-lg">
            hint: the year a star was born ✨
          </p>
        </div>
      </div>
    </StarFrame>
  );
}

function KeypadBtn({ children, onClick, small }: { children: React.ReactNode; onClick: () => void; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-full bg-white border-2 border-pink-strong text-pink-deep font-bold text-xl shadow-sm hover:bg-pink-mid hover:scale-105 active:scale-95 transition ${
        small ? "text-base" : ""
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- WRONG ---------------- */
function WrongScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <StarFrame>
      <div className="flex flex-col items-center text-center py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-deep mb-2">oops, not quite ♥</h1>
        <p className="font-hand text-2xl text-pink-deep/80 mb-3">try again, pretty girl</p>
        <img src={biteNew} alt="cute biting" className="w-72 h-72 md:w-64 md:h-64 object-contain mb-4 rounded-2xl" />
        <button
          onClick={onRetry}
          className="px-8 py-3 rounded-full bg-pink-deep text-white font-bold tracking-wide shadow-lg hover:scale-105 transition"
        >
          try again ♥
        </button>
      </div>
    </StarFrame>
  );
}

/* ---------------- SURPRISE ---------------- */
function SurpriseScreen({
  onYes,
  onNo,
  noPos,
  setNoPos,
}: {
  onYes: () => void;
  onNo: () => void;
  noPos: { x: number; y: number };
  setNoPos: (p: { x: number; y: number }) => void;
}) {
  const dodge = () => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 120;
    setNoPos({ x, y });
  };
  return (
    <StarFrame>
      <div className="flex flex-col items-center text-center py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-deep mb-2">
          i made a tiny something for u 🌷
        </h2>
        <p className="text-xl text-pink-deep/80 mb-5">wanna peek inside?</p>
        <img src={GIFS.peek} alt="bubu and dudu peeking" className="w-64 h-64 md:w-52 md:h-52 object-contain mb-6 rounded-2xl" />
        <div className="flex gap-6 items-center justify-center flex-wrap">
          <button
            onClick={onYes}
            className="px-10 py-3 rounded-full bg-pink-deep text-white font-bold text-lg shadow-lg hover:scale-110 transition"
          >
            yes pleaseee ♥
          </button>
          <button
            onClick={onNo}
            className="px-10 py-3 rounded-full bg-white border-2 border-pink-deep text-pink-deep font-bold text-lg shadow hover:scale-105 transition"
          >
            no
          </button>
        </div>
      </div>
    </StarFrame>
  );
}

/* ---------------- WHY NO ---------------- */
function WhyNoScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <StarFrame>
      <div className="flex flex-col items-center text-center py-6">
        <h2 className="text-3xl font-bold text-pink-deep mb-2">heyyy, no fair ♥</h2>
        <p className="font-hand text-2xl text-pink-deep/80 mb-4">I tried soooo hard.</p>
        <img src={GIFS.bite} alt="bubu and dudu love bite" className="w-72 h-72 md:w-60 md:h-60 object-contain mb-4 rounded-2xl" />
        <p className="font-hand text-xl text-pink-deep mb-4">okayyy one more chance, press yes pleaseee 🥺</p>
        <button
          onClick={onRetry}
          className="px-8 py-3 rounded-full bg-pink-deep text-white font-bold tracking-wide shadow-lg hover:scale-105 transition"
        >
          okay, take me back ♥
        </button>
      </div>
    </StarFrame>
  );
}

/* ---------------- BIRTHDAY ---------------- */
function BirthdayScreen({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const id = setInterval(() => {
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.3 }, colors: ["#ff5a8a", "#ffd6e0", "#ff8fab", "#fff"] });
    }, 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <StarFrame>
      <div className="flex flex-col items-center text-center py-2">
        <h1 className="text-5xl md:text-6xl font-bold text-pink-deep mb-2 drop-shadow-sm">
          happy birthday
        </h1>
        <p className="font-hand text-4xl text-pink-strong mb-4">Sadia 🎂🌷</p>
        <img src={GIFS.cake} alt="bubu and dudu cake" className="w-72 h-72 md:w-64 md:h-64 object-contain mb-2 rounded-2xl" />
        <p className="font-hand text-2xl text-pink-deep/80 mb-2">a little cake, a lotta wishes ♥</p>
        <PolaroidRow images={[sadia1, sadia5, sadia2]} />
        <p className="font-hand text-3xl text-pink-deep mt-4">from M ♥</p>
        <NextBtn onClick={onNext} label="there's more ♥" />
      </div>
    </StarFrame>
  );
}

/* ---------------- WISH ---------------- */
function WishScreen({ onNext }: { onNext: () => void }) {
  return (
    <StarFrame>
      <div className="flex flex-col items-center text-center py-2">
        <h2 className="text-3xl font-bold text-pink-deep mb-3">a little wish for u 💌</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start text-left">
          <div className="bg-pink-soft/60 rounded-2xl p-5 font-hand text-2xl leading-snug text-pink-deep">
            <p>dear Sadia,</p>
            <p className="mt-2">
              happiest birthday to the softest soul i know 🌷 i hope today
              feels exactly like u, warm, gentle, a little glittery, and
              full of small good things.
            </p>
            <p className="mt-2">
              i wish u every silly little thing that makes u smile, your
              favourite snacks, peaceful mornings, songs that hit just right,
              and people who see how kind u actually are.
            </p>
            <p className="mt-2">
              thank u for being u. the world is a way nicer place with u
              in it. cheering for u always 🎂✨
            </p>
            <p className="mt-3 text-right">, Murtaza ♥</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img
              src={couple1}
              alt="memory"
              className="w-56 h-56 md:w-40 md:h-40 object-cover rounded-2xl border-4 border-pink-strong shadow-md -rotate-3"
            />
            <img
              src={GIFS.flowers}
              alt="bubu and dudu flowers"
              className="w-56 h-56 md:w-40 md:h-40 object-cover rounded-2xl border-4 border-pink-strong shadow-md rotate-2"
            />
          </div>
        </div>
        <NextBtn onClick={onNext} label="one more thing ♥" />
      </div>
    </StarFrame>
  );
}

/* ---------------- HUG ---------------- */
function HugScreen() {
  useEffect(() => {
    const id = setInterval(() => {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.4 }, colors: ["#ff5a8a", "#ffd6e0", "#ff8fab", "#fff"] });
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <StarFrame>
      <div className="flex flex-col items-center text-center py-4">
        <h2 className="text-3xl font-bold text-pink-deep mb-2">a tiny virtual hug 🤗</h2>
        <img src={hugNew} alt="bubu and dudu hug" className="w-72 h-72 md:w-80 md:h-80 object-contain mb-3 rounded-2xl" />
        <h3 className="text-3xl font-bold text-pink-deep tracking-wide">have the sweetest day ♥</h3>
        <div className="mt-5 flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <img src={eyeAsset} alt="a little detail" className="w-60 h-60 md:w-40 md:h-40 object-cover rounded-full border-4 border-pink-strong" />
          <p className="font-hand text-2xl text-pink-deep text-center md:text-left max-w-xs">
            psst, look closely, there's a tiny u in there 👁️✨
          </p>
        </div>
        <PolaroidRow images={[sadia3, sadia4, sadia6]} />

        <div className="mt-6 flex flex-col items-center gap-3 bg-pink-soft/50 rounded-2xl px-6 py-5 border-2 border-dashed border-pink-strong/50">
          <img src={duduWave} alt="dudu waving" className="w-20 h-20 object-contain" />
          <p className="font-hand text-2xl text-pink-deep">psst… one more little thing for u 🎁</p>
          <a
            href={EXTRA_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-pink-deep text-white font-bold shadow-lg hover:scale-105 transition"
          >
            open my little video ♥
          </a>
        </div>

        <p className="font-hand text-2xl text-pink-deep mt-5">
          happiest birthday, Sadia 🌷<br />, M
        </p>
      </div>
    </StarFrame>
  );
}


/* ---------------- helpers ---------------- */
function PolaroidRow({ images }: { images: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-3">
      {images.map((src, i) => (
        <motion.div
          key={src + i}
          initial={{ opacity: 0, y: 10, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: (i - 1) * 6 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="bg-white p-2 pb-6 shadow-lg"
        >
          <img src={src} alt="Sadia" className="w-28 h-32 md:w-24 md:h-28 object-cover" />
        </motion.div>
      ))}
    </div>
  );
}

function NextBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="mt-5 px-8 py-3 rounded-full bg-pink-deep text-white font-bold shadow-lg hover:scale-105 transition"
    >
      {label}
    </button>
  );
}
