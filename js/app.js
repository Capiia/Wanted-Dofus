const { ipcRenderer } = require('electron');

// === DATA === m = milice (source: dofuspourlesnoobs.com CSS classes)
const B = [
  // Alignement (19) - al = ordre requis (0 = juste aligne, 1-5 = ordre)
  {n:"Sam Sagaz",lv:1,alReq:1,ord:0,ali:2,z:"Prairies d'Astrub",p:"Invulnerable",m:"Alignement"},
  {n:"Ma\u00eetre Boulet",lv:1,alReq:1,ord:0,ali:3,z:"Bord de la for\u00eat mal\u00e9fique",p:"Aucune",m:"Alignement"},
  {n:"Roub' Ignolles",lv:1,alReq:10,ord:0,ali:4,z:"Cimeti\u00e8re",p:"Aucune",m:"Alignement"},
  {n:"Bouss Baybe",lv:1,alReq:10,ord:0,ali:5,z:"Plaine des Porkass",p:"Aucune",m:"Alignement"},
  {n:"Nono le Wobot",lv:1,al:1,ord:1,ali:6,z:"\u00celot de la Couronne",p:"Reduction melee",m:"Alignement"},
  {n:"Armada l'Invincible",lv:1,al:1,ord:1,ali:7,z:"Arche d'Otoma\u00ef",p:"Invulnerable",m:"Alignement"},
  {n:"Dragodingo",lv:1,al:1,ord:1,ali:8,z:"Territoire des Dragodindes Sauvages",p:"Aucune",m:"Alignement"},
  {n:"Degolas",lv:1,al:1,ord:1,ali:9,z:"Chemin du Cr\u00e2ne",p:"Aucune",m:"Alignement"},
  {n:"Prince Marchand",lv:1,al:2,ord:2,ali:10,z:"Territoire des Porcos",p:"Reduction melee, Reduction distance",m:"Alignement"},
  {n:"Gobrechaun",lv:1,al:2,ord:2,ali:11,z:"Plaines herbeuses",p:"Aucune",m:"Alignement"},
  {n:"Vashkiwi",lv:1,al:2,ord:2,ali:12,z:"\u00cele du Minotoror",p:"Aucune",m:"Alignement"},
  {n:"J\u00e9rart Dupaindur",lv:1,al:2,ord:2,ali:13,z:"Terrdala",p:"Aucune",m:"Alignement"},
  {n:"Darma",lv:1,al:3,ord:3,ali:14,z:"Village de la Canop\u00e9e",p:"Resistance armes",m:"Alignement"},
  {n:"Mogligli",lv:1,al:3,ord:3,ali:15,z:"Landes de Cania",p:"Aucune",m:"Alignement"},
  {n:"Glandaf l'Aigri",lv:1,al:3,ord:3,ali:16,z:"Tronc de l'arbre Hakam",p:"Aucune",m:"Alignement"},
  {n:"Crasper",lv:1,al:3,ord:3,ali:17,z:"Mont des Tombeaux",p:"Aucune",m:"Alignement"},
  {n:"Carter le Pillard",lv:1,al:4,ord:4,ali:18,z:"Caverne des Fungus",p:"Invulnerable",m:"Alignement"},
  {n:"Sans Visage",lv:1,alReq:79,ord:5,ali:19,z:"Cit\u00e9 de Sufokia",p:"Aucune",m:"Alignement"},
  {n:"Le Fant\u00f4me Bra\u00efdeur",lv:1,al:5,ord:5,ali:20,z:"Caserne du Jour sans fin",p:"Reduction distance",m:"Alignement"},
  // Astrub (11)
  {n:"Fouduglen l'\u00c9cureuil",lv:9,dop:120,z:"Cit\u00e9 d'Astrub",p:"Aucune",m:"Astrub"},
  {n:"Frakacia Leukocytine",lv:19,dop:180,z:"For\u00eat d'Astrub",p:"Aucune",m:"Astrub"},
  {n:"Ogivol Scalarcin",lv:40,dop:300,z:"Bordure de Br\u00e2kmar",p:"Aucune",m:"Astrub"},
  {n:"Brumen Tinctorias",lv:39,dop:360,z:"D\u00e9solation de Sidimote",p:"Aucune",m:"Astrub"},
  {n:"Marzwel le Gobelin",lv:39,dop:360,z:"Massif de Cania",p:"Aucune",m:"Astrub"},
  {n:"Qil Bil",lv:49,dop:480,z:"Cimeti\u00e8re des Tortur\u00e9s",p:"Aucune",m:"Astrub"},
  {n:"Aermyne 'Braco' Scalptaras",lv:59,dop:480,z:"For\u00eat de Kaliptus",p:"Aucune",m:"Astrub"},
  {n:"Musha l'Oni",lv:59,dop:480,z:"Baie de Cania",p:"Aucune",m:"Astrub"},
  {n:"Rok Gnorok",lv:69,dop:600,z:"Lacs enchant\u00e9s",p:"Aucune",m:"Astrub"},
  {n:"Padgref Demo\u00ebl",lv:109,dop:1080,z:"Bois de Litneg",p:"Aucune",m:"Astrub"},
  {n:"Zato\u00efshwan",lv:129,dop:1320,z:"Feudala",p:"Aucune",m:"Astrub"},
  // Base des Justiciers (4)
  {n:"Guman",lv:9,dop:180,z:"Champ des Ingalsse",p:"Aucune",m:"Base des Justiciers"},
  {n:"Gadoo",lv:39,dop:360,z:"Mar\u00e9cages sans fond",p:"Aucune",m:"Base des Justiciers"},
  {n:"Amy l'empoisonneuse",lv:119,dop:1200,z:"Jungle obscure",p:"Aucune",m:"Base des Justiciers"},
  {n:"Hyperscampe",lv:179,dop:2040,z:"Salles des Ab\u00eemes",p:"Invulnerable",m:"Base des Justiciers"},
  // Chateau d'Amakna (13)
  {n:"Tyranne la Terrible",lv:59,dop:600,z:"For\u00eat Sombre",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Simbadas",lv:69,dop:600,z:"Route des Roulottes",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Carlita de l'Aguerfelde",lv:79,dop:720,z:"Hauts des Hurlements",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Naganita",lv:79,dop:720,z:"\u00cele de Kartonpath",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Trukipik",lv:79,dop:720,z:"Jungle Interdite",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Nenufor Tilotus",lv:99,dop:960,z:"Tourbi\u00e8re sans fond",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Ali Grothor",lv:109,dop:1080,z:"Tourbi\u00e8re naus\u00e9abonde",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Fojumo",lv:119,dop:1200,z:"Cirque de Cania",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Anatak Diskedor",lv:139,dop:1440,z:"Dents de Pierre",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Guerrier du K.O.",lv:159,dop:1680,z:"Mont Torrideau",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Shushu Debruk'Sayl",lv:159,dop:1680,z:"Gisgoul",p:"Invulnerable",m:"Ch\u00e2teau d'Amakna"},
  {n:"Predagob",lv:169,dop:1800,z:"Nimotopia",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  {n:"Grand Kongoku",lv:179,dop:2040,z:"Salles des Embruns",p:"Aucune",m:"Ch\u00e2teau d'Amakna"},
  // Ecaflipus (1)
  {n:"Atcham",lv:179,dop:2040,z:"Ecaflipus",p:"Aucune",m:"Ecaflipus"},
  // Enutrosor (3)
  {n:"Maxi-Malle",lv:79,dop:720,z:"Creuset des Fortun\u00e9s",p:"Aucune",m:"Enutrosor"},
  {n:"Aigripoil",lv:129,dop:1320,z:"Carri\u00e8re Aurif\u00e8re",p:"Aucune",m:"Enutrosor"},
  {n:"Voldelor",lv:179,dop:2040,z:"Retraite des \u00c9ternels",p:"Aucune",m:"Enutrosor"},
  // Frigost, la Bourgade (7)
  {n:"Bouflouth",lv:99,dop:960,kg:2,z:"Champs de glace",p:"Aucune",m:"Frigost, la Bourgade"},
  {n:"Monsieur Pingouin",lv:109,dop:1080,kg:1,z:"Lac gel\u00e9",p:"Aucune",m:"Frigost, la Bourgade"},
  {n:"Katigrou",lv:119,dop:1200,kg:2,z:"For\u00eat des pins perdus",p:"Aucune",m:"Frigost, la Bourgade"},
  {n:"Fant\u00f4mayte",lv:129,dop:1320,kg:3,z:"Berceau d'Alma",p:"Aucune",m:"Frigost, la Bourgade"},
  {n:"Vengeuse Masqu\u00e9e",lv:139,dop:1440,kg:3,z:"Larmes d'Ouronigride",p:"Aucune",m:"Frigost, la Bourgade"},
  {n:"YeCh'Ti",lv:149,dop:1560,kg:3,z:"Crevasse Perge",p:"Invulnerable",m:"Frigost, la Bourgade"},
  {n:"Docteur Eggob",lv:169,dop:1860,kg:4,z:"For\u00eat enneig\u00e9e",p:"Aucune",m:"Frigost, la Bourgade"},
  // Frigost, Village Enseveli (4)
  {n:"Fuji Givrefoux",lv:149,dop:1560,kg:4,z:"Cavernes des Givrefoux",p:"Aucune",m:"Frigost, Village Enseveli"},
  {n:"Dremoan",lv:159,dop:1680,kg:4,z:"For\u00eat p\u00e9trifi\u00e9e",p:"Invulnerable",m:"Frigost, Village Enseveli"},
  {n:"Flasho",lv:169,dop:1860,kg:4,z:"Crocs de verre",p:"Aucune",m:"Frigost, Village Enseveli"},
  {n:"Viti Glourson",lv:169,dop:1860,kg:4,z:"Ruche des Gloursons",p:"Aucune",m:"Frigost, Village Enseveli"},
  // Frigost III (6)
  {n:"Chevalier de Glace",lv:179,dop:2040,kg:5,z:"Bastion des froides l\u00e9gions",p:"Aucune",m:"Frigost III"},
  {n:"Culbutoeuf",lv:189,dop:2040,kg:5,z:"Tour de la Clepsydre",p:"Reduction melee",m:"Frigost III"},
  {n:"Glourdorak",lv:179,dop:2040,kg:5,z:"Jardins d'Hiver",p:"Invulnerable",m:"Frigost III"},
  {n:"Mekamouth",lv:179,dop:2040,kg:5,z:"Remparts \u00e0 vent",p:"Invulnerable",m:"Frigost III"},
  {n:"Psikopompe",lv:179,dop:2040,kg:5,z:"Tannerie \u00c9carlate",p:"Invulnerable",m:"Frigost III"},
  // Osavora (1)
  {n:"Ganos",lv:179,dop:2040,z:"Osavane",p:"Aucune",m:"Osavora"},
  // Saharach (4)
  {n:"Tournade",lv:59,dop:420,z:"Dunes des ossements",p:"Aucune",m:"Saharach"},
  {n:"Roi Camole",lv:109,dop:1080,z:"Territoire Cacterre",p:"Aucune",m:"Saharach"},
  {n:"Ka'Youloud",lv:149,dop:1560,z:"Gorge des Vents Hurlants",p:"Aucune",m:"Saharach"},
  {n:"Khepricorne",lv:179,dop:2040,z:"Pyramide Maudite",p:"Invulnerable",m:"Saharach"},
  // Srambad (3)
  {n:"Pant\u00e8roz",lv:109,dop:1080,z:"Ruelles des Eaux-Suaires",p:"Reduction melee, Reduction distance",m:"Srambad"},
  {n:"Mouch\u00e2me",lv:159,dop:1680,z:"Catacombres",p:"Aucune",m:"Srambad"},
  {n:"Gein",lv:179,dop:2040,z:"Hauts T\u00e9n\u00e9breux",p:"Invulnerable",m:"Srambad"},
  // Sufokia (3)
  {n:"Buldalazred",lv:179,dop:2040,z:"Tr\u00e9fonds des Trithons",p:"Aucune",m:"Sufokia"},
  {n:"Homard Medali",lv:179,dop:2040,z:"Vestiges engloutis",p:"Aucune",m:"Sufokia"},
  {n:"Takomako",lv:179,dop:2040,z:"Ab\u00eeme de R'lyugluglu",p:"Aucune",m:"Sufokia"},
  // Xelorium (3)
  {n:"Morblok",lv:99,dop:960,z:"Chemins d'hier",p:"Aucune",m:"X\u00e9lorium"},
  {n:"Hin",lv:149,dop:1560,z:"Jour pr\u00e9sent",p:"Aucune",m:"X\u00e9lorium"},
  {n:"Sicogne",lv:179,dop:2040,z:"Lendemains incertains",p:"Aucune",m:"X\u00e9lorium"}
];

// === QUEST NAME MAPPING (for OCR) ===
// Exceptions: some quests have articles "le/la/les/l'" before the name
const QUEST_ARTICLES = {
  "Chevalier de Glace":"le","Docteur Eggob":"le","Grand Kongoku":"le",
  "Guerrier du K.O.":"le","Homard Medali":"le","Khepricorne":"le",
  "Le Fant\u00f4me Bra\u00efdeur":"le","Prince Marchand":"le","Psikopompe":"le",
  "Roi Camole":"le","Shushu Debruk'Sayl":"le","YeCh'Ti":"le",
  "Maxi-Malle":"la","Mouch\u00e2me":"la","Vashkiwi":"la",
  "Guman":"les","Hyperscampe":"l'"
};
// Build quest names on each bounty (for OCR matching)
B.forEach(b => {
  const art = QUEST_ARTICLES[b.n];
  if (art === "l'") b.q = "On recherche l'" + b.n;
  else if (art) b.q = "On recherche " + art + " " + b.n;
  else b.q = "On recherche " + b.n;
});

// === UTILS ===
function slug(name) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase().replace(/['\u2019]/g,'-').replace(/[^a-z0-9-]/g,'-')
    .replace(/-+/g,'-').replace(/^-|-$/g,'');
}
function esc(s) { return s.replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

function openGuide(name) {
  const s = slug(name);
  // Some URLs have articles in them
  const SLUG_OVERRIDES = {
    "chevalier-de-glace": "le-chevalier-de-glace",
    "docteur-eggob": "le-docteur-eggob",
    "grand-kongoku": "le-grand-kongoku",
    "guerrier-du-k-o": "le-guerrier-du-ko",
    "homard-medali": "le-homard-medali",
    "khepricorne": "le-khepricorne",
    "fantome-braideur": "le-fantome-braideur",
    "prince-marchand": "le-prince-marchand",
    "psikopompe": "le-psikopompe",
    "roi-camole": "le-roi-camole",
    "shushu-debruk-sayl": "le-shushu-debruk-sayl",
    "yech-ti": "le-yechti",
    "maxi-malle": "la-maxi-malle",
    "mouchame": "la-mouchame",
    "vashkiwi": "la-vashkiwi",
    "guman": "les-guman",
    "hyperscampe": "l-hyperscampe",
  };
  // Custom URLs for bounties not on dofuspourlesnoobs
  const CUSTOM_URLS = {
    "sans-visage": "https://dofusyelle.com/avis/sans-visage",
  };
  if (CUSTOM_URLS[s]) {
    ipcRenderer.send('open-url', CUSTOM_URLS[s]);
    return;
  }
  const urlSlug = SLUG_OVERRIDES[s] || s;
  const url = 'https://www.dofuspourlesnoobs.com/on-recherche-' + urlSlug + '.html';
  ipcRenderer.send('open-url', url);
}

// === STATE (persistent via Electron IPC) ===
const DEFAULT_STATE = { lv:200, al:0, ord:0, st:{} };
let state = DEFAULT_STATE;
let tab = 'recup', collapsed = { '__done__': true };
let saveTimer = null;

async function loadFromDisk() {
  try {
    const raw = await ipcRenderer.invoke('load-state');
    if (raw) state = JSON.parse(raw);
  } catch(e) {}
  // Migrate old "recup" status to "fait"
  Object.keys(state.st).forEach(k => { if(state.st[k]==='recup') state.st[k]='fait'; });
  document.getElementById('levelInput').value = state.lv;
  document.getElementById('alignInput').value = state.al || 0;
  document.getElementById('ordreInput').value = state.ord || 0;
  showTab();
  render();
}

function save() {
  // Debounce saves to avoid excessive writes
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { ipcRenderer.invoke('save-state', JSON.stringify(state)); } catch(e) {}
  }, 300);
}

function gs(n) { return state.st[n]||'none'; }
function ss(n,s) { s==='none'?delete state.st[n]:state.st[n]=s; save(); render(); }
function ts(n,s) { ss(n, gs(n)===s?'none':s); }
function toggleC(k) { collapsed[k]=!collapsed[k]; render(); }

// === TABS ===
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  tab=t.dataset.tab;
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  showTab();
}));

