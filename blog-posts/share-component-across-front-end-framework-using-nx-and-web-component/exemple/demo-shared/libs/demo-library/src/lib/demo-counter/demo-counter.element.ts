const template = document.createElement('template');
template.innerHTML = `<style>
    #counter {
      color: red;
    }
  </style>
  <p>button clicked <span id="counter">0</span> times</p>
  <button id="btCounter">Click Here</button>`;

export class DemoCounterElement extends HTMLElement {
  private c = 0;
  get counter(): number {
    return this.c;
  }

  set counter(val: number) {
    this.c = val
    this.update(this.c);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById('btCounter').onclick = () => this.addClick();
  }

  addClick() {
    this.update(++this.counter);
    this.shadowRoot.dispatchEvent(new CustomEvent<{ counter: number }>('userClick', {detail: { counter: this.counter }}));
  }

  update(count: number) {
    this.shadowRoot.getElementById('counter').innerHTML = count.toString();
  }
}
  
customElements.define('demo-counter', DemoCounterElement);