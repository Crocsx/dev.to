const template = document.createElement('template');
template.innerHTML = `
<style>
    .name {
        font-weight: bold;
    }
</style>
<p>
    <span class="name">first name</span>
    <span id="firstName"></span>
</p>
<p>
    <span class="name">last name</span>
    <span id="lastName"></span>
</p>`;

export class DemoProfileElement extends HTMLElement {
    _person = {
      firstName: '',
      lastName: '',
  };

  get person(){
    return this._person
  }
  set person(value: {firstName: string, lastName: string}){
    this._person = value;
    this.update(this._person);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  update(value: {firstName: string, lastName: string}) {
    this.shadowRoot!.getElementById('firstName')!.innerHTML = this.person.firstName.toString();
    this.shadowRoot!.getElementById('lastName')!.innerHTML = this.person.lastName.toString();
  }
}
  
customElements.define('demo-profile', DemoProfileElement);