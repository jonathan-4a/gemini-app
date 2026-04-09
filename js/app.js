/**
 * app.js — Human Voice Lab
 * High-Resolution Forensic Suite with Session Recovery
 */

const state = {
  isSessionActive: false,
  startTime: null,
  timerInterval: null,
  snapshotInterval: null,
  totalWords: 0,
  uniqueWords: 0,
  currentWpm: 0,
  snapshots: [], 
  events: [], 
  pauses: 0,
  flagCount: 0, 
  currentPauseDuration: 0,
  hasActivityInWindow: false,
  cliches: [
    "In conclusion", "Furthermore", "Ultimately", "Think of it as", "Game-changer",
    "It's important to note", "In today's digital age", "Navigating the complexities",
    "A testament to", "Diving deep into", "Delving into", "Unlocking the potential"
  ],
  lastSnapshotWordCount: 0,
  tags: [],
  // Advanced Metrics
  lastKeyEventTime: null,
  keystrokeLatencies: [],
  deletions: 0,
  totalCharsTyped: 0,
  revisionHistory: []
};

function init() {
  document.getElementById('start-session-btn').addEventListener('click', startSession);
  document.getElementById('finish-session-btn').addEventListener('click', finishSession);
  document.getElementById('restore-session-btn').addEventListener('click', restoreSession);
  
  const editor = document.getElementById('editor');
  editor.addEventListener('input', handleInput);
  editor.addEventListener('keydown', handleKeydown);
  editor.addEventListener('paste', handlePaste);
  editor.addEventListener('mouseup', handleTextSelection); 

  document.querySelectorAll('.hc-tag').forEach(btn => {
    btn.addEventListener('click', (e) => tagSelection(e.target.dataset.hc));
  });

  // Check for existing draft
  const savedDraft = localStorage.getItem('hvl_draft');
  if (savedDraft) {
    document.getElementById('restore-session-btn').classList.remove('hidden');
  }
}

function handleKeydown(e) {
  if (!state.isSessionActive) return;

  const now = Date.now();
  
  // Keystroke Dynamics
  if (state.lastKeyEventTime) {
    const latency = now - state.lastKeyEventTime;
    if (latency < 2000) { // Ignore long pauses as latencies
        state.keystrokeLatencies.push(latency);
    }
  }
  state.lastKeyEventTime = now;

  // Revision Tracking
  if (e.key === 'Backspace' || e.key === 'Delete') {
    state.deletions++;
    logEvent('REVISION', `Deletion detected (${e.key}).`, false);
  } else if (e.key.length === 1) {
    state.totalCharsTyped++;
  }
}

function startSession() {
  state.isSessionActive = true;
  state.startTime = Date.now();
  
  document.getElementById('session-controls').classList.add('hidden');
  document.getElementById('stats-bar').classList.remove('hidden');
  
  const editor = document.getElementById('editor');
  editor.classList.remove('disabled');
  editor.setAttribute('contenteditable', 'true');
  editor.focus();

  for (let i = 0; i < 15; i++) {
    state.snapshots.push({ wpm: 0, type: 'NORMAL' });
  }
  renderSpeedGraph();

  state.timerInterval = setInterval(updateTimer, 1000);
  state.snapshotInterval = setInterval(takeRhythmSnapshot, 1000);
}

function restoreSession() {
  const savedDraft = localStorage.getItem('hvl_draft');
  if (savedDraft) {
    const editor = document.getElementById('editor');
    editor.innerHTML = savedDraft; // Restore HTML including tags
    startSession();
    handleInput({ target: editor }); // Update stats
    logEvent('SESSION_RESTORED', 'Resumed from saved draft.', false);
  }
}

function updateTimer() {
  if (!state.isSessionActive) return;
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const secs = (elapsed % 60).toString().padStart(2, '0');
  document.getElementById('timer').innerText = `${mins}:${secs}`;
}

function takeRhythmSnapshot() {
  if (!state.isSessionActive) return;

  const currentWords = state.totalWords;
  const wordsInWindow = currentWords - state.lastSnapshotWordCount;
  const instantWpm = wordsInWindow * 60; 

  let type = 'NORMAL';
  if (!state.hasActivityInWindow) {
    type = 'PAUSE';
    state.currentPauseDuration++;
    if (state.currentPauseDuration === 10) {
      state.pauses++;
      document.getElementById('pause-count').innerText = state.pauses;
      logEvent('DEEP_THOUGHT', 'Reflecting for 10+ seconds.', false); 
    }
  } else {
    state.currentPauseDuration = 0; 
    if (instantWpm > 140) {
      type = 'ANOMALY';
      logEvent('SPEED_BURST', `Burst of ${instantWpm} WPM.`, true); 
    }
  }

  state.snapshots.push({ wpm: instantWpm, type: type });
  state.lastSnapshotWordCount = currentWords;
  state.hasActivityInWindow = false; 
  renderSpeedGraph();
}

function renderSpeedGraph() {
  const graphContainer = document.getElementById('speed-graph');
  if (!graphContainer) return;
  graphContainer.innerHTML = state.snapshots.slice(-18).map(s => {
    const height = Math.min(Math.max((s.wpm / 200) * 80, 4), 80);
    let colorClass = s.type.toLowerCase();
    return `<div class="graph-bar ${colorClass}" style="height: ${height}px"></div>`;
  }).join('');
}

