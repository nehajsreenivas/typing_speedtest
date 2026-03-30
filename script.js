const LEVELS = [
  {
    name: "Rookie", time: 60,
    passages: [
      "the cat sat on the mat",
      "she had a big red ball",
      "the dog ran fast and far",
      "I like to eat cake and pie",
      "he picked up a small blue pen",
    ]
  },
  {
    name: "Novice", time: 60,
    passages: [
      "the sun sets slowly in the west",
      "she smiled and waved from across the room",
      "he drank a warm cup of tea",
      "the birds sang softly in the tall tree",
      "we walked home under the bright full moon",
    ]
  },
  {
    name: "Adept", time: 60,
    passages: [
      "the old clock on the wall ticked very slowly",
      "she opened the window and breathed in the cool air",
      "he put his book down and looked out the window",
      "the children laughed and played until the sun went down",
      "she poured herself a glass of cold water and sat",
    ]
  },
  {
    name: "Skilled", time: 60,
    passages: [
      "The morning light crept through the curtains as she sat at her desk, sipping coffee and watching the city slowly wake up around her.",
      "He spent every evening reading by the fireplace, losing himself in stories of distant lands, curious people, and adventures he could only dream about.",
      "The dog followed him everywhere he went, trotting beside him on quiet streets, always loyal, always patient, always ready for the next long walk.",
    ]
  },
  {
    name: "Expert", time: 60,
    passages: [
      "Learning a new language takes time, patience, and a willingness to make mistakes. The more you practice speaking, the faster your confidence begins to grow.",
      "She trained every day without fail, running through the park at dawn, pushing past the fatigue, knowing that discipline was the only path to progress.",
      "The library was her favourite place in the city. She loved the quiet hum of turning pages, the smell of old books, and the feeling of getting lost in words.",
    ]
  },
  {
    name: "Master", time: 60,
    passages: [
      "Great writing is not about using complex words; it is about choosing the right ones. Clarity, rhythm, and intention matter far more than an impressive vocabulary.",
      "Every skill that looks effortless in the hands of an expert was once slow and clumsy. What separates mastery from mediocrity is simply thousands of hours of deliberate practice.",
      "The city at night felt like a different world altogether. Neon lights reflected off wet pavements, strangers moved quickly through the cold, and somewhere a saxophone played.",
    ]
  },
  {
    name: "Elite", time: 60,
    passages: [
      "The history of science is filled with ideas that were once considered absurd. Galileo was placed under house arrest for suggesting the Earth moved around the sun. Today, we build entire civilisations on that knowledge. Progress rarely arrives with applause; it usually begins with resistance, doubt, and a stubborn refusal to accept the way things have always been done.",
      "She had spent three years learning to paint, not because she wanted to become an artist, but because she needed a language that words could not provide. There are feelings that live in colour and shape, in the drag of a brush and the weight of silence in a room. She found that language slowly, imperfectly, and entirely on her own terms.",
      "The ocean has always humbled those who try to cross it. For centuries, sailors navigated by stars, read the wind, and trusted their instincts over instruments. There was a kind of courage in that — a willingness to move forward with incomplete knowledge, to commit to a direction and adjust along the way, one wave at a time.",
    ]
  },
  {
    name: "Legendary", time: 60,
    passages: [
      "Attention is one of the most valuable things you possess. Every notification, every interruption, every meaningless scroll chips away at your capacity to think deeply. The people who build great things are not necessarily the most talented; they are the ones who learned to protect their focus and direct it, deliberately and consistently, toward what truly matters.",
      "Memory is a strange and unreliable narrator. We do not remember events as they happened; we remember the last time we remembered them. Each recollection subtly reshapes the original. Over time, what we call a memory is less a recording and more a reconstruction — coloured by mood, expectation, and everything we have come to believe since.",
      "Language shapes the way we think in ways that are difficult to perceive from inside a single tongue. The words available to us determine what we can easily express, and therefore what we notice. Some languages have words for emotions that others lack entirely. To learn a new language is not merely practical; it is a small expansion of consciousness.",
    ]
  },
  {
    name: "Mythic", time: 60,
    passages: [
      "Discipline is not the opposite of freedom; it is the foundation of it. The musician who practises scales every morning is not enslaved to routine — she is buying herself the freedom to play anything she wants. Structure, when chosen deliberately, becomes a kind of liberation. It removes the daily negotiation of whether to begin and simply lets you work.",
      "There is a particular quality of silence that exists only in the early hours before the world wakes. It is not the absence of sound so much as the presence of space — room to think without interruption, to exist without performance, to be nobody for a while. Many of the most creative minds in history have guarded these hours fiercely, almost jealously.",
      "We tend to overestimate what we can do in a day and dramatically underestimate what we can do in a decade. A single page written each morning amounts to a novel inside a year. A short walk every evening adds up to hundreds of miles. Compounding is not just a financial principle; it is the quiet engine behind most meaningful human achievement.",
    ]
  },
  {
    name: "GOD MODE", time: 60,
    passages: [
      "Time — our most finite resource — is spent, not saved. You cannot defer it, pause it, or reclaim it; once gone, it is simply gone. Yet most people treat it as though it were abundant: saying yes too easily, delaying what matters, and filling hours with noise rather than meaning. Ask yourself, honestly: does the way you spend your days reflect the life you actually want to live?",
      "What does it mean to think clearly? It means recognising your assumptions, questioning your conclusions, and holding your beliefs loosely enough to revise them when evidence demands it. Clear thinking is uncomfortable — it often leads you somewhere you did not plan to go. But the alternative is worse: moving confidently, even eloquently, in entirely the wrong direction. Precision of thought is rare, and for that reason, extraordinarily valuable.",
      "The great paradox of modern life is this: we have more tools for connection than any generation before us — instant messaging, video calls, social networks spanning the globe — and yet loneliness has never been more widespread. Perhaps connection requires something that technology cannot provide: presence, attention, and the willingness to be truly known. We are, it seems, better at communicating than we are at actually reaching each other.",
    ]
  },
];

