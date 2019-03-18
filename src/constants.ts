import { commands } from "vscode";

export const extensionId = 'atlascode';
export const extensionOutputChannelName = 'Atlassian';
export const JiraWorkingSiteConfigurationKey = 'jira.workingSite';
export const JiraWorkingProjectConfigurationKey = "jira.workingProject";
export const CustomJQLKey = "jira.customJql";
export const JiraHoverProviderConfigurationKey = 'jira.hover.enabled';
export const BitbucketRelatedIssuesConfigurationKey = 'bitbucket.explorer.relatedJiraIssues.enabled';
export const BitbucketContextMenusConfigurationKey = 'bitbucket.contextMenus.enabled';
export const OpenIssuesTreeId = 'atlascode.views.jira.openIssues';
export const CustomJQLTreeId = 'atlascode.views.jira.customJql';
export const AssignedIssuesTreeId = 'atlascode.views.jira.assignedIssues';
export const PullRequestTreeViewId = 'atlascode.views.bb.pullrequestsTreeView';
export const PipelinesTreeViewId = 'atlascode.views.bb.pipelinesTreeView';
export const BitbucketIssuesTreeViewId = 'atlascode.views.bb.issuesTreeView';
export const GlobalStateVersionKey = 'atlascodeVersion';
export const ProductJira = 'Jira';
export const ProductBitbucket = 'Bitbucket';

export enum CommandContext {
    JiraExplorer = 'atlascode:jiraExplorerEnabled',
    BitbucketExplorer = 'atlascode:bitbucketExplorerEnabled',
    PipelineExplorer = 'atlascode:pipelineExplorerEnabled',
    BitbucketIssuesExplorer = 'atlascode:bitbucketIssuesExplorerEnabled',
    CustomJQLExplorer = 'atlascode:customJQLExplorerEnabled',
    OpenIssuesTree = 'atlascode:openIssuesTreeEnabled',
    AssignedIssuesTree = 'atlascode:assignedIssuesTreeEnabled',
    JiraLoginTree = 'atlascode:jiraLoginTreeEnabled',
    IsJiraAuthenticated = 'atlascode:isJiraAuthenticated',
    IsBBAuthenticated = 'atlascode:isBBAuthenticated',
}

export function setCommandContext(key: CommandContext | string, value: any) {
    return commands.executeCommand('setContext', key, value);
}
