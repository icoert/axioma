export function complexPolar(real:number,imaginary:number) {return {modulus:Math.hypot(real,imaginary),argument:real===0&&imaginary===0?null:Math.atan2(imaginary,real)*180/Math.PI};}
export function progression(first:number,ratio:number,count:number,geometric=false) {
 if(!Number.isInteger(count)||count<1)throw new RangeError('Numărul de termeni trebuie să fie un întreg pozitiv.');
 const terms=Array.from({length:count},(_,i)=>geometric?first*ratio**i:first+i*ratio);
 const sum=geometric?(ratio===1?first*count:first*(1-ratio**count)/(1-ratio)):count*(2*first+(count-1)*ratio)/2;
 return {terms,last:terms[count-1],sum};
}
export function binomial(n:number,p:number,k:number) {
 if(!Number.isInteger(n)||n<0||p<0||p>1||!Number.isFinite(p)||!Number.isInteger(k)||k<0||k>n)throw new RangeError('Parametri binomiali nevalizi.');
 if(p===0)return k===0?1:0;if(p===1)return k===n?1:0;
 let choose=1;for(let i=1;i<=k;i++)choose=choose*(n-i+1)/i;
 return choose*p**k*(1-p)**(n-k);
}
export const exponential=(base:number,x:number)=>{if(base<=0||!Number.isFinite(base))throw new RangeError('Baza trebuie să fie pozitivă.');return base**x;};
