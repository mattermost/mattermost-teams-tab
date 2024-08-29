import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FetchError, fetchPlaybookRuns } from '../client';

import { PlaybookRun, LimitedUser, LimitedPost } from '../types/playbook_run';

import { TeamsFxContext } from './Context';

import './Tab.css';
import RunsSidebar from './Sidebar/Sidebar';

import { makeStyles } from '@fluentui/react-components';

import IncidentDetails from './IncidentDetails/IncidentDetails';
import NoRuns from './NoRuns';
import { getAuthToken } from './auth';

const useClasses = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
});

export default function Tab() {
  const classes = useClasses();
  const navigate = useNavigate();
  const { themeString } = useContext(TeamsFxContext);
  const [runs, setRuns] = useState<PlaybookRun[]>([]);
  const [users, setUsers] = useState<Record<string, LimitedUser>>({});
  const [posts, setPosts] = useState<Record<string, LimitedPost>>({});
  const [selectedRunId, setSelectedRunId] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const selectedRun = runs.find((run) => run.id == selectedRunId);

  const getPlaybookRuns = async () => {
    const mmURL = localStorage.getItem("mmcloudurl");
    if (mmURL) {
      const token = await getAuthToken()

      try {
        const results = await fetchPlaybookRuns(mmURL, token);
        setRuns(results.items);
        setUsers(results.users);
        setPosts(results.posts);
        if (results.items.length > 0) {
          setSelectedRunId(results.items[0].id);
        }

        setLoaded(true);
      } catch (e) {
        if (e instanceof FetchError && e.status_code == 403) {
          console.error('The Teams Tab App is not enabled for this Mattermost instance. Contact your system administrator.');
        } else {
          console.error('An error occurred loading the playbooks runs', e);
        }

        localStorage.setItem("mmcloudurl", "")
        console.log('Redirecting to /setup: failed to use saved URL')
        navigate('/setup', { state: { failed: true, url: mmURL } })
      }
    } else {
      console.log('Redirecting to /setup: no saved URL')
      navigate('/setup');
    }
  };

  useEffect(() => {
    getPlaybookRuns();
  }, []);

  if (loaded && runs.length === 0) {
    return <NoRuns />
  }

  return (
    <div
      style={{ height: '100%' }}
      className={themeString === 'default' ? 'light' : themeString === 'dark' ? 'dark' : 'contrast'}
    >
      <div className={classes.container}>
        <RunsSidebar
          runs={runs}
          users={users}
          selectedRunId={selectedRunId}
          setSelectedRunId={setSelectedRunId}
        />
        <IncidentDetails
          run={selectedRun}
          users={users}
          posts={posts}
        />
      </div>

    </div>
  );
}