function showTab() {
  ['recup','encours','faits'].forEach(id=>{
    const active = tab === id;
    const toolbarId = id==='recup'?'toolbar1':id==='encours'?'toolbar2':'toolbar3';
    document.getElementById(toolbarId).classList.toggle('hidden',!active);
    document.getElementById('page-'+id).classList.toggle('hidden',!active);
  });
}

// === BOUNTY HTML ===
function bHTML(b, lockReason) {
  const st=gs(b.n), done=st==='fait';
  let pills='';
  if(b.al) pills+=`<span class="pill pill-align">ALIGN</span>`;
  if(b.p.includes('Invuln')) pills+=`<span class="pill pill-invuln">INVULN</span>`;
  else if(b.p.includes('Reduc')) pills+=`<span class="pill pill-reduc">REDUC</span>`;
  if(st==='pris') pills+=`<span class="pill pill-pris">PRIS</span>`;
  if(st==='fait') pills+=`<span class="pill" style="background:rgba(92,184,92,0.2);color:var(--success)">FAIT</span>`;

  let tok=[];
  if(b.dop) tok.push(`<span class="bounty-token">${b.dop.toLocaleString('fr-FR')}</span>`);
  if(b.ali) tok.push(`<span style="color:var(--danger)">${b.ali} ali</span>`);
  if(b.kg) tok.push(`<span class="bounty-token-k">${b.kg} Kamas Glace</span>`);

  const lockHtml = lockReason ? `<div class="bounty-lock-reason">${lockReason}</div>` : '';

  return `<div class="bounty ${done?'is-done':''}">
    <img class="bounty-img" src="img/${slug(b.n)}.png" onerror="this.style.visibility='hidden'" />
    <div class="bounty-body">
      <div class="bounty-row1"><a class="bounty-name" href="#" onclick="openGuide('${esc(b.n)}');return false">${b.n}</a>${pills}</div>
      <div class="bounty-row2">
        <span class="bounty-zone">${b.z}</span>
        <span>\u00b7</span>${tok.join(' <span>\u00b7</span> ')}
      </div>
      ${lockHtml}
    </div>
    <span class="bounty-lv">${b.m==='Alignement' ? (b.ord ? 'Ordre '+b.ord : 'Align '+(b.alReq||1)) : 'Niv.'+b.lv}</span>
    <div class="bounty-actions">
      <button class="act-btn ${st==='pris'?'a-pris':''}" onclick="ts('${esc(b.n)}','pris')" title="Pris">P</button>
      <button class="act-btn ${st==='fait'?'a-fait':''}" onclick="ts('${esc(b.n)}','fait')" title="Fait">\u2713</button>
    </div>
  </div>`;
}

