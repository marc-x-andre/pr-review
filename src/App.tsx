import styled from "@emotion/styled";
import { PRForm } from "./components/pr-form";
import { useGithubStore } from "./store/Github";
import { useEffect } from "react";
import { StatusBar } from "./components/StatusBar/StatusBar";
import { useJiraStore } from "./store/Jira";
import { TemplateForm } from "./components/template-form";

const StyledMain = styled.main`
  display: grid;
  row-gap: 2rem;
  justify-items: center;
`;

function App() {
  const { setToken, getUserInfo } = useGithubStore();
  const { setUrl } = useJiraStore();

  useEffect(() => {
    const previousToken = localStorage.getItem("gh_token");
    if (previousToken) {
      setToken(previousToken);
      getUserInfo();
    }
    const previousUrl = localStorage.getItem("jira_url");
    if (previousUrl) {
      setUrl(previousUrl);
    }
  }, [getUserInfo, setToken, setUrl]);

  return (
    <StyledMain>
      <h1>Pull Request 🚁</h1>
      <TemplateForm />
      <PRForm />
      <StatusBar />
    </StyledMain>
  );
}

export default App;
