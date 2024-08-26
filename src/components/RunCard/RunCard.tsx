import * as React from 'react';
import {
    makeStyles,
    tokens,
    Caption1,
    mergeClasses,
    Text,
    AvatarGroup,
    AvatarGroupItem,
    Badge,
    AvatarGroupPopover,
    partitionAvatarGroupItems,
    Field,
    ProgressBar,
    Card, CardHeader, CardProps,
} from '@fluentui/react-components';

import {DateTime} from 'luxon';

import {LimitedUser, PlaybookRunStatus} from '../../types/playbook_run';

import {Status} from './Status';

const useClasses = makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        columnGap: '16px',
        rowGap: '36px',
    },

    title: {margin: '0 0 12px'},

    card: {
        width: '300px',
        maxWidth: '100%',
        height: 'fit-content',
        backgroundColor: tokens.colorNeutralBackground1,
        flexShrink: 0,
        border: '2px solid transparent',
    },

    activeCard: {
        border: `2px solid ${tokens.colorBrandBackground}`,
    },

    flex: {
        gap: '4px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    appIcon: {
        borderRadius: '4px',
        height: '32px',
    },

    caption: {
        color: tokens.colorNeutralForeground3,
    },

    cardHeader: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
    },
    cardFooter: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

interface RunCardProps extends CardProps {
    value: number;
    name: string;
    status: PlaybookRunStatus,
    active?: boolean;
    participant_ids: string[];
    users: Record<string, LimitedUser>;
    last_updated_at: number;
    on_select: () => void;
}

const colorMapping: { [key: string]: 'warning' | 'success' | 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | undefined } = {

    // Add your custom color mappings here
    warning: 'warning',
    success: 'success',
    brand: 'brand',
    danger: 'danger',

    // Add more mappings as needed
};

export const RunCard: React.FC<RunCardProps> = ({status, value, name, active, ...props}) => {
    const classes = useClasses();

    let badgeColor = colorMapping.subtle;
    if (status === PlaybookRunStatus.InProgress) {
        badgeColor = colorMapping.brand || 'subtle';
    } else if (status === PlaybookRunStatus.Finished) {
        badgeColor = colorMapping.success || 'subtle';
    }

    const names = props.participant_ids.map((participant_id) => props.users[participant_id]).map((limited_user) => limited_user.first_name + ' ' + limited_user.last_name);

    const {inlineItems, overflowItems} = partitionAvatarGroupItems({
        items: names,
    });

    return (
        <Card
            className={mergeClasses(classes.card, active && classes.activeCard)}
            onClick={props.on_select}
            {...props}
        >
            <CardHeader
                header={
                    <div className={classes.cardHeader}>
                        <Text weight='semibold'>
                            {name}
                        </Text>

                        <Badge
                            color={badgeColor}
                            shape='rounded'
                            appearance='tint'
                        >
                            <Status status={status}/>
                        </Badge>
                    </div>
                }
            />

            <AvatarGroup
                size={24}
                layout='stack'
            >
                {inlineItems.map((name) => (
                    <AvatarGroupItem
                        name={name}
                        key={name}
                    />
                ))}
                {overflowItems && (
                    <AvatarGroupPopover>
                        {overflowItems.map((name) => (
                            <AvatarGroupItem
                                name={name}
                                key={name}
                            />
                        ))}
                    </AvatarGroupPopover>
                )}
            </AvatarGroup>

            <footer className={mergeClasses(classes.flex, classes.cardFooter)}>
                {props.last_updated_at && <Caption1 className={classes.caption}>Last updated {DateTime.fromMillis(props.last_updated_at).toRelative()}</Caption1>}
            </footer>

            <Field validationState='none'>
                <ProgressBar value={value}/>
            </Field>
        </Card>
    );
};
