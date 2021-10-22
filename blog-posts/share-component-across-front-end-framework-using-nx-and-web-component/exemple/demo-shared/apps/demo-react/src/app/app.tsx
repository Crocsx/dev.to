
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

  useEffect(function () {
    if(counter.current) {
      counter.current.counter = 5
    }
    if(profile.current) {
      profile.current.person = person 
    }
  }, []);
  
  return (
    <div className={styles.app}>
      <demo-title title={"React"} />
      <demo-title-colored title={"React"} />
      <demo-object dataPerson={JSON.stringify(person)}/>
      <demo-profile ref={profile}/>
      <demo-counter ref={counter} userClick={(e: Event) =>  console.log(e)} />
    </div>
  );
}

export default App;
