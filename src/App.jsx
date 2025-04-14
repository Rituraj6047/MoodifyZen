import { useState } from 'react'
import MoodSelector from './components/MoodSelector'
import PromptInput from './components/PromptInput'
import AIResponse from './components/AIResponse'
import './App.css'

function App() {
  const [mood, setMood] = useState(null)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const checkAPI = async () => {
  //     const isValid = await verifyAPIKey();
  //     console.log(isValid ? "API Key is valid!" : "API Key is invalid");
  //   };
  //   checkAPI();
  // }, []);

  return (
    <div className="app">
      <h1>Mood AI Assistant</h1>
      <div className="container">
        <MoodSelector mood={mood} setMood={setMood} />
        <PromptInput
          mood={mood}
          setResponse={setResponse}
        // Remove setLoading from here
        />
        <AIResponse response={response} loading={loading} />
      </div>
    </div>
  )
}

export default App