
import { useEffect, useRef } from 'react';

import { DemoCounterElement, DemoProfileElement } from '@demo-shared/demo-library';

import styles from './app.module.css';

export function App() {
  const person = {
    firstName: 'Jack',
    lastName: 'Doe'
  }
  const counter = useRef<DemoCounterElement>(null);
  const profile = useRef<DemoProfileElement>(null);

  const onIncrement = (e) => {
    console.log(e)
  }
  useEffect(() => {
    let counterRef = null; 
    if(counter.current) {
      counterRef = counter.current;
      counter.current.count = 2
      counterRef.addEventListener('incremented', onIncrement)
    }
    if(profile.current) {
      profile.current.person = person 
    }
    return () => {
      if(counterRef) {
        counterRef.removeEventListener('incremented', onIncrement)
      }
    }
  })

  return (
    <div className={styles.app}>
      <demo-title title={"React"} />
      <demo-title-colored title={"React"} />
      <demo-object dataPerson={JSON.stringify(person)}/>
      <demo-profile ref={profile}/>
      <demo-counter ref={counter} onIncremented={(e: Event) =>  console.log(e)} />
    </div>
  );
}

export default App;
