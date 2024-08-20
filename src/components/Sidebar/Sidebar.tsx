import React from 'react';
import { ClipboardTaskListLtrRegular, Dismiss24Regular } from "@fluentui/react-icons";
import {
    makeStyles, shorthands, Subtitle2, tokens,
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    DrawerProps,
    Drawer,
    Button,
    Tooltip,
} from "@fluentui/react-components";
import { RunCard } from '../RunCard.tsx/RunCard';

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

export default function RunsSidebar() {
    const classes = useClasses();

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
                        <RunCard active status={{ state: 'In Progress', color: 'brand' }} name='Incident CSE #21' value={0.25} />
                        <RunCard status={{ state: 'In Progress', color: 'brand' }} name='Incident CSE #21' value={0.75} />
                        <RunCard status={{ state: 'Completed', color: 'success' }} name='Incident CSE #21' value={1} />
                        <RunCard status={{ state: 'Completed', color: 'success' }} name='Incident CSE #21' value={1} />
                        <RunCard status={{ state: 'Completed', color: 'success' }} name='Incident CSE #21' value={1} />
                        <RunCard status={{ state: 'Completed', color: 'success' }} name='Incident CSE #21' value={1} />
                    </DrawerBody>
                </Drawer>
            </div>
        </>
    );
};
