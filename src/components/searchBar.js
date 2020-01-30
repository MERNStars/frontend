import React from 'react';
import Axios from 'axios';
import { Input, Dropdown } from 'semantic-ui-react';
import {connect} from 'react-redux';

import styles from '../styles/searchBar.module.scss';

require("dotenv").config();

function mapStateToProps(state){

  return {categories: state.eventReducer.event_categories}
}

class SearchBar extends React.Component {
  

  state = {
    keyword: '',
    categoryOptions: []
  }

 componentDidMount() {
   let categoryArray = []
   this.props.categories.map( (category, index) => {
     return categoryArray.push( {
      key: category.substring(0,1),
      text: category,
      value: index
      } )
    } )
    this.setState({categoryOptions: categoryArray})
 }

  searchEventByKeyword = async() => {
    const response = await Axios.get(`${process.env.REACT_APP_BACKEND_DB_URL}/events/${this.state.keyword}`).catch( console.log(`Error`))
    const data = response.data
    this.props.categorySearch( data )
  }

  updateKeyword = e => {
    this.setState( { keyword: e.target.value})
    this.searchEventByKeyword()
  }

  searchEventByCategory = async(category) => {
    const response = await Axios.get(`${process.env.REACT_APP_BACKEND_DB_URL}/events/category/${category}`).catch( (error) => {
      console.log( `Error: ${error}`)
    })
    this.props.categorySearch( response.data )
  }

  findCategory = (e, {value}) => {
    let category = this.props.categories[value]
    this.searchEventByCategory(category)
  }

  render() {
    return(
      <div className={styles.searchContainer}>
      <Input
          icon={{ name: 'search', circular: true, link: true }}
          size='small'
          placeholder='Search...'
          onChange={this.updateKeyword}
        />
       <Dropdown
          placeholder='Select Category'
          selection
          options={this.state.categoryOptions}
          onChange={this.findCategory}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(SearchBar)
