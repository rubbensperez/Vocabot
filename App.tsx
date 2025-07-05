function App() {
  const { showUserConfig } = useUI();
  return (
    <div className="App">
      <LiveAPIProvider apiKey={API_KEY}>
        <ErrorScreen />
        <Header />

        {/* BOTÓN DE VOZ */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            onClick={() => {
              if (typeof window !== "undefined" && 'speechSynthesis' in window) {
                const mensaje = new SpeechSynthesisUtterance("Hola, soy Vocabot desde Vercel");
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(mensaje);
              } else {
                console.warn("SpeechSynthesis no está disponible en este entorno.");
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

