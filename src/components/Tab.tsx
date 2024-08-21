import { useContext, useEffect, useState } from "react";
import { TeamsFxContext } from "./Context";
import { Client4 } from '@mattermost/client';

import {
  Label,
  useId
} from "@fluentui/react-components";
import config from "./sample/lib/config";
import "./Tab.css";

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  const inputId = useId("input");
  const [runs, setRuns] = useState([]);

  const getPlaybooks = async () => {
    const client = new Client4();
    client.setUrl('http://localhost:8065');
    client.setToken('paste token for dev here');

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
      <div className="tab page">
        <div className="narrow page-padding">
          <h1 className="center">Mattermost Playbook Runs</h1>
          <div className="tabList">
            {
              runs.map((r) => (
                <div className='runRow'>
                  <Label className='runField'>Run:</Label>
                  <Label>NONE</Label>
                  <Label className='runField'>Status:</Label>
                  <Label>NONE</Label>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
