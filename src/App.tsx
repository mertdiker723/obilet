import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Core
import routes from "./core/routes"

// Common
import LinearLoader from "./common/LinearLoader";

// Store
import { GlobalContextProvider } from "./core/store/AppStore";

//Style
import "./App.scss"

const App = () => {
  return (
    <GlobalContextProvider>
      <Router>
        <Suspense fallback={<LinearLoader />}
        >
          <Routes>
            {
              routes.map(item => {
                const { id, path, component: Component } = item || {}
                return (
                  <Route key={id} path={path} element={<Component />} />

                )
              })
            }
          </Routes>
        </Suspense>
      </Router>
    </GlobalContextProvider>
  )
}

export default App