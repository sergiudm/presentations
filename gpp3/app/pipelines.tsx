import type {CSSProperties, ReactNode} from 'react';
import {FileSpreadsheet,FolderOpen,Database,BrainCircuit,SquareTerminal,Calculator,ShieldCheck,ListChecks,FileCheck,type LucideIcon} from 'lucide-react';
function Frame({name,children,height=300}:{name:string,children:ReactNode,height?:number}){return <svg className="pipeline-svg" viewBox={`0 0 1000 ${height}`} role="img" aria-label={name}><title>{name}</title><defs><marker id={`tip-${name.split(' ')[0]}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="context-stroke" strokeWidth="1.4"/></marker></defs>{children}</svg>}
function Box({x,y,w=150,title,sub,accent=false,step=0,icons=[]}:{x:number,y:number,w?:number,title:string,sub?:string,accent?:boolean,step?:number,icons?:LucideIcon[]}){
  const hasIcons=icons.length>0;
  return <g className={`pipe-box ${accent?'accent':''}`} style={{'--delay':`${step*.18}s`} as CSSProperties}>
    <rect x={x} y={y} width={w} height={hasIcons?92:68} rx="4"/>
    {icons.map((Icon,i)=><Icon key={i} x={x+w/2-(icons.length*32-8)/2+i*32} y={y+10} width={24} height={24} className="pipe-icon" strokeWidth={1.7} aria-hidden="true"/>)}
    <text x={x+w/2} y={y+(hasIcons?58:sub?28:40)} textAnchor="middle" className="pipe-title">{title}</text>
    {sub&&<text x={x+w/2} y={y+(hasIcons?77:49)} textAnchor="middle" className="pipe-sub">{sub}</text>}
  </g>;
}
function Link({d,id,feedback=false}:{d:string,id:string,feedback?:boolean}){return <path className={`pipe-link ${feedback?'feedback':''}`} d={d} fill="none" markerEnd={`url(#tip-${id})`}/>}
export function HarnessPipeline(){return <div className="diagram-block"><Frame name="Harness execution and observation feedback" height={300}><rect className="pipe-boundary" x="143" y="26" width="709" height="213" rx="8"/><text className="pipe-tag" x="164" y="52">HARNESS H · CONTEXT, TOOLS, AND CONTROL FLOW</text><Box x={0} y={73} w={115} title="Task" icons={[FileSpreadsheet]} sub="Goal + inputs"/><Box x={165} y={73} w={142} title="Context" icons={[FolderOpen,Database]} sub="Memory + state" step={1}/><Box x={339} y={73} w={142} title="Model Mθ" icons={[BrainCircuit]} sub="Frozen weights" accent step={2}/><Box x={513} y={73} w={142} title="Tools" icons={[SquareTerminal,Calculator]} sub="Execute action" step={3}/><Box x={687} y={73} w={142} title="Verify" icons={[ShieldCheck,ListChecks]} sub="Stop or retry" step={4}/><Box x={882} y={73} w={118} title="Output" icons={[FileCheck]} sub="Task result" step={5}/>{['M115 131 H165','M307 131 H339','M481 131 H513','M655 131 H687','M829 131 H882'].map(d=><Link key={d} d={d} id="Harness"/>)}{[
  {x:57.5,y:185,lines:['calculate the','average score in','student_scores.xls']},
  {x:941,y:185,lines:['Average score','sum ÷ valid count']},
].map(({x,y,lines})=><text key={x} x={x} y={y} textAnchor="middle" className="pipe-example">{lines.map((line,i)=><tspan key={line} x={x} dy={i===0?0:15}>{line}</tspan>)}</text>)}<Link d="M758 165 V207 H236 V165" id="Harness" feedback/><text className="pipe-label" x="490" y="196" textAnchor="middle">Observations and retry feedback update the context</text><text className="pipe-note" x="500" y="278" textAnchor="middle">Example: calculate an average from a spreadsheet; observations feed the next step.</text></Frame></div>}
// Slides 4 and 6 share this exact scene; only the editable scope changes.
export function EvolutionPipeline({hyper=false}:{hyper?:boolean}){
  return <div className={`diagram-block evolution-diagram ${hyper?'is-hyper':''}`}>
    <svg className="pipeline-svg" viewBox="0 0 1000 340" role="img" aria-label={hyper?'Hyperagents: an editable task agent and meta agent, including meta self-modification':'Darwin Gödel Machine: a coding agent modifies itself using fixed improvement instructions'}>
      <title>{hyper?'Hyperagents':'Darwin Gödel Machine'}</title>
      <defs><marker id="evolution-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M1 1 L7 4 L1 7" fill="none" stroke="context-stroke" strokeWidth="1.4"/></marker></defs>
      <rect className="evolution-boundary" x="265" y="44" width="410" height={hyper?270:134} rx="9"/>
      <g className="evolution-dgm" aria-hidden={hyper}><text className="pipe-tag" x="286" y="66">EDITABLE CODING AGENT</text></g>
      <g className="evolution-hyper" aria-hidden={!hyper}><text className="pipe-tag evolution-highlight" x="286" y="66">HYPERAGENT · ONE EDITABLE PROGRAM</text></g>

      <g className="evolution-node">
        <rect x="0" y="88" width="175" height="76" rx="5"/>
        <Database x="15" y="102" width="21" height="21" className="pipe-icon" aria-hidden="true"/>
        <text className="pipe-title" x="100" y="118" textAnchor="middle">Archive</text>
        <text className="pipe-sub" x="87.5" y="144" textAnchor="middle">Agents + scores</text>
      </g>
      <path className="evolution-link" d="M175 126 H330"/>
      <text className="pipe-sub" x="215" y="113" textAnchor="middle">Select parent</text>

      <g className="evolution-node evolution-task">
        <rect x="330" y="86" width="270" height="78" rx="5"/>
        <BrainCircuit x="346" y="99" width="25" height="25" className="pipe-icon" aria-hidden="true"/>
        <g className="evolution-dgm" aria-hidden={hyper}>
          <text className="pipe-title" x="482" y="115" textAnchor="middle">Coding agent A</text>
          <text className="pipe-sub" x="465" y="143" textAnchor="middle">Same agent: solve tasks + self-edit</text>
        </g>
        <g className="evolution-hyper" aria-hidden={!hyper}>
          <text className="pipe-title" x="482" y="115" textAnchor="middle">Task agent H</text>
          <text className="pipe-sub" x="465" y="143" textAnchor="middle">Solves the target task</text>
        </g>
      </g>
      <path className="evolution-link" d="M600 126 H815"/>
      <g className="evolution-dgm" aria-hidden={hyper}><text className="pipe-sub" x="739" y="113" textAnchor="middle">Coding tasks</text></g>
      <g className="evolution-hyper" aria-hidden={!hyper}><text className="pipe-sub evolution-highlight" x="739" y="113" textAnchor="middle">Target tasks</text></g>
      <g className="evolution-node">
        <rect x="815" y="88" width="185" height="76" rx="5"/>
        <ShieldCheck x="830" y="102" width="21" height="21" className="pipe-icon" aria-hidden="true"/>
        <text className="pipe-title" x="922" y="118" textAnchor="middle">Evaluate</text>
        <text className="pipe-sub" x="907.5" y="144" textAnchor="middle">Performance + validity</text>
      </g>
      <path className="evolution-link evolution-feedback" d="M908 164 V184 H713 V240 H600"/>
      <text className="pipe-sub" x="771" y="176" textAnchor="middle">Logs + scores</text>

      <g className="evolution-dgm" aria-hidden={hyper}><text className="evolution-kicker" x="465" y="198" textAnchor="middle">FIXED, OUTSIDE AGENT</text></g>
      <g className="evolution-hyper" aria-hidden={!hyper}><text className="evolution-kicker evolution-highlight" x="465" y="198" textAnchor="middle">NOW EDITABLE</text></g>
      <g className="evolution-node evolution-meta">
        <rect x="330" y="208" width="270" height="64" rx="5"/>
        <g className="evolution-dgm" aria-hidden={hyper}>
          <ListChecks x="346" y="218" width="23" height="23" className="pipe-icon" aria-hidden="true"/>
          <text className="pipe-title" x="482" y="233" textAnchor="middle">Fixed instructions</text>
          <text className="pipe-sub" x="465" y="254" textAnchor="middle">Handcrafted improvement procedure</text>
        </g>
        <g className="evolution-hyper" aria-hidden={!hyper}>
          <SquareTerminal x="346" y="218" width="23" height="23" className="evolution-meta-icon" aria-hidden="true"/>
          <text className="pipe-title evolution-highlight" x="482" y="233" textAnchor="middle">Meta agent U</text>
          <text className="pipe-sub" x="465" y="254" textAnchor="middle">Plans + applies modifications</text>
        </g>
      </g>
      <path className="evolution-link evolution-edit" d="M560 208 V164"/>
      <g className="evolution-dgm" aria-hidden={hyper}><text className="pipe-sub" x="606" y="185" textAnchor="middle">Guides self-edit</text></g>
      <g className="evolution-hyper" aria-hidden={!hyper}><text className="pipe-sub evolution-highlight" x="606" y="185" textAnchor="middle">Edits H</text></g>
      <g className="evolution-new-loop evolution-hyper" aria-hidden={!hyper}>
        <path className="evolution-link" pathLength="1" d="M330 240 H288 V290 H465 V272"/>
        <text className="pipe-sub evolution-highlight" x="462" y="307" textAnchor="middle">NEW: U edits its own code</text>
      </g>
      <path className="evolution-link evolution-feedback" d="M980 164 V332 H87 V164"/>
      <text className="pipe-sub" x="811" y="318" textAnchor="middle">Archive valid variants; select again</text>
    </svg>
  </div>;
}