// === SECTION HEADER ===
function secH(key, label, count, cls) {
  const c = collapsed[key];
  return `<div class="section-header ${cls||''} ${c?'collapsed':''}" onclick="toggleC('${esc(key)}')">
    <span class="section-arrow">\u25BC</span>
    <span class="section-title">${label}</span>
    <span class="section-count">${count}</span>
  </div>`;
}

// === PAGE 1 ===
// === PAGE 1: A RECUPERER (not yet taken) ===
// Build extra sections for cross-tab search matches
function buildCrossSearchSections(query, excludeStatus) {
  if (!query) return '';
  let h = '';

  // Matches in other statuses
  const statuses = [
    { key: 'pris', label: 'EN COURS (autre onglet)', cls: 'ss-encours' },
    { key: 'fait', label: 'FAITS (autre onglet)', cls: 'ss-fait' },
    { key: 'none', label: 'A RECUPERER (autre onglet)', cls: 'ss-recup' }
  ];

  statuses.forEach(s => {
    if (s.key === excludeStatus) return;
    const items = B.filter(b => gs(b.n) === s.key && matchSearch(b, query));
    if (!items.length) return;
    // For "none" status, filter out locked ones - they go in "locked" section instead
    const accessible = s.key === 'none' ? items.filter(b => checkAccessible(b).ok) : items;
    if (!accessible.length) return;
    h += `<div class="search-section-header ${s.cls}">${s.label} (${accessible.length})</div>`;
    accessible.forEach(b => { h += bHTML(b); });
  });

  // Prerequis manquants (only none status, not accessible)
  const locked = B.filter(b => gs(b.n) === 'none' && matchSearch(b, query) && !checkAccessible(b).ok);
  if (locked.length) {
    h += `<div class="search-section-header ss-locked">PREREQUIS MANQUANTS (${locked.length})</div>`;
    locked.forEach(b => { h += bHTML(b, checkAccessible(b).reason); });
  }

  return h;
}

