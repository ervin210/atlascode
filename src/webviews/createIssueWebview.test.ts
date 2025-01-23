import { CreateIssueWebview } from './createIssueWebview';
import { Container } from '../container';
import { Action } from '../ipc/messaging';
import { CreateIssueAction } from '../ipc/issueActions';
import { DetailedSiteInfo } from '../atlclients/authInfo';


jest.mock('../container');
jest.mock('../commands');
jest.mock('form-data');
jest.mock('fs');

class TestableCreateIssueWebview extends CreateIssueWebview {
    public async testOnMessageReceived(msg: Action): Promise<boolean> {
        return this.onMessageReceived(msg);
    }
}

describe('CreateIssueWebview', () => {
    let createIssueWebview: TestableCreateIssueWebview;
    let mockClient: any;

    beforeEach(() => {
        createIssueWebview = new TestableCreateIssueWebview('/path/to/extension');
        mockClient = {
            createIssue: jest.fn(),
            createIssueLink: jest.fn(),
            addAttachments: jest.fn(),
        };
    });

    it('should handle createIssue action', async () => {
        const msg: CreateIssueAction = {
            action: 'createIssue',
            site: { id: 'site-id' } as DetailedSiteInfo,
            issueData: { summary: 'Test issue' },
            nonce: 'nonce',
        };

        const payload = { summary: 'Test issue' };
        const response = { key: 'issue-key' };

        mockClient.createIssue.mockResolvedValue(response);

        const result = await createIssueWebview.testOnMessageReceived(msg as Action);

        expect(result).toBe(true);
        expect(mockClient.createIssue).toHaveBeenCalledWith({ fields: payload, update: undefined });
        expect(Container.analyticsClient.sendTrackEvent).toHaveBeenCalled();
    });

    // Add more test cases for other actions and scenarios
});