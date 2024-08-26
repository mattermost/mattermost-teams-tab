import { PlaybookRunStatus } from '../../types/playbook_run';

export const Status: React.FC<{ status: PlaybookRunStatus | undefined }> = ({ status }) => {
  switch (status) {
    case PlaybookRunStatus.InProgress:
      return <>In Progress</>;
    case PlaybookRunStatus.Finished:
      return <>Finished</>
    default:
      return <>Unknown</>
  }
}

