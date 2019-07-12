import * as React from "react";
import Select, { components } from '@atlaskit/select';
import Lozenge from "@atlaskit/lozenge";
import { MinimalIssue, Transition } from "../../../jira/jiraModel";

const colorToLozengeAppearanceMap = {
  neutral: 'default',
  purple: 'new',
  blue: 'inprogress',
  red: 'removed',
  yellow: 'moved',
  green: 'success',
};

const { Option } = components;

const StatusOption = (props: any) => (
  <Option {...props}>
    <Lozenge appearance={colorToLozengeAppearanceMap[props.data.to.statusCategory.colorName]}>
      {props.data.to.name}
    </Lozenge>
  </Option>
);

const StatusValue = (props: any) => (
  <components.SingleValue {...props}>
    <Lozenge appearance={colorToLozengeAppearanceMap[props.data.to.statusCategory.colorName]}>
      {props.data.to.name}
    </Lozenge>
  </components.SingleValue>

);

export class TransitionMenu extends React.Component<{
  issue: MinimalIssue;
  isStatusButtonLoading: boolean;
  onHandleStatusChange: (item: Transition) => void;
}, {
  selectedTransition: Transition | undefined
}> {

  constructor(props: any) {
    super(props);
    const issue: MinimalIssue = props.issue;
    const selectedTransition = issue.transitions.find(transition => transition.to.id === issue.status.id);
    this.state = { selectedTransition: selectedTransition };
  }

  componentWillReceiveProps(nextProps: any) {
    const issue: MinimalIssue = nextProps.issue;
    const selectedTransition = issue.transitions.find(transition => transition.to.id === issue.status.id);
    this.setState({ selectedTransition: selectedTransition });
  }

  handleStatusChange = (item: Transition) => {
    this.props.onHandleStatusChange(item);
  }

  render() {
    const issue = this.props.issue;
    if (!issue) {
      return <div />;
    }

    return (
      <Select
        name="status"
        id="status"
        className="ac-select-container"
        classNamePrefix="ac-select"
        options={issue.transitions}
        value={this.state.selectedTransition}
        components={{ Option: StatusOption, SingleValue: StatusValue }}
        getOptionLabel={(option: any) => option.to.name}
        getOptionValue={(option: any) => option.id}
        isDisabled={this.props.isStatusButtonLoading}
        isLoading={this.props.isStatusButtonLoading}
        onChange={this.handleStatusChange}
      />
    );
  }
}
