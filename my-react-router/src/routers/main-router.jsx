// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from "react-router-dom";
import MainPage from "~/routes/page";
import BoardPage from "~/routes/board/page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    index: true,
  },
  {
    path: "/board",
    element: <BoardPage />,
    index: true,
  },
]);
export default router;
