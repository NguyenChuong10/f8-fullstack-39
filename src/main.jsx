import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as TodoProvider } from 'react-redux'
import store from './store';
createRoot(document.getElementById('root')).render(
  <TodoProvider store={store}>
     <App/>
  </TodoProvider>
)
