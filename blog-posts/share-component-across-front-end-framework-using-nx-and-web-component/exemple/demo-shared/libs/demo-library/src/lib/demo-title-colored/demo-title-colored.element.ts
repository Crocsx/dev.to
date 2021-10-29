const template = document.createElement('template');
template.innerHTML = `<style>
    h1 {
      color: red;
    }
  </style>
  <h1>Welcome From <span id="title"></span>!</h1>`;

export class DemoTitleColoredElement extends HTMLElement {
    public static observedAttributes = ['title'];
    
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    attributeChangedCallback() {
      this.shadowRoot.getElementById('title').innerHTML = this.title;
    }
}
    
customElements.define('demo-title-colored', DemoTitleColoredElement);