function renderP1() {
  const q = document.getElementById('search1').value;
  const view = document.getElementById('filterView').value;
  const prot = document.getElementById('filterProt').value;
  const mil = document.getElementById('filterMilice').value;

  // Main results: accessible, not taken, status="none"
  const rest = B.filter(b => {
    if (gs(b.n) !== 'none') return false;
    if (!checkAccessible(b).ok) return false;
    if (!matchSearch(b, q)) return false;
    if (mil !== 'all' && b.m !== mil) return false;
    if (prot === 'aucune' && b.p !== 'Aucune') return false;
    if (prot === 'invuln' && !b.p.includes('Invuln')) return false;
    if (prot === 'reduc' && !b.p.includes('Reduc')) return false;
    return true;
  });

  const el = document.getElementById('page-recup');
  let h = '';

  if (rest.length) {
    if (view === 'milice') {
      const g = {};
      rest.forEach(b => { (g[b.m] = g[b.m] || []).push(b); });
      Object.keys(g).sort().forEach(m => {
        h += secH(m, m, g[m].length, 's-zone');
        if (!collapsed[m]) g[m].sort((a, b) => a.lv - b.lv).forEach(b => { h += bHTML(b); });
      });
    } else if (view === 'level') {
      const g = {};
      rest.forEach(b => {
        const k = b.al ? 'Alignement' : `Niv. ${Math.floor((b.lv - 1) / 20) * 20 + 1}-${Math.floor((b.lv - 1) / 20) * 20 + 20}`;
        (g[k] = g[k] || []).push(b);
      });
      Object.entries(g).forEach(([k, items]) => {
        h += secH(k, k, items.length, 's-zone');
        if (!collapsed[k]) items.sort((a, b) => a.lv - b.lv).forEach(b => { h += bHTML(b); });
      });
    } else {
      rest.sort((a, b) => a.lv - b.lv).forEach(b => { h += bHTML(b); });
    }
  }

  // Cross-search results
  h += buildCrossSearchSections(q, 'none');

  if (!h) { el.innerHTML = '<div class="empty">Aucun resultat.</div>'; return; }
  el.innerHTML = h;
}

