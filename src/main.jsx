import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { QueryClientProvider, QueryClient } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { ToastContainer} from 'react-toastify';

import { store } from './app/store.js'
import { Provider } from 'react-redux'

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
  {/* <QueryClientProvider client={queryClient}> */}
    <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
    <Routes>
     <Route path="/*" element={<App />} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
    {/* </QueryClientProvider> */}
    </Provider>
   </React.StrictMode>,
)
