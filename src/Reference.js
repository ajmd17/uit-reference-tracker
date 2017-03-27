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


class Reference extends React.Component {
  static propTypes = {
    onDeleteReferenceClick: React.PropTypes.func.isRequired,
    reference: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      reference: this.props.reference,

      noteValue: '',
      notes: [],

      newReferenceName: this.props.reference.name,
      newReferenceDescription: this.props.reference.description,
      newReferenceType: this.props.reference.type,
      newReferenceUrl: this.props.reference.url,
    };
  }

  componentDidMount() {
    axios.get(`${config.API_URL}/references/ref/${this.state.reference._id}`)
      .then(res => {
        this.setState({
          notes: res.data.data.notes
        });
      })
      .catch(console.error);
  }

  handleNoteValueChange = (event) => {
    this.setState({
      noteValue: event.target.value
    });
  };

  handleAddNoteClick = () => {
    axios.post(`${config.API_URL}/references/addNote/${this.state.reference._id}`, {
      note: this.state.noteValue
    }).then(() => {
      this.setState({
        notes: this.state.notes.concat([
          {
            note: this.state.noteValue
          }
        ])
      });
    }).catch(console.error);
  };


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

  handleFinishEditReferenceClick = () => {
    console.log('edit reference "' + this.state.newReferenceName + '"');

    let newReference = {
      name: this.state.newReferenceName,
      description: this.state.newReferenceDescription,
      type: this.state.newReferenceType,
      url: this.state.newReferenceUrl
    };

    axios.put(`${config.API_URL}/references/ref/${this.state.reference._id}`, newReference)
      .then(() => {
        //hack
        this.setState({
          reference: {
            _id: this.state.reference._id,
            ...newReference
          }
        });
      })
      .catch(console.error);
  };

  renderNotes() {
    if (!this.state.notes.length) {
      return (
        <i>No notes yet!</i>
      );
    }
    return (
      <ul>
        {this.state.notes.map((el, i) => (
          <li key={i}>{el.note}</li>
        ))}
      </ul>
    );
  }

  render() {
    if (true) {
      return (
        <Col s={12} m={4}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">


              <Modal
                header='Edit Reference'
                fixedFooter
                actions={[
                  <Button waves='light' modal='close' onClick={this.handleFinishEditReferenceClick}>Update</Button>,
                  <Button waves='light' modal='close' flat>Close</Button>
                ]}
                trigger={
                  <i className="material-icons right">edit</i>
                }>
                <Input s={12} label="Name" value={this.state.newReferenceName} onChange={this.handleNewReferenceNameChange}/>
                <Input s={12} label="Description" value={this.state.newReferenceDescription} onChange={this.handleNewReferenceDescriptionChange}/>
                <Input s={12} label="Type" value={this.state.newReferenceType} onChange={this.handleNewReferenceTypeChange}/>
                <Input s={12} label="URL" value={this.state.newReferenceUrl} onChange={this.handleNewReferenceUrlChange}/>
              </Modal>


              <i className="material-icons right" onClick={this.props.onDeleteReferenceClick}>delete</i>
              <h3>{this.state.reference.name}</h3>
              <p>
                {this.state.reference.description}

                <br/><br/>
                <h5>Notes:</h5>
                {this.renderNotes()}
              </p>


              <Modal
                header='Add Note'
                fixedFooter
                actions={[
                  <Button waves='light' modal='close' onClick={this.handleAddNoteClick}>Add</Button>,
                  <Button waves='light' modal='close' flat>Close</Button>
                ]}
                trigger={
                  <Button floating icon='note_add' className='red' style={{position: 'absolute',bottom: '24px', right: '24px'}}/>
                }>
                <Input s={12} label="Note" value={this.state.noteValue} onChange={this.handleNoteValueChange}/>
              </Modal>
            </div>
            <div className="card-action">
              <a href={this.state.reference.url}>{this.state.reference.url}</a>
            </div>
          </div>
        </Col>
      );
    }
  }
}

export default Reference;