function handleInput(e) {
  if (!state.isSessionActive) return;
  state.hasActivityInWindow = true; 
  
  const editor = document.getElementById('editor');
  const text = editor.innerText;
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  state.totalWords = words;
  document.getElementById('word-count').innerText = `${words} words`;

  const wordsArr = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  state.uniqueWords = new Set(wordsArr).size;
  document.getElementById('unique-words').innerText = `${state.uniqueWords} unique`;
  
  const elapsedMins = (Date.now() - state.startTime) / 60000;
  state.currentWpm = Math.round(words / (elapsedMins || 1));
  document.getElementById('wpm').innerText = `${state.currentWpm} WPM`;

  scanForCliches(text);
  
  // Auto-save HTML to preserve highlights
  localStorage.setItem('hvl_draft', editor.innerHTML);
}

function handlePaste(e) {
  if (!state.isSessionActive) return;
  state.hasActivityInWindow = true; 
  const pastedData = e.clipboardData.getData('text');
  logEvent('PASTE_EVENT', `Pasted ${pastedData.length} chars.`, true);
}

function handleTextSelection() {
  const selection = window.getSelection().toString();
  const menu = document.getElementById('hc-menu');
  if (selection.length > 3) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

function tagSelection(hc) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'hc-highlight';
    span.setAttribute('data-hc', hc);
    span.textContent = selection.toString();
    
    range.deleteContents();
    range.insertNode(span);
    
    state.tags.push({ hc, text: span.textContent });
    logEvent('HC_TAG', `Applied ${hc}.`, false);
    document.getElementById('hc-menu').classList.add('hidden');
    
    // Save state after tagging
    localStorage.setItem('hvl_draft', document.getElementById('editor').innerHTML);
  }
}

function finishSession() {
  state.isSessionActive = false;
  clearInterval(state.timerInterval);
  clearInterval(state.snapshotInterval);
  renderFinalReport();
}

function renderFinalReport() {
  const reportHtml = `
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="report-header">
            <div class="seal-badge"></div>
            <h1>The Authorship Seal</h1>
            <p>Verification of Human Intellectual Effort</p>
        </div>
        <div class="report-grid">
            <div class="report-section">
                <h3>Forensic Audit</h3>
                <p>Words: ${state.totalWords} (${state.uniqueWords} unique)</p>
                <p>Time: ${document.getElementById('timer').innerText}</p>
                <p>Anomalies: ${state.flagCount}</p>
            </div>
            <div class="report-section">
                <h3>Rhythm Profile</h3>
                <p>Avg WPM: ${state.currentWpm}</p>
                <p>Deep Pauses: ${state.pauses}</p>
                <p>HC Tags: ${state.tags.length}</p>
            </div>
        </div>
        <h3>Rhythm Graph (Full History)</h3>
        <div class="speed-graph" style="height: 100px; display: flex; align-items: flex-end; gap: 2px; background: #f2f2f2; padding: 10px; overflow-x: auto; margin-bottom: 2rem;">
            ${state.snapshots.map(s => {
                const height = Math.min(Math.max((s.wpm / 200) * 80, 4), 80);
                return `<div class="graph-bar ${s.type.toLowerCase()}" style="height: ${height}px; width: 6px; flex-shrink: 0;"></div>`;
            }).join('')}
        </div>
        <h3>Final Manuscript</h3>
        <div class="final-essay">${document.getElementById('editor').innerHTML}</div>
        
        <h3>Full Process Log</h3>
        <div class="flag-alerts" style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 10px;">
            ${state.events.map(e => `<div><strong>${e.time}</strong>: ${e.message}</div>`).join('')}
        </div>

        <div style="margin-top: 2rem; text-align: center;">
            <button onclick="window.print()" class="btn-primary">Print Report</button>
            <button onclick="localStorage.removeItem('hvl_draft'); location.reload();" class="btn-secondary">New Session</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', reportHtml);
}

function logEvent(type, message, isAnomaly) {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  state.events.push({ type, message, time: timestamp, isAnomaly });
  
  if (isAnomaly) {
    state.flagCount++;
    document.getElementById('flag-count').innerText = state.flagCount;
  }
  
  const flagList = document.getElementById('flag-alerts');
  flagList.innerHTML = state.events.slice(-3).map(e => `
    <div class="flag-alert" style="border-left: 2px solid ${e.isAnomaly ? 'var(--mu-tangerine)' : 'var(--mu-clay)'}">
      <strong>${e.time}</strong>: ${e.message}
    </div>
  `).join('');
}

function scanForCliches(text) {
  const alertsList = document.getElementById('cliche-alerts');
  const found = state.cliches.filter(c => text.toLowerCase().includes(c.toLowerCase()));
  alertsList.innerHTML = found.length > 0 
    ? found.map(f => `<div class="alert-item">"${f}"</div>`).join('') 
    : '<p class="empty-msg">No clichés.</p>';
}

document.addEventListener('DOMContentLoaded', init);
