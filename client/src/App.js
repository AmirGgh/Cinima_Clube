import MoviesList from "./features/movies/MoviesList";

import Layout from "./components/Layout";
import { Routes, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import { Route } from "react-router"
function App() {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route>
        <Route path="/main" element={<Layout />} />
        <Route path="main/movies" element={<MoviesList />} />
        <Route path="main/movies" element={<MoviesList />} />
      </Route>
    </Routes>

  );
}

export default App;


    //   // <Routes>
    // //   <Route path="/" element={<Layout />}>
    //     {/* <Route path="post">
    //       <Route index element={<AddPostForm />} />
    //       <Route path=":postId" element={<SinglePostPage />} />
    //       <Route path="edit/:postId" element={<EditPostForm />} />
    //     </Route> */}

    //     {/* <Route path="user">
    //       <Route index element={<UsersList />} />
    //       <Route path=":userId" element={<UserPage />} />
    //     </Route> */}

    //     {/* Catch all - replace with 404 component if you want */}
    //     // <Route path="*" element={<Navigate to="/" replace />} />

    // //   </Route>
    // // </Routes>