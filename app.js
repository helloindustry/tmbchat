const DATA_URL='data/export.json';
const roomsEl=document.getElementById('rooms');
const roomTitle=document.getElementById('roomTitle');
const roomHint=document.getElementById('roomHint');
const messagesEl=document.getElementById('messages');
const newTopicLink=document.getElementById('newTopic');
let state={rooms:[],current:null,repoUrl:null,newTopicUrl:null};
async function load(){const res=await fetch(DATA_URL+'?t='+Date.now());const data=await res.json();state.repoUrl=data.repoUrl;state.newTopicUrl=data.newTopicUrl;newTopicLink.href=state.newTopicUrl||state.repoUrl+'/discussions/new/choose';state.rooms=data.rooms||[];renderRooms();const first=state.rooms[0];if(first) switchRoom(first.slug);} 
function renderRooms(){roomsEl.innerHTML='';state.rooms.forEach(r=>{const a=document.createElement('a');a.href='#';a.textContent='# '+r.name;a.className=(state.current===r.slug)?'active':'';a.onclick=e=>{e.preventDefault();switchRoom(r.slug);};roomsEl.appendChild(a);});}
function switchRoom(slug){state.current=slug;renderRooms();const room=state.rooms.find(r=>r.slug===slug);roomTitle.textContent='# '+room.name;roomHint.textContent=room.readonly?'Read-only. Click a thread to reply on GitHub.':'Click a thread to reply on GitHub.';renderMessages(room);}
function renderMessages(room){messagesEl.innerHTML='';room.threads.forEach(t=>{const wrap=document.createElement('div');wrap.className='msg';const meta=document.createElement('div');meta.className='meta';meta.textContent=`${t.author} • ${new Date(t.createdAt).toLocaleString([], {hour:'numeric', minute:'2-digit', month:'short', day:'numeric'})}`;const text=document.createElement('div');text.className='text';text.textContent=t.title+(t.preview?'\n\n'+t.preview:'');const link=document.createElement('a');link.className='btn';link.href=t.url;link.target='_blank';link.rel='noopener';link.textContent='Open thread ↗';wrap.appendChild(meta);wrap.appendChild(text);wrap.appendChild(link);messagesEl.appendChild(wrap);});}
load().catch(err=>{messagesEl.textContent='Failed to load data. Has the workflow run yet?';console.error(err);});
