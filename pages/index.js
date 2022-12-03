import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Get a date</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Magic Chat Up Line Generator. Use AI to Find a Date</h1>
          </div>
          <div className="header-subtitle">
            <h2>Start your sentence with "Write me a chat up line about".... ( for example, Write me a funny chat up line about flowers, Write me a provocative chat up line about golf ). </h2>
          </div>
        </div>
                <div className="prompt-container">
                <textarea
  className="prompt-box"
  placeholder="For example: Write me a funny chat up line about Football....."
  value={userInput}
  onChange={onUserChangedText}
/>
<div className="prompt-buttons">
    <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}>
      <div className="generate">
      {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
      </div>
    </a>
  </div>
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3> Your Chat Up Line.</h3>
      </div>
    </div>
    
    <div className="output-content">
      <p>{apiOutput}</p>
  
    </div>
  
  <div className="generate-content">
   <h4> Don't like your chat up line? Hit generate again for more results! </h4>
     
  </div>
  
  </div>
)}

<div>
<a href="https://wa.me/">Share this link</a>
</div>

</div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/HarryArkwright1"
          target="_blank"
          rel="noreferrer"
        >
<div className="badge">
            <p>Built with ❤️ by Harry Arkwright</p>
          </div>
        </a>
      </div>
    </div>

  );
};


export default Home;
