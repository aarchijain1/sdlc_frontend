import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Chatbot.css";
import {
  BoltIcon, SendIcon, PlusIcon, CloseIcon, CopyIcon, ThumbUp, ThumbDown,
  RetryIcon, AttachIcon, SearchIcon, TrashIcon, HomeIcon, FileIcon,
  ImageIcon, BrainIcon, ChevronDown, ChevronRight, StopIcon, CheckIcon,
  SparkleIcon, MenuIcon
} from "./Icons";
import {
  THINKING_CHAINS, AI_RESPONSES, getNextAIResponse, getNextThinkingChain,
  SEED_HISTORY
} from "./data";

/* ── Markdown renderer ── */
function renderMD(text) {
  if (!text) return null;
  const lines = text.split("\n");
  const out = []; let i = 0, k = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim(); const code = []; i++;
      while (i < lines.length && !lines[i].startsWith("```")) { code.push(lines[i]); i++; }
      const codeStr = code.join("\n");
      out.push(
        <div key={k++} className="md-code-block">
          <div className="md-code-header">
            <span className="md-code-lang">{lang || "code"}</span>
            <button className="md-code-copy" onClick={() => navigator.clipboard?.writeText(codeStr)}><CopyIcon /> Copy</button>
          </div>
          <pre className="md-code-pre"><code>{codeStr}</code></pre>
        </div>
      ); i++; continue;
    }
    if (line.includes("|") && lines[i+1]?.includes("---")) {
      const headers = line.split("|").filter(Boolean).map(h => h.trim()); i += 2; const rows = [];
      while (i < lines.length && lines[i].includes("|")) { rows.push(lines[i].split("|").filter(Boolean).map(c => c.trim())); i++; }
      out.push(<div key={k++} className="md-table-wrap"><table className="md-table"><thead><tr>{headers.map((h,j)=><th key={j} className="md-th">{h}</th>)}</tr></thead><tbody>{rows.map((r,ri)=><tr key={ri} style={ri%2?{background:"rgba(255,255,255,.02)"}:{}}>{r.map((c,ci)=><td key={ci} className="md-td">{c}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (line.startsWith("## ")) { out.push(<h3 key={k++} className="md-h2">{line.slice(3)}</h3>); i++; continue; }
    if (line.startsWith("**") && line.endsWith("**") && !line.slice(2,-2).includes("**")) { out.push(<p key={k++} className="md-bold">{line.slice(2,-2)}</p>); i++; continue; }
    if (/^\d+\.\s/.test(line)) {
      const items = []; while (i<lines.length && /^\d+\.\s/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s/,"")); i++; }
      out.push(<ol key={k++} className="md-ol">{items.map((it,j)=><li key={j} className="md-li">{inlineMD(it)}</li>)}</ol>); continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items = []; while (i<lines.length && (lines[i].startsWith("- ")||lines[i].startsWith("* "))) { items.push(lines[i].slice(2)); i++; }
      out.push(<ul key={k++} className="md-ul">{items.map((it,j)=><li key={j} className="md-li">{inlineMD(it)}</li>)}</ul>); continue;
    }
    if (line.trim()==="") { out.push(<div key={k++} style={{height:6}}/>); i++; continue; }
    out.push(<p key={k++} className="md-p">{inlineMD(line)}</p>); i++;
  }
  return out;
}
function inlineMD(text) {
  const parts=[]; let rem=text, k=0;
  while(rem){
    const b=rem.indexOf("**"), c=rem.indexOf("`");
    if(b===-1&&c===-1){parts.push(<span key={k++}>{rem}</span>);break;}
    if(c!==-1&&(b===-1||c<b)){
      if(c>0)parts.push(<span key={k++}>{rem.slice(0,c)}</span>);
      const e=rem.indexOf("`",c+1); if(e===-1){parts.push(<span key={k++}>{rem}</span>);break;}
      parts.push(<code key={k++} className="md-code-inline">{rem.slice(c+1,e)}</code>); rem=rem.slice(e+1);
    }else{
      if(b>0)parts.push(<span key={k++}>{rem.slice(0,b)}</span>);
      const e=rem.indexOf("**",b+2); if(e===-1){parts.push(<span key={k++}>{rem}</span>);break;}
      parts.push(<strong key={k++} style={{fontWeight:700,color:"#E5E7EB"}}>{rem.slice(b+2,e)}</strong>); rem=rem.slice(e+2);
    }
  }
  return parts;
}

/* ── StreamText ── */
function StreamText({ full, onDone }) {
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    if(idx>=full.length){onDone?.();return;}
    const t=setTimeout(()=>setIdx(i=>Math.min(i+10,full.length)),10);
    return()=>clearTimeout(t);
  },[idx,full,onDone]);
  return <div>{renderMD(full.slice(0,idx))}{idx<full.length&&<span className="cursor-blink"/>}</div>;
}

