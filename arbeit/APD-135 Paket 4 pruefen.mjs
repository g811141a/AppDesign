// APD-135 Paket 4 (Testfall-Liste V-1 bis V-4): liest die Blöcke alt/neu aus „APD-135 Paket 4 Wortlaut.md“ und prüft sie gegen DR, RLB-DR, PROMPT.
// node "arbeit/APD-135 Paket 4 pruefen.mjs" [-v | --trocken | --einsetzen] · Gegenprobe GP="D-28|.fclear" (Wert) bzw. GP="D-37|R-7.2" (Nummer) mit --trocken
import fs from 'fs';
const AD='/home/user/AppDesign/', RL='/home/user/ReiseLogBuch/';
const W=fs.readFileSync(AD+'arbeit/APD-135 Paket 4 Wortlaut.md','utf8').split('\n');
const files={DR:AD+'README - Designrichtlinie allgemein.md','RLB-DR':RL+'README - Designrichtlinie Reiselogbuch.md',PROMPT:RL+'PROMPT.md'};
const pairs=[];let sec='',cur=null,mode=null,buf=null;
for(let i=0;i<W.length;i++){const l=W[i];
  if(l.startsWith('## Offene Punkte'))break;
  if(l.startsWith('### '))sec=l.slice(4);
  const m=l.match(/^\*\*(alt|neu)\*\*\s*(.*)$/); if(m){mode=m[1]; if(mode==='alt'){const lab=m[2]; const f=/\(RLB-DR/.test(lab)?'RLB-DR':/\(PROMPT/.test(lab)?'PROMPT':/\(DR/.test(lab)?'DR':null; cur={sec,lab,file:f,line:i+1}; pairs.push(cur);} continue;}
  if(l.startsWith('- **bleibt:**')&&pairs.length){const sp=pairs.filter(q=>q.sec===sec); const toks=[...l.matchAll(/`([^`]+)`/g)].map(x=>x[1]); sp[sp.length-1].bleibt=toks;}
  if(l.startsWith('```')){ if(buf===null&&mode){buf=[];continue;} if(buf!==null){cur[mode]=buf.join('\n');buf=null;mode=null;continue;} }
  if(buf!==null)buf.push(l);
}
const txt={};for(const k in files)txt[k]=fs.readFileSync(files[k],'utf8');
if(process.env.GP){const q=pairs.find(p=>p.sec.startsWith(process.env.GP.split('|')[0])); q.neu=q.neu.split(process.env.GP.split('|')[1]).join('');}
if(process.argv[2]==='--trocken'){for(const p of pairs){let n=p.neu.trim()==='(gestrichen)'?'':p.neu, a=p.alt; if(n===''&&txt[p.file].includes(a+'\n'))a+='\n'; txt[p.file]=txt[p.file].replace(a,()=>n);} }
const cnt=(s,t)=>t===''?0:s.split(t).length-1;
let bad=0,state={alt:0,neu:0};
for(const p of pairs){ if(!p.file){console.log('? Datei unbekannt',p.sec,p.lab);bad++;continue;}
  if(p.neu===undefined){console.log('? kein neu',p.sec);bad++;continue;}
  const del=p.neu.trim()==='(gestrichen)'; const a=cnt(txt[p.file],p.alt), n=del?(a===0?1:0):cnt(txt[p.file],p.neu);
  if(a===1)state.alt++; if(n===1)state.neu++;
  if(process.argv[2]==='-v'||(a!==1&&n!==1)||a>1||n>1)console.log(`${p.sec.slice(0,40)} | ${p.file} | alt ${a} | neu ${n}`);
}
// Wert bleibt: Code-Wörter der Liste ‚bleibt‘ stehen im neuen Text des Abschnitts; Nummer stimmt: jede Regel der Überschrift steht im neuen Text
const secs=[...new Set(pairs.map(p=>p.sec))]; let wert=0,nr=0;
for(const s of secs){const sp=pairs.filter(p=>p.sec===s); const neuAll=sp.map(p=>p.neu).join('\n'); const altAll=sp.map(p=>p.alt).join('\n');
  for(const p of sp)for(const t of (p.bleibt||[])) if(altAll.includes(t)&&!neuAll.includes(t)&&cnt(txt[p.file],t)-sp.reduce((z,q)=>z+(cnt(txt[q.file],q.alt)?cnt(q.alt,t):0),0)<=0){console.log('✗ Wert fehlt',s.slice(0,30),t);wert++;}
  const head=(s.match(/ – (R-[\d.]+(?:, R-[\d.]+)*)/)||[])[1]; if(head)for(const r of head.split(', ')) if(!neuAll.includes(r)){console.log('✗ Nummer fehlt',s.slice(0,30),r);nr++;}
}
console.log(`Werte fehlen ${wert} · Nummern fehlen ${nr}`);
console.log(`Paare ${pairs.length} · alt gefunden ${state.alt} · neu gefunden ${state.neu} · Fehler ${bad}`);
{const ok=state.alt===0&&state.neu===pairs.length&&wert===0&&nr===0&&bad===0; console.log(ok?'APD-135 Paket 4: grün':'APD-135 Paket 4: rot'); process.exitCode=ok?0:1;}
if(process.argv[2]==='--einsetzen'){ for(const p of pairs){ const t=txt[p.file]; if(cnt(t,p.alt)!==1){console.log('NICHT eingesetzt',p.sec);continue;}
    let neu=p.neu; let alt=p.alt;
    if(neu.trim()==='(gestrichen)'){ neu=''; if(t.includes(alt+'\n')) alt=alt+'\n'; }
    txt[p.file]=t.replace(alt,()=>neu); }
  for(const k in files)fs.writeFileSync(files[k],txt[k]); console.log('eingesetzt'); }
export {pairs};