// === PAGE 2: EN COURS (pris) ===
function renderP2() {
  const q = document.getElementById('search2').value;
  const list = B.filter(b => gs(b.n) === 'pris' && matchSearch(b, q));
  const el = document.getElementById('page-encours');
  let h = '';
  if (list.length) {
    const g = {};
    list.forEach(b => { (g[b.m] = g[b.m] || []).push(b); });
    Object.keys(g).sort().forEach(m => {
      h += secH('ec_' + m, m, g[m].length, 's-pris');
      if (!collapsed['ec_' + m]) g[m].sort((a, b) => a.lv - b.lv).forEach(b => { h += bHTML(b); });
    });
  }
  h += buildCrossSearchSections(q, 'pris');
  if (!h) { el.innerHTML = '<div class="empty">Aucune quete en cours.</div>'; return; }
  el.innerHTML = h;
}

// === PAGE 3: FAITS ===
function renderP3() {
  const q = document.getElementById('search3').value;
  const list = B.filter(b => gs(b.n) === 'fait' && matchSearch(b, q));
  const el = document.getElementById('page-faits');
  let h = '';
  if (list.length) {
    const g = {};
    list.forEach(b => { (g[b.m] = g[b.m] || []).push(b); });
    Object.keys(g).sort().forEach(m => {
      h += secH('ft_' + m, m, g[m].length, 's-fait');
      if (!collapsed['ft_' + m]) g[m].sort((a, b) => a.lv - b.lv).forEach(b => { h += bHTML(b); });
    });
  }
  h += buildCrossSearchSections(q, 'fait');
  if (!h) { el.innerHTML = '<div class="empty">Aucune quete terminee.</div>'; return; }
  el.innerHTML=h;
}