// ── STATE ────────────────────────────────────────────────────────────────────
let unlockedLevels = JSON.parse(localStorage.getItem('tq_unlocked') || '[0]');
let totalScore     = parseInt(localStorage.getItem('tq_score') || '0');
let bestWPM        = JSON.parse(localStorage.getItem('tq_bestwpm') || '{}');
let streak         = parseInt(localStorage.getItem('tq_streak') || '0');
let lastPlayed     = localStorage.getItem('tq_last') || '';

let currentLevel = 0, currentPassage = '';
let charIndex = 0, mistakes = 0, totalTyped = 0;
let timeLeft = 60, timerInterval = null;
let started = false, finished = false;

// ── LEVEL SELECT ─────────────────────────────────────────────────────────────
function renderLevelSelect() {
  document.getElementById('totalScoreDisplay').textContent = totalScore;
  document.getElementById('streakDisplay').textContent = streak;
  const grid = document.getElementById('levelGrid');
  grid.innerHTML = '';
  LEVELS.forEach((lvl, i) => {
    const locked = !unlockedLevels.includes(i);
    const card = document.createElement('div');
    card.className = 'level-card' + (locked ? ' locked' : '');
    const best = bestWPM[i];
    card.innerHTML = `
      ${best ? `<div class="best-tag">${best}wpm</div>` : ''}
      <div class="num">${i + 1}</div>
      <div class="stars">${getStars(i)}</div>
      ${locked ? '<div class="lock-icon">🔒</div>' : ''}
    `;
    if (!locked) card.onclick = () => openLevel(i);
    grid.appendChild(card);
  });
}

function getStars(i) {
  if (!unlockedLevels.includes(i)) return '🟤🟤🟤';
  const wpm = bestWPM[i] || 0;
  const lvl = LEVELS[i];
  const target = lvl.time < 20 ? 60 : lvl.time < 30 ? 50 : lvl.time < 40 ? 40 : 30;
  if (wpm >= target * 1.5) return '⭐⭐⭐';
  if (wpm >= target) return '⭐⭐';
  if (wpm > 0) return '⭐';
  return '☆☆☆';
}

