(() => {

  const meterFill = document.getElementById('meterFill');
  const meterValue = document.getElementById('meterValue');
  const clicksValue = document.getElementById('clicksValue');
  const highValue = document.getElementById('highValue');
  const bigLine = document.getElementById('bigLine');
  const chillBtn = document.getElementById('chillBtn');

  const pumpLink = document.getElementById('pumpLink');
  const explorerLink = document.getElementById('explorerLink');

  // Add real links later
  pumpLink.href = '#';
  explorerLink.href = '#';


  const STORAGE_KEY = 'capychill_high_v2';

  let meter = 0;
  let clicks = 0;
  let high = Number(localStorage.getItem(STORAGE_KEY) || 0);


  const lines = [

    "stay unbothered.",
    "market noise muted.",
    "vibes restored.",
    "capy does not panic.",
    "still chilling.",
    "touch grass mentally.",
    "no stress allowed.",
    "sideways = fine.",
    "we vibe anyway.",
    "ignore the candles.",
    "inner peace unlocked.",
    "chill > charts.",
    "nothing matters.",
    "serotonin +1",
    "this is fine.",
    "capy approves.",
    "emotional stability gained.",
    "fear rejected.",
    "zen mode active.",
    "holding calmly.",
    "zero rush.",
    "no fomo.",
    "still breathing.",
    "price is noise.",
    "calm is alpha.",
    "relax.",
    "capy therapy.",
    "mind at ease.",
    "bag secure.",
    "soft hands.",
    "vibes only.",
    "low cortisol.",
    "unshakeable.",
    "centered.",
    "balanced.",
    "grounded.",
    "cool head.",
    "slow pulse.",
    "deep breath.",
    "peaceful."

  ];


  function updateUI(){

    const pct = Math.max(0, Math.min(100, meter));

    meterFill.style.width = pct + '%';
    meterValue.textContent = Math.round(pct) + '% chill';

    clicksValue.textContent = clicks;
    highValue.textContent = high;
  }


  function randomLine(){

    const i = Math.floor(Math.random() * lines.length);
    bigLine.textContent = lines[i];
  }


  function onClick(){

    clicks++;

    let gain = 6;

    if(meter > 70) gain = 4;
    if(meter > 90) gain = 2;

    meter = Math.min(100, meter + gain);

    if(clicks > high){
      high = clicks;
      localStorage.setItem(STORAGE_KEY, high);
    }

    if(clicks % 2 === 0){
      randomLine();
    }

    updateUI();
  }


  // Decay
  setInterval(() => {

    let decay = 0.12;

    if(meter > 80) decay = 0.25;
    if(meter > 95) decay = 0.4;

    meter = Math.max(0, meter - decay);

    updateUI();

  }, 250);


  chillBtn.addEventListener('click', onClick);

  updateUI();

})();
