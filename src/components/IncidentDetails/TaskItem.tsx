import React from 'react';
import { makeStyles, Checkbox, Avatar, Text, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  taskAssignee: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginLeft: '40px',
  },
  taskItem: {
    display: "flex",
    paddingTop: '16px',
    gap: '8px',
    flexDirection: 'column',
    color: tokens.colorNeutralForeground3,
  }
});

interface TaskItemProps {
  label: string;
  avatarName: string;
  assigneeText: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ label, avatarName, assigneeText }) => {
  const classes = useStyles();

  return (
    <div className={classes.taskItem}>
      <Checkbox label={label} size='large' />
      <div className={classes.taskAssignee}>
        <Avatar size={24} shape={'circular'} name={avatarName} />
        <Text size={200}>{assigneeText}</Text>
      </div>
    </div>
  );
};

export default TaskItem;
