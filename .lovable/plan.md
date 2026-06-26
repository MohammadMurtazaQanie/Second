# Birthday Website for Sadia 🎂

A pink, cute, interactive birthday surprise mimicking the reference screenshot's 12-screen flow, themed with Bubu & Dudu (bear couple) instead of cats, and using Sadia's photos on later pages.

## Flow (12 screens, matching the reference)

1. **Lock screen** — Bubu & Dudu GIF in a pink oval frame on the left; 4-digit passcode keypad on the right. Star border. "Enter a passcode".

2-5. **Passcode entry states** — same screen, dots fill in as digits are tapped (1, 2, 3, 4 filled).  
6. **Unlock button appears** — after 4 digits entered, an "UNLOCK" button shows.  
7. **Wrong passcode** — Bubu Dudu sad GIF, "WRONG PASSCODE!", "TRY AGAIN" button → back to lock.  
8. **Surprise prompt** — "I made something special for u, do u wanna see it?" with YES / NO buttons. (NO runs away on hover 😄)  
9. **Why did u click no!?** — only shown if they somehow click no, sad Bubu Dudu, TRY AGAIN.  
10. **HAPPY BIRTHDAY baby** — celebration Bubu Dudu with cake, "From M ❤️".  
11. **My Wish For U** — handwritten-style letter from Murtaza to Sadia (I'll draft warm copy; you can edit).  
12. **Virtual hug for ya! / I MISS YOU** — hugging Bubu Dudu.  
13. **Happiest birthday, my always favorate date** 24.06.2004 and cloud/landscape illustration, YES button with confetti

A small photo gallery of Sadia (the uploaded photos) appears as a polaroid strip on the birthday/wish/hug screens — tucked tastefully so it feels personal, not crowded.

## Passcode

Default: `0619` (her bday date from the final screen). Easy to change in one constant.

## Design

- Palette: soft pinks (#ffd6e0, #ff8fab, #ff5a8a) on cream, matching the reference exactly.
- Rounded card with pink star border, drop shadow, centered on screen.
- Font: cute rounded display (Fredoka or Quicksand) + handwritten (Caveat) for the wish letter.
- Floating hearts/sparkles background animation.
- Smooth fade/slide transitions between screens (Motion for React).
- Confetti burst on final YES.

## Assets

- **Bubu & Dudu**: use public Tenor/Giphy GIF URLs (couple bears) — happy, sad, cake, hugging, kissing variants. Loaded by URL, no upload needed.
- **Sadia's photos**: the 7 uploaded JPGs (excluding the eye close-up and the two video-call screenshots with Murtaza — confirm below) registered via lovable-assets so they're served from CDN, used as a small polaroid gallery + one as a featured photo on the birthday screen.
- Couple video-call photo used on the "My Wish For U" letter screen as a small framed pic.

## Tech

- Single TanStack route `/` driving all 13 screens via local state (no routing complexity).
- Components: `LockScreen`, `WrongScreen`, `SurprisePrompt`, `BirthdayScreen`, `WishLetter`, `HugScreen`, `FinalScreen`, plus shared `CardFrame` with the star border.
- Tokens for pink palette added to `src/styles.css`.
- Background music toggle (optional) — small speaker icon, plays a soft lofi loop. Off by default.

## Quick questions before I build

1. Passcode: use `2004` (her birthday)? Or something else meaningful? Also give her hint
2. Should I exclude the eye close-up photo and use only the 7 full selfies in the gallery? noo, inside my eye, it is her
3. Any specific message you want on the "My Wish For U" letter, or should I write a heartfelt draft you can tweak after?