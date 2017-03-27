import * as React from 'react';
import { Link } from 'react-router';
import * as axios from 'axios';

import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Input
} from 'react-materialize';

import config from './config';


class ReferencesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      references: null,

      newReferenceName: '',
      newReferenceDescription: '',
      newReferenceType: '',
      newReferenceUrl: '',
    };
  }

  componentDidMount() {
    const { categoryId } = this.props.routeParams;

    axios.get(`${config.API_URL}/references/${categoryId}`)
      .then(res => {
        this.setState({
          references: res.data.data
        });
      })
      .catch(console.error);
  }

  handleNewReferenceNameChange = (event) => {
    this.setState({
      newReferenceName: event.target.value
    });
  };

  handleNewReferenceDescriptionChange = (event) => {
    this.setState({
      newReferenceDescription: event.target.value
    });
  };

  handleNewReferenceTypeChange = (event) => {
    this.setState({
      newReferenceType: event.target.value
    });
  };

  handleNewReferenceUrlChange = (event) => {
    this.setState({
      newReferenceUrl: event.target.value
    });
  };

  handleAddReferenceClick = () => {
    const { categoryId } = this.props.routeParams;

    console.log('Add reference "' + this.state.newReferenceName + '"');

    let newReference = {
      name: this.state.newReferenceName,
      description: this.state.newReferenceDescription,
      type: this.state.newReferenceType,
      url: this.state.newReferenceUrl
    };

    axios.post(`${config.API_URL}/references/${categoryId}`, newReference)
      .then(() => {
        this.setState({
          references: this.state.references.concat([newReference])
        });
      })
      .catch(console.error);
  };

  onDeleteReferenceClick = (ref, i) => {
    axios.delete(`${config.API_URL}/references/ref/${ref._id}`)
      .then(res => {
        let { references } = this.state;
        references.splice(i, 1);
        
        this.setState({ references });
      })
      .catch(console.error);
  };

  renderReferences() {
    if (!this.state.references) {
      return (
        <h3>Loading references...</h3>
      );
    }

    return this.state.references.map((el, i) => (
      <Col s={12} m={4} key={i}>
        <Card >
          <div className="card-image waves-effect waves-block waves-light">
            <i className="material-icons right" onClick={this.onDeleteReferenceClick.bind(this, el, i)}>delete</i>
          </div>
          <div className="card-content">
            <Link className="card-title" to={el.url}>{el.name}</Link>
            <p>{el.description}</p>
          </div>
        </Card>
                
      </Col>
    ));
  }

  render() {
    return (
      <Row>
        {this.renderReferences()}

        <Modal
          header='Add Reference'
          fixedFooter
          actions={[
            <Button waves='light' modal='close' onClick={this.handleAddReferenceClick}>Add</Button>,
            <Button waves='light' modal='close' flat>Close</Button>
          ]}
          trigger={
            <Button floating icon='add' className='red' large style={{position: 'absolute',bottom: '24px', right: '24px'}}/>
          }>
          <Input s={12} label="Name" value={this.state.newReferenceName} onChange={this.handleNewReferenceNameChange}/>
          <Input s={12} label="Description" value={this.state.newReferenceDescription} onChange={this.handleNewReferenceDescriptionChange}/>
          <Input s={12} label="Type" value={this.state.newReferenceType} onChange={this.handleNewReferenceTypeChange}/>
          <Input s={12} label="URL" value={this.state.newReferenceUrl} onChange={this.handleNewReferenceUrlChange}/>
        </Modal>
      </Row>
    );
  }
}

export default ReferencesView;