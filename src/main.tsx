import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// Register service worker for PWA
registerSW({
  immediate: true,
  onRegistered(r) {
    console.log("Service Worker registered");
  },
  onRegisterError(error) {
    console.log("Service Worker registration error", error);
  },
});

createRoot(document.getElementById("root")!).render(<App />);