function openLevel(i) {
  currentLevel = i;
  document.getElementById('levelSelect').style.display = 'none';
  document.querySelector('.wrapper').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
  setupRound();
}

function goBack() {
  clearInterval(timerInterval);
  document.getElementById('gameScreen').style.display = 'none';
  document.querySelector('.wrapper').style.display = 'block';
  document.getElementById('levelSelect').style.display = 'flex';
  renderLevelSelect();
}

// ── GAME ROUND ───────────────────────────────────────────────────────────────
function setupRound() {
  const lvl = LEVELS[currentLevel];
  charIndex = 0; mistakes = 0; totalTyped = 0; started = false; finished = false;
  timeLeft = lvl.time;
  clearInterval(timerInterval);
  document.getElementById('levelBadge').textContent = `LEVEL ${currentLevel + 1}`;
  document.getElementById('timerVal').textContent = timeLeft + 's';
  document.getElementById('wpmVal').textContent = '0';
  document.getElementById('accVal').textContent = '100%';
  document.getElementById('progressBar').style.width = '0%';
  document.getElementById('inputBox').value = '';
  document.getElementById('inputBox').disabled = true;
  document.getElementById('startBtn').disabled = false;
  currentPassage = lvl.passages[Math.floor(Math.random() * lvl.passages.length)];
  renderPassage();
}

function renderPassage() {
  const words = currentPassage.split(' ');
  let globalIdx = 0;
  const parts = [];
  words.forEach((word, wi) => {
    const charSpans = word.split('').map(ch => {
      const cls = globalIdx === 0 ? 'current' : 'pending';
      const span = `<span class="${cls}" data-idx="${globalIdx}">${ch}</span>`;
      globalIdx++;
      return span;
    }).join('');
    parts.push(`<span class="word-block">${charSpans}</span>`);
    if (wi < words.length - 1) {
      parts.push(`<span class="pending space-char" data-idx="${globalIdx}">&nbsp;</span>`);
      globalIdx++;
    }
  });
  document.getElementById('passageBox').innerHTML = parts.join('');
}

function startRound() {
  if (started) return;
  started = true;
  document.getElementById('inputBox').disabled = false;
  document.getElementById('inputBox').focus();
  document.getElementById('startBtn').disabled = true;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timerVal').textContent = timeLeft + 's';
    updateStats();
    if (timeLeft <= 0) finishRound(false, true);
  }, 1000);
}

function updateStats() {
  const elapsed = LEVELS[currentLevel].time - timeLeft || 0.01;
  const wpm = Math.round((totalTyped / 5) / (elapsed / 60));
  const acc = totalTyped === 0 ? 100 : Math.round(((totalTyped - mistakes) / totalTyped) * 100);
  document.getElementById('wpmVal').textContent = wpm;
  document.getElementById('accVal').textContent = acc + '%';
  document.getElementById('progressBar').style.width = Math.min(100, Math.round((charIndex / currentPassage.length) * 100)) + '%';
}

function finishRound(completed, timeUp = false) {
  clearInterval(timerInterval);
  finished = true;
  document.getElementById('inputBox').disabled = true;
  const lvl = LEVELS[currentLevel];
  const elapsed = lvl.time - timeLeft || 0.01;
  const wpm = Math.round((totalTyped / 5) / (elapsed / 60));
  const acc = totalTyped === 0 ? 0 : Math.round(((totalTyped - mistakes) / totalTyped) * 100);
  const passed = completed && acc === 100;
  let points = 0;
  if (passed) {
    points = Math.round(wpm * (currentLevel + 1) * 10);
    totalScore += points;
    localStorage.setItem('tq_score', totalScore);
    const next = currentLevel + 1;
    if (next < LEVELS.length && !unlockedLevels.includes(next)) {
      unlockedLevels.push(next);
      localStorage.setItem('tq_unlocked', JSON.stringify(unlockedLevels));
    }
    if (!bestWPM[currentLevel] || wpm > bestWPM[currentLevel]) {
      bestWPM[currentLevel] = wpm;
      localStorage.setItem('tq_bestwpm', JSON.stringify(bestWPM));
      showWpmToast(wpm);
    }
    const today = new Date().toDateString();
    if (lastPlayed !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      streak = (lastPlayed === yesterday.toDateString()) ? streak + 1 : 1;
      localStorage.setItem('tq_streak', streak);
      localStorage.setItem('tq_last', today);
      lastPlayed = today;
    }
  }
  showResult(passed, timeUp, wpm, acc, points);
}

