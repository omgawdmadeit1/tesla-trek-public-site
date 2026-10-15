// WebMCP: real navigation tools for in-browser AI agents on the Tesla Trek site.
(()=>{const mc=document.modelContext||navigator.modelContext;if(!mc||typeof mc.registerTool!=='function')return;
const ac=new AbortController();const reg=t=>{try{const p=mc.registerTool(t,{signal:ac.signal});p&&p.catch&&p.catch(()=>{})}catch(e){}};
const PAGES={home:'/',guide:'/try-trek',car:'/car',waitlist:'/founder',starter:'/pay/trek-starter'};
reg({name:'trek_navigate',description:'Open a page of the Tesla Trek site: home, guide (how to try it), car (HUD), waitlist, starter (25 DOGE unlock).',
inputSchema:{type:'object',properties:{target:{type:'string',enum:Object.keys(PAGES)}},required:['target']},
execute:async({target})=>{const p=PAGES[target];if(!p)return{content:[{type:'text',text:'Unknown page'}],isError:true};location.href=p;return{content:[{type:'text',text:'Opening '+p}]}}});
reg({name:'trek_page_summary',description:'Return the current page title and its main headings.',inputSchema:{type:'object',properties:{}},
execute:async()=>({content:[{type:'text',text:JSON.stringify({title:document.title,headings:[...document.querySelectorAll('h1,h2')].slice(0,12).map(h=>h.textContent.trim())})}]})});
window.addEventListener('pagehide',()=>ac.abort());})();
