const template = document.createElement('template');
template.innerHTML = `<style>
    #count {
      color: red;
    }
  </style>
  <p>button clicked <span id="count">0</span> times</p>
  <button id="btCounter">Click Here</button>`;

export class DemoCounterElement extends HTMLElement {
  private _count = 0;
  get count(): number {
    return this._count;
  }

  set count(val: number) {
    this._count = val
    this.update(this._count);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById('btCounter').onclick = () => this.increment();
  }

  increment() {
    this.update(++this.count);
    this.dispatchEvent(new CustomEvent<{ count: number }>('incremented', {detail: { count: this.count }}));
  }

  update(count: number) {
    this.shadowRoot.getElementById('count').innerHTML = count.toString();
  }
}
  
customElements.define('demo-counter', DemoCounterElement);
  