import './App.css'
import ContentSummarizer from './components/ContentSummarizer'
import PasteYourContent from './components/PasteYourContent'
import YourSnippets from './components/YourSnippets'

function App() {
  return (
    <div className="App">
      <ContentSummarizer />
      <PasteYourContent />
      <YourSnippets />
    </div>
  )
}

export default App