function showResult(passed, timeUp, wpm, acc, points) {
  const overlay = document.getElementById('resultOverlay');
  const isLastLevel = currentLevel === LEVELS.length - 1;
  document.getElementById('resultEmoji').textContent = passed ? (isLastLevel ? '👑' : '⭐⭐⭐') : (timeUp ? '⏰' : '❌');
  document.getElementById('resultTitle').textContent = passed ? (isLastLevel ? 'LEGENDARY!' : 'LEVEL CLEARED!') : (timeUp ? "TIME'S UP!" : 'ALMOST!');
  document.getElementById('resultTitle').className = passed ? 'pass' : 'fail';
  document.getElementById('rWpm').textContent = wpm;
  document.getElementById('rAcc').textContent = acc + '%';
  document.getElementById('rScore').textContent = '+' + points;
  let msg = '';
  if (passed) {
    msg = isLastLevel
      ? `You've conquered all levels! ${wpm} WPM at 100% accuracy is truly elite.`
      : `Perfect accuracy! You earned ${points} points and unlocked Level ${currentLevel + 2}.`;
  } else if (timeUp) {
    msg = `You ran out of time! Accuracy was ${acc}%. You need 100% to advance — try again!`;
  } else {
    msg = `Accuracy was ${acc}%. You need 100% to move to the next level. Keep practicing!`;
  }
  document.getElementById('resultMsg').textContent = msg;
  const btns = document.getElementById('resultBtns');
  btns.innerHTML = '';
  if (passed && !isLastLevel) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-primary';
    nextBtn.textContent = 'Next Level →';
    nextBtn.onclick = () => { overlay.classList.remove('show'); currentLevel++; setupRound(); };
    btns.appendChild(nextBtn);
  }
  const retryBtn = document.createElement('button');
  retryBtn.className = passed ? 'btn-secondary' : 'btn-primary';
  retryBtn.textContent = 'Retry';
  retryBtn.onclick = () => { overlay.classList.remove('show'); setupRound(); };
  btns.appendChild(retryBtn);
  const menuBtn = document.createElement('button');
  menuBtn.className = 'btn-secondary';
  menuBtn.textContent = 'Levels';
  menuBtn.onclick = () => { overlay.classList.remove('show'); goBack(); };
  btns.appendChild(menuBtn);
  overlay.classList.add('show');
}

document.getElementById('inputBox').addEventListener('input', function () {
  if (!started || finished) return;
  const typed = this.value;
  const spans = Array.from(document.querySelectorAll('#passageBox [data-idx]'));
  charIndex = 0; mistakes = 0; totalTyped = typed.length;
  for (let i = 0; i < typed.length && i < currentPassage.length; i++) {
    spans[i].className = typed[i] === currentPassage[i] ? 'correct' : 'wrong';
    if (typed[i] !== currentPassage[i]) mistakes++;
    charIndex = i + 1;
  }
  for (let i = charIndex; i < spans.length; i++) {
    spans[i].className = i === charIndex ? 'current' : 'pending';
  }
  updateStats();
  if (mistakes > 0) {
    document.getElementById('passageBox').classList.remove('shake');
    void document.getElementById('passageBox').offsetWidth;
    document.getElementById('passageBox').classList.add('shake');
  }
  if (charIndex === currentPassage.length) finishRound(true);
});

