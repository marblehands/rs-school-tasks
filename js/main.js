import { createNode } from "./modules/build-page.js";
import { generateHeader } from "./modules/build-page.js";

const body = document.body;
generateHeader();
createNode(body, 'footer', 'footer', '2023 Anna Chebysheva Github');