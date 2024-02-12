import React,{ Component } from 'react';
import Layout from '../../components/layout';
import CampaignIns from '../../ethereum/CampaignIns';
import { Button, Card, CardGroup,Grid, GridColumn, GridRow } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component
{
    static async getInitialProps(props)
    {
        console.log(props.query.address);
        const campaign = CampaignIns(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        for (let key in summary) {
            if (key !== '__length__') {
              summary[key] = parseInt(summary[key]);
            } else {
              summary.__length__ = summary.__length__;
            }
          }
        console.log(summary);
        return {
            address : props.query.address,
            minCon : summary[0],
            balance : summary[1],
            requestsCount : summary[2],
            approversCount : summary[3],
            manager : summary[4]
        };
    }

    renderCard()
    {
        const {
            minCon ,
            balance ,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header : manager,
                description : 'Manager creates the campaign and requests',
                meta : 'Address of manager',
                style : {overflowWrap:'break-word'}
            },
            {
                header : minCon,
                meta : 'Minimum contribution (wei)',
                description : 'You must contribute at least this much to become an approver'
            },
            {
                header : requestsCount,
                meta : 'Number of requests',
                description : 'A request tries to withdraw money from contract and it should be approved by approvers'
            },
            {
                header : approversCount,
                meta : 'Number of approvers',
                description : 'Number of people who have already donated for this campaign'
            },
            {
                header : web3.utils.fromWei(balance,'ether'),
                meta : 'Campaign balance (ether)',
                description : 'Balance is how much money this campaign has left to spend'
            }
        ];
        return <CardGroup items={items} />;
    }
    render()
    {
        return (
            <Layout>
                <h3>Campaign show</h3>
                <Grid>
                    <GridRow>
                    <GridColumn width={10}>
                    {this.renderCard()}
                    
                    </GridColumn>
                    <GridColumn width={6}>
                    <ContributeForm address={this.props.address} />
                    </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <Button primary>View Requests</Button>
                    </a>
                    </Link>
                    </GridColumn>
                    </GridRow>
                </Grid>
                
                
            </Layout>
        );
    }
};

export default CampaignShow;