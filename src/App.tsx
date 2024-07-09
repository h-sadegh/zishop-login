import React from "react";
import Login from "./Login";
import { QueryClient, QueryClientProvider } from "react-query";
import "./style/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitInformation from "./components/login/submitInformation";
import WithPassword from "./components/withPassword";
import ForgetPassword from "./components/login/forgetPassword";
import PersonalInformation from "./components/profile/personal-information";

const App = () => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route
            path="/user/submit-information"
            Component={SubmitInformation}
          />
          <Route
            path="/user/with-password"
            // @ts-ignore
            Component={WithPassword}
          />
          <Route path="/user" Component={Login} />
          <Route path="/user/forget-password" Component={ForgetPassword} />
          <Route
            path="/profile/personal-information"
            Component={PersonalInformation}
          />
        </Routes>
        <Login />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
