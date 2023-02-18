import { createBrowserRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Components/Test";

//라우터 
const Router = createBrowserRouter([
  {
    path:"/",
    element:<Test />
  },
])
export default Router;