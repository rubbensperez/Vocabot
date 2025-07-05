/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { useEffect, useState } from "react";
import ControlTray from "./components/console/control-tray/ControlTray";
import ErrorScreen from "./components/demo/ErrorSreen";
import KeynoteCompanion from "./components/demo/keynote-companion/KeynoteCompanion";
import Header from "./components/Header";
import UserSettings from "./components/UserSettings";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import { useUI } from "./lib/state";

const API_KEY = process.env.API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("Missing required environment variable: API_KEY");
}

/**
 * Main application component that provides a streaming interface for Live API.
 * Manages video streaming state and provides controls for webcam/screen capture.
 */
function App() {
  const { showUserConfig } = useUI();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Asegura que solo se ejecute en el navegador
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  return (
    <div className="App">
      <LiveAPIProvider apiKey={API_KEY}>
        <ErrorScreen />
        <Header />

        {/* BOTÓN DE VOZ SOLO EN CLIENTE */}
        {isClient && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              onClick={() => {
                if ("speechSynthesis" in window) {
                  console.log("✅ speechSynthesis está disponible");
                  const mensaje = new SpeechSynthesisUtterance("Hola, soy Vocabot desde Vercel");
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(mensaje);
                } else {
                  console.warn("❌ speechSynthesis no está disponible.");
                }
              }}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#00E392",
                color: "black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Hablar Vercel
            </button>
          </div>
        )}

        {showUserConfig && <UserSettings />}
        <div className="streaming-console">
          <main>
            <div className="main-app-area">
              <KeynoteCompanion />
            </div>
            <ControlTray />
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default App;

