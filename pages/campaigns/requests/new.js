import React from 'react';
import { Form, Button, Message, Input, FormField} from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import CampaignIns from '../../../ethereum/CampaignIns';
import { Link, Route } from '../../../routes';
import Layout from '../../../components/layout';


class NewRequest extends React.Component
{
    state = {
        value : '',
        description : '',
        recipient : '',
        loading : false,
        errorMessage : ''
    }
    static async getInitialProps(props)
    {
        const { address } = props.query;
        return { address : address };
        
    }

    onSubmit = async () =>
    {
        const campaign = CampaignIns(this.props.address);
        const { description, value, recipient } = this.state;
        this.setState({ loading : true, errorMessage : ''});

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
            .send({ from : accounts[0] , gas: '1000000'});
            Router.pushRoute(`/campaigns/${ this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage : err.message});
        }
        this.setState({ loading : false});
    }
    render()
    {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                    Back
                </a>
                </Link>
                <h3>Create a reaquest</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <FormField>
                        <label>description</label>
                        <Input 
                        value={this.state.description}
                        onChange={event => {this.setState({ description : event.target.value})}}
                        />
                    </FormField>
                    <FormField>
                        <label>Value in ether</label>
                        <Input 
                        value={this.state.value}
                        onChange={event => {this.setState({ value : event.target.value})}}
                        />
                    </FormField>
                    <FormField>
                        <label>Recipient address</label>
                        <Input 
                        value={this.state.recipient}
                        onChange={event => {this.setState({ recipient : event.target.value})}}
                        />
                    </FormField>
                    <Message error header='Oops' content={this.state.errorMessage} />
                    <Button primary laoding={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
};

export default NewRequest;