import React, { Component } from 'react';
import { CardGroup,Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import { Link } from '../routes';


class CampaignIndex extends Component
{
    static async getInitialProps()
    {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns : campaigns};
    }

    renderCampaigns()
    {
        const items = this.props.campaigns.map( address =>
            {
                return {
                    header : address,
                    description : 
                    <Link route={ `/campaigns/${address}`}>
                    <a>View campaigns</a>
                    </Link>,
                    fluid  :true
                };
            });
        return <CardGroup items={items} />;
    }

    render()
    {
        return (
        <Layout>
            <div>
                <h1>Open Campaigns</h1>
            <Link route="/campaigns/new">
            <Button floated='right' content='Create' icon='add circle' primary />
            </Link>
                { this.renderCampaigns() }
                    
            </div>
        </Layout>);
    }
}


export default CampaignIndex;