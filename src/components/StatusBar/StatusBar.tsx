import styled from "@emotion/styled";
import { GithubStatus } from "./GithubStatus";
import { JiraStatus } from "./JiraStatus";

const StyledStatusBar = styled.main`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 1rem;
`;

export function StatusBar() {
  return (
    <>
      <StyledStatusBar>
        <GithubStatus />
        <JiraStatus />
      </StyledStatusBar>
    </>
  );
}
