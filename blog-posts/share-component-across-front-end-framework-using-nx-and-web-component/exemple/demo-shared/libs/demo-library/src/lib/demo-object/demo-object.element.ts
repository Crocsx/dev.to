export class DemoObjectElement extends HTMLElement {
    public static observedAttributes = ['data-person'];
  
    attributeChangedCallback(name: string, old: string, value: string) {
      console.log(`Attribute ${name} value:`, value);
    }
}
    
customElements.define('demo-object', DemoObjectElement);