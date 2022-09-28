import App from "./App.svelte";

// The root of the dependency tree :)
const app = new App({
  target: document.body,
  props: {
    name: "your todos!",
  },
});

// Exporting app to used for rendering
export default app;
