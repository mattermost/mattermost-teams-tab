import { useNavigate } from 'react-router-dom';
import { Button, tokens } from "@fluentui/react-components";

import Playbooks from './playbooks.svg';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'top' as 'top',
    alignItems: 'center' as 'center',
    paddingTop: '80px',
  },
  p: {
    textAlign: 'center' as 'center',
  },
  mention: {
    fontFamily: tokens.fontFamilyMonospace,
  }
};

export default function NoRuns() {
  const navigate = useNavigate();

  const reload = () => {
    navigate('/');
  }

  const logout = () => {
    localStorage.setItem("mmcloudurl", "")
    navigate('/setup');
  };

  return <div style={styles.container}>
    <Playbooks />
    <h1>Don't see any runs?</h1>
    <p style={styles.p}>
      Add the <span style={styles.mention}>@msteams</span> bot as a participant to runs that should be visible from Microsoft Teams.<br />
      Learn more <a href="https://mattermost.com/pl/playbooks-for-microsoft-teams" target="_new">here</a>.
    </p>
    <div>
      <Button appearance="primary" onClick={reload}>Reload</Button>
      <Button appearance="secondary" onClick={logout}>Logout</Button>
    </div>
  </div>;
}