// ── PRACTICE MODE ─────────────────────────────────────────────────────────────
const PRACTICE_PASSAGES = [
  "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one.",
  "In the middle of every difficulty lies opportunity. It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
  "You don't have to be great to start, but you have to start to be great. Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown.",
  "Reading is to the mind what exercise is to the body. A reader lives a thousand lives before he dies. The man who never reads lives only one. Books are a uniquely portable magic.",
  "The best time to plant a tree was twenty years ago. The second best time is now. Do not wait until the conditions are perfect to begin. Beginning makes the conditions perfect.",
  "Simplicity is the ultimate sophistication. The ability to simplify means to eliminate the unnecessary so that the necessary may speak. In character, in manners, in style — simplicity is the supreme excellence.",
];

let pPassage = '';
let pCharIndex = 0, pMistakes = 0, pTotalTyped = 0;
let pElapsed = 0, pTimerInterval = null;
let pStarted = false, pFinished = false;
let pUsingCustom = false;

function openPractice() {
  document.querySelector('.wrapper').style.display = 'none';
  document.getElementById('practiceScreen').style.display = 'block';
  document.getElementById('customToggle').checked = false;
  document.getElementById('customTextWrap').style.display = 'none';
  pUsingCustom = false;
  setupPractice();
}

function closePractice() {
  clearInterval(pTimerInterval);
  document.getElementById('practiceScreen').style.display = 'none';
  document.querySelector('.wrapper').style.display = 'block';
  document.getElementById('levelSelect').style.display = 'flex';
  renderLevelSelect();
}

function toggleCustomText() {
  const on = document.getElementById('customToggle').checked;
  document.getElementById('customTextWrap').style.display = on ? 'block' : 'none';
  pUsingCustom = on;
  if (!on) setupPractice();
}

function loadCustomText() {
  const raw = document.getElementById('customTextInput').value.trim();
  if (!raw) return;
  pPassage = raw.replace(/\s+/g, ' ');
  resetPracticeRound();
}

function setupPractice() {
  pPassage = PRACTICE_PASSAGES[Math.floor(Math.random() * PRACTICE_PASSAGES.length)];
  resetPracticeRound();
}

function resetPracticeRound() {
  clearInterval(pTimerInterval);
  pCharIndex = 0; pMistakes = 0; pTotalTyped = 0;
  pElapsed = 0; pStarted = false; pFinished = false;
  document.getElementById('pTimerVal').textContent = '0s';
  document.getElementById('pWpmVal').textContent = '0';
  document.getElementById('pAccVal').textContent = '100%';
  document.getElementById('pProgressBar').style.width = '0%';
  document.getElementById('pInputBox').value = '';
  document.getElementById('pInputBox').disabled = true;
  document.getElementById('pStartBtn').disabled = false;
  renderPracticePassage();
}

function renderPracticePassage() {
  const words = pPassage.split(' ');
  let globalIdx = 0;
  const parts = [];
  words.forEach((word, wi) => {
    const charSpans = word.split('').map(ch => {
      const cls = globalIdx === 0 ? 'current' : 'pending';
      const span = `<span class="${cls}" data-idx="${globalIdx}">${ch}</span>`;
      globalIdx++;
      return span;
    }).join('');
    parts.push(`<span class="word-block">${charSpans}</span>`);
    if (wi < words.length - 1) {
      parts.push(`<span class="pending space-char" data-idx="${globalIdx}">&nbsp;</span>`);
      globalIdx++;
    }
  });
  document.getElementById('pPassageBox').innerHTML = parts.join('');
}

function startPractice() {
  if (pStarted) return;
  pStarted = true;
  document.getElementById('pInputBox').disabled = false;
  document.getElementById('pInputBox').focus();
  document.getElementById('pStartBtn').disabled = true;
  pTimerInterval = setInterval(() => {
    pElapsed++;
    document.getElementById('pTimerVal').textContent = pElapsed + 's';
    updatePracticeStats();
  }, 1000);
}

