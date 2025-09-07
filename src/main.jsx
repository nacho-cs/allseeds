import { render } from "preact";
import { App } from "./App";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Route } from "wouter-preact";
import "./index.css";

render(
  <Theme
    accentColor="sky"
    grayColor="slate"
    radius="small"
    appearance="dark"
    panelBackground="translucent">
    <Route path="/">
      <App defaultPage={0n} />
    </Route>
    <Route path="/:defaultPage">
      {params => <App defaultPage={params.defaultPage} />}
    </Route>
  </Theme>,
  document.getElementById("app")
);
