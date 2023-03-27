import { createHashRouter } from "react-router-dom";
import App from "./App";
import Test from "./Components/Test";
import TestChild from "./Components/TestChild";

//라우터 
const Router = createHashRouter([
  {
    path:"/",
    element:<App />,
    children: [
      {
        path: "/testchild",
        element: <TestChild />
      }
    ]
  },
]);
export default Router;


