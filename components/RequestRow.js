import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import CampaignIns from '../ethereum/CampaignIns';

class RequestRow extends React.Component {
    onApprove = async () =>
    {
        const campaign = CampaignIns(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id)
        .send({from: accounts[0], gas : '1000000'});
    }

    onFinalize = async () =>
    {
        const campaign = CampaignIns(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id)
        .send({from: accounts[0], gas : '1000000'});
    }
    render() {
        const { id, request, approversCount } = this.props;

    
        const value = request.value ? web3.utils.fromWei(request.value, 'ether') : '';
        const readyToFinalize = parseInt(request.approvalCount) > parseInt(approversCount) / 2;

        return (
            <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{request.description}</Table.Cell>
                <Table.Cell>{value}</Table.Cell>
                <Table.Cell>{request.recipient}</Table.Cell>
                
                <Table.Cell>{parseInt(request.approvalCount)}/{parseInt(approversCount)}</Table.Cell>
                <Table.Cell>
                    {
                        request.complete ? null : (
                    <Button color='green' basic onClick={this.onApprove}>Approve</Button>
                    )}
                    </Table.Cell>
                <Table.Cell>
                    {
                        request.complete ? null : (
                    <Button color='teal' basic onClick={this.onFinalize}>Finalize</Button>
                    )}
                    </Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;
