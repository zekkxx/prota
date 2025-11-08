import App from "./App";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");

if (rootElement == null) {
    throw new Error("Failed to find the root element");
}

const root=createRoot(rootElement);
root.render(<App />);
