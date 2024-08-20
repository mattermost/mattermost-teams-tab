import React from 'react';
import { ChevronDown16Filled } from "@fluentui/react-icons";
import { makeStyles, Avatar, shorthands, Subtitle2, Badge, tokens, Text, Accordion, Divider, AccordionItem, AccordionHeader, AccordionPanel, Checkbox } from "@fluentui/react-components";
import { RunCard } from '../RunCard.tsx/RunCard';
import StepAccordion from './StepAccordion';
import TaskItem from './TaskItem';

const useClasses = makeStyles({
    container: {
        display: "flex",
        overflow: 'auto',
        height: '100%',
        flex: 1,
        padding: '16px 24px 40px 24px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
    },
    statusUpdate: {
        gap: '8px',
        display: 'flex',
        flexDirection: 'column',
    },
    tasksContainer: {
        display: 'flex',
        marginTop: '24px',
        borderTop: `1px solid ${tokens.colorNeutralStroke3}`,
        paddingTop: '24px',
        width: '100%',
        flexDirection: 'column',
        gap: '24px',
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    icon32: { fontSize: "32px" },
    icon48: { fontSize: "48px" },
    dropdown: {
        display: 'flex',
        alignItems: 'center',
        margin: '8px 0',
        gap: '10px',
    },
    accordions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    }
});

export default function IncidentDetails() {
    const classes = useClasses();

    return (
        <div className={classes.container}>
            <div className={classes.dropdown}>
                <Subtitle2>Incident CSE #21</Subtitle2>
                <Badge color="brand" shape="rounded" appearance="tint">
                    In Progress
                </Badge>
            </div>
            <div className={classes.statusContainer}>
                <Text size={400} weight='semibold'>Recent Status Updates</Text>
                <div className={classes.statusUpdate}>
                    <Text>
                        Suspendisse vitae tortor feugiat, finibus diam tincidunt, pharetra arcu. Nullam ipsum quam, molestie viverra varius at, dictum sed felis. Quisque condimentum tortor et lacus blandit, ac ornare mauris tincidunt.
                    </Text>
                    <div>
                        <Avatar shape={'circular'} name='Asaad Mahmood' /> <Text size={200}>Posted an update</Text><Text size={200} weight='semibold'> 12m ago</Text>
                    </div>
                </div>
                <div className={classes.statusUpdate}>
                    <Text>
                        Suspendisse vitae tortor feugiat, finibus diam tincidunt, pharetra arcu. Nullam ipsum quam, molestie viverra varius at, dictum sed felis. Quisque condimentum tortor et lacus blandit, ac ornare mauris tincidunt.
                    </Text>
                    <div>
                        <Avatar shape={'circular'} name='Asaad Mahmood' /> <Text size={200}>Posted an update</Text><Text size={200} weight='semibold'> 12m ago</Text>
                    </div>
                </div>
            </div>
            <div className={classes.tasksContainer}>
                <Text size={400} weight='semibold'>Tasks</Text>
                <Accordion multiple collapsible className={classes.accordions}>
                    <StepAccordion value='1' headerText='Prepare code' progressText='2 / 4 done'>
                        <TaskItem label='Triage and check for pending tickets and PRs to merge' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                        <TaskItem label='Start drafting changelog, feature documentation, and marketing materials' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                        <TaskItem label='Review and update project dependencies as needed' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                        <TaskItem label='QA prepares release testing assignments' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                    </StepAccordion>
                    <StepAccordion value='2' headerText='Release testing' progressText='0 / 6 done'>
                        <TaskItem label='Triage and check for pending tickets and PRs to merge' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                        <TaskItem label='Start drafting changelog, feature documentation, and marketing materials' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                        <TaskItem label='Review and update project dependencies as needed' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                        <TaskItem label='QA prepares release testing assignments' avatarName='Asaad Mahmood' assigneeText='Assigned to Asaad Mahmood' />
                    </StepAccordion>
                </Accordion>
            </div>
        </div>
    );
};

