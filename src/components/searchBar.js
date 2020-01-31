import React from 'react';
import Axios from 'axios';
import { Input, Dropdown } from 'semantic-ui-react';
import {connect} from 'react-redux';

import styles from '../styles/searchBar.module.scss';
require("dotenv").config();

function mapStateToProps(state){
  return {categories: state.eventReducer.event_categories}
}

const RESET = "reset"

class SearchBar extends React.Component {
  state = {
    keyword: '',
    categoryOptions: []
  }

 componentDidMount() {
   let categoryArray = []
   this.props.categories.map( (category, index) => {
     return categoryArray.push( {
      key: category.substring(0,1) + index,
      text: category,
      value: index
      } )
    } )
    this.setState({categoryOptions: categoryArray})
 }

  searchEventByKeyword = async() => {
    const response = await Axios.get(`${process.env.REACT_APP_BACKEND_DB_URL}/events/${this.state.keyword}`).catch( console.log(`Error`))
    const data = response.data
    console.log( response )
    let newData = data.filter( (d) => {
      return d.published === true && d.status !== "completed"
    })
    this.props.categorySearch( newData )
  }

  updateKeyword = e => {
      this.setState( { keyword: e.target.value})
      this.searchEventByKeyword() 
  }

  searchEventByCategory = async(category) => {
    const response = await Axios.get(`${process.env.REACT_APP_BACKEND_DB_URL}/events/category/${category}`).catch( (error) => {
      console.log( `Error: ${error}`)
    })
    let newData = response.data.filter( (d) => {
      return d.published === true && d.status !== "completed"
    })
    this.props.categorySearch( newData )
  }

  findCategory = (e, {value}) => {
      let category = this.props.categories[value]
      if( category !== undefined){
        this.searchEventByCategory(category)
      } else {
      console.log( `RESETING`)
      this.props.categorySearch( RESET )
    }
  }

  resetCards = e => {
    e.target.value = ''
    this.props.categorySearch( RESET )
  }

  render() {
    return(
      <div className={styles.searchContainer}>
      <Input 
          icon={{ name: 'search', circular: true, link: true }}
          size='small'
          placeholder='Search...'
          onChange={this.updateKeyword}>
          </Input>
       <Dropdown
          placeholder='Select Category'
          selection
          options={this.state.categoryOptions}
          onChange={this.findCategory}
          clearable
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(SearchBar)
