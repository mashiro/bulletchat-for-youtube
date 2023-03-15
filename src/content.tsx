import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
)
