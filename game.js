/* CAPY CHILL METER
   - Click increases meter + score
   - Meter decays slowly over time
   - High score saved in localStorage
*/

(() => {
  const meterFill = document.getElementById('meterFill');
  const meterValue = document.getElementById('meterValue');
  const clicksValue = document.getElementById('clicksValue');
  const highValue = document.getElementById('highValue');
  const bigLine = document.getElementById('bigLine');
  const chillBtn = document.getElementById('chillBtn');
  const resetBtn = document.getElementById('resetBtn');
  const muteBtn = document.getElementById('muteBtn');

  // Replace these later with your real links (optional)
  const pumpLink = document.getElementById('pumpLink');
  const explorerLink = document.getElementById('explorerLink');
  pumpLink.href = '#';
  explorerLink.href = '#';

  const LSK = 'capychill_highscore_v1';

  let meter = 0;        // 0..100
  let clicks = 0;
  let high = Number(localStorage.getItem(LSK) || 0);

  let soundOn = false;
  let audioCtx = null;

  const lines = [
    'capy is unbothered.',
    'vibes restored.',
    'market noise muted.',
    'touch grass (mentally).',
    'sideways? capy doesn’t care.',
    'we chill regardless.',
    'this is fine.',
    'capy absorbs the volatility.',
    'serotonin +1',
    'still chill.'
  ];

  function setUI() {
    const pct = Math.max(0, Math.min(100, meter));
    meterFill.style.width = `${pct}%`;
    meterValue.textContent = `${Math.round(pct)}%`;
    clicksValue.textContent = String(clicks);
    highValue.textContent = String(high);
  }

  function randomLine() {
    const idx = Math.floor(Math.random() * lines.length);
    bigLine.textContent = lines[idx];
  }

  function beep() {
    if (!soundOn) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = 440 + Math.random() * 120;
      g.gain.value = 0.03;
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + 0.05);
    } catch (_) {}
  }

  function onChill() {
    clicks += 1;

    // Increase meter with diminishing returns near 100
    const gain = meter < 70 ? 6 : meter < 90 ? 4 : 2;
    meter = Math.min(100, meter + gain);

    if (clicks > high) {
      high = clicks;
      localStorage.setItem(LSK, String(high));
    }

    if (clicks % 3 === 0) randomLine();
    beep();
    setUI();

    // Tiny button micro-feedback
    chillBtn.textContent = meter >= 95 ? 'MAX CHILL' : 'CHILL';
  }

  function resetSession() {
    meter = 0;
    clicks = 0;
    chillBtn.textContent = 'CHILL';
    bigLine.textContent = 'Market flat. Capy chill.';
    setUI();
  }

  function toggleSound() {
    soundOn = !soundOn;
    muteBtn.textContent = `Sound: ${soundOn ? 'On' : 'Off'}`;
    if (soundOn) beep();
  }

  // Slow decay loop
  // Every 300ms, decay slightly. Faster decay if meter is high (keeps it interactive).
  setInterval(() => {
    const decay = meter > 85 ? 0.35 : meter > 50 ? 0.25 : meter > 15 ? 0.18 : 0.10;
    meter = Math.max(0, meter - decay);
    if (meter < 95 && chillBtn.textContent !== 'CHILL') chillBtn.textContent = 'CHILL';
    setUI();
  }, 300);

  chillBtn.addEventListener('click', onChill);
  resetBtn.addEventListener('click', resetSession);
  muteBtn.addEventListener('click', toggleSound);

  // Init
  setUI();
})();
