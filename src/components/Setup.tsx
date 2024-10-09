import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MattermostLogo from './mattermost_logo.svg';
import { validateServerURL } from '../client';

const styles = {
  container: {
    textAlign: 'center' as 'center',
  },
  signupCard: {
    backgroundColor: 'var(--colorNeutralBackground1)',
    boxShadow: '0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14)',
    padding: '24px 48px',
    borderRadius: '4px',
    maxWidth: '376px',
    margin: '0 auto',
    position: 'relative' as 'relative',
    top: '80px',
  },
  connectToMattermost: {
    fontWeight: 600,
    fontSize: '22px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    gap: '8px',
    marginTop: '24px',
    marginBottom: '16px',
  },
  urlInput: {
    marginBottom: 0,
    display: 'block',
    width: '100%',
  },
  saveContainer: {
    marginBottom: '16px',
  },
  saveButton: {
    width: '100%',
  }
};

export default function Setup() {
  const [url, setURL] = useState('');
  const [errorText, setErrorText] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const cleanURL = (url: string | null) => {
    if (url === null) {
      return '';
    }

    // Strip any whitespace and trailing slashes
    return url.trim().replace(/\/+$/, "");
  }

  // Immediately redirect to the configured URL if one has been previously saved.
  useEffect(() => {
    const storedURL = cleanURL(localStorage.getItem("mmcloudurl"));
    if (storedURL) {
      navigate('/tab');
    }
  }, [])

  // Set an error text if we failed from the Tab page.
  useEffect(() => {
    if (location.state && location.state.failed) {
      setURL(location.state.url);
      setErrorText("Failed to connect to Mattermost server. Contact your system administrator.")
    }
  }, [location.state])

  const saveURL = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const doSaveURL = async (url: string) => {
      if (!url.startsWith("https://") && !url.startsWith("http://")) {
        setErrorText("URL must start with 'https://`");
        return
      }

      const valid = await validateServerURL(url)
      if (!valid) {
        setErrorText("This server does not appear to be configured for integration with MS Teams. Contact your system administrator.");
        return
      }

      localStorage.setItem("mmcloudurl", url);
      navigate('/tab');
    }

    doSaveURL(cleanURL(url))
  };

  return (
    <div style={styles.container}>
      <form style={styles.signupCard} onSubmit={saveURL}>
        <MattermostLogo />
        <h1 style={styles.connectToMattermost}>Connect to Mattermost</h1>
        <div style={styles.form}>
          <label htmlFor="urlInput">Mattermost URL:</label>
          <input id="urlInput" style={styles.urlInput} value={url} onChange={(event) => setURL(event.target.value)} />
        </div>
        <div style={styles.saveContainer}>
          <button style={styles.saveButton}>Connect</button>
        </div>
        {errorText.length > 0 &&
          <label id="errorText" className="error">{errorText}</label>
        }
        <p>
          Need help connecting to Mattermost? <br />
          Learn more <a href="https://mattermost.com/pl/playbooks-for-microsoft-teams" target="_new">here</a>.
        </p>
      </form>
    </div>
  );
}

