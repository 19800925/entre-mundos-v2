const navItems = document.querySelectorAll('.nav-item');
const screens = document.querySelectorAll('.screen');
const activeKey = 'entreMundos.exacto.active';

function mapTabToScreen(tabId){
  if(tabId === 'mensagem') return 'mensagem';
  return tabId;
}

function showScreen(id){
  const actual = mapTabToScreen(id);
  navItems.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === id));
  screens.forEach(screen => screen.classList.toggle('active', screen.id === actual));
  localStorage.setItem(activeKey, id);
}

navItems.forEach(btn => btn.addEventListener('click', () => showScreen(btn.dataset.tab)));
document.querySelectorAll('.back-to-home').forEach(btn => btn.addEventListener('click', () => showScreen('mensagem')));
showScreen(localStorage.getItem(activeKey) || 'mensagem');

const oraclePhrases = [
  'Tudo o que procuras\nlá fora,\n\njá vive em ti.',
  'Nem tudo o que abranda\nte atrasa.',
  'A tua sensibilidade\nnão é excesso.\nÉ direção.',
  'Hoje, escolhe ficar\nonde a tua alma\nrespira melhor.',
  'Há luz em ti\nmesmo quando\nainda não a vês.',
  'O silêncio\ntambém te responde.',
  'A tua paz vale mais\ndo que a urgência\ndos outros.',
  'Respira antes de decidir.\nA pressa confunde.',
  'O coração\ntambém pede espaço.',
  'Recomeçar também é\numa forma de coragem.',
  'Há beleza em\nabrandar sem culpa.',
  'Nem toda a ferida\nquer resposta.\nAlgumas pedem colo.',
  'És permitido sentir\nsem te perderes.',
  'O invisível\ntambém sustenta.',
  'Há ciclos que acabam\npara que a tua alma\nrespire.',
  'A tua intuição fala baixo.\nFica perto.',
  'O que hoje parece vazio\npode ser espaço sagrado.',
  'Protege a tua energia\nsem endurecer o coração.',
  'Não confundas\nintensidade com destino.',
  'O que te honra\nraramente te esmaga.',
  'Respirar fundo também é\num ato espiritual.',
  'O teu ritmo também\nmerece respeito.',
  'Quando te escolhes,\nalgo em ti\nvolta para casa.',
  'Hoje basta uma coisa:\nnão te abandones.',
  'A tua alma\nnão se atrasa.',
  'Confia no que\nte devolve a ti.',
  'O dia muda quando\nvoltas ao centro.',
  'Há força em\nquem sabe parar.',
  'A tua luz não precisa\nde permissão.',
  'Hoje, sê porto\npara ti mesmo.',
  'Mesmo em transição,\ncontinuas guiado.',
  'Há uma parte tua\nque já sabe\no próximo passo.',
  'A paz começa quando\ndeixas de lutar\ncontra ti.',
  'O que é teu encontra-te\nmesmo sem ruído.',
  'A tua verdade pode ser\nsuave e ainda assim firme.',
  'Há respostas que só aparecem\ndepois do descanso.',
  'Fica onde a tua verdade\nnão encolhe.',
  'Há uma vida em ti\nà espera de menos medo.',
  'Nem sempre é o fim.\nÀs vezes é limpeza.',
  'Também é progresso\nquando escolhes\nnão voltar ao mesmo.',
  'Escuta o que te acalma.\nAí há verdade.',
  'O teu corpo sabe quando\nalgo já não te pertence.',
  'Hoje, menos defesa.\nMais presença.',
  'Mesmo cansado,\ncontinuas inteiro.',
  'Não te apagues para caber\nno dia de ninguém.',
  'Nem tudo precisa de explicação\npara fazer sentido.',
  'O que é leve não é vazio.\nPode ser maturidade.',
  'Há encontros que chegam\nquando paras de correr.',
  'Há portas que só abrem\nquando deixas de forçar.',
  'A tua presença vale mais\ndo que a tua pressa.',
  'Nem tudo o que perdeste\nera teu para sempre.',
  'Também é sagrado\nrepousar.',
  'Aquilo que te chama\nem silêncio\nmerece atenção.',
  'Pára um instante.\nHá mais sabedoria em ti\ndo que pensas.',
  'Há força em quem\nabranda sem culpa.',
  'Hoje, sê abrigo\npara ti.',
  'A calma também pode\ntransformar tudo.',
  'Nem tudo o que dói\né amor.',
  'A tua luz continua,\nmesmo quando vacilas.',
  'Voltar a ti\ntambém é caminho.'
];