// === STATS ===
function renderStats() {
  let p=0,f=0,d=0,a=0,kg=0;
  const acc = B.filter(b => checkAccessible(b).ok).length;
  B.forEach(b=>{ const s=gs(b.n); if(s==='pris')p++; if(s==='fait'){f++;d+=b.dop||0;a+=b.ali||0;kg+=b.kg||0;} });
  document.getElementById('sfEncours').textContent=p;
  document.getElementById('sfFaits').textContent=f;
  document.getElementById('sfDoplons').textContent=d.toLocaleString('fr-FR');
  document.getElementById('sfAlitons').textContent=a;
  document.getElementById('sfKamas').textContent=kg;
  const pct=acc>0?(f/acc*100):0;
  document.getElementById('progressFill').style.width=pct+'%';
  document.getElementById('progressText').textContent=`${f} / ${acc}`;
  document.getElementById('tabCount1').textContent=Math.max(0, acc-p-f);
  document.getElementById('tabCount2').textContent=p;
  document.getElementById('tabCount3').textContent=f;
}

function render() { renderP1(); renderP2(); renderP3(); renderStats(); }

// === EVENTS ===
document.getElementById('levelInput').addEventListener('input',e=>{
  let v=parseInt(e.target.value)||1; v=Math.max(1,Math.min(200,v));
  e.target.value=v; state.lv=v; save(); render();
});
document.getElementById('alignInput').addEventListener('input',e=>{
  let v=parseInt(e.target.value)||0; v=Math.max(0,Math.min(100,v));
  e.target.value=v; state.al=v; save(); render();
});
document.getElementById('ordreInput').addEventListener('input',e=>{
  let v=parseInt(e.target.value)||0; v=Math.max(0,Math.min(5,v));
  e.target.value=v; state.ord=v; save(); render();
});
function debounce(fn, ms) { let t; return ()=>{ clearTimeout(t); t=setTimeout(fn, ms); }; }
document.getElementById('search1').addEventListener('input', debounce(renderP1, 150));
document.getElementById('search2').addEventListener('input', debounce(renderP2, 150));
document.getElementById('search3').addEventListener('input', debounce(renderP3, 150));
document.getElementById('filterView').addEventListener('change',renderP1);
document.getElementById('filterProt').addEventListener('change',renderP1);
document.getElementById('filterMilice').addEventListener('change',renderP1);

// === POPULATE MILICE FILTER ===
function populateMiliceFilter() {
  const milices = [...new Set(B.map(b=>b.m))].sort();
  const sel = document.getElementById('filterMilice');
  sel.innerHTML = '<option value="all">Milice</option>';
  milices.forEach(m => { sel.innerHTML += `<option value="${esc(m)}">${m}</option>`; });
}

// === OCR ===
let ocrWorker = null;
let ocrTarget = 'pris';

async function initOCR() {
  if (ocrWorker) return ocrWorker;
  const status = document.getElementById('ocrStatus');
  status.textContent = 'Chargement OCR...';
  ocrWorker = await Tesseract.createWorker('fra', 1, {
    logger: m => { if (m.status === 'recognizing text') status.textContent = `OCR ${Math.round(m.progress * 100)}%`; }
  });
  status.textContent = '';
  return ocrWorker;
}

