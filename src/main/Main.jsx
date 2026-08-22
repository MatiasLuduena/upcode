import "./main.css";

import { data } from "../data";

const Main = () => {
  console.log(data.HTML);

  const lesson = "HTML";
  const step = 1;

  return (
    <main>
      <h3>{data[lesson].title}</h3>
      <div className="main-boxes">
        <div className="main-box">
          <h4>Paso {data[lesson].steps[step - 1].step}</h4>
          {data[lesson].steps[step - 1].texts.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        <div className="main-box"></div>
        <div className="main-box"></div>
      </div>
    </main>
  );
};

export default Main;
