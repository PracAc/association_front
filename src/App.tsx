import mainRouter from "./routers/mainRouter.tsx";
import {RouterProvider} from "react-router-dom";
import useRestoreState from "./hooks/useRestoreState.ts";

function App() {

  useRestoreState()

  return (
    <>
      <RouterProvider router={mainRouter}></RouterProvider>
    </>
  )
}

export default App
