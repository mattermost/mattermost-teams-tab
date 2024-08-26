import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardTaskListLtrRegular, Dismiss24Regular } from "@fluentui/react-icons";
import {
  makeStyles, Subtitle2, tokens,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerFooter,
  DrawerProps,
  Drawer,
  Button,
} from "@fluentui/react-components";
import { RunCard } from '../RunCard/RunCard';
import { PlaybookRun, LimitedUser } from '../../types/playbook_run';

const useClasses = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground4,
    display: "flex",
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    gap: '16px',
  },
  sidebarIconContainer: {
    padding: '16px 0 16px 16px',
  },
  icon24: { fontSize: "24px" },
  icon32: { fontSize: "32px" },
  icon48: { fontSize: "48px" },
  dropdown: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
    gap: '5px',
  },
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  drawerContainer: {
    overflow: 'auto',
    height: '100%',
  }
});

type DrawerType = Required<DrawerProps>["type"];

export default function RunsSidebar(props: { runs: PlaybookRun[], users: Record<string, LimitedUser>, selectedRunId: string, setSelectedRunId: (id: string) => void }) {
  const classes = useClasses();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>("inline");

  const onMediaQueryChange = React.useCallback(
    (event: MediaQueryListEvent) => setType(event.matches ? "overlay" : "inline"),
    [setType]
  );

  React.useEffect(() => {
    const match = window.matchMedia("(max-width: 720px)");

    if (match.matches) {
      setType("overlay");
    }

    match.addEventListener("change", onMediaQueryChange);

    return () => match.removeEventListener("change", onMediaQueryChange);
  }, [onMediaQueryChange]);

  const logout = () => {
    localStorage.setItem("mmcloudurl", "")
    navigate('/setup');
  }

  return (
    <>
      {type == 'overlay' && (
        <div className={classes.sidebarIconContainer}>
          <Button icon={<ClipboardTaskListLtrRegular />} onClick={() => setIsOpen(!isOpen)} />
        </div>
      )}
      <div className={classes.drawerContainer}>
        <Drawer
          className={classes.container}
          type={type}
          separator
          position="start"
          open={isOpen}
          onOpenChange={(_, { open }) => setIsOpen(open)}
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                type === 'overlay' ? (
                  <Button
                    appearance="subtle"
                    aria-label="Close"
                    icon={<Dismiss24Regular />}
                    onClick={() => setIsOpen(false)}
                  />
                ) : null
              }
            >
              <div className={classes.dropdown}>
                <Subtitle2>Runs in progress</Subtitle2>
              </div>
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody className={classes.drawerBody}>
            {props.runs.map((r) => (
              <RunCard
                key={r.id}
                active={r.id == props.selectedRunId}
                status={r.current_status}
                participant_ids={r.participant_ids}
                last_updated_at={r.last_status_update_at}
                users={props.users}
                name={r.name}
                on_select={() => props.setSelectedRunId(r.id)}
                value={1} />
            ))}
          </DrawerBody>

          <DrawerFooter>
            <a onClick={logout}>Logout</a>
          </DrawerFooter>
        </Drawer>
      </div>
    </>
  );
};
