import React, { Component } from "react";
import Job from "./contracts/Job.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
  

  constructor(){
    super();
    this.state = {status: "Free", id: "0x59ad15bfc629e6bb49fd18e91261590e81be77c3", loaded:false};
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      // const test = this.web3.eth.getAccounts().then(console.log)[0];
      console.log(this.web3.eth.getAccounts().then(console.log))
      // console.log(test);
      this.accounts = await this.web3.eth.getAccounts()[0];

      
      
      // Get the contract instance.
      // const networkId = await this.web3.eth.net.getId();

      // const deployedNetwork = Job.networks[this.networkId];
      this.job = new this.web3.eth.Contract(
        Job.abi,
        Job.networks[this.networkId] && Job.network[this.networkId].address,
        // networkData.address
        // deployedNetwork && deployedNetwork.address,
      );
      this.job.options.address = "Ac7004e4D89d9242Ca6847b7790f3aaD0DEA4392";

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded:true });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value
    });
  }


  handleSubmit = async() => {
    const {accounts, id} = this.state;
    // console.log(this.accounts);
    console.log(this.accounts);
    let result = await this.job.methods.Applying(id).send({ from: "0xAc7004e4D89d9242Ca6847b7790f3aaD0DEA4392" });
    console(result);
    alert("Send "+id+" Wei to "+result.events.JobStatus.returnValues._id);
    
    // await this.Job.methods.Applying(id).send({from: this.accounts[0]});
    // console.log(this.state.id);
    // const status = "Applying";
    // this.setState({
    //   ...this.state,
    //   status: status
    } 

  // handleSubmit = async () => {
  //   const { status, id } = this.state;
  //   console.log(status, id, this.Job);
  //   let result = await this.Job.methods.Applying(id).send({ from: this.accounts[0] });
  //   console.log(result);
  //   alert("Send "+id+" Wei to "+result.events.JobStatus.returnValues._address);
  // };


  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Get a JOB</h1>
        <h2>Find company throught smart contract and apply for a job</h2>
        Status: <input type="text" name="status" value={this.state.status} onChange={this.handleInputChange} disabled/>
        Contract: <input type="text" name="id" value={this.state.id} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.handleSubmit}>Apply Now</button>
      </div>
    );
  }
}

export default App;
