import Logo from "components/Logo";
import "./styles.scss";

const App = (): JSX.Element => {
    
  return (
    <React.Fragment>
      <main>
        <div className="scroll-content-wrapper">
          <div className="scroll-content">
            <Logo />
  </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;
