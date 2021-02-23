import { RouteComponentProps } from 'react-router-dom';

interface NotFoundProps {
    location: string;
    type: string;
}

export interface MatchProps extends RouteComponentProps<NotFoundProps> {}