let seenOracleIndexes = JSON.parse(localStorage.getItem('entreMundos.exacto.seen') || '[]');
const oracleText = document.getElementById('oracleText');
const oracleCounter = document.getElementById('oracleCounter');
const newOracleBtn = document.getElementById('newOracleBtn');
const shareOracleBtn = document.getElementById('shareOracleBtn');

function updateOracleCounter(){
  oracleCounter.textContent = `${seenOracleIndexes.length || 1} de ${oraclePhrases.length}`;
}
function setOracleText(text){
  oracleText.innerHTML = text.replaceAll('\n', '<br>');
}
function nextOracle(){
  if(seenOracleIndexes.length >= oraclePhrases.length) seenOracleIndexes = [];
  const available = oraclePhrases.map((_, i) => i).filter(i => !seenOracleIndexes.includes(i));
  const pick = available[Math.floor(Math.random() * available.length)];
  seenOracleIndexes.push(pick);
  localStorage.setItem('entreMundos.exacto.seen', JSON.stringify(seenOracleIndexes));
  setOracleText(oraclePhrases[pick]);
  updateOracleCounter();
}
newOracleBtn.addEventListener('click', nextOracle);
shareOracleBtn.addEventListener('click', async () => {
  const text = oracleText.innerText;
  if (navigator.share) {
    try { await navigator.share({ title: 'Entre Mundos', text }); } catch {}
  } else {
    await navigator.clipboard.writeText(text);
    shareOracleBtn.textContent = 'COPIADA';
    setTimeout(() => shareOracleBtn.textContent = 'PARTILHAR', 1200);
  }
});
updateOracleCounter();

const breathOrb = document.getElementById('breathOrb');
const breathText = document.getElementById('breathText');
const startBreathBtn = document.getElementById('startBreathBtn');
const resetBreathBtn = document.getElementById('resetBreathBtn');
let breathTimer = null;
let runningBreath = false;

function resetBreath(){
  clearTimeout(breathTimer);
  runningBreath = false;
  breathOrb.className = 'orb';
  breathText.innerHTML = 'INSPIRA<br><strong>4s</strong>';
}
function runBreathCycle(cycle = 1){
  if (!runningBreath) return;
  breathOrb.className = 'orb expand';
  breathText.innerHTML = 'INSPIRA<br><strong>4s</strong>';
  breathTimer = setTimeout(() => {
    breathOrb.className = 'orb hold';
    breathText.innerHTML = 'SEGURA<br><strong>4s</strong>';
    breathTimer = setTimeout(() => {
      breathOrb.className = 'orb contract';
      breathText.innerHTML = 'EXPIRA<br><strong>6s</strong>';
      breathTimer = setTimeout(() => {
        if (cycle < 5 && runningBreath) runBreathCycle(cycle + 1);
        else resetBreath();
      }, 6000);
    }, 4000);
  }, 4000);
}
startBreathBtn.addEventListener('click', () => {
  resetBreath();
  runningBreath = true;
  runBreathCycle();
});
resetBreathBtn.addEventListener('click', resetBreath);

const silenceTime = document.getElementById('silenceTime');
const silenceRing = document.getElementById('silenceRing');
const presets = document.querySelectorAll('.preset');
const startSilenceBtn = document.getElementById('startSilenceBtn');
const pauseSilenceBtn = document.getElementById('pauseSilenceBtn');
const resetSilenceBtn = document.getElementById('resetSilenceBtn');

let silenceSelected = 120;
let silenceRemaining = 120;
let silenceInterval = null;

function formatTime(sec){
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}
function renderSilence(){
  silenceTime.textContent = formatTime(silenceRemaining);
  const progress = ((silenceSelected - silenceRemaining) / silenceSelected) * 360;
  silenceRing.style.background = `conic-gradient(var(--ring) ${progress}deg, rgba(105,70,150,.55) 0deg)`;
}
function stopSilence(){
  clearInterval(silenceInterval);
  silenceInterval = null;
}
presets.forEach(btn => {
  btn.addEventListener('click', () => {
    presets.forEach(b => b.classList.remove('gold', 'active'));
    btn.classList.add('gold', 'active');
    silenceSelected = Number(btn.dataset.seconds);
    silenceRemaining = silenceSelected;
    stopSilence();
    renderSilence();
  });
});
startSilenceBtn.addEventListener('click', () => {
  stopSilence();
  silenceInterval = setInterval(() => {
    if (silenceRemaining > 0) {
      silenceRemaining--;
      renderSilence();
    } else {
      stopSilence();
    }
  }, 1000);
});
pauseSilenceBtn.addEventListener('click', stopSilence);
resetSilenceBtn.addEventListener('click', () => {
  stopSilence();
  silenceRemaining = silenceSelected;
  renderSilence();
});
renderSilence();
