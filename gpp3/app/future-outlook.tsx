import {ArrowRight,BrainCog,Workflow,Cpu} from 'lucide-react';

export function FutureOutlook(){
  return <div className="future-outlook">
    <section className="outlook-question">
      <h3>How much comes from the harness?</h3>
      <table className="outlook-matrix" aria-label="Proposed crossed evaluation of initial and evolved harnesses with two task models">
        <thead><tr><th scope="col">Harness</th><th scope="col">Model A</th><th scope="col">Model B</th></tr></thead>
        <tbody>
          <tr><th scope="row">Initial H₀</th><td>S(H₀, A)</td><td>S(H₀, B)</td></tr>
          <tr><th scope="row">Evolved H*</th><td>S(H*, A)</td><td>S(H*, B)</td></tr>
        </tbody>
      </table>
      <p className="outlook-test">S = task score · Measure contributions and interaction.</p>
    </section>
    <section className="outlook-question">
      <h3>Evolve strong, deploy light?</h3>
      <div className="outlook-transfer" aria-label="A strong meta model evolves a harness, which is reused by a smaller task model">
        <div className="outlook-model"><BrainCog aria-hidden="true"/><strong>Strong model A</strong><small>Meta agent</small></div>
        <ArrowRight className="outlook-arrow" aria-label="Evolves"/>
        <div className="outlook-model outlook-harness"><Workflow aria-hidden="true"/><strong>Harness H*</strong><small>Freeze and reuse</small></div>
        <ArrowRight className="outlook-arrow" aria-label="Runs with"/>
        <div className="outlook-model"><Cpu aria-hidden="true"/><strong>Small model B</strong><small>Task agent</small></div>
      </div>
      <p className="outlook-test">Same harness, similar quality, lower cost?</p>
    </section>
  </div>;
}
