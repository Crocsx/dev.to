---
published: false
title: "Share Components across Front Ends frameworks using Nx and Web Components"
cover_image: "https://raw.githubusercontent.com/Crocsx/dev.to/main/blog-posts/share-component-across-front-end-framework-using-nx-and-web-component/assets/Cover.png"
description: "Create a Web Component library and use it across your Front-end frameworks"
tags: webdev, nx, webcomponents, frontend, react, angular
canonical_url: "https://crocsx.hashnode.dev/share-components-across-front-ends-frameworks-using-nx-and-web-components"
---
This is the second of a three parts Guides:

- Part 1 - Project Setup and Introduction to Web Component
- Part 2 - Add Custom Style and Property Binding
- Part 3 - Output Event and Allow Retrocompatibility


**Part 2 - Add Custom Style and Property Binding**


In Part One, we introduced Web Component, what they are and how to use them. We also created and set up an Nx workspace with an Angular and React project using a Web Component library. We created a title element that would "listen" to an `attributes` and change the content of the `DOM`. In this second part, we will go further, create an event, assign properties, and add some polyfill to make our Web Component retro compatible.

1. Style our Web Component

Our Web Component works, but they are very flat at the moment. It would be great to add some CSS to it. We could create a CSS class, add a global stylesheet with some rules for that class, and it would work. But the logic of Web Component is having a fully independent component that would be auto sufficient and does not require anything from the "outside". Adding a global class for each component would also turn very quickly into a gigantic file full of rules, where we would have to take care not to reuse the same name multiple times not to pollute various components.

Hopefully, Web Components allow us to use Shadow DOM, keeping the markup structure, style, and behavior hidden and separate from other code on the page. Different parts of our code will not clash and can be kept nice and clean.

In our previously setup library, let's create a new title component (or edit the current one) where we will display the same title as before, but with some custom styling.

We are first going to create a template outside of our class 
We were previously injecting in the HTML our elements :

```
    attributeChangedCallback(name: string, old: string, value: string) {
      this.innerHTML = `<h1>Welcome From ${this.title}!</h1>`;
    }
``` 

But this wouldn't allow us to add some `<style>` at runtime. Also, we are going to make much more significant structures, and having to reuse the same markup structures repeatedly is quite painful; it would be great to have some kind of [template](Using templates and slots - Web Components | MDN (mozilla.org))... 

Well, it turns out there is one; outside of our class, create a template and add the styling you like :

```
const template = document.createElement('template');
template.innerHTML = `<style>
    h1 {
      color: red;
    }
  </style>
  <h1>Welcome From <span id="title"></span>!</h1>`;
```

Note that I added a `span` with an `id` around the value place we would like to update. This will come in handy when changing the DOM using the attribute (instead of what we were doing before `${this.title}`)

Templates are not rendered in the DOM but can still be referenced via Javascript. We are going to need to add it inside our Shadow DOM. To do this, add a constructor method to your Web Component and write the following :

```
export class DemoTitleColoredElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }
}
```
Here is what we added 

- `super` will call the `constructor` of `HTMLElement` 
- `attachShadow`attaches a shadow DOM tree to the specified element and returns a reference to its ShadowRoot. There can be two different `encapsulation modes`. `open` means elements of the shadow root are accessible from JavaScript outside the root while `closed` Denies access to the node(s) of a closed shadow root from JavaScript outside
- `this.shadowRoot!.appendChild` we are adding our template to the shadow Root and using `template.content.cloneNode(true)` we are cloning all the DOM element we defined in the template.

Finally, when the attribute change, let's update our template. Right now, we only observe a single attribute, so we can simply do : 

```
    attributeChangedCallback() {
      this.shadowRoot!.getElementById('title')!.innerHTML = this.title;
    }
```

We should end up with something similar to this,

```
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
      this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }
  
    attributeChangedCallback() {
      this.shadowRoot!.getElementById('title')!.innerHTML = this.title;
    }
}
    
customElements.define('demo-title-colored', DemoTitleColoredElement);
```

Nice! Remember to add this new element to your library's export and try it on your Angular and React project. I kept the old title we created before and the new one on the bottom. What we expect is our old title remain Black, while our new title should be Red (and do not affect other `h1` outside of it)

![Angular With Red and Black Title](./assets/images/AngularRed.png "Angular With Red and Black Title")

AWESOME! Our style is applied only to our Component!


2. Passing Object via Attributes

One common thing we would like to do is pass objects to our Web Component, and not just simple strings.

Since Web Component `attributeChangedCallback` and `observedAttributes` works with `attribute`, one way would be to stringify our object and pass it via the attribute `data-*` to keep our HTML valid.

Let's try this first :

Create a new element in our library, and for the `observedAttributes`, let's add the following :

