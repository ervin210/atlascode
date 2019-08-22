import * as React from 'react';
import Avatar from '@atlaskit/avatar';
import CommentComponent, { CommentAuthor, CommentTime, CommentAction } from '@atlaskit/comment';
import CommentForm from './CommentForm';
import { User, Comment } from '../../../bitbucket/model';

class NestedComment extends React.Component<
    { 
        node: Comment, 
        currentUser: User, 
        isCommentLoading: boolean, 
        onSave?: (content: string, parentCommentId?: number) => void,
        onDelete?: (commentId?: number) => void 
    }, 
    { showCommentForm: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = { showCommentForm: false };
    }

    commentBelongsToUser = () => this.props.node.user.accountId === this.props.currentUser.accountId;

    handleDelete = () => {
        if(this.props.onDelete) {
            this.props.onDelete(this.props.node.id);
            this.setState({showCommentForm: false});
        }
    }

    handleReplyClick = () => {
        this.setState({ showCommentForm: true });
    }

    handleSave = (content: string, parentCommentId?: number) => {
        if (this.props.onSave) {
            this.props.onSave(content, parentCommentId);
            this.setState({ showCommentForm: false });
        }
    }

    handleCancel = () => {
        this.setState({ showCommentForm: false });
    }

    generateActionsList = () => {
        let actionList = [];
        if(this.props.onSave && !this.state.showCommentForm){
            actionList.push(<CommentAction onClick={this.handleReplyClick}>Reply</CommentAction>);
        }
        if(this.props.onDelete && !this.state.showCommentForm && this.commentBelongsToUser()){
            actionList.push(<CommentAction onClick={this.handleDelete}>Delete</CommentAction>);
        }
        return actionList;
    }

    render(): any {
        const { node, currentUser } = this.props;
        const avatarHref = node.user.avatarUrl;
        const authorName = node.user.displayName;

        return <CommentComponent className='ac-comment'
            avatar={<Avatar src={avatarHref} size="medium" />}
            author={<CommentAuthor>{authorName}</CommentAuthor>}
            time={<CommentTime>{new Date(node.ts).toLocaleString()}</CommentTime>}
            content={
                <React.Fragment>
                    <p dangerouslySetInnerHTML={{ __html: node.htmlContent }} />
                    <CommentForm
                        currentUser={currentUser}
                        visible={this.state.showCommentForm}
                        isAnyCommentLoading={this.props.isCommentLoading}
                        onSave={(content: string) => this.handleSave(content, node.id)}
                        onDelete={() => this.handleDelete()}
                        onCancel={this.handleCancel} />
                </React.Fragment>
            }
            actions={this.generateActionsList()}
        >
            {   node.children && 
                node.children.map(
                    child => <NestedComment 
                                node={child} 
                                currentUser={currentUser} 
                                isCommentLoading={this.props.isCommentLoading} 
                                onSave={this.props.onSave}
                                onDelete={this.props.onDelete}
                            />
                )
            }
        </CommentComponent>;
    }
}

export default class Comments extends React.Component<
    { 
        comments: Comment[], 
        currentUser: User, 
        isAnyCommentLoading: boolean, 
        onComment?: (content: string, parentCommentId?: number) => void,
        onDelete?:  (commentId: number) => void
    }, 
    {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        if (!this.props.comments || !this.props.currentUser) {
            return null;
        }
        const result = this.props.comments.filter(comment => !comment.inline).map((comment) =>
            <NestedComment node={comment} currentUser={this.props.currentUser!} isCommentLoading={this.props.isAnyCommentLoading} onSave={this.props.onComment} onDelete={this.props.onDelete}/>);
        return <div className='ac-comments'>{result}</div>;
    }
}
