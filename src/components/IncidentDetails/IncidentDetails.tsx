import { makeStyles, Avatar, Subtitle2, Badge, tokens, Text } from '@fluentui/react-components';

import { DateTime } from 'luxon';
import * as commonmark from '@mattermost/commonmark';

import { PlaybookRun, PlaybookRunStatus, LimitedPost, LimitedUser } from '../../types/playbook_run';
import { Status } from '../RunCard/Status';

const useClasses = makeStyles({
  container: {
    display: 'flex',
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
  },
  statusFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
});

const colorMapping: { [key: string]: 'warning' | 'success' | 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | undefined } = {

  // Add your custom color mappings here
  warning: 'warning',
  success: 'success',
  brand: 'brand',
  danger: 'danger',

  // Add more mappings as needed
};

export default function IncidentDetails(props: { run: PlaybookRun | undefined, users: Record<string, LimitedUser>, posts: Record<string, LimitedPost> }) {
  const classes = useClasses();
  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();

  let badgeColor = colorMapping['subtle'];
  if (props.run?.current_status === PlaybookRunStatus.InProgress) {
    badgeColor = colorMapping['brand'] || 'subtle';
  } else if (props.run?.current_status === PlaybookRunStatus.Finished) {
    badgeColor = colorMapping['success'] || 'subtle';
  }

  return (
    <div className={classes.container}>
      <div className={classes.dropdown}>
        <Subtitle2>{props.run?.name}</Subtitle2>
        <Badge
          color={badgeColor}
          shape='rounded'
          appearance='tint'
        >
          <Status status={props.run?.current_status} />
        </Badge>
      </div>
      <div className={classes.statusContainer}>
        <Text
          size={400}
          weight='semibold'
        >{'Recent Status Updates'}</Text>
        {!props.run?.status_posts?.length &&
          <>{'No status updates yet.'}</>
        }
        {props.run?.status_posts.map((statusPost) => {
          const post = props.posts[statusPost.id];
          if (!post) {
            return null;
          }

          let name = '';
          if (props.users[post.user_id]) {
            const user = props.users[post.user_id];
            name = user.first_name + ' ' + user.last_name;
          }

          return (
            <div
              key={statusPost.id}
              className={classes.statusUpdate}
            >
              <Text>
                <div dangerouslySetInnerHTML={{ __html: writer.render(reader.parse(post.message)) }} />
              </Text>
              <div className={classes.statusFooter}>
                <Avatar
                  shape={'circular'}
                  name={name}
                  size={24}
                />
                <div>
                  <Text size={200}>{'Posted an update '}</Text>
                  <Text
                    size={200}
                    weight='semibold'
                  > {DateTime.fromMillis(post.create_at).toRelative()}</Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
}