```
export class DemoObjectElement extends HTMLElement {
    public static observedAttributes = ['data-person'];
  
    attributeChangedCallback(name: string, old: string, value: string) {
      console.log(`Attribute ${name} value:`, value);
    }
}
    
customElements.define('demo-object', DemoObjectElement);
```

Add this new element to your library's exports and head up to Angular/React. Create an object `person` like the following:
```
  person = {
    firstName: 'Jack',
    lastName: 'Doe'
  }
```

and pass it to our web component 

```
<demo-object [attr.data-person]="person"></demo-object>
```

You will see that our Web Component log will look like this: 
> Attribute data-person value: [object Object]

That's not great. To pass the entire object, we will need to stringify it first and parse it later.

in our angular component, add the following line :
```
JSON = JSON;
```

in the template 
```
<demo-object [data-person]="JSON.stringify(person)"></demo-object>
```
It will not works correctly : 
> Attribute data-person value: {"firstName":"Jack","lastName":"Doe"}

This is enough in a few cases, but we do not want to pollute attributes too much with big objects that must be parsed at every change. What about passing things as properties instead? Well, we can, but it is a bit less straightforward. 

2. Passing Object via Properties

Web Components are treated as basic HTML, so the way to pass property changes a little if you are on Angular or in React. We will first need to set up our component to accept property values. Since Web Components works with `attributes`, we will manually detect property changes and call our method ourselves.

For this example, we are going to create a simple `Profile` element that will display the `firstName` and `LastName` 

```
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
```

Let's now add some code to the component that we need.
The property we want to use :

```
export class DemoProfileElement extends HTMLElement {
    public static observedAttributes = ['person'];
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }
  
    attributeChangedCallback() {
      this.update(this.person);
    }
  
    update(person: {firstName: string, lastName: string}) {
      this.shadowRoot!.getElementById('firstName')!.innerHTML = person.firstName;
      this.shadowRoot!.getElementById('lastName')!.innerHTML = person.lastName;
    }
  }
    
  customElements.define('demo-profile', DemoProfileElement);
```

Now the above will not work, and your Typescript should already guide you to the why. `person` is not an HTML attribute, so `this.person` is not defined. Additionally, the `attributeChangedCallback` will never be called since `observedAttributes = ['person'];` can't observe attributes that do not exist.

To fix this and make it work, we need to forget about what we did until now and implement our way to detect changes, like if it was a simple Typescript Class. You can try to fix it by yourself or just scroll for the solution.

We will need a property in our class `_person` and a `get/set` assigned to that property.

```
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
```

Nothing incredible; we just use a get/set to check when the property is updated and update our DOM accordingly.

Now, the way to pass objects via property varies between React and Angular. Let's see how in Angular first. Don't forget to add this new element to your library's export!

2.1 Angular property binding. 

When passing Input to a component in Angular, Angular will first assign it as a property if that value exists in the element, and only after it use it as an attribute if a match couldn't be found. This makes a property to Web Component with Angular relatively easy since we do not have to do anything special.

In your Angular app, just add this line : 

```
<demo-profile [person]="person"></demo-profile>
```

And that's it!
![Angular With Person Profile](./assets/images/AngularName.png "Angular With Person Profile")

2.2 React property binding.

In React, things are a bit different. React pass props as JSX Attributes, and therefore, simply doing `<demo-profile person={person} />` will not work. We need to treat our Web Component as what it is, an HTML Element. We need to get the reference and assign to it the property.

In your React app, add a Reference to our component, and after initialization, assign the `person` property to our Web Component :

```
  import { DemoCounterElement, DemoProfileElement } from '@demo-shared/demo-library';

export function App() {
  const person = {
    firstName: 'Jack',
    lastName: 'Doe'
  }
  const profile = useRef<DemoProfileElement>(null);

  useEffect(function () {
    if(profile.current) {
      profile.current.person = person 
    }
  }, []);

  return (
    <div className={styles.app}>
      <demo-profile ref={counter}/>
    </div>
  );

```

And this is all for React. Start the project, and you will see the same result!

Great, we did almost all we would like to do, but there are still some things we might want to add.
In the last part, we will add some custom events to be dispatched from our Web Component and add polyfill to use our component on old browsers.

You can find the entire repo here :

[https://github.com/Crocsx](https://github.com/Crocsx/dev.to/tree/main/blog-posts/share-component-across-front-end-framework-using-nx-and-web-component/exemple/demo-shared)


Found a Typo or some problem?

If you’ve found a typo, a sentence that could be improved, or anything else that should be updated on this blog post, you can access it through a git repository and make a pull request. Please go directly to https://github.com/Crocsx/dev.to and open a new pull request with your changes.