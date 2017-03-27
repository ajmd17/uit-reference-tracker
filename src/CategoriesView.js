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


class CategoriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      showingAddCategoryModal: false,
      createCategoryName: '',
      createCategoryDescription: '',
      createCategoryPhotoUrl: ''
    };
  }

  componentDidMount() {
    // load refs
    axios.get(`${config.API_URL}/categories/`)
      .then(res => {
        this.setState({
          categories: res.data.data
        });
      })
      .catch(console.error);
  }

  handleAddBtnClick = () => {
    this.setState({
      showingAddCategoryModal: true
    });
  };

  handleCreateCategoryNameChange = (event) => {
    this.setState({
      createCategoryName: event.target.value
    });
  };

  handleCreateCategoryDescriptionChange = (event) => {
    this.setState({
      createCategoryDescription: event.target.value
    });
  };

  handleCreateCategoryPhotoUrlChange = (event) => {
    this.setState({
      createCategoryPhotoUrl: event.target.value
    });
  };

  handleCreateCategoryClick = () => {
    console.log('Create category "' + this.state.createCategoryName + '"');

    let newCategory = {
      name: this.state.createCategoryName,
      description: this.state.createCategoryDescription,
      photo: this.state.createCategoryPhotoUrl
    };

    axios.post(`${config.API_URL}/categories/`, newCategory)
      .then(() => {
        this.setState({
          categories: this.state.categories.concat([newCategory])
        });
      })
      .catch(console.error);
  };

  renderCategories() {
    if (!this.state.categories) {
      return (
        <h3>Loading categories...</h3>
      );
    }

    return this.state.categories.map((el, i) => (
      <Col s={12} m={4} key={i}>
        <Card>
          <div className="card-image waves-effect waves-block waves-light">
            <Link to={`/category/${i + 1}`}>
              <img className="activator" src={el.photo}/>
            </Link>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{el.name}<i className="material-icons right">more_vert</i></span>
            <p><a href="#">This is a link</a></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{el.name}<i className="material-icons right">close</i></span>
            <p>{el.description}</p>
          </div>
        </Card>
                
      </Col>
    ));
  }

  render() {
    return (
      <Row>
        {this.renderCategories()}

        <Modal
          header='New Category'
          fixedFooter
          actions={[
            <Button waves='light' modal='close' onClick={this.handleCreateCategoryClick}>Create</Button>,
            <Button waves='light' modal='close' flat>Close</Button>
          ]}
          trigger={
            <Button floating icon='add' className='red' large style={{position: 'absolute',bottom: '24px', right: '24px'}}/>
          }>
          <Input s={12} label="Name" value={this.state.createCategoryName} onChange={this.handleCreateCategoryNameChange}/>
          <Input s={12} label="Description" value={this.state.createCategoryDescription} onChange={this.handleCreateCategoryDescriptionChange}/>
          <Input s={12} label="Photo URL" value={this.state.createCategoryPhotoUrl} onChange={this.handleCreateCategoryPhotoUrlChange}/>
        </Modal>
        
      </Row>
    );
  }
}

export default CategoriesView;