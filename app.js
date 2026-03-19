/* ═══════════════════════════════════════════════════════════
   WHERE SHOULD YOU LIVE IN ROME? — Pure Vanilla JS
   Data: immobiliare.it (Jan 2026), Google Maps, ATAC, ISTAT
   ═══════════════════════════════════════════════════════════ */

// ── DATA ──
const ZONES = [
  {id:"centro",n:"Centro Storico",r:30.7,m:true,l:"Metro A",pk:1,c:{ctr:[5,5,10],eur:[30,20,25],ost:[20,12,15],pra:[15,8,10],tib:[20,12,15],fco:[55,50,45],sap:[15,10,12],r3:[25,15,18],tv:[50,35,30],lui:[20,12,15],jcu:[15,10,10],lum:[10,5,8],fao:[15,8,10]},sf:7,jb:9,st:6,fm:3,nl:10,gy:6,sc:5,h:"Santo Spirito 5min · Fatebenefratelli 10min",e:"Indian/Asian at Esquilino · African at Piazza Vittorio · Halal near Termini",w:"Restaurants · Hotels · Tourism · Retail · Tour guides",g:"Expensive — no discount stores",t:"Only with roommates. Search 'posto letto centro' on idealista.it"},
  {id:"prati",n:"Prati",r:25.1,m:true,l:"Metro A",pk:4,c:{ctr:[10,8,12],eur:[30,18,22],ost:[25,15,18],pra:[5,3,5],tib:[25,15,18],fco:[50,45,40],sap:[25,15,18],r3:[30,18,20],tv:[55,40,35],lui:[25,15,18],jcu:[20,10,12],lum:[5,3,5],fao:[20,12,15]},sf:9,jb:7,st:7,fm:8,nl:6,gy:7,sc:8,h:"Santo Spirito 10min · Gemelli 20min",e:"Limited — mainly Italian shops",w:"Office admin · Embassy work · Legal · Tutoring",g:"Mid-range — Conad, Pam, Todis nearby",t:"Embassy district. Safe, professional. Perfect for LUMSA."},
  {id:"trast",n:"Trastevere",r:21.5,m:false,l:"Tram 8",pk:2,c:{ctr:[15,10,15],eur:[30,18,22],ost:[15,8,12],pra:[20,10,15],tib:[35,20,25],fco:[55,45,40],sap:[30,18,22],r3:[15,10,12],tv:[55,40,35],lui:[35,20,25],jcu:[5,3,5],lum:[15,8,12],fao:[15,8,12]},sf:6,jb:9,st:9,fm:3,nl:10,gy:5,sc:5,h:"San Camillo 15min · Bambino Gesù 10min",e:"International restaurants · Some ethnic food shops",w:"Bars · Restaurants · Language teaching · Babysitting · Delivery",g:"Mixed — small shops, Todis 10min walk",t:"No metro! Tram 8 is your lifeline. THE student area."},
  {id:"sgiov",n:"San Giovanni",r:19.8,m:true,l:"Metro A+C",pk:5,c:{ctr:[12,8,12],eur:[22,14,18],ost:[18,10,14],pra:[22,14,18],tib:[18,12,15],fco:[50,40,38],sap:[20,12,15],r3:[15,10,12],tv:[40,28,25],lui:[25,15,18],jcu:[25,15,18],lum:[25,14,18],fao:[12,8,10]},sf:8,jb:7,st:8,fm:7,nl:6,gy:7,sc:7,h:"San Giovanni Addolorata 5min",e:"Bengali shops · Chinese stores · African salons · Halal butcher",w:"Retail · Delivery · Call centers · Hospitality · Warehouse",g:"Good — Conad, Eurospin, Mercato Metronio",t:"BEST for newcomers. Two metro lines. Strong migrant network."},
  {id:"garb",n:"Garbatella-Ostiense",r:18.5,m:true,l:"Metro B",pk:6,c:{ctr:[18,12,15],eur:[15,10,12],ost:[5,3,5],pra:[25,15,20],tib:[25,15,18],fco:[45,35,32],sap:[30,18,22],r3:[10,5,8],tv:[45,30,28],lui:[35,22,25],jcu:[20,12,15],lum:[25,15,18],fao:[12,8,10]},sf:7,jb:8,st:9,fm:6,nl:8,gy:6,sc:6,h:"San Paolo 10min · CTO 15min",e:"Some Asian/African shops · Eataly Ostiense",w:"Restaurants · Logistics · Startups · Events · Retail",g:"Affordable — Todis, Lidl nearby",t:"TOP PICK for Roma Tre. Close to FAO. Great food scene."},
  {id:"appio",n:"Appio Latino",r:17.8,m:true,l:"Metro A",pk:7,c:{ctr:[20,12,15],eur:[18,12,15],ost:[20,12,15],pra:[28,18,22],tib:[25,15,18],fco:[50,40,35],sap:[25,15,18],r3:[20,12,15],tv:[35,22,20],lui:[28,18,22],jcu:[30,18,22],lum:[28,18,22],fao:[18,10,12]},sf:8,jb:6,st:7,fm:8,nl:5,gy:7,sc:7,h:"San Giovanni 12min",e:"Some Asian shops · Halal butcher on Via Appia",w:"Supermarkets · Tutoring · Delivery · Care work",g:"Very good — Conad, Carrefour, Mercato Appio",t:"Quiet Roman neighborhood. Excellent fresh market."},
  {id:"monte",n:"Monteverde",r:17.2,m:false,l:"Tram 8 + bus",pk:7,c:{ctr:[25,15,18],eur:[30,18,22],ost:[20,12,15],pra:[25,14,18],tib:[40,25,28],fco:[50,40,35],sap:[35,22,25],r3:[20,12,15],tv:[55,38,32],lui:[40,25,28],jcu:[15,8,10],lum:[20,12,15],fao:[20,12,15]},sf:9,jb:4,st:5,fm:9,nl:4,gy:7,sc:9,h:"San Camillo 15min · Bambino Gesù Children's 10min",e:"Very limited — Italian residential",w:"Babysitting · Tutoring · Remote work · Care services",g:"Good — Conad, local markets, farmers market",t:"Family paradise. Villa Pamphilj. Near children's hospital."},
  {id:"eur",n:"EUR",r:16.0,m:true,l:"Metro B",pk:8,c:{ctr:[25,15,20],eur:[5,3,5],ost:[12,8,10],pra:[32,20,25],tib:[35,22,25],fco:[35,25,22],sap:[35,22,25],r3:[20,12,15],tv:[30,20,18],lui:[35,22,28],jcu:[30,18,22],lum:[32,20,25],fao:[22,14,18]},sf:9,jb:6,st:4,fm:8,nl:3,gy:8,sc:8,h:"Sant'Eugenio 10min · Campus Biomedico 15min",e:"Euroma2 mall international food section",w:"Office temp · Corporate events · Retail (Euroma2)",g:"Good — large supermarkets, Euroma2",t:"Best for EUR workers. Closest to airport. Easy parking."},
  {id:"tusc",n:"Tuscolano",r:15.5,m:true,l:"Metro A",pk:7,c:{ctr:[28,18,20],eur:[22,15,18],ost:[25,15,18],pra:[32,22,25],tib:[22,15,18],fco:[55,40,35],sap:[30,20,22],r3:[25,15,18],tv:[25,15,15],lui:[30,20,22],jcu:[35,22,25],lum:[32,22,25],fao:[25,15,18]},sf:7,jb:6,st:6,fm:7,nl:4,gy:6,sc:6,h:"Policlinico Casilino 10min",e:"Bangladeshi shops · African stores · Chinese supermarket",w:"Supermarkets · Warehouses · Delivery · Cinecittà",g:"Very affordable — Lidl, Todis, Eurospin",t:"Good value with metro. Multicultural. Near Tor Vergata."},
  {id:"cento",n:"Centocelle",r:14.2,m:true,l:"Metro C",pk:7,c:{ctr:[30,18,22],eur:[28,18,22],ost:[28,18,22],pra:[35,22,28],tib:[18,12,15],fco:[60,42,38],sap:[32,20,22],r3:[28,18,20],tv:[20,12,12],lui:[35,22,25],jcu:[38,25,28],lum:[35,22,28],fao:[28,18,22]},sf:6,jb:6,st:6,fm:6,nl:5,gy:5,sc:5,h:"Policlinico Casilino 8min",e:"Indian/Bangladeshi on Via Casilina · African food · Halal · Chinese markets",w:"Food industry · Retail · Warehouses · Delivery · Ethnic restaurants",g:"Cheapest — Todis, Lidl, ethnic wholesale",t:"Best budget+metro. South Asian hub. Best ethnic food in Rome."},
  {id:"tibur",n:"Tiburtina area",r:13.5,m:true,l:"Metro B + trains",pk:5,c:{ctr:[15,10,15],eur:[30,18,22],ost:[20,12,15],pra:[25,15,18],tib:[5,3,5],fco:[55,40,38],sap:[15,10,12],r3:[22,14,18],tv:[35,22,20],lui:[18,12,15],jcu:[30,18,22],lum:[25,15,18],fao:[22,14,18]},sf:6,jb:7,st:7,fm:5,nl:4,gy:5,sc:5,h:"Pertini 15min · Policlinico Umberto I 12min",e:"Asian shops · African stores near station",w:"Logistics · Warehouses · Station retail · Delivery",g:"Affordable — Conad, Todis",t:"Underrated for Sapienza. Best train connections in Rome."},
  {id:"torbm",n:"Tor Bella Monaca",r:11.8,m:false,l:"Bus only",pk:9,c:{ctr:[55,30,25],eur:[45,25,22],ost:[48,28,25],pra:[55,32,28],tib:[40,22,20],fco:[70,50,42],sap:[50,28,25],r3:[48,28,25],tv:[20,10,10],lui:[55,32,28],jcu:[55,35,30],lum:[55,32,28],fao:[50,28,25]},sf:4,jb:3,st:2,fm:4,nl:1,gy:2,sc:3,h:"Policlinico Casilino 20min · Tor Vergata Hospital 15min",e:"Some Romanian/African shops",w:"Warehouses · Cleaning · Supermarkets",g:"Cheap — discount stores only",t:"Only with scooter/car. Public transit = 2hrs/day wasted."},
  {id:"lungh",n:"Lunghezza",r:10.5,m:false,l:"Train FL2",pk:10,c:{ctr:[50,30,25],eur:[45,28,22],ost:[45,28,25],pra:[52,32,28],tib:[35,20,18],fco:[70,48,40],sap:[45,28,22],r3:[45,28,25],tv:[25,12,10],lui:[50,30,28],jcu:[52,32,30],lum:[52,32,28],fao:[48,28,25]},sf:6,jb:2,st:2,fm:6,nl:1,gy:2,sc:5,h:"Tor Vergata Hospital 20min by car",e:"Very limited",w:"Local shops · Driving jobs · Remote only",g:"Cheap — large supermarkets",t:"Cheapest but add €200/mo car costs. Math rarely works."},
];

const DESTS = [
  {id:"ctr",n:"City Center (Termini)",c:"w"},{id:"eur",n:"EUR (corporate)",c:"w"},
  {id:"ost",n:"Ostiense (startups)",c:"w"},{id:"pra",n:"Prati (embassies)",c:"w"},
  {id:"tib",n:"Tiburtina (logistics)",c:"w"},{id:"fco",n:"Fiumicino Airport",c:"w"},
  {id:"sap",n:"La Sapienza",c:"u"},{id:"r3",n:"Roma Tre",c:"u"},
  {id:"tv",n:"Tor Vergata",c:"u"},{id:"lui",n:"LUISS",c:"u"},
  {id:"jcu",n:"John Cabot",c:"u"},{id:"lum",n:"LUMSA",c:"u"},{id:"fao",n:"FAO / UN",c:"w"},
];

const HTYPES = [
  {id:"room",n:"Room (shared flat)",it:"Posto letto",sq:14,dp:1},
  {id:"studio",n:"Studio",it:"Monolocale",sq:30,dp:2},
  {id:"1bed",n:"1-Bedroom",it:"Bilocale",sq:45,dp:2},
  {id:"2bed",n:"2-Bedroom",it:"Trilocale",sq:65,dp:3},
  {id:"3bed",n:"3-Bed family",it:"Quadrilocale",sq:85,dp:3},
];

const TRANS = [
  {id:"pub",n:"Public transit",co:35,ic:"🚇",nt:"€35 ATAC monthly"},
  {id:"sco",n:"Scooter",co:80,ic:"🛵",nt:"~€80/mo"},
  {id:"car",n:"Car",co:200,ic:"🚗",nt:"~€200/mo"},
  {id:"bike",n:"Bicycle",co:0,ic:"🚲",nt:"Free"},
];

const SORTS = [
  {id:"truecost",n:"💡 True cost (incl. time)",f:(a,b)=>a.tc2-b.tc2},
  {id:"rent",n:"💶 Rent: lowest",f:(a,b)=>a.rn-b.rn},
  {id:"left",n:"💰 Money left",f:(a,b)=>b.lf-a.lf},
  {id:"commute",n:"⏱️ Commute: shortest",f:(a,b)=>a.cm-b.cm},
  {id:"safety",n:"🛡️ Safety",f:(a,b)=>b.z.sf-a.z.sf},
  {id:"family",n:"👨‍👩‍👧 Family",f:(a,b)=>b.z.fm-a.z.fm},
  {id:"student",n:"🎓 Student",f:(a,b)=>b.z.st-a.z.st},
  {id:"jobs",n:"💼 Jobs",f:(a,b)=>b.z.jb-a.z.jb},
  {id:"night",n:"🌙 Nightlife",f:(a,b)=>b.z.nl-a.z.nl},
  {id:"park",n:"🅿️ Parking",f:(a,b)=>b.z.pk-a.z.pk},
];

// ── STATE ──
let state = { inc:1500, ht:"room", tr:"pub", d1:"", d2:"", sort:"truecost", maxR:2000, maxC:60, metro:false, expanded:null };

// ── CALC ──
function calc(z) {
  const h = HTYPES.find(x => x.id === state.ht) || HTYPES[0];
  const ti = (state.tr === "pub" || state.tr === "bike") ? 0 : state.tr === "sco" ? 1 : 2;
  const tco = TRANS.find(x => x.id === state.tr)?.co || 0;
  const rn = Math.round(z.r * h.sq);
  const c1 = state.d1 ? (z.c[state.d1]?.[ti] ?? 25) : z.c.ctr[ti];
  const c2 = state.d2 ? (z.c[state.d2]?.[ti] ?? 0) : 0;
  const cm = state.d2 ? Math.round((c1 + c2) / 2) : c1;
  const hrs = (cm * 2 * 22) / 60;
  const opp = Math.round(hrs * 9);
  const ut = 175;
  const tc = rn + tco + ut;
  const tc2 = tc + opp;
  const lf = state.inc - tc;
  const rp = state.inc > 0 ? Math.round((rn / state.inc) * 100) : 999;
  const mi = rn * h.dp + rn + 500;
  return { z, rn, tco, ut, tc, tc2, lf, rp, cm, hrs: hrs.toFixed(1), opp, mi, sq: h.sq };
}

function getResults() {
  let list = ZONES.map(calc);
  if (state.metro) list = list.filter(r => r.z.m);
  list = list.filter(r => r.rn <= state.maxR && r.cm <= state.maxC);
  const s = SORTS.find(x => x.id === state.sort);
  if (s) list.sort(s.f);
  return list;
}

