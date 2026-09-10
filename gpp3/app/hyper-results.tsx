import {ReferenceLinks} from './references';

type Bar = {label:string; value:number; low:number; high:number; kind:'dgm'|'custom'|'hyper'};
type Comparison = {title:string; benchmark:string; citationIds:number[]; scope:string; metric:string; max:number; percent?:boolean; bars:Bar[]};

// Hyperagents v1, §5.1–5.2 / Figs. 2–3. Medians and 95% bootstrap CIs, 5 runs.
const comparisons:Comparison[] = [
  {title:'Paper review',benchmark:'APRES paper data',citationIds:[6],scope:'Held-out test · 100 iterations',metric:'Acceptance accuracy',max:1,percent:true,bars:[
    {label:'DGM',value:0,low:0,high:.510,kind:'dgm'},
    {label:'DGM-custom',value:.590,low:.570,high:.650,kind:'custom'},
    {label:'DGM-H',value:.710,low:.590,high:.750,kind:'hyper'},
  ]},
  {title:'Robotics reward design',benchmark:'Genesis / Go2 tasks',citationIds:[2,7],scope:'Held-out test · 100 iterations',metric:'Test performance (score)',max:.5,bars:[
    {label:'DGM',value:0,low:0,high:.090,kind:'dgm'},
    {label:'DGM-custom',value:.348,low:.305,high:.385,kind:'custom'},
    {label:'DGM-H',value:.372,low:.355,high:.436,kind:'hyper'},
  ]},
  {title:'Math grading transfer',benchmark:'IMO-GradingBench',citationIds:[8],scope:'Transfer source → new math domain',metric:'Improvement@50 · fixed meta agent',max:1,bars:[
    {label:'DGM-custom',value:0,low:0,high:.010,kind:'custom'},
    {label:'DGM-H',value:.630,low:.540,high:.630,kind:'hyper'},
  ]},
];

function ComparisonChart({chart}:{chart:Comparison}){
  const baseline=176, plotHeight=150;
  const y=(value:number)=>baseline-value/chart.max*plotHeight;
  const format=(value:number)=>chart.percent?`${(value*100).toFixed(1)}%`:value.toFixed(3);
  const description=`${chart.title}. ${chart.metric}. ${chart.bars.map(bar=>`${bar.label}: ${format(bar.value)}, 95% confidence interval ${format(bar.low)} to ${format(bar.high)}`).join('. ')}.`;
  return <figure className="hyper-comparison">
    <h3>{chart.title}</h3><p className="benchmark-source">{chart.benchmark}<ReferenceLinks ids={chart.citationIds}/></p><p>{chart.scope}</p>
    <svg viewBox="0 0 320 232" role="img" aria-label={description}>
      <title>{chart.title}</title><desc>{description}</desc>
      {[0,.5,1].map(fraction=><g key={fraction}>
        <line className="comparison-gridline" x1="42" y1={y(chart.max*fraction)} x2="315" y2={y(chart.max*fraction)}/>
        <text className="comparison-tick" x="33" y={y(chart.max*fraction)+4} textAnchor="end">{chart.percent?`${fraction*100}%`:(chart.max*fraction).toFixed(2)}</text>
      </g>)}
      {chart.bars.map((bar,index)=>{
        const center=42+(index+.5)*273/chart.bars.length;
        return <g key={bar.label} className={`comparison-series comparison-${bar.kind}`}>
          <rect className="comparison-bar" x={center-24} y={y(bar.value)} width="48" height={baseline-y(bar.value)}/>
          {bar.value===0&&<line className="comparison-zero" x1={center-24} y1={baseline} x2={center+24} y2={baseline}/>}
          <path className="comparison-error" d={`M${center} ${y(bar.high)} V${y(bar.low)} M${center-7} ${y(bar.high)} H${center+7} M${center-7} ${y(bar.low)} H${center+7}`}/>
          <text className="comparison-value" x={center} y="198" textAnchor="middle">{format(bar.value)}</text>
          <text className="comparison-label" x={center} y="220" textAnchor="middle">{bar.label}</text>
        </g>;
      })}
    </svg>
    <figcaption>{chart.metric}</figcaption>
  </figure>;
}

export function HyperResults(){return <div className="hyper-comparison-grid">{comparisons.map(chart=><ComparisonChart key={chart.title} chart={chart}/>)}</div>}