/* ── ThinkBlock ── */
function ThinkBlock({ steps }) {
  const [open, setOpen] = useState(true);
  const [vis,  setVis]  = useState(0);
  const done = vis >= steps.length;
  useEffect(()=>{
    if(vis>=steps.length)return;
    const t=setTimeout(()=>setVis(v=>v+1),550);
    return()=>clearTimeout(t);
  },[vis,steps.length]);
  return (
    <div className="think-block">
      <button className="think-block__toggle" onClick={()=>setOpen(!open)}>
        <div className="think-block__toggle-left">
          <BrainIcon />
          <span className="think-block__label">
            {done?"Thinking complete":`Thinking… ${vis}/${steps.length}`}
          </span>
          {!done&&<span className="spinner spinner--sm spinner--amber"/>}
        </div>
        {open?<ChevronDown/>:<ChevronRight/>}
      </button>
      {open&&(
        <div className="think-block__body">
          {steps.slice(0,vis).map((s,i)=>(
            <div key={i} className="think-step anim-think-in">
              <div className="think-step__line">
                <div className={`think-step__dot ${i<vis-1?"think-step__dot--done":"think-step__dot--pending"}`}>
                  {i<vis-1?"✓":"•"}
                </div>
                {i<steps.length-1&&<div className="think-step__track"/>}
              </div>
              <div>
                <div className="think-step__title">{s.step}</div>
                <div className="think-step__detail">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── FileChip ── */
function FileChip({ file, onRemove }) {
  const isImg = file.type?.startsWith("image/");
  return (
    <div className="file-chip">
      {isImg?<ImageIcon/>:<FileIcon/>}
      <span className="file-chip__name">{file.name}</span>
      {onRemove&&<button className="file-chip__remove" onClick={onRemove}><CloseIcon/></button>}
    </div>
  );
}

/* ── Message ── */
function Msg({ msg, streaming, onDone }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role==="user";
  const copy=()=>{navigator.clipboard?.writeText(msg.content);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  return (
    <div className={`chat-msg${isUser?" chat-msg--user":""}`}>
      <div className={`chat-msg__avatar ${isUser?"chat-msg__avatar--user":"chat-msg__avatar--ai"}`}>
        {isUser?(msg.userInitials||"U"):<BoltIcon size={15}/>}
      </div>
      <div className="chat-msg__body">
        {msg.files?.length>0&&<div className="chat-msg__files">{msg.files.map((f,i)=><FileChip key={i} file={f}/>)}</div>}
        {!isUser&&msg.thinking&&<ThinkBlock steps={msg.thinking}/>}
        {isUser
          ?<div className="chat-msg__bubble-user">{msg.content}</div>
          :<div className="chat-msg__bubble-ai">{streaming?<StreamText full={msg.content} onDone={onDone}/>:renderMD(msg.content)}</div>
        }
        {!isUser&&!streaming&&(
          <div className="chat-msg__actions">
            <button className="chat-action-btn" onClick={copy}>{copied?<CheckIcon/>:<CopyIcon/>}<span>{copied?"Copied":"Copy"}</span></button>
            <button className="chat-action-btn"><ThumbUp/></button>
            <button className="chat-action-btn"><ThumbDown/></button>
            <button className="chat-action-btn"><RetryIcon/><span>Retry</span></button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── SidebarItem ── */
function SbItem({ chat, active, onSelect, onDelete }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`sb-item${active?" sb-item--active":""}`}
      onClick={onSelect} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <span className="sb-item__title">{chat.title}</span>
      {(hov||active)&&<button className="sb-item__del" onClick={e=>{e.stopPropagation();onDelete();}}><TrashIcon/></button>}
    </div>
  );
}

/* ── Sidebar ── */
function Sidebar({ history, activeId, onSelect, onNew, onDelete, user, onHome, open, onClose }) {
  const [q, setQ] = useState("");
  const grouped={};
  history.forEach(c=>{const g=c.date||"Today";if(!grouped[g])grouped[g]=[];grouped[g].push(c);});
  const filtered = q ? history.filter(c=>c.title.toLowerCase().includes(q.toLowerCase())) : null;

  return (
    <>
      {open && <div className="sb-overlay" onClick={onClose}/>}
      <div className={`chat-sidebar${open?" chat-sidebar--open":""}`}>
        <div className="sb-header">
          <div className="sb-logo-row">
            <div className="sb-logo-mark"><BoltIcon size={15}/></div>
            <span className="sb-logo-text">Agentic AI</span>
          </div>
          <button className="sb-new-btn" onClick={()=>{onNew();onClose();}}>
            <PlusIcon/> New Chat
          </button>
        </div>
        <div className="sb-search">
          <SearchIcon/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search conversations…" className="sb-search-input"/>
        </div>
        <div className="sb-history dark-scroll">
          {filtered
            ? filtered.map(c=><SbItem key={c.id} chat={c} active={c.id===activeId} onSelect={()=>{onSelect(c.id);onClose();}} onDelete={()=>onDelete(c.id)}/>)
            : Object.entries(grouped).map(([g,chats])=>(
              <div key={g}>
                <div className="sb-group-label">{g}</div>
                {chats.map(c=><SbItem key={c.id} chat={c} active={c.id===activeId} onSelect={()=>{onSelect(c.id);onClose();}} onDelete={()=>onDelete(c.id)}/>)}
              </div>
            ))
          }
        </div>
        <div className="sb-bottom">
          <button className="sb-home-btn" onClick={onHome}><HomeIcon/> Dashboard</button>
          <div className="sb-user-row">
            <div className="sb-user-avatar">{user.initials}</div>
            <div>
              <div className="sb-user-name">{user.name}</div>
              <div className="sb-user-role">{user.role}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Welcome ── */
function Welcome({ onSuggest }) {
  const cards=[
    {e:"🗂️",t:"Help me plan Sprint 34",         d:"Velocity-based allocation"},
    {e:"🏗️",t:"Review my service architecture",   d:"Boundary & coupling analysis"},
    {e:"🧪",t:"Generate test cases for payments", d:"Unit, integration & E2E"},
    {e:"🚀",t:"Optimise our CI/CD pipeline",      d:"Cut build time by 50%"},
    {e:"📝",t:"Write an Architecture Decision Record",d:"ADR template + context"},
    {e:"🔍",t:"Explain the orchestrator agent",   d:"SDLC architecture overview"},
  ];
  return (
    <div className="chat-welcome">
      <div className="chat-welcome__logo"><BoltIcon size={28}/></div>
      <h2 className="chat-welcome__title">How can I help you today?</h2>
      <p className="chat-welcome__sub">Your unified AI assistant for the entire SDLC pipeline.</p>
      <div className="chat-suggestions">
        {cards.map(({e,t,d})=>(
          <button key={t} className="chat-suggestion-card" onClick={()=>onSuggest(t)}>
            <div className="chat-suggestion-card__emoji">{e}</div>
            <div className="chat-suggestion-card__text">{t}</div>
            <div className="chat-suggestion-card__desc">{d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main Chatbot ── */
export default function Chatbot({ user, onGoHome }) {
  const [history,    setHistory]    = useState(SEED_HISTORY);
  const [activeId,   setActiveId]   = useState(null);
  const [input,      setInput]      = useState("");
  const [files,      setFiles]      = useState([]);
  const [generating, setGenerating] = useState(false);
  const [streamId,   setStreamId]   = useState(null);
  const [sidebarOpen,setSidebarOpen]= useState(false);

  const fileRef   = useRef(null);
  const taRef     = useRef(null);
  const endRef    = useRef(null);

  const active = history.find(c=>c.id===activeId);
  const msgs   = active?.messages||[];

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs.length,generating]);

  const adjustTA=()=>{const t=taRef.current;if(t){t.style.height="auto";t.style.height=Math.min(t.scrollHeight,180)+"px";}};

  const send = useCallback(()=>{
    const text=input.trim();
    if((!text&&files.length===0)||generating)return;
    setInput(""); setFiles([]);
    if(taRef.current)taRef.current.style.height="auto";
    const uid=`u-${Date.now()}`, aid=`a-${Date.now()+1}`;
    const uMsg={id:uid,role:"user",content:text,files:files.map(f=>({name:f.name,type:f.type})),userInitials:user.initials};
    const aMsg={id:aid,role:"assistant",content:getNextAIResponse(),thinking:getNextThinkingChain()};
    if(activeId){
      setHistory(h=>h.map(c=>c.id===activeId?{...c,messages:[...c.messages,uMsg,aMsg]}:c));
    }else{
      const nid=`chat-${Date.now()}`;
      const title=text.length>42?text.slice(0,40)+"…":text||`File: ${files[0]?.name}`;
      setHistory(h=>[{id:nid,title,date:"Today",messages:[uMsg,aMsg]},...h]);
      setActiveId(nid);
    }
    setGenerating(true); setStreamId(aid);
  },[input,files,generating,activeId,user.initials]);

  const onKey=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}};
  const canSend = (input.trim()||files.length>0)&&!generating;

  return (
    <div className="chat-root">
      <Sidebar
        history={history} activeId={activeId}
        onSelect={id=>setActiveId(id)} onNew={()=>setActiveId(null)}
        onDelete={id=>{setHistory(h=>h.filter(c=>c.id!==id));if(activeId===id)setActiveId(null);}}
        user={user} onHome={onGoHome}
        open={sidebarOpen} onClose={()=>setSidebarOpen(false)}
      />

      <div className="chat-main">
        {/* Topbar */}
        <div className="chat-topbar">
          <div className="chat-topbar__left">
            <button className="chat-topbar__menu-btn" onClick={()=>setSidebarOpen(true)} aria-label="Open menu">
              <MenuIcon/>
            </button>
            <span className="status-dot status-dot--green"/>
            <span className="chat-topbar__title">{active?.title||"New Conversation"}</span>
          </div>
          <div className="chat-topbar__right">
            <div className="chat-model-badge"><SparkleIcon/> Vertex AI · Agentic SDLC</div>
            {active&&<span className="chat-msg-count">{msgs.length} messages</span>}
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages dark-scroll"
          onDragOver={e=>e.preventDefault()}
          onDrop={e=>{e.preventDefault();setFiles(p=>[...p,...Array.from(e.dataTransfer.files)]);}}
        >
          {!active
            ?<Welcome onSuggest={t=>{setInput(t);setTimeout(()=>taRef.current?.focus(),50);}}/>
            :<div className="chat-messages-inner">
              {msgs.map(m=>(
                <Msg key={m.id} msg={m}
                  streaming={m.id===streamId&&generating}
                  onDone={m.id===streamId?()=>{setGenerating(false);setStreamId(null);}:undefined}
                />
              ))}
              {generating&&streamId&&(
                <div className="chat-generating">
                  <span className="spinner spinner--sm spinner--dark"/>
                  Generating response…
                </div>
              )}
              <div ref={endRef}/>
            </div>
          }
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-wrap">
            <div className="chat-input-box">
              {files.length>0&&(
                <div className="chat-input-files">
                  {files.map((f,i)=><FileChip key={i} file={f} onRemove={()=>setFiles(p=>p.filter((_,j)=>j!==i))}/>)}
                </div>
              )}
              <div className="chat-textarea-row">
                <textarea
                  ref={taRef} value={input} rows={1}
                  onChange={e=>{setInput(e.target.value);adjustTA();}}
                  onKeyDown={onKey}
                  placeholder="Ask anything about your SDLC… (Shift+Enter for new line)"
                  className="chat-textarea dark-scroll"
                />
              </div>
              <div className="chat-toolbar">
                <div className="chat-toolbar__left">
                  <button className="chat-toolbar-btn" onClick={()=>fileRef.current?.click()} title="Attach file">
                    <AttachIcon/><span>Attach</span>
                  </button>
                  <input ref={fileRef} type="file" multiple style={{display:"none"}}
                    onChange={e=>setFiles(p=>[...p,...Array.from(e.target.files)])}/>
                </div>
                <div className="chat-toolbar__right">
                  <span className="chat-hint">Enter to send · Shift+Enter for newline</span>
                  {generating
                    ?<button className="chat-stop-btn" onClick={()=>{setGenerating(false);setStreamId(null);}}>
                        <StopIcon/> Stop
                      </button>
                    :<button className="chat-send-btn" onClick={send} disabled={!canSend} aria-label="Send">
                        <SendIcon/>
                      </button>
                  }
                </div>
              </div>
            </div>
            <p className="chat-footer-text">Agentic AI · Powered by Google Vertex AI · TCS © 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}