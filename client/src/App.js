import MoviesList from "./features/movies/MoviesList";
import Layout from "./components/Layout";
import { Routes, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import { Route } from "react-router"
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme";
import Header from "./components/Header";
import SubscriptionsList from "./features/subscriptions/SubscriptionsList";
import UsersList from "./features/users/UsersList";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <br />
      <Container fixed >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route>
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/subscriptions" element={<SubscriptionsList />} />
            <Route path="/users" element={<UsersList />} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>

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