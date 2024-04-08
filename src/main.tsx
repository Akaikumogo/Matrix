import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement: HTMLElement | null = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  throw new Error("Root element not found!");
}