function updatePracticeStats() {
  const elapsed = pElapsed || 0.01;
  const wpm = Math.round((pTotalTyped / 5) / (elapsed / 60));
  const acc = pTotalTyped === 0 ? 100 : Math.round(((pTotalTyped - pMistakes) / pTotalTyped) * 100);
  document.getElementById('pWpmVal').textContent = wpm;
  document.getElementById('pAccVal').textContent = acc + '%';
  document.getElementById('pProgressBar').style.width =
    Math.min(100, Math.round((pCharIndex / pPassage.length) * 100)) + '%';
}

function finishPractice() {
  clearInterval(pTimerInterval);
  pFinished = true;
  document.getElementById('pInputBox').disabled = true;
  const elapsed = pElapsed || 0.01;
  const wpm = Math.round((pTotalTyped / 5) / (elapsed / 60));
  const acc = pTotalTyped === 0 ? 100 : Math.round(((pTotalTyped - pMistakes) / pTotalTyped) * 100);
  const msgs = [
    `Great session! You typed at ${wpm} WPM with ${acc}% accuracy. No pressure, just progress.`,
    `Solid effort! ${wpm} WPM and ${acc}% accuracy. Every rep makes you faster.`,
    `Nice work! You finished in ${elapsed}s — ${wpm} WPM and ${acc}% accuracy. Keep it up!`,
  ];
  document.getElementById('prWpm').textContent = wpm;
  document.getElementById('prAcc').textContent = acc + '%';
  document.getElementById('prTime').textContent = elapsed + 's';
  document.getElementById('prChars').textContent = pTotalTyped;
  document.getElementById('pResultMsg').textContent = msgs[Math.floor(Math.random() * msgs.length)];
  document.getElementById('practiceResultOverlay').classList.add('show');
}

function retryPractice() {
  document.getElementById('practiceResultOverlay').classList.remove('show');
  resetPracticeRound();
}

function closePracticeResult() {
  document.getElementById('practiceResultOverlay').classList.remove('show');
  closePractice();
}

document.getElementById('pInputBox').addEventListener('input', function () {
  if (!pStarted || pFinished) return;
  const typed = this.value;
  const spans = Array.from(document.querySelectorAll('#pPassageBox [data-idx]'));
  pCharIndex = 0; pMistakes = 0; pTotalTyped = typed.length;
  for (let i = 0; i < typed.length && i < pPassage.length; i++) {
    spans[i].className = typed[i] === pPassage[i] ? 'correct' : 'wrong';
    if (typed[i] !== pPassage[i]) pMistakes++;
    pCharIndex = i + 1;
  }
  for (let i = pCharIndex; i < spans.length; i++) {
    spans[i].className = i === pCharIndex ? 'current' : 'pending';
  }
  updatePracticeStats();
  if (pMistakes > 0) {
    document.getElementById('pPassageBox').classList.remove('shake');
    void document.getElementById('pPassageBox').offsetWidth;
    document.getElementById('pPassageBox').classList.add('shake');
  }
  if (pCharIndex === pPassage.length) finishPractice();
});

// ── WPM TOAST ────────────────────────────────────────────────────────────────
function showWpmToast(wpm) {
  const messages = [
    `You just hit <strong>${wpm} WPM</strong> — that's your fastest ever on this level. You're on fire! 🔥`,
    `<strong>${wpm} WPM</strong>? That's a new personal best! Your fingers are flying — keep going!`,
    `New record: <strong>${wpm} WPM</strong>! Every practice session is paying off. Well done!`,
    `Look at you — <strong>${wpm} WPM</strong> and a brand new personal best! You're getting seriously good at this.`,
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById('toastMsg').innerHTML = msg;
  document.getElementById('wpmToast').classList.add('show');
}

function closeWpmToast() {
  document.getElementById('wpmToast').classList.remove('show');
}

// ── INIT ─────────────────────────────────────────────────────────────────────
renderLevelSelect();
