import "./main.css";
import { useState } from "react";

import { data } from "../data";

import Editor from "@monaco-editor/react";

const Main = () => {
  const [editorValue, setEditorValue] = useState("");

  const lesson = "HTML";
  const step = 1;

  const preview = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      ${editorValue}
    </body>
  </html>`;

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
        <div className="main-box">
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
        <div className="main-box">
          <iframe srcDoc={preview} title="preview" />
        </div>
      </div>
    </main>
  );
};

export default Main;
