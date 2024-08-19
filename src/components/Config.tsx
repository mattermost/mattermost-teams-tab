import { useContext } from "react";
import {
  Input,
  useId
} from "@fluentui/react-components";
import { app, pages } from "@microsoft/teams-js";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";

const showFunction = Boolean(config.apiName);

export default function Config() {
  const { themeString } = useContext(TeamsFxContext);
  const inputId = useId("input");

  const saveConfig = async () => {
    await app.initialize();
    pages.config.registerOnSaveHandler((saveEvent) => {
      const configPromise = pages.config.setConfig({
          contentUrl: window.location.origin,
          entityId: window.location.origin,
          suggestedDisplayName: "Mattermost"
      });
      configPromise.
          then(() => {saveEvent.notifySuccess()}).
          catch(() => {saveEvent.notifyFailure("failure message")});
    });
  }


  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
      <Input id={inputId} />
    </div>
  );
}
