import styled from "@emotion/styled";
import emotionLogo from "./assets/emotion.png";
import reactLogo from "./assets/react.svg";
import zustandLogo from "./assets/zustand.png";
import { useStore } from "./store/Store";
import viteLogo from "/vite.svg";

const StyledMain = styled.main`
  display: grid;
  row-gap: 4rem;
  justify-items: center;
`;

const StyledLogosWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (min-width: 670px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StyledLogo = styled.a`
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  display: inline-flex;

  & img {
    display: block;
    height: 6rem;
    will-change: filter;
    transition: filter 300ms;

    &:hover {
      filter: drop-shadow(0 0 2rem #646cffaa);
    }

    &.react {
      &:hover {
        filter: drop-shadow(0 0 2rem #61dafbaa);
      }

      @media (prefers-reduced-motion: no-preference) {
        & {
          animation: logo-spin infinite 20s linear;
        }
      }
    }

    &.zustand:hover {
      filter: drop-shadow(0 0 2rem #f56d2caa);
    }

    &.emotion:hover {
      filter: drop-shadow(0 0 2rem #d36ac2aa);
    }
  }
`;

const StyledCard = styled.div`
  display: grid;
  row-gap: 1rem;
  justify-items: center;
`;

const StyledParagraph = styled.p`
  color: #888;
`;

function App() {
  const { count, setCount } = useStore();

  return (
    <StyledMain>
      <StyledLogosWrapper>
        <StyledLogo href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} alt="Vite logo" />
        </StyledLogo>
        <StyledLogo href="https://react.dev" target="_blank">
          <img src={reactLogo} className="react" alt="React logo" />
        </StyledLogo>
        <StyledLogo href="https://zustand-demo.pmnd.rs/" target="_blank">
          <img src={zustandLogo} className="zustand" alt="Zustand logo" />
        </StyledLogo>
        <StyledLogo href="https://emotion.sh" target="_blank">
          <img src={emotionLogo} className="emotion" alt="Emotion logo" />
        </StyledLogo>
      </StyledLogosWrapper>
      <h1>Vite + React + Zustand + Emotion</h1>
      <StyledCard>
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </StyledCard>
      <StyledParagraph>Click on the logos to learn more</StyledParagraph>
    </StyledMain>
  );
}

export default App;
