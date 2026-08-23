import "./main.css";
import { useState, useEffect } from "react";

import { data } from "../data";

import Editor from "@monaco-editor/react";

const Main = () => {
  const [editorValue, setEditorValue] = useState("");
  const [step, setStep] = useState(1);
  const [expectedCode, setExpectedCode] = useState("");
  const [isCodeIncorrect, setIsCodeIncorrect] = useState(false);

  const lesson = "HTML";

  const preview = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      ${editorValue}
    </body>
  </html>`;

  const validateCode = () => {
    if (editorValue.trim().toLocaleLowerCase() === expectedCode) {
      setStep(step + 1);
      setIsCodeIncorrect(false);
      setEditorValue("");
    } else {
      setIsCodeIncorrect(true);
    }
  };

  useEffect(() => {
    data[lesson].steps[step - 1].texts.map((text) => {
      if (text.startsWith("-")) {
        setExpectedCode(text.slice(1).trim().toLocaleLowerCase());
      }
    });
  }, [step]);

  return (
    <main>
      <h3>{data[lesson].title}</h3>
      <div className="main-boxes">
        <div className="main-box">
          <h4>Paso {data[lesson].steps[step - 1].step}</h4>
          {data[lesson].steps[step - 1].texts.map((text, index) => {
            if (text.startsWith("-")) {
              return (
                <p key={index} className="main-box_text">
                  {text.slice(1).trim()}
                </p>
              );
            }
            return <p key={index}>{text}</p>;
          })}
        </div>
        <div className="main-box">
          <div className="main-box_editor">
            <Editor
              height="100%"
              language={lesson.toLowerCase()}
              theme="vs-dark"
              value={editorValue}
              onChange={setEditorValue}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={validateCode}>
            Comprobar
          </button>
          {isCodeIncorrect && (
            <p className="error-message">
              Código incorrecto! Inténtalo de nuevo.
            </p>
          )}
        </div>
        <div className="main-box">
          <iframe srcDoc={preview} title="preview" />
        </div>
      </div>
    </main>
  );
};

export default Main;
