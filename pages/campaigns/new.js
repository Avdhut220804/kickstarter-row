import React, { Component } from "react";
import Layout from "../../components/layout";
import {Form,FormField,Button,Input,Message} from 'semantic-ui-react'
import factory from "../../ethereum/factory";;
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CampaignNew extends Component {
    state =
    {
        minimumContribution : '',
        errorMessage : '',
        loading : false
    }

    onSubmit = async (event) =>  //for creating such functions use this syntax only
    {
        event.preventDefault();
        this.setState({loading : true, errorMessage : ''});
        try
        {
          const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(parseInt(this.state.minimumContribution))
        .send({ from : accounts[0], gas : '10000000'});
        Router.pushRoute('/');
        }
        catch(err)
        {
          this.setState({errorMessage : err.message});
        }

        this.setState({loading : false});
    };
  render() {
    return (
      <Layout>
        <h3>Create a campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <FormField>
            <label>Enter Minimum Contribution (wei)</label>
            <Input 
            label="wei" labelPosition="right" placeholder="Minimum Contribution" 
            value = {this.state.minimumContribution}
            onChange={(event) => {this.setState({minimumContribution : event.target.value})}}
            />
          </FormField>
          <Message
            error
            header='Opps something went wrong!'
            content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
