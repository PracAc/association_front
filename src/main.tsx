import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/mainRouter.tsx";

createRoot(document.getElementById('root')!).render(
        <RouterProvider router={mainRouter}></RouterProvider>
)
