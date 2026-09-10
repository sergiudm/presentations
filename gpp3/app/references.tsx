export const refs = [
  {authors:'Zhang et al.',year:'2025',title:'Darwin Gödel Machine: Open-Ended Evolution of Self-Improving Agents',url:'https://arxiv.org/abs/2505.22954',detail:'arXiv:2505.22954 · March 2026 revision'},
  {authors:'Zhang et al.',year:'2026',title:'Hyperagents',url:'https://arxiv.org/abs/2603.19461',detail:'arXiv:2603.19461 · Methods, results, task protocols'},
  {authors:'Jimenez et al.',year:'2024',title:'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?',url:'https://arxiv.org/abs/2310.06770',detail:'ICLR 2024 · Original coding benchmark'},
  {authors:'OpenAI',year:'2024',title:'Introducing SWE-bench Verified',url:'https://openai.com/index/introducing-swe-bench-verified/',detail:'Human-validated SWE-bench subset · Official release'},
  {authors:'Gauthier',year:'2024',title:'Aider Polyglot benchmark',url:'https://aider.chat/2024/12/21/polyglot.html',detail:'225 coding exercises · Official benchmark release'},
  {authors:'Zhao et al.',year:'2026',title:'APRES: An Agentic Paper Revision and Evaluation System',url:'https://arxiv.org/abs/2603.03142',detail:'arXiv:2603.03142 · Source of paper review data'},
  {authors:'Genesis Authors',year:'2024',title:'Genesis: A Generative and Universal Physics Engine for Robotics and Beyond',url:'https://github.com/Genesis-Embodied-AI/genesis-world',detail:'Robotics simulator · Go2 task protocol in [2], App. C.3'},
  {authors:'Luong et al.',year:'2025',title:'Towards Robust Mathematical Reasoning',url:'https://aclanthology.org/2025.emnlp-main.1794/',detail:'EMNLP 2025 · IMO-GradingBench'},
];

export function ReferenceLinks({ids}:{ids:number[]}){
  return <sup className="benchmark-citations">{ids.map(id=><a key={id} href={refs[id-1].url} target="_blank" rel="noreferrer" title={refs[id-1].title} aria-label={`Reference ${id}: ${refs[id-1].title}`}>[{id}]</a>)}</sup>;
}
