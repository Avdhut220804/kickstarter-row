import React from 'react';
import { Link } from '../../../routes';
import { Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import CampaignIns from '../../../ethereum/CampaignIns';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends React.Component
{
    static async getInitialProps(props)
    {
        const { address } = props.query;
        const campaign = CampaignIns(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill()
            .map((elememt, index) => {
                return campaign.methods.requests(index).call();
            })
            
        );

        return { address, requests, requestCount, approversCount };
    }

    renderRows()
    {
        return this.props.requests.map((request, index) =>
        {
            return (
                <RequestRow 
                key={index}
                id={index}
                request={request}
                approversCount={this.props.approversCount}
                address={this.props.address}
                />
            );
        });
    }
    render()
    {
        return (
            <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary floated='right' style={{marginBottom: 10}}>New Request</Button>
                </a>            
            </Link>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>description</TableHeaderCell>
                        <TableHeaderCell>Amount</TableHeaderCell>
                        <TableHeaderCell>Recipient</TableHeaderCell>
                        <TableHeaderCell>Approval Count</TableHeaderCell>
                        <TableHeaderCell>Approve</TableHeaderCell>
                        <TableHeaderCell>Finalize</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>{this.renderRows()}</TableBody>
            </Table>
            <div>Found {parseInt(this.props.requestCount)} requests</div>
            </Layout>
        );
    }
}

export default RequestIndex;