import * as React from "react";
import {
    makeStyles,
    tokens,
    Caption1,
    Subtitle1,
    mergeClasses,
    Text,
    AvatarGroup,
    AvatarGroupItem,
    Tag,
    Avatar,
    Badge,
    AvatarGroupPopover,
    partitionAvatarGroupItems,
    Field,
    ProgressBar,
    ProgressBarProps,
} from "@fluentui/react-components";
import { Card, CardHeader, CardProps } from "@fluentui/react-components";

const names = [
    "Johnie McConnell",
    "Allan Munger",
    "Erik Nason",
    "Kristin Patterson",
];

const useClasses = makeStyles({
    main: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        columnGap: "16px",
        rowGap: "36px",
    },

    title: { margin: "0 0 12px" },

    card: {
        width: "300px",
        maxWidth: "100%",
        height: "fit-content",
        backgroundColor: tokens.colorNeutralBackground1,
        flexShrink: 0,
        border: `2px solid transparent`,
    },

    activeCard: {
        border: `2px solid ${tokens.colorBrandBackground}`,
    },

    flex: {
        gap: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    appIcon: {
        borderRadius: "4px",
        height: "32px",
    },

    caption: {
        color: tokens.colorNeutralForeground3,
    },

    cardHeader: {
        display: "flex",
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        gap: "8px",
    },
    cardFooter: {
        alignItems: "center",
        justifyContent: "space-between",
    },
});

const Title = ({ children }: React.PropsWithChildren<{}>) => {
    const classes = useClasses();

    return (
        <Subtitle1 as="h4" block className={classes.title}>
            {children}
        </Subtitle1>
    );
};

interface RunCardProps extends CardProps {
    value: number;
    name: string;
    status: {
        state: string;
        color: string;
    };
    active?: boolean;
}

const colorMapping: { [key: string]: "warning" | "success" | "brand" | "danger" | "important" | "informative" | "severe" | "subtle" | undefined } = {
    // Add your custom color mappings here
    "warning": "warning",
    "success": "success",
    "brand": "brand",
    "danger": "danger",
    // Add more mappings as needed
};

export const RunCard: React.FC<RunCardProps> = ({ status, value, name, active, ...props }) => {
    const classes = useClasses();

    const badgeColor = colorMapping[status.color] || "subtle"; // Default to "subtle" if no mapping found

    const { inlineItems, overflowItems } = partitionAvatarGroupItems({
        items: names,
    });

    return (
        <Card className={mergeClasses(classes.card, active && classes.activeCard)} {...props}>
            <CardHeader
                header={
                    <div className={classes.cardHeader}>
                        <Text weight="semibold">
                            {name}
                        </Text>

                        <Badge color={badgeColor} shape="rounded" appearance="tint">
                            {status.state}
                        </Badge>
                    </div>
                }
            />


            <AvatarGroup size={24} layout="stack">
                {inlineItems.map((name) => (
                    <AvatarGroupItem name={name} key={name} />
                ))}
                {overflowItems && (
                    <AvatarGroupPopover>
                        {overflowItems.map((name) => (
                            <AvatarGroupItem name={name} key={name} />
                        ))}
                    </AvatarGroupPopover>
                )}
            </AvatarGroup>

            <footer className={mergeClasses(classes.flex, classes.cardFooter)}>
                <Caption1 className={classes.caption}> Last updated 3 hours ago</Caption1>
            </footer>

            <Field validationState="none">
                <ProgressBar value={value} />
            </Field>
        </Card>
    );
};
