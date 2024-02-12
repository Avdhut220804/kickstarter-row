import React,{Component} from 'react';
import {Form,FormField,Button,Input,Message} from 'semantic-ui-react';
import CampaignIns from '../ethereum/CampaignIns';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component
{
    state = {
        value : '',
        errorMessage : '',
        loading : false
    };

    onSubmit = async (event) =>
    {
        event.preventDefault();

        const campaign = CampaignIns(this.props.address);
        this.setState({loading : true , errorMessage : ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
               from : accounts[0],
               value :  web3.utils.toWei(this.state.value, 'ether'),
               gas: '1000000'
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch(err)
        {
            this.setState({ errorMessage : err.Message});
        }
        this.setState({ loading : false , value : ''});
    };
    render()
    {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <FormField>
            <label>Contribute to the campaign</label>
            <Input 
            label="ether"
             labelPosition="right" 
             placeholder="Contribution amount"
             value = {this.state.value}
             onChange={event => this.setState({value : event.target.value})} 
            />
          </FormField>
          <Message
            error
            header='Opps something went wrong!'
            content={this.state.errorMessage} />
          
          <Button primary loading={this.state.loading}>Contribute</Button>
        </Form>
        );
    }
}

export default ContributeForm;