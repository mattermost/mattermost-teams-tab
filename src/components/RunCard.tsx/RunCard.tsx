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

const useStyles = makeStyles({
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

    cardFooter: {
        alignItems: "center",
        justifyContent: "space-between",
    },
});

const Title = ({ children }: React.PropsWithChildren<{}>) => {
    const styles = useStyles();

    return (
        <Subtitle1 as="h4" block className={styles.title}>
            {children}
        </Subtitle1>
    );
};

interface RunCardProps extends CardProps {
    value: number;
    name: string;
}

export const RunCard: React.FC<RunCardProps> = ({ value, name, ...props }) => {
    const styles = useStyles();

    const { inlineItems, overflowItems } = partitionAvatarGroupItems({
        items: names,
    });

    return (
        <Card className={styles.card} {...props}>
            <CardHeader
                header={
                    <Text weight="semibold">
                        {name}
                    </Text>
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

            <footer className={mergeClasses(styles.flex, styles.cardFooter)}>
                <Caption1 className={styles.caption}> Last updated 3 hours ago</Caption1>
            </footer>

            <Field validationState="none">
                <ProgressBar value={value} />
            </Field>
        </Card>
    );
};
