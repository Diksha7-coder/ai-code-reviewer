import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from "axios"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode]=useState(`e.g= function sum(){
    return 1 + 1}
    `)
    const [darkMode, setDarkMode] = useState(true);
  const [review, setReview]= useState(``)

  useEffect(()=>{
    prism.highlightAll()
  }, [])

  async function reviewCode(){
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
  }

  return (
    <>
    <div className={`container ${darkMode ? "dark" : "light"}`}>
     
    <header>
        <h1 className="title">🚀 AI Code Review</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>














     <main>
      <div className="left">
      
        <div className="code">
          
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border:"1px solid #ddd",
              borderRadius:"5px",
              height:"100%",
              width:"100%"
            }}
          />
        </div>
        <div 
        onClick={reviewCode}
        className="review">Review</div>
      </div>
     <div className="right">
      <Markdown
        rehypePlugins={[ rehypeHighlight ]}
      >{review}</Markdown>
     </div>
     </main>
     </div>
    </>
  )
}



export default App
