import { createRequestHandler } from "@remix-run/express";
import express from "express";
import morgan from "morgan";

import apiRoutes from "./api/routes.js";

const app = express();
const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);
const viteDevServer = dev
  ? await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    )
  : null;
const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import("./build/server/index.js");

app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client")
);
if (dev) app.use(morgan("dev"));

app.use("/api", apiRoutes);
app.all("*", createRequestHandler({ build }));

app.listen(port, () => {
  console.log(`> Server listening at http://localhost:${port}`);
});
