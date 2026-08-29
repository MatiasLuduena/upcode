import "./main.css";
import { useState, useEffect } from "react";

import { data } from "../data";

import Editor from "@monaco-editor/react";

const Main = () => {
  // Valor del editor de código
  const [editorValue, setEditorValue] = useState("");
  // Paso actual del taller
  const [step, setStep] = useState(1);
  // Código esperado para el paso actual
  const [expectedCode, setExpectedCode] = useState([]);
  // Estado para indicar si el código ingresado es incorrecto
  const [isCodeIncorrect, setIsCodeIncorrect] = useState(false);
  // Lección actual
  const [lesson, setLesson] = useState("HTML");
  // Taller actual
  const [workshop, setWorkshop] = useState(0);

  // Generar la vista previa del código HTML ingresado en el editor
  const preview = `
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      ${editorValue}
    </body>
  </html>`;

  // Función para validar el código ingresado en el editor
  const validateCode = () => {
    const userCode = editorValue
      .trim()
      .toLowerCase()
      .split("\n")
      .map((line) => line.trim());

    const expected = expectedCode.map((code) => code.trim().toLowerCase());

    if (
      userCode.length === expected.length &&
      userCode.every((code, index) => code === expected[index])
    ) {
      setStep(step + 1);
      setIsCodeIncorrect(false);
    } else {
      setIsCodeIncorrect(true);
    }
  };

  // Actualizar el código esperado cuando cambie el paso
  useEffect(() => {
    const expected = data[lesson][workshop].steps[step - 1].texts
      .filter((text) => text.startsWith("-"))
      .map((text) => text.slice(1).trim().toLowerCase());

    setExpectedCode((prev) => [
      ...prev.filter((code) => code.startsWith("<")),
      ...expected,
    ]);
  }, [step]);

  return (
    <main>
      {/* Mostrar el título del taller actual */}
      <h3>{data[lesson][workshop].title}</h3>
      {/* Contenedor de las cajas */}
      <div className="main-boxes">
        {/* Caja de instrucciones */}
        <div className="main-box main-box_texts">
          <h4>Paso {data[lesson][workshop].steps[step - 1].step}</h4>
          {data[lesson][workshop].steps[step - 1].texts.map((text, index) => {
            if (text.startsWith("-")) {
              return (
                <p key={index} className="main-box_text">
                  {text.slice(1).trim()}
                </p>
              );
            }
            return (
              <p key={index} dangerouslySetInnerHTML={{ __html: text }}></p>
            );
          })}
        </div>
        {/* Caja del editor de código */}
        <div className="main-box">
          <div className="main-box_editor">
            <Editor
              height="100%"
              language={lesson.toLocaleLowerCase()}
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
        {/* Caja de vista previa */}
        <div className="main-box">
          <iframe srcDoc={preview} title="preview" />
        </div>
      </div>
    </main>
  );
};

export default Main;