// ── HELPERS ──
function el(tag, attrs, ...children) {
  const e = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => {
    if (k === "style" && typeof v === "object") Object.assign(e.style, v);
    else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "className") e.className = v;
    else if (k === "innerHTML") e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  children.flat().forEach(c => {
    if (c == null) return;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return e;
}

function dots(v) {
  const wrap = el("div", { style: { display: "flex", gap: "2px" } });
  for (let i = 0; i < 10; i++) {
    wrap.appendChild(el("div", { className: "dot", style: {
      background: i < v ? (v >= 7 ? "#10b981" : v >= 4 ? "#f59e0b" : "#ef4444") : "rgba(255,255,255,0.07)"
    }}));
  }
  return wrap;
}

function optGroup(label, items) {
  const g = el("optgroup", { label });
  items.forEach(d => g.appendChild(el("option", { value: d.id }, d.n)));
  return g;
}

// ── RENDER ──
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const results = getResults();
  const h = HTYPES.find(x => x.id === state.ht) || HTYPES[0];
  const trObj = TRANS.find(x => x.id === state.tr);

  // HEADER
  const header = el("div", { className: "header" },
    el("div", { className: "header-glow" }),
    el("div", { className: "header-inner" },
      el("p", { className: "header-tag" }, "Real data · immobiliare.it · Jan 2026"),
      el("h1", { innerHTML: "Where should you <em>live in Rome?</em>" }),
      el("p", { className: "header-sub" }, "Your income. Your transport. Your destinations. Everything recalculates live.")
    )
  );
  app.appendChild(header);

  const main = el("div", { className: "main" });

  // CONTROLS
  const controls = el("div", { className: "controls" });

  // Row 1
  const row1 = el("div", { className: "ctrl-row1" });

  // Income
  const incWrap = el("div", null,
    el("label", { className: "label" }, "Net income €/mo"),
    (() => {
      const inp = el("input", { type: "number", value: state.inc, className: "inp inp-income" });
      inp.addEventListener("input", e => { state.inc = parseInt(e.target.value) || 0; render(); });
      return inp;
    })()
  );
  row1.appendChild(incWrap);

  // Housing
  const htSel = el("select", { className: "sel" });
  HTYPES.forEach(ht => {
    const o = el("option", { value: ht.id }, `${ht.n} — ${ht.sq}m² (${ht.it})`);
    if (ht.id === state.ht) o.selected = true;
    htSel.appendChild(o);
  });
  htSel.addEventListener("change", e => { state.ht = e.target.value; render(); });
  row1.appendChild(el("div", null, el("label", { className: "label" }, "I want to rent"), htSel));

  // Transport
  const trSel = el("select", { className: "sel" });
  TRANS.forEach(t => {
    const o = el("option", { value: t.id }, `${t.ic} ${t.n} (${t.nt})`);
    if (t.id === state.tr) o.selected = true;
    trSel.appendChild(o);
  });
  trSel.addEventListener("change", e => { state.tr = e.target.value; render(); });
  row1.appendChild(el("div", null, el("label", { className: "label" }, "I travel by"), trSel));

  // Dest 1
  const d1Sel = el("select", { className: "sel" });
  const d1Def = el("option", { value: "" }, "City center"); if (!state.d1) d1Def.selected = true;
  d1Sel.appendChild(d1Def);
  d1Sel.appendChild(optGroup("Universities", DESTS.filter(d => d.c === "u")));
  d1Sel.appendChild(optGroup("Work areas", DESTS.filter(d => d.c === "w")));
  if (state.d1) d1Sel.value = state.d1;
  d1Sel.addEventListener("change", e => { state.d1 = e.target.value; render(); });
  row1.appendChild(el("div", null, el("label", { className: "label" }, "I go to"), d1Sel));

  // Dest 2
  const d2Sel = el("select", { className: "sel" });
  const d2Def = el("option", { value: "" }, "—"); if (!state.d2) d2Def.selected = true;
  d2Sel.appendChild(d2Def);
  d2Sel.appendChild(optGroup("Universities", DESTS.filter(d => d.c === "u")));
  d2Sel.appendChild(optGroup("Work areas", DESTS.filter(d => d.c === "w")));
  if (state.d2) d2Sel.value = state.d2;
  d2Sel.addEventListener("change", e => { state.d2 = e.target.value; render(); });
  row1.appendChild(el("div", null, el("label", { className: "label" }, "Also go to"), d2Sel));

  controls.appendChild(row1);

  // Row 2: Filters
  const row2 = el("div", { className: "ctrl-row2" });

  // Max rent slider
  const rentRange = el("input", { type: "range", min: "200", max: "3000", step: "50", value: state.maxR });
  const rentVal = el("span", { className: "filter-val" }, `€${state.maxR}`);
  rentRange.addEventListener("input", e => { state.maxR = +e.target.value; rentVal.textContent = `€${state.maxR}`; render(); });
  row2.appendChild(el("div", { style: { display: "flex", alignItems: "center", gap: "6px" } },
    el("span", { className: "filter-label" }, "Max rent"), rentRange, rentVal));

  // Max commute slider
  const cmRange = el("input", { type: "range", min: "10", max: "70", step: "5", value: state.maxC });
  const cmVal = el("span", { className: "filter-val" }, `${state.maxC}m`);
  cmRange.addEventListener("input", e => { state.maxC = +e.target.value; cmVal.textContent = `${state.maxC}m`; render(); });
  row2.appendChild(el("div", { style: { display: "flex", alignItems: "center", gap: "6px" } },
    el("span", { className: "filter-label" }, "Max commute"), cmRange, cmVal));

  // Metro only
  const mCb = el("input", { type: "checkbox" }); mCb.checked = state.metro;
  mCb.addEventListener("change", e => { state.metro = e.target.checked; render(); });
  row2.appendChild(el("label", { className: "metro-label" }, mCb, "Metro only"));

  // Sort
  const soSel = el("select", { className: "sel sel-sort" });
  SORTS.forEach(s => {
    const o = el("option", { value: s.id }, s.n);
    if (s.id === state.sort) o.selected = true;
    soSel.appendChild(o);
  });
  soSel.addEventListener("change", e => { state.sort = e.target.value; render(); });
  row2.appendChild(el("div", { className: "sort-wrap" },
    el("span", { className: "filter-label" }, "Sort"), soSel));

  controls.appendChild(row2);
  main.appendChild(controls);

  // STATS BAR
  if (results.length > 0) {
    const stats = el("div", { className: "stats" });
    const cheapest = Math.min(...results.map(r => r.rn));
    [
      { l: "Best match", v: results[0].z.n, c: "var(--green)" },
      { l: "Cheapest rent", v: `€${cheapest}`, c: "var(--amber)" },
      { l: "Zones found", v: `${results.length} of ${ZONES.length}`, c: "var(--text)" },
      { l: h.n, v: `${h.sq}m²`, c: "var(--blue)" },
    ].forEach(s => {
      stats.appendChild(el("div", { className: "stat-box" },
        el("div", { className: "stat-label" }, s.l),
        el("div", { className: "stat-val", style: { color: s.c } }, s.v)));
    });
    main.appendChild(stats);
  }

  // RESULTS TABLE
  if (results.length === 0) {
    main.appendChild(el("div", { className: "empty" }, "No zones match. Adjust your filters."));
  } else {
    const table = el("div", { className: "table" });

    // Header
    table.appendChild(el("div", { className: "table-head" },
      el("span", null, "Neighborhood"), el("span", null, "Rent"),
      el("span", null, "True cost"), el("span", null, "Left over"),
      el("span", null, "Commute"), el("span", null, "% income")));

    // Rows
    results.forEach((r, i) => {
      const wrapper = el("div", { className: i > 0 ? "zone-border" : "" });
      const isExp = state.expanded === r.z.id;

      // Percentage color
      const pC = r.rp > 60 ? "var(--red)" : r.rp > 40 ? "var(--amber)" : "var(--green)";
      const pBg = r.rp > 60 ? "rgba(239,68,68,0.12)" : r.rp > 40 ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)";
      const leftC = r.lf < 200 ? "var(--red)" : r.lf < 500 ? "var(--amber)" : "var(--green)";

      // Name cell
      const nameCell = el("div", null);
      const nameRow = el("div", { className: "zone-name" });
      if (i === 0) nameRow.appendChild(el("span", { style: { color: "var(--green)" } }, "★"));
      nameRow.appendChild(document.createTextNode(r.z.n));
      if (!r.z.m) nameRow.appendChild(el("span", { className: "no-metro" }, "NO METRO"));
      nameCell.appendChild(nameRow);
      let lineText = r.z.l;
      if (state.tr === "sco" || state.tr === "car") lineText += ` · 🅿️${r.z.pk}/10`;
      nameCell.appendChild(el("div", { className: "zone-line" }, lineText));

      const row = el("div", { className: `zone-row${i === 0 ? " best" : ""}` },
        nameCell,
        el("div", { className: "rent-val" }, `€${r.rn}`),
        el("div", { className: "tc-val" }, `€${r.tc2}`),
        el("div", { className: "left-val", style: { color: leftC } }, `€${r.lf}`),
        el("div", { className: "cm-val" }, `${r.cm}`, el("span", { className: "cm-unit" }, "min")),
        el("div", { className: "pct-wrap" }, el("span", { className: "pct-badge", style: { background: pBg, color: pC } }, `${r.rp}%`))
      );
      row.addEventListener("click", () => { state.expanded = isExp ? null : r.z.id; render(); });
      wrapper.appendChild(row);

      // EXPANDED DETAIL
      if (isExp) {
        const exp = el("div", { className: "expanded" });
        const grid = el("div", { className: "exp-grid" });

        // Col 1: Cost breakdown
        const col1 = el("div", null, el("div", { className: "exp-title" }, "Monthly breakdown"));
        [
          { l: `Rent (${r.sq}m² × €${r.z.r})`, v: `€${r.rn}` },
          { l: trObj?.nt || "Transport", v: `€${r.tco}` },
          { l: "Utilities + internet", v: "€175" },
          { l: `Time cost (${r.hrs}hrs × €9)`, v: `€${r.opp}`, dim: true },
        ].forEach(x => {
          col1.appendChild(el("div", { className: "cost-line", style: x.dim ? { opacity: "0.7" } : {} },
            el("span", { className: "cl" }, x.l), el("span", { className: "cv" }, x.v)));
        });
        const totalC = r.lf < 300 ? "var(--red)" : "var(--green)";
        col1.appendChild(el("div", { className: "cost-total" },
          el("span", null, "Money left"), el("span", { style: { color: totalC } }, `€${r.lf}/mo`)));
        col1.appendChild(el("div", { className: "movein-box", innerHTML:
          `💰 Move-in: <strong>~€${r.mi}</strong><br><span class="movein-sub">(${h.dp} mo deposit + 1st month + fees)</span>` }));
        grid.appendChild(col1);

        // Col 2: Ratings
        const col2 = el("div", null, el("div", { className: "exp-title" }, "Area ratings"));
        [["Safety",r.z.sf],["Jobs",r.z.jb],["Student",r.z.st],["Family",r.z.fm],
         ["Nightlife",r.z.nl],["Gyms",r.z.gy],["Schools",r.z.sc],["Parking",r.z.pk]
        ].forEach(([l,v]) => {
          col2.appendChild(el("div", { className: "rating-row" },
            el("span", { className: "rating-label" }, l), dots(v),
            el("span", { className: "rating-num" }, String(v))));
        });
        grid.appendChild(col2);

        // Col 3: Info
        const col3 = el("div", { className: "info-section" },
          el("div", { className: "info-head health" }, "🏥 Healthcare"), el("div", null, r.z.h),
          el("div", { className: "info-head comm info-gap" }, "🌍 Community"), el("div", null, r.z.e),
          el("div", { className: "info-head work info-gap" }, "💼 Work"), el("div", null, r.z.w),
          el("div", { className: "info-head groc info-gap" }, "🛒 Groceries"), el("div", null, r.z.g));
        grid.appendChild(col3);

        exp.appendChild(grid);
        exp.appendChild(el("div", { className: "tip-box" }, `💡 ${r.z.t}`));
        wrapper.appendChild(exp);
      }

      table.appendChild(wrapper);
    });
    main.appendChild(table);
  }

  // HIDDEN COSTS
  let hiddenOpen = false;
  const hiddenPanel = el("div", { className: "hidden-panel", innerHTML:
    `<strong>Caparra:</strong> 2-3 months rent upfront as deposit<br>
    <strong>Agency fee:</strong> 1 month + 22% VAT (skip via subito.it)<br>
    <strong>Condominio:</strong> €60-200/mo building fees — ASK before signing<br>
    <strong>Cedolare secca:</strong> flat tax contract = no rent increases<br>
    <strong>ZTL:</strong> Driving in center without permit = €300-600 fine<br>
    <strong>Best time:</strong> June-July or Jan-Feb (avoid September rush)<br>
    <strong>Search on:</strong> idealista.it · immobiliare.it · subito.it · FB "Affitti Roma"<br>
    <strong>Italian terms:</strong> Monolocale (studio) · Bilocale (1-bed) · Trilocale (2-bed) · Posto letto (room) · Spese incluse (bills included)` });
  const hiddenBtn = el("button", { className: "hidden-toggle" }, "⚠️ Hidden costs & rental tips for newcomers");
  hiddenBtn.addEventListener("click", () => { hiddenOpen = !hiddenOpen; hiddenPanel.classList.toggle("open"); });
  main.appendChild(hiddenBtn);
  main.appendChild(hiddenPanel);

  // FOOTER
  main.appendChild(el("div", { className: "footer", innerHTML:
    `<strong>Where Should You Live in Rome?</strong><br>
    Justin Plammootil Varghese · immobiliare.it · idealista · ATAC · ISTAT · Google Maps<br>
    pv.justin16@gmail.com · linkedin.com/in/pv-justin` }));

  app.appendChild(main);
}

// ── INIT ──
render();
