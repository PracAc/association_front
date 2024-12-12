import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./routers/mainRouter.tsx";
import projectStore from "./store.ts";
import {Provider} from "react-redux";
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={projectStore}>
            <App/>
    </Provider>
)
