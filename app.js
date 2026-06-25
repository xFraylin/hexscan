/**
 * HexScan — Application Logic
 * ────────────────────────────
 * Handles: file drop, file input, hex paste, signature matching,
 * result rendering, signature table, filtering, hex grid background.
 */

(function () {
  'use strict';

  // ── DOM refs ──────────────────────────────────────────────────
  const dropZone      = document.getElementById('dropZone');
  const fileInput     = document.getElementById('fileInput');
  const browseBtn     = document.getElementById('browseBtn');
  const hexInput      = document.getElementById('hexInput');
  const analyzeBtn    = document.getElementById('analyzeBtn');
  const resultSection = document.getElementById('resultSection');
  const noMatchSection= document.getElementById('noMatchSection');

  // Result elements
  const resultCategory    = document.getElementById('resultCategory');
  const resultFormat      = document.getElementById('resultFormat');
  const resultName        = document.getElementById('resultName');
  const resultDesc        = document.getElementById('resultDesc');
  const resultMeta        = document.getElementById('resultMeta');
  const resultMatchedHex  = document.getElementById('resultMatchedHex');
  const hexDump           = document.getElementById('hexDump');
  const noMatchHex        = document.getElementById('noMatchHex');

  // Table
  const sigTableBody = document.getElementById('sigTableBody');
  const sigSearch    = document.getElementById('sigSearch');
  const catFilters   = document.getElementById('catFilters');
  const countFormats = document.getElementById('countFormats');

  // ── Category metadata ─────────────────────────────────────────
  const CATEGORIES = {
    images:      { label: 'Images',      icon: '🖼',  cls: 'cat-images'      },
    documents:   { label: 'Documents',   icon: '📄',  cls: 'cat-documents'   },
    archives:    { label: 'Archives',    icon: '📦',  cls: 'cat-archives'    },
    executables: { label: 'Executables', icon: '⚙',  cls: 'cat-executables' },
    audio:       { label: 'Audio',       icon: '🎵',  cls: 'cat-audio'       },
    video:       { label: 'Video',       icon: '🎬',  cls: 'cat-video'       },
    databases:   { label: 'Databases',   icon: '🗄',  cls: 'cat-databases'   },
    crypto:      { label: 'Crypto/Keys', icon: '🔑',  cls: 'cat-crypto'      },
    text:        { label: 'Text/Code',   icon: '📝',  cls: 'cat-text'        },
    forensic:    { label: 'Forensic',    icon: '🔍',  cls: 'cat-forensic'    },
    fonts:       { label: 'Fonts',       icon: '🔤',  cls: 'cat-fonts'       },
    other:       { label: 'Other',       icon: '⬡',  cls: 'cat-other'       },
  };

  // ── Sort signatures: longer magic = higher priority ──────────
  const SIGS = [...window.SIGNATURES].sort((a, b) => {
    const la = a.magic.filter(b => b !== null).length;
    const lb = b.magic.filter(b => b !== null).length;
    return lb - la;
  });

  // Update counter
  if (countFormats) countFormats.textContent = SIGS.length + '+';

  // ── Hex background grid ───────────────────────────────────────
  function buildHexGrid() {
    const container = document.getElementById('hexGrid');
    if (!container) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const size = 42;
    const cols = Math.ceil(W / (size * 1.5)) + 1;
    const rows = Math.ceil(H / (size * 0.866)) + 1;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * size * 1.5;
        const y = r * size * 0.866 * 2 + (c % 2 ? size * 0.866 : 0);
        const hex = document.createElementNS(svgNS, 'polygon');
        const pts = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 180) * (60 * i - 30);
          pts.push(`${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`);
        }
        hex.setAttribute('points', pts.join(' '));
        hex.setAttribute('fill', 'none');
        hex.setAttribute('stroke', '#00ffd5');
        hex.setAttribute('stroke-width', '0.5');
        svg.appendChild(hex);
      }
    }
    container.appendChild(svg);
  }

  buildHexGrid();
  window.addEventListener('resize', () => {
    const container = document.getElementById('hexGrid');
    if (container) { container.innerHTML = ''; buildHexGrid(); }
  });

  // ── Signature matching ────────────────────────────────────────
  function matchSignature(bytes) {
    let best = null;
    let bestScore = -1;

    for (const sig of SIGS) {
      const offset = sig.offset || 0;
      const magic  = sig.magic;

      if (offset + magic.length > bytes.length) continue;

      let score = 0;
      let matched = true;

      for (let i = 0; i < magic.length; i++) {
        if (magic[i] === null) continue; // wildcard
        if (bytes[offset + i] !== magic[i]) { matched = false; break; }
        score++;
      }

      if (matched && score > bestScore) {
        best      = sig;
        bestScore = score;
      }
    }

    return best;
  }

  // ── Hex utilities ─────────────────────────────────────────────
  function bytesToHex(bytes, limit = 32) {
    return Array.from(bytes.slice(0, limit))
      .map(b => b.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
  }

  function parseHexInput(str) {
    // Normalize: remove \x, spaces, etc.
    const clean = str.replace(/\\x/g, '').replace(/[^0-9a-fA-F]/g, '');
    const bytes = [];
    for (let i = 0; i < clean.length; i += 2) {
      const hex = clean.slice(i, i + 2);
      if (hex.length === 2) bytes.push(parseInt(hex, 16));
    }
    return new Uint8Array(bytes);
  }

  // ── Render result ─────────────────────────────────────────────
  function showResult(sig, rawBytes) {
    noMatchSection.hidden = true;
    resultSection.hidden  = false;

    const cat  = CATEGORIES[sig.category] || CATEGORIES.other;
    const magic = sig.magic;
    const offset = sig.offset || 0;

    // Category badge
    resultCategory.textContent = `${cat.icon} ${cat.label}`;
    resultCategory.className   = `result-badge ${cat.cls}`;

    // Extensions
    resultFormat.textContent = sig.ext;

    // Name
    resultName.textContent = sig.name;

    // Description
    resultDesc.textContent = sig.desc;

    // Meta chips
    resultMeta.innerHTML = [
      `<div class="result-meta-item"><span>MIME</span><strong>${sig.mime || '—'}</strong></div>`,
      `<div class="result-meta-item"><span>Offset</span><strong>${offset} byte${offset !== 1 ? 's' : ''}</strong></div>`,
      `<div class="result-meta-item"><span>Signature length</span><strong>${magic.length} byte${magic.length !== 1 ? 's' : ''}</strong></div>`,
    ].join('');

    // Matched hex
    const matchedHex = magic
      .map((b, i) => b === null ? '??' : (rawBytes[offset + i] || 0).toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
    resultMatchedHex.textContent = matchedHex;

    // Hex dump with highlights
    hexDump.innerHTML = '';
    const limit = Math.min(rawBytes.length, 32);
    for (let i = 0; i < limit; i++) {
      const span = document.createElement('span');
      span.className = 'hex-byte';
      span.textContent = rawBytes[i].toString(16).padStart(2, '0').toUpperCase();
      // Highlight matched range
      if (i >= offset && i < offset + magic.length && magic[i - offset] !== null) {
        span.classList.add('matched');
      }
      hexDump.appendChild(span);
    }
  }

  function showNoMatch(bytes) {
    resultSection.hidden  = true;
    noMatchSection.hidden = false;
    noMatchHex.textContent = bytesToHex(bytes, 16);
  }

  // ── Analyze bytes ─────────────────────────────────────────────
  function analyze(bytes) {
    if (!bytes || bytes.length === 0) return;
    const sig = matchSignature(bytes);
    if (sig) {
      showResult(sig, bytes);
    } else {
      showNoMatch(bytes);
    }
    // Scroll to result
    setTimeout(() => {
      resultSection.hidden ? noMatchSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                           : resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  // ── File reading ──────────────────────────────────────────────
  function readFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      const bytes = new Uint8Array(e.target.result);
      analyze(bytes);
    };
    reader.readAsArrayBuffer(file.slice(0, 512)); // Read first 512 bytes
  }

  // ── Drop zone events ──────────────────────────────────────────
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  });

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
  });

  browseBtn.addEventListener('click', e => { e.stopPropagation(); fileInput.click(); });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) readFile(fileInput.files[0]);
    fileInput.value = '';
  });

  // ── Hex input analyze ─────────────────────────────────────────
  analyzeBtn.addEventListener('click', () => {
    const val = hexInput.value.trim();
    if (!val) return;
    const bytes = parseHexInput(val);
    if (bytes.length === 0) return;
    analyze(bytes);
  });

  hexInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') analyzeBtn.click();
  });

  // ── Signature table ───────────────────────────────────────────
  let activeCategory = null;
  let searchTerm     = '';

  function buildCatFilters() {
    const all = document.createElement('button');
    all.className = 'cat-btn active';
    all.textContent = 'All';
    all.dataset.cat = '';
    catFilters.appendChild(all);

    const used = [...new Set(SIGS.map(s => s.category))];
    for (const cat of used) {
      const meta = CATEGORIES[cat] || CATEGORIES.other;
      const btn  = document.createElement('button');
      btn.className  = 'cat-btn';
      btn.textContent = `${meta.icon} ${meta.label}`;
      btn.dataset.cat = cat;
      catFilters.appendChild(btn);
    }

    catFilters.addEventListener('click', e => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat || null;
      renderTable();
    });
  }

  function renderTable() {
    const term  = searchTerm.toLowerCase();
    const rows  = SIGS.filter(sig => {
      if (activeCategory && sig.category !== activeCategory) return false;
      if (term) {
        const hay = `${sig.name} ${sig.ext} ${sig.category} ${sig.desc} ${
          sig.magic.map(b => b === null ? '??' : b.toString(16).padStart(2, '0')).join('')
        }`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });

    sigTableBody.innerHTML = '';
    for (const sig of rows) {
      const cat  = CATEGORIES[sig.category] || CATEGORIES.other;
      const hexStr = sig.magic
        .map(b => b === null ? '<span style="color:var(--text-dim)">??</span>' : b.toString(16).padStart(2, '0').toUpperCase())
        .join(' ');

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-name">${sig.name}</td>
        <td class="td-ext">${sig.ext}</td>
        <td class="td-cat"><span class="cat-chip ${cat.cls}">${cat.icon} ${cat.label}</span></td>
        <td class="td-magic">${hexStr}</td>
        <td class="td-offset">${sig.offset || 0}</td>
        <td class="td-desc">${sig.desc}</td>
      `;
      sigTableBody.appendChild(tr);
    }

    // Update count
    let countEl = document.querySelector('.sig-count');
    if (!countEl) {
      countEl = document.createElement('p');
      countEl.className = 'sig-count';
      document.querySelector('.sig-table-wrap').after(countEl);
    }
    countEl.textContent = `Showing ${rows.length} of ${SIGS.length} signatures`;
  }

  sigSearch.addEventListener('input', () => {
    searchTerm = sigSearch.value;
    renderTable();
  });

  // ── Init ──────────────────────────────────────────────────────
  buildCatFilters();
  renderTable();

})();
