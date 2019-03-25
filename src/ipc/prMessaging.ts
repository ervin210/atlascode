import { Message } from "./messaging";
import { Issue } from "../jira/jiraModel";
import { Branch, Remote } from "../typings/git";

// PRData is the message that gets sent to the PullRequestPage react view containing the PR details.
export interface PRData extends Message {
    pr?: Bitbucket.Schema.Pullrequest;
    currentUser?: Bitbucket.Schema.User;
    currentBranch: string;
    commits?: Bitbucket.Schema.Commit[];
    comments?: Bitbucket.Schema.Comment[];
    relatedJiraIssues?: Issue[];
    relatedBitbucketIssues?: Bitbucket.Schema.Issue[];
    buildStatuses?: Bitbucket.Schema.Commitstatus[];
    errors?: string;
}

export function isPRData(a: Message): a is PRData {
    return (<PRData>a).type === 'update';
}

export interface RepoData {
    uri: string;
    href?: string;
    avatarUrl?: string;
    name?: string;
    owner?: string;
    remotes: Remote[];
    defaultReviewers: Bitbucket.Schema.User[];
    localBranches: Branch[];
    remoteBranches: Branch[];
    mainbranch?: string;
    hasLocalChanges?: boolean;
}

export interface CreatePRData extends Message {
    repositories: RepoData[];
}

export function isCreatePRData(a: Message): a is CreatePRData {
    return (<CreatePRData>a).type === 'createPullRequestData';
}

export interface CheckoutResult extends Message {
    error?: string;
    currentBranch: string;
}

export interface CommitsResult extends Message {
    type: 'commitsResult';
    error?: string;
    commits: Bitbucket.Schema.Commit[];
}

export function isCommitsResult(a: Message): a is CommitsResult {
    return (<CommitsResult>a).type === 'commitsResult';
}
