var m=Object.defineProperty;var u=(n,t,e)=>t in n?m(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var a=(n,t,e)=>(u(n,typeof t!="symbol"?t+"":t,e),e);import{B as o,R as d,d as s,h as b,p as v,s as x,L as S}from"./index-2CqhxmcN.js";class f extends o{constructor(t){super({tag:"button",classes:["button","button-start"],content:"Start",event:"click",callback:()=>{this.navigateTo(d.GAME)}}),this.navigateTo=t}}class z extends o{constructor(e){super({tag:"div"});a(this,"greeting");a(this,"buttonStart");this.navigateTo=e,this.buttonStart=new f(this.navigateTo),this.greeting="",this.getGreetingText(),this.createPage()}createPage(){const e=s(["content-wrapper"]),r=s(["text-wrapper"]),i=b(["game-title"],"English Puzzles"),g=v(["greeting"],`${this.greeting}`),l=x(["greeting-info"],'Welcome to the "English Puzzle" game! Improve your English skills by solving puzzles to form sentences. Ready to start learning? Press "Start"!'),c=s(["start-img"]),p=s(["bg-wave"]),h=s(["start-bg"]);r.appendChildren([i.element,g.element,l.element]),e.appendChildren([r.element,this.buttonStart.element,c.element]),this.appendChildren([e.element,p.element,h.element])}getGreetingText(){const e=S.getUser();if(!e)throw new Error("user is not defined");this.greeting=`Hello, ${e.name} ${e.surname} 🧩`}}export{z as default};
