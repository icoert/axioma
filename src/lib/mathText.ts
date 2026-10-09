export interface MathPart {text:string;tex?:string}
const supers:Record<string,string>={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','ⁿ':'n','ˣ':'x','⁻':'-','⁺':'+','ᵏ':'k','ᵢ':'i','ᵇ':'b','ᵥ':'v','ᵃ':'a'};
const subs:Record<string,string>={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₙ':'n','ₐ':'a','ₓ':'x','ᵧ':'y','ₖ':'k','₋':'-','₊':'+','ᵦ':'b'};
const symbols:Record<string,string>={'−':'-','·':'\\cdot ','×':'\\times ','÷':'\\div ','≤':'\\le ','≥':'\\ge ','≠':'\\ne ','≈':'\\approx ','≡':'\\equiv ','∞':'\\infty ','π':'\\pi ','θ':'\\theta ','Δ':'\\Delta ','α':'\\alpha ','β':'\\beta ','ℝ':'\\mathbb{R}','ℚ':'\\mathbb{Q}','ℤ':'\\mathbb{Z}','ℕ':'\\mathbb{N}','ℂ':'\\mathbb{C}','∈':'\\in ','∉':'\\notin ','⊂':'\\subset ','⊆':'\\subseteq ','∪':'\\cup ','∩':'\\cap ','∅':'\\varnothing ','∀':'\\forall ','∃':'\\exists ','⇒':'\\Rightarrow ','⇔':'\\iff ','→':'\\to ','↔':'\\leftrightarrow ','∫':'\\int ','Σ':'\\sum ','∑':'\\sum ','★':'\\star ','°':'^{\\circ}','′':"'",'″':"''",'∧':'\\land ','∨':'\\lor ','¬':'\\neg ','∣':'\\mid ','±':'\\pm ','σ':'\\sigma ','φ':'\\varphi ','∏':'\\prod ','∖':'\\setminus ','∘':'\\circ ','⌊':'\\lfloor ','⌋':'\\rfloor '};
export function plainMathToTex(value:string):string {
 let source=value.replace(/\{/g,'\\{').replace(/\}/g,'\\}').replace(/x̄/g,'\\bar{x}').replace(/ȳ/g,'\\bar{y}').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ⁻⁺ᵏᵢᵇᵥᵃ]+/g,s=>`^{${[...s].map(c=>supers[c]).join('')}}`).replace(/[₀₁₂₃₄₅₆₇₈₉ₙₐₓᵧₖ₋₊ᵦ]+/g,s=>`_{${[...s].map(c=>subs[c]).join('')}}`);
 // Unicode roots bind to the next atom or balanced parenthesis, not the rest of a sentence.
 function roots(s:string):string {let result='';for(let i=0;i<s.length;i++){if(s[i]!=='√'){result+=s[i];continue;}let end=i+1;while(s[end]===' ')end++;const start=end;if(s[end]==='('){let depth=1;end++;while(end<s.length&&depth){if(s[end]==='(')depth++;if(s[end]===')')depth--;end++;}result+=`\\sqrt{${roots(s.slice(start+1,end-1))}}`;}else{const atom=s.slice(start).match(/^(?:\d+(?:[.,]\d+)?|[\p{L}])(?:\^\{[^}]+\}|_\{[^}]+\})?/u)?.[0]??'';end=start+atom.length;result+=`\\sqrt{${atom}}`;}i=end-1;}return result;}
 source=roots(source).replace(/\^([+-]?\d+|[a-zA-Z])/g,'^{$1}').replace(/[−·×÷≤≥≠≈≡∞πθΔαβℝℚℤℕℂ±σφ∏∖∘⌊⌋∈∉⊂⊆∪∩∅∀∃⇒⇔→↔∫Σ∑★°′″∧∨¬∣±σφ∏∖∘⌊⌋]/g,c=>symbols[c]);
 source=source.replace(/\b(sin|cos|tan|ln|log|lim|det)\b/g,'\\$1 ').replace(/\b(tg|ctg|Re|Im|arg|cmmdc|CMMDC|CMMMC|mod)\b/g,'\\operatorname{$1}');
 // Simple written fractions become stacked fractions. Larger expressions retain their explicit parentheses.
 source=source.replace(/(?<![A-Za-z\\])([\d]+|[a-zA-Z])\s*\/\s*([\d]+|[a-zA-Z])/g,'\\frac{$1}{$2}');
 return source.replace(/\b(cm|mm|km|dm)\b/g,'\\mathrm{$1}').replace(/%/g,'\\%');
}
const functions=new Set(['sin','cos','tg','ctg','tan','ln','log','lim','det','Re','Im','arg','cmmdc','CMMDC','CMMMC','mod']);
export function mathParts(text:string):MathPart[] {
 // Explicit $TeX$ has priority for notation whose meaning is ambiguous in prose.
 const pieces=text.split(/(\$[^$]+\$)/g);const result:MathPart[]=[];
 for(const piece of pieces){if(piece.startsWith('$')&&piece.endsWith('$')){result.push({text:piece.slice(1,-1),tex:piece.slice(1,-1)});continue;}
  const tokens=[...piece.matchAll(/\d+(?:[.,]\d+)?|[fghF]'(?=\()|[A-Za-zÀ-ÖØ-öø-ɏ]+|[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ⁻⁺ᵏᵢᵇᵥᵃ₀₁₂₃₄₅₆₇₈₉ₙₐₓᵧₖ₋₊ᵦ]+|[\s\S]/gu)].map(m=>({text:m[0],at:m.index!}));
  const atom=(s:string)=>/^\d/.test(s)||functions.has(s)||/^[fghF]'$/.test(s)||/^[a-zA-Z]$/.test(s)||['ab','ac','ax','bx','ad','bc','dx','dy','xy','AB','BC','AC','ABC','Ll','bh','bi','bd','cd','xz','yz','dz','dt','du','dv','ABCD','ABD','ACD','BCD','DE','EF','FG','GH','mn','np','pq','uv','ux','uy','vx','vy','cm','mm','km','dm'].includes(s)||/^[πθΔαβℝℚℤℕℂ∞σφȳ]$/.test(s);
  const operator=(s:string)=>/^[+−\-*/=<>≤≥≠≈≡·×÷√^_()\[\]{},;|!%°′″∈∉⊂⊆∪∩∅∀∃⇒⇔→↔∫Σ∑★∧∨¬∣±σφ∏∖∘⌊⌋̄⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ⁻⁺ᵏᵢᵇᵥᵃ₀₁₂₃₄₅₆₇₈₉ₙₐₓᵧₖ₋₊ᵦ]$/.test(s)||/^[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ⁻⁺ᵏᵢᵇᵥᵃ₀₁₂₃₄₅₆₇₈₉ₙₐₓᵧₖ₋₊ᵦ]+$/.test(s);
  let cursor=0;
  for(let i=0;i<tokens.length;){if(!atom(tokens[i].text)&&!operator(tokens[i].text)){i++;continue;}const start=i;let end=i;while(end<tokens.length&&(atom(tokens[end].text)||operator(tokens[end].text)||/^\s+$/.test(tokens[end].text)))end++;
   while(end>start&&/^[\s,;]+$/.test(tokens[end-1].text))end--;
   let raw=tokens.slice(start,end).map(t=>t.text).join('');let at=tokens[start].at;
   // Sentence punctuation around prose is not mathematical notation.
   if(!/[\dπθΔαβℝℚℤℕℂ∞√∈∉⊂⊆∪∩∅∀∃⇒⇔→↔∫Σ∑★∧∨¬±σφ∏∖∘⌊⌋ȳ]/.test(raw)&&!/[=+−\-*/<>⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉′]/.test(raw)&&!functions.has(raw.trim())&&!/^[b-np-zB-NP-Z]$/.test(raw.trim())&&!(/^[aAoO]$/.test(raw.trim())&&(piece.trim()===raw.trim()||/(?:baza|coeficient(?:ul)?|parametrul|neutrul|variabila|argumentul)\s+$/i.test(piece.slice(0,at))))&&!/[A-Za-z]['′]?\(/.test(raw)&&!/^\(?[a-zA-Z],\s*[a-zA-Z]\)?$/.test(raw.trim())){i=Math.max(start+1,end);continue;}
   // Keep a lone Romanian article outside a numeric expression ("a 5-a", "o 3...").
   if(/^[ao]\s/.test(raw)){const trim=raw.match(/^[ao]\s+/)![0];at+=trim.length;raw=raw.slice(trim.length);}
   if(at>cursor)result.push({text:piece.slice(cursor,at)});result.push({text:raw,tex:plainMathToTex(raw)});cursor=tokens[end-1].at+tokens[end-1].text.length;i=end;
  }
  if(cursor<piece.length)result.push({text:piece.slice(cursor)});
 }
 return result;
}
