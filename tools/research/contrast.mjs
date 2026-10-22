const c={Ink:"#0B1512",Moss:"#14302A",Chalk:"#F1F4EC",Steel:"#8FA39A",Lime:"#C8F169",Violet:"#7C5CFF",Lilac:"#CFC4FF"};
const lum=h=>{const v=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(x=>x<=.03928?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2]};
const cr=(a,b)=>{const[x,y]=[lum(c[a]),lum(c[b])].sort((p,q)=>q-p);return ((x+.05)/(y+.05))};
const pairs=[["Chalk","Ink"],["Chalk","Moss"],["Steel","Ink"],["Steel","Moss"],["Steel","Chalk"],["Lime","Ink"],["Lime","Moss"],["Ink","Lime"],["Ink","Chalk"],["Moss","Chalk"],["Violet","Ink"],["Violet","Moss"],["Lilac","Ink"],["Lilac","Moss"],["Chalk","Violet"],["Ink","Violet"],["Ink","Steel"],["Moss","Lime"],["Lime","Chalk"],["Violet","Chalk"]];
for(const[a,b]of pairs){const r=cr(a,b);console.log(`${a} on ${b}`.padEnd(18),r.toFixed(2).padStart(6),r>=7?"AAA":r>=4.5?"AA":r>=3?"AA-large/UI only":"FAIL")}
