import { ReducerAction } from '@atlassianlabs/guipi-core-controller';
import { Commit, emptyPullRequest, emptyUser, PullRequest, User } from '../../../bitbucket/model';

export enum PullRequestDetailsMessageType {
    Init = 'init',
    Update = 'configUpdate',
    FetchUsersResponse = 'fetchUsersResponse',
    UpdateSummaryResponse = 'updateSummaryResponse',
    UpdateTitleResponse = 'updateTitleResponse',
    GetCommitsResponse = 'getCommitsResponse',
    UpdateSummary = 'updateSummary',
    UpdateTitle = 'updateTitle',
    GetCommits = 'getCommits',
}

export type PullRequestDetailsMessage =
    | ReducerAction<PullRequestDetailsMessageType.Init, PullRequestDetailsInitMessage>
    | ReducerAction<PullRequestDetailsMessageType.Update, PullRequestDetailsInitMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateSummary, PullRequestDetailsSummaryMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateTitle, PullRequestDetailsTitleMessage>
    | ReducerAction<PullRequestDetailsMessageType.GetCommits, PullRequestDetailsCommitsMessage>;

export type PullRequestDetailsResponse =
    | ReducerAction<PullRequestDetailsMessageType.FetchUsersResponse, FetchUsersResponseMessage>
    | ReducerAction<PullRequestDetailsMessageType.UpdateSummaryResponse, VoidResponse>
    | ReducerAction<PullRequestDetailsMessageType.UpdateTitleResponse, VoidResponse>
    | ReducerAction<PullRequestDetailsMessageType.GetCommitsResponse, VoidResponse>;

export interface PullRequestDetailsInitMessage {
    pr: PullRequest;
    commits: Commit[];
    currentUser: User;
}

export interface VoidResponse {}

export interface FetchUsersResponseMessage {
    users: User[];
}

export interface PullRequestDetailsSummaryMessage {
    htmlSummary: string;
    rawSummary: string;
}

export interface PullRequestDetailsTitleMessage {
    title: string;
}

export interface PullRequestDetailsCommitsMessage {
    commits: Commit[];
}

export const emptyPullRequestDetailsInitMessage: PullRequestDetailsInitMessage = {
    pr: emptyPullRequest,
    commits: [],
    currentUser: emptyUser,
};
