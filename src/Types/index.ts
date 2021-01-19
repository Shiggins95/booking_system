import { RouteComponentProps } from 'react-router-dom';

interface NotFoundProps {
    location: string;
}

export interface MatchProps extends RouteComponentProps<NotFoundProps> {}