function norm(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[''`\u2019\u2018]/g, ' ')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Aggressive normalize for search: no spaces, no special chars at all
function normSearch(s) {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Check if a bounty is accessible (returns {ok: bool, reason: string})
function checkAccessible(b) {
  if (b.lv > state.lv) return { ok: false, reason: `Niveau ${b.lv} requis (tu es ${state.lv})` };
  if (b.m === 'Alignement') {
    if ((state.al || 0) === 0) return { ok: false, reason: 'Alignement requis' };
    if (b.alReq && state.al < b.alReq) return { ok: false, reason: `Alignement ${b.alReq} requis (tu es ${state.al})` };
    if (b.ord && b.ord > (state.ord || 0)) return { ok: false, reason: `Ordre ${b.ord} requis (tu es ${state.ord || 0})` };
  }
  return { ok: true };
}

// Check if bounty matches search query
function matchSearch(b, query) {
  if (!query) return true;
  const q = normSearch(query);
  return normSearch(b.n).includes(q) || normSearch(b.z).includes(q) || normSearch(b.m).includes(q);
}

const BOUNTY_NORMS = B.map(b => ({
  b, nn: norm(b.n),
  words: norm(b.n).split(' ').filter(w => w.length >= 3),
  nq: norm(b.q)
}));

function preprocessImage(blob, threshold) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = 2, pad = 40;
      const c = document.createElement('canvas');
      c.width = img.width * scale + pad * 2;
      c.height = img.height * scale + pad * 2;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, pad, pad, img.width * scale, img.height * scale);
      const imageData = ctx.getImageData(0, 0, c.width, c.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i+1], b = d[i+2];
        const lum = r * 0.299 + g * 0.587 + b * 0.114;
        const isText = lum > threshold || (r > 180 && g > 140 && b < 120);
        d[i] = isText ? 0 : 255; d[i+1] = isText ? 0 : 255; d[i+2] = isText ? 0 : 255;
      }
      ctx.putImageData(imageData, 0, 0);
      c.toBlob(resolve, 'image/png');
    };
    img.onerror = () => resolve(blob); // fallback: return original
    img.src = URL.createObjectURL(blob);
  });
}

async function processClipboardOCR() {
  const status = document.getElementById('ocrStatus');
  try {
    status.textContent = 'Lecture clipboard...';
    // Get clipboard image via Electron IPC (direct, no PowerShell needed!)
    const base64 = await ipcRenderer.invoke('get-clipboard-image');
    if (!base64) {
      status.textContent = 'Pas d\'image. Fais Win+Shift+S d\'abord.';
      return;
    }
    status.textContent = 'Analyse en cours...';
    const blob = await fetch('data:image/png;base64,' + base64).then(r => r.blob());
    const worker = await initOCR();
    await worker.setParameters({ tessedit_pageseg_mode: '6' });

    let allText = '';
    for (const thresh of [140, 100, 180]) {
      const processed = await preprocessImage(blob, thresh);
      const { data } = await worker.recognize(processed);
      allText += '\n' + data.text;
    }
    matchOCRText(allText, ocrTarget);
  } catch (err) {
    status.textContent = 'Erreur: ' + err.message;
  }
}

function matchOCRText(text, targetStatus) {
  const status = document.getElementById('ocrStatus');
  const rawLines = text.split('\n').map(l => norm(l.trim())).filter(l => l.length > 0);
  const merged = [];
  for (const nl of rawLines) {
    if (nl.startsWith('on recherche') || nl.startsWith('niv') || nl.startsWith('avis')) {
      merged.push(nl);
    } else if (merged.length > 0) {
      if (merged[merged.length - 1].startsWith('niv')) merged.push(nl);
      else merged[merged.length - 1] += ' ' + nl;
    } else { merged.push(nl); }
  }
  const lines = merged.filter(l => l.length > 5);
  const fullText = norm(text);
  let matched = 0;
  const already = new Set();

  for (const bn of BOUNTY_NORMS) {
    if (already.has(bn.b.n)) continue;
    let found = false;
    if (lines.some(l => l.includes(bn.nq))) found = true;
    if (!found && lines.some(l => l.includes('recherche') && l.includes(bn.nn))) found = true;
    if (!found && bn.words.length >= 2) {
      for (const l of lines) {
        if (!l.includes('recherche') && !l.includes('echerch')) continue;
        const hits = bn.words.filter(w => l.includes(w)).length;
        if (hits >= Math.ceil(bn.words.length * 0.7) && hits >= 2) { found = true; break; }
      }
    }
    if (!found) {
      const lw = bn.words.filter(w => w.length >= 7);
      if (lw.length) for (const l of lines) {
        if (!l.includes('recherche') && !l.includes('echerch')) continue;
        if (lw.some(w => l.includes(w))) { found = true; break; }
      }
    }
    if (!found && bn.nn.length >= 8 && fullText.includes(bn.nn)) found = true;
    if (found) { state.st[bn.b.n] = targetStatus; matched++; already.add(bn.b.n); }
  }
  save(); render();
  status.textContent = matched > 0
    ? `${matched} quete(s) → ${targetStatus === 'pris' ? 'En cours' : 'Fait'}`
    : 'Aucune quete detectee.';
}

// OCR buttons
document.getElementById('ocrPris').addEventListener('click', () => {
  ocrTarget = 'pris';
  document.getElementById('ocrPris').style.borderColor = 'var(--accent)';
  document.getElementById('ocrPris').style.color = 'var(--accent)';
  document.getElementById('ocrFait').style.borderColor = '';
  document.getElementById('ocrFait').style.color = '';
  document.getElementById('ocrStatus').textContent = 'Mode EN COURS. Fais Win+Shift+S puis Ctrl+V';
});
document.getElementById('ocrFait').addEventListener('click', () => {
  ocrTarget = 'fait';
  document.getElementById('ocrFait').style.borderColor = 'var(--success)';
  document.getElementById('ocrFait').style.color = 'var(--success)';
  document.getElementById('ocrPris').style.borderColor = '';
  document.getElementById('ocrPris').style.color = '';
  document.getElementById('ocrStatus').textContent = 'Mode FAIT. Fais Win+Shift+S puis Ctrl+V';
});

// Ctrl+V → read clipboard image directly via Electron
document.addEventListener('keydown', async (e) => {
  if (e.ctrlKey && e.key === 'v') {
    e.preventDefault();
    await processClipboardOCR();
  }
});

// === OPACITY (native Electron!) ===
document.getElementById('opacitySlider').addEventListener('input', (e) => {
  ipcRenderer.send('set-opacity', parseInt(e.target.value) / 100);
});

// === UPDATE CHECK ===
const GITHUB_REPO = 'Capiia/Wanted-Dofus';

function cmpVersion(a, b) {
  const pa = a.split('.').map(n => parseInt(n, 10) || 0);
  const pb = b.split('.').map(n => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
  }
  return 0;
}

async function checkForUpdate() {
  // Skip in dev mode
  if (!__dirname.includes('app.asar')) return;
  try {
    const APP_VERSION = await ipcRenderer.invoke('get-version');
    const resp = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
    if (!resp.ok) return;
    const release = await resp.json();
    if (!release.tag_name) return;
    const latest = release.tag_name.replace(/^v/, '');
    if (cmpVersion(latest, APP_VERSION) <= 0) return;

    const setup = release.assets && release.assets.find(a => a.name.endsWith('.exe'));
    if (!setup) return;

    document.getElementById('updateBar').classList.remove('hidden');
    // When update bar is shown, remove header top-padding (titlebar moves to update-bar)
    document.querySelector('.header').style.paddingTop = '10px';
    document.getElementById('updateText').textContent = `v${latest} disponible !`;
    document.getElementById('updateBtn').addEventListener('click', () => {
      ipcRenderer.send('open-url', setup.browser_download_url);
      document.getElementById('updateText').textContent = 'Telechargement lance. Relance le setup une fois termine.';
    }, { once: true });
  } catch(e) {}
}

// === INFO MODAL ===
document.getElementById('infoBtn').addEventListener('click', () => {
  let totalDop = 0, totalAli = 0, totalKg = 0, totalN = 0;
  let doneDop = 0, doneAli = 0, doneKg = 0, doneN = 0;
  B.forEach(b => {
    totalDop += b.dop || 0;
    totalAli += b.ali || 0;
    totalKg += b.kg || 0;
    totalN++;
    if (gs(b.n) === 'fait') {
      doneDop += b.dop || 0;
      doneAli += b.ali || 0;
      doneKg += b.kg || 0;
      doneN++;
    }
  });
  document.getElementById('infoDop').textContent = `${doneDop.toLocaleString('fr-FR')} / ${totalDop.toLocaleString('fr-FR')}`;
  document.getElementById('infoAli').textContent = `${doneAli} / ${totalAli}`;
  document.getElementById('infoKg').textContent = `${doneKg} / ${totalKg}`;
  document.getElementById('infoCount').textContent = `${doneN} / ${totalN}`;
  document.getElementById('infoModal').classList.remove('hidden');
});
document.getElementById('infoClose').addEventListener('click', () => {
  document.getElementById('infoModal').classList.add('hidden');
});
document.getElementById('infoModal').addEventListener('click', (e) => {
  if (e.target.id === 'infoModal') document.getElementById('infoModal').classList.add('hidden');
});

// === INIT ===
async function init() {
  try { await loadFromDisk(); } catch(e) {}
  // Defer update check to not block UI
  setTimeout(() => checkForUpdate(), 2000);
}
populateMiliceFilter();
document.getElementById('levelInput').value = state.lv;
document.getElementById('alignInput').value = state.al || 0;
document.getElementById('ordreInput').value = state.ord || 0;
showTab();
render();
init();
