import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MattermostLogo from './mattermost_logo.svg';

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

  useEffect(() => {
    if (!url.startsWith("https://")) {
      setErrorText("URL must start with 'https://`");
    }

    if (!url.endsWith(".mattermost.com") && !url.endsWith(".test.mattermost.cloud")) {
      setErrorText("URL must end with '.mattermost.com'");
    }

    setErrorText("")
  }, [url])

  const saveURL = () => {
    if (errorText !== "") {
      return
    }

    localStorage.setItem("mmcloudurl", cleanURL(url));
    navigate('/tab');
  }

  return (
    <div style={styles.container}>
      <div style={styles.signupCard}>
        <MattermostLogo />
        <h1 style={styles.connectToMattermost}>Connect to Mattermost</h1>
        <div style={styles.form}>
          <label htmlFor="urlInput">Mattermost Cloud URL: </label>
          <input id="urlInput" style={styles.urlInput} value={url} onChange={(event) => setURL(event.target.value)} />
          <label id="errorText" className="error">{errorText}</label>
        </div>
        <div style={styles.saveContainer}>
          <button style={styles.saveButton} onClick={saveURL}>Save</button>
        </div>

        <p>Want to connect to self-managed Mattermost? Learn how <a href="#">here</a></p>
      </div>
    </div>
  );
}

