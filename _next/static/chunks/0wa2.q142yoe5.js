(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,39475,e=>{"use strict";let r="mot-du-jour:anthropic-key";function t(){return window.localStorage.getItem(r)}async function o(e){var r,o;let n,s,i,c,u=t();if(u)try{return await a(u,e)}catch(e){console.warn("Échec API Claude, fallback heuristique :",e instanceof Error?`${e.name}: ${e.message}`:"erreur inconnue")}return r=e.mot,o=e.phrase,n=r.toLowerCase().slice(0,Math.max(3,r.length-2)),i=(s=e=>e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,""))(o).includes(s(n)),c=o.trim().split(/\s+/).length>=4,{correct:i&&c,retour:i?c?`Votre phrase emploie le mot \xab ${r} \xbb. Pour un retour plus fin sur la justesse de l'usage, configurez votre cl\xe9 API Anthropic dans les param\xe8tres.`:"Votre phrase est très courte — essayez d'en dire un peu plus.":`Le mot \xab ${r} \xbb ne semble pas employ\xe9 dans votre phrase.`,source:"heuristique"}}async function a(e,r){let t,o=`\xc9value si la phrase suivante utilise correctement le mot "${r.mot}" en fran\xe7ais.

D\xe9finition de r\xe9f\xe9rence du mot : ${r.definition}
Registre du mot : ${r.registre}

Phrase \xe0 \xe9valuer : "${r.phrase}"

R\xe9ponds uniquement en JSON avec la structure suivante :
{
  "correct": boolean,
  "retour": string
}

Le retour doit \xeatre en fran\xe7ais, bienveillant, et expliquer en deux phrases maximum pourquoi la phrase est correcte ou comment elle pourrait \xeatre am\xe9lior\xe9e.`,a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":e,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:256,messages:[{role:"user",content:o}]}),redirect:"error",credentials:"omit",referrerPolicy:"no-referrer",signal:AbortSignal.timeout(3e4)});if(!a.ok)throw Error(`Claude API HTTP ${a.status}`);let n=await a.json(),s=(n.content?.find(e=>"text"===e.type)?.text??"").match(/\{[\s\S]*\}/);if(!s)throw Error("Réponse Claude sans JSON détectable");try{t=JSON.parse(s[0])}catch{throw Error("JSON Claude malformé")}if(!t||"object"!=typeof t||"boolean"!=typeof t.correct||"string"!=typeof t.retour)throw Error("Réponse Claude au format inattendu");let i=t,c=i.retour.slice(0,600);return{correct:i.correct,retour:c,source:"claude"}}e.s(["evaluerPhrase",0,o,"getAnthropicKey",0,t,"setAnthropicKey",0,function(e){e?window.localStorage.setItem(r,e):window.localStorage.removeItem(r)}])}]);