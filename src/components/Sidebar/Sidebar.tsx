import React from 'react';
import { ChevronDown16Filled } from "@fluentui/react-icons";
import { makeStyles, shorthands, Subtitle2, tokens } from "@fluentui/react-components";
import { RunCard } from '../RunCard.tsx/RunCard';

const useClasses = makeStyles({
    container: {
        backgroundColor: tokens.colorNeutralBackground2,
        display: "flex",
        padding: '16px 24px',
        flexDirection: 'column',
        gap: '16px',
    },

    icon24: { fontSize: "24px" },
    icon32: { fontSize: "32px" },
    icon48: { fontSize: "48px" },
    dropdown: {
        display: 'flex',
        alignItems: 'center',
        margin: '8px 0',
        gap: '5px',
    }
});

export default function RunsSidebar() {
    const classes = useClasses();

    return (
        <div className={classes.container}>
            <div className={classes.dropdown}>
                <Subtitle2>Runs in progress</Subtitle2>
            </div>
            <RunCard name='Incident CSE #21' value={0.25} />
            <RunCard name='Incident CSE #21' value={0.75} />
            <RunCard name='Incident CSE #21' value={0.6} />
        </div>
    );
};

