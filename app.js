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

  // ── Animated count-up ─────────────────────────────────────────
  function animateCount(el, target, suffix) {
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if (countFormats) animateCount(countFormats, SIGS.length, '+');

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
        hex.setAttribute('stroke', '#4b9fff');
        hex.setAttribute('stroke-width', '0.5');
        hex.setAttribute('stroke-opacity', '0.06');

        // Randomly animate ~25% of cells with staggered glow pulses
        if (Math.random() < 0.25) {
          const dur  = (4 + Math.random() * 7).toFixed(2);
          const delay = -(Math.random() * 12).toFixed(2);
          hex.style.animationName           = 'hexGlow';
          hex.style.animationDuration       = `${dur}s`;
          hex.style.animationDelay          = `${delay}s`;
          hex.style.animationTimingFunction = 'ease-in-out';
          hex.style.animationIterationCount = 'infinite';
        }

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

  // ── ZIP sub-format refinement ─────────────────────────────────
  const ZIP_PK = [0x50, 0x4B, 0x03, 0x04];

  function refineZipFormat(bytes) {
    // Filenames inside ZIP local-file headers are stored uncompressed,
    // so we can scan raw bytes for recognizable path strings.
    let ascii = '';
    for (let i = 0; i < bytes.length; i++) ascii += String.fromCharCode(bytes[i]);

    // ODF formats — mimetype stored uncompressed at byte 38
    if (ascii.includes('vnd.oasis.opendocument.text'))
      return { name: 'ODT — Writer (OpenDocument)', ext: '.odt', category: 'documents', magic: ZIP_PK, offset: 0,
        desc: 'Documento de texto OpenDocument. Formato nativo de LibreOffice Writer. ZIP con archivos XML adentro — el contenido está en content.xml.',
        mime: 'application/vnd.oasis.opendocument.text' };
    if (ascii.includes('vnd.oasis.opendocument.spreadsheet'))
      return { name: 'ODS — Calc (OpenDocument)', ext: '.ods', category: 'documents', magic: ZIP_PK, offset: 0,
        desc: 'Hoja de cálculo OpenDocument. Formato nativo de LibreOffice Calc. Los datos de las celdas están en content.xml dentro del ZIP.',
        mime: 'application/vnd.oasis.opendocument.spreadsheet' };
    if (ascii.includes('vnd.oasis.opendocument.presentation'))
      return { name: 'ODP — Impress (OpenDocument)', ext: '.odp', category: 'documents', magic: ZIP_PK, offset: 0,
        desc: 'Presentación OpenDocument. Formato nativo de LibreOffice Impress. Cada diapositiva está en content.xml dentro del ZIP.',
        mime: 'application/vnd.oasis.opendocument.presentation' };

    // Office Open XML — scan for internal path fragments in filenames
    if (ascii.includes('word/document') || ascii.includes('word/_rels') || ascii.includes('word/settings') || ascii.includes('word/styles'))
      return { name: 'DOCX — Word (Office Open XML)', ext: '.docx', category: 'documents', magic: ZIP_PK, offset: 0,
        desc: 'Documento Word en formato Office Open XML. Internamente es un ZIP — renómbralo a .zip y ábrelo para explorar los XML. El texto principal vive en word/document.xml.',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
    if (ascii.includes('xl/workbook') || ascii.includes('xl/sharedStrings') || ascii.includes('xl/styles') || ascii.includes('xl/_rels'))
      return { name: 'XLSX — Excel (Office Open XML)', ext: '.xlsx', category: 'documents', magic: ZIP_PK, offset: 0,
        desc: 'Hoja de cálculo Excel en formato Office Open XML. ZIP con XML adentro — los datos están en xl/sharedStrings.xml y xl/worksheets/. Renómbralo a .zip para explorarlo.',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
    if (ascii.includes('ppt/presentation') || ascii.includes('ppt/slides') || ascii.includes('ppt/_rels'))
      return { name: 'PPTX — PowerPoint (Office Open XML)', ext: '.pptx', category: 'documents', magic: ZIP_PK, offset: 0,
        desc: 'Presentación PowerPoint en formato Office Open XML. Cada diapositiva vive en ppt/slides/slideN.xml. Renómbralo a .zip y ábrelo para ver la estructura completa.',
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' };

    // Android APK — check before JAR (APK also has META-INF)
    if (ascii.includes('AndroidManifest.xml'))
      return { name: 'APK — Android Package', ext: '.apk', category: 'executables', magic: ZIP_PK, offset: 0,
        desc: 'Paquete de aplicación Android. ZIP con bytecode DEX (classes.dex), recursos compilados, y AndroidManifest.xml con permisos y actividades.',
        mime: 'application/vnd.android.package-archive' };

    // Java Archive
    if (ascii.includes('META-INF/MANIFEST.MF') || (ascii.includes('META-INF/') && ascii.includes('.class')))
      return { name: 'JAR — Java Archive', ext: '.jar', category: 'executables', magic: ZIP_PK, offset: 0,
        desc: 'Java Archive. ZIP con clases .class compiladas y un manifiesto en META-INF/MANIFEST.MF. Ejecutable con "java -jar" si el manifiesto declara Main-Class.',
        mime: 'application/java-archive' };

    return null;
  }

  // ── Plain text fallback ───────────────────────────────────────
  function detectPlainText(bytes) {
    const sample = bytes.slice(0, Math.min(bytes.length, 512));
    if (sample.length === 0) return null;
    let printable = 0;
    for (const b of sample) {
      if ((b >= 0x20 && b <= 0x7E) || b === 0x09 || b === 0x0A || b === 0x0D) printable++;
    }
    if (printable / sample.length < 0.80) return null;
    return {
      name: 'Texto plano',
      ext: '.txt, .csv, .log, .md, .ini, .conf',
      category: 'text',
      magic: [],
      offset: 0,
      desc: 'Archivo de texto plano sin firma de bytes. Detectado porque más del 80% del contenido son caracteres ASCII imprimibles. No existe magic number — la extensión es la única forma de identificar el subtipo.',
      mime: 'text/plain'
    };
  }

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
    const sigLen = magic.length;
    resultMeta.innerHTML = [
      `<div class="result-meta-item"><span>MIME</span><strong>${sig.mime || '—'}</strong></div>`,
      sigLen > 0
        ? `<div class="result-meta-item"><span>Offset</span><strong>${offset} byte${offset !== 1 ? 's' : ''}</strong></div>`
        : '',
      sigLen > 0
        ? `<div class="result-meta-item"><span>Longitud firma</span><strong>${sigLen} byte${sigLen !== 1 ? 's' : ''}</strong></div>`
        : `<div class="result-meta-item"><span>Detección</span><strong>contenido ASCII</strong></div>`,
    ].join('');

    // Matched hex (hidden for plain text which has no magic bytes)
    const hexDisplay = resultMatchedHex.closest('.result-hex-display');
    if (sigLen > 0) {
      const matchedHex = magic
        .map((b, i) => b === null ? '??' : (rawBytes[offset + i] || 0).toString(16).padStart(2, '0').toUpperCase())
        .join(' ');
      resultMatchedHex.textContent = matchedHex;
      if (hexDisplay) hexDisplay.hidden = false;
    } else {
      if (hexDisplay) hexDisplay.hidden = true;
    }

    // Hex dump with highlights
    hexDump.innerHTML = '';
    const limit = Math.min(rawBytes.length, 32);
    for (let i = 0; i < limit; i++) {
      const span = document.createElement('span');
      span.className = 'hex-byte';
      span.textContent = rawBytes[i].toString(16).padStart(2, '0').toUpperCase();
      if (sigLen > 0 && i >= offset && i < offset + magic.length && magic[i - offset] !== null) {
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

    let sig = matchSignature(bytes);

    // Refine ZIP-based formats by scanning internal filenames
    if (sig && sig.name === 'ZIP') sig = refineZipFormat(bytes) || sig;

    // Plain text fallback when no magic bytes match
    if (!sig) sig = detectPlainText(bytes);

    if (sig) {
      showResult(sig, bytes);
    } else {
      showNoMatch(bytes);
    }

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
    reader.readAsArrayBuffer(file.slice(0, 4096));
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
    all.textContent = 'Todos';
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
    countEl.textContent = `Mostrando ${rows.length} de ${SIGS.length} firmas`;
  }

  sigSearch.addEventListener('input', () => {
    searchTerm = sigSearch.value;
    renderTable();
  });

  // ── Init ──────────────────────────────────────────────────────
  buildCatFilters();
  renderTable();

})();
