import { useContext, useEffect, useState } from "react";
import { TeamsFxContext } from "./Context";
import { Client4 } from '@mattermost/client';

import {
  Label,
  useId
} from "@fluentui/react-components";
import config from "./sample/lib/config";
import "./Tab.css";
import RunsSidebar from "./Sidebar/Sidebar";
import { makeStyles, shorthands } from "@fluentui/react-components";
import IncidentDetails from "./IncidentDetails/IncidentDetails";

const useClasses = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
});

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const classes = useClasses();
  const { themeString } = useContext(TeamsFxContext);
  const inputId = useId("input");
  const [runs, setRuns] = useState([]);

  const getPlaybooks = async () => {
    const client = new Client4();
    client.setUrl('http://localhost:8065');
    client.setToken('3rnukiofwpd3iyyguh7y9k6z8a');

    try {
      const res = await fetch(`${client.getUrl()}/plugins/playbooks/api/v0/runs`, client.getOptions({}));
      const runs = await res.json();
      setRuns(runs.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPlaybooks();
  }, []);

  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
      <div className={classes.container}>
        <RunsSidebar />
        <IncidentDetails />
      </div>

    </div>
  );
}
