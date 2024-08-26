import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById("root");

  const root = createRoot(container!);
  root.render(<App />);
})

export { }
