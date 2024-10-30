import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Core
import routes from "./core/routes"

// Common
import LinearLoader from "./common/LinearLoader";

//Style
import "./App.scss"

const App = () => {
  return (
    <>
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
    </>
  )
}

export default App