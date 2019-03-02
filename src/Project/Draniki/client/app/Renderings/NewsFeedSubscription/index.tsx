import { Text } from '@sitecore-jss/sitecore-jss-react';
import React from 'react';
import { Subscription } from 'react-apollo';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { NewsFeedSubscriptionProps } from './models';
import newsFeedSubscription from './newsFeedSubscription.graphql';

const Transition = (props: any) => {
  return <Slide direction="up" {...props} />;
};

export interface NewsFeedSubscriptionDialogState {
  open: boolean;
  email: string;
}
export class NewsFeedSubscriptionDialog extends React.Component<
  NewsFeedSubscriptionProps,
  NewsFeedSubscriptionDialogState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      open: false,
    };

    this.onSubscriptionData = this.onSubscriptionData.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  public render() {
    const { fields } = this.props;
    return (
      <Subscription subscription={newsFeedSubscription} onSubscriptionData={this.onSubscriptionData}>
        {({ data, loading }) => {
          return (
            <Dialog
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted={true}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                <Text field={fields.Title} />
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Text field={fields['Email Label']} />
                  <b>: {this.state.email}</b>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Subscription>
    );
  }

  private handleClose() {
    this.setState({ open: false });
  }

  private onSubscriptionData({ subscriptionData }: any) {
    const open =
      !!subscriptionData.data &&
      !!subscriptionData.data.visualizationSubscription.subscriptionEmailChanged &&
      subscriptionData.data.visualizationSubscription.subscriptionEmailChanged !== this.state.email;

    if (open) {
      this.setState({
        email: subscriptionData.data.visualizationSubscription.subscriptionEmailChanged,
        open,
      });
    }
  }
}
