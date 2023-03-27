import { createHashRouter } from "react-router-dom";
import App from "./App";

//라우터
const Router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
]);
export default Router;
