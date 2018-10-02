import axios from 'axios';
//const serviceUrl = 'http://localhost:4000/api';
import {serviceUrl} from '../config.js';

const listBook = () => {
  return axios.get(serviceUrl + '/list').then(res => {
      return res;
  });
}

const getBook = (bookId) => {

  return axios.get(serviceUrl + '/book/' + bookId).then(res => {
      return res;
  });
}

const updateBook = (collection, id) => {
  id = parseInt(id, 10);
  collection.pageCount = parseInt(collection.pageCount, 10);
  return axios.put(serviceUrl + '/book/' + id, collection).then(res => {
      return res;
  });
}


const addBook = (collection) => {
  collection.pageCount = parseInt(collection.pageCount, 10);
  return axios.post(serviceUrl + '/book/', collection).then(res => {
      return res;
  });
}

const deleteBook = (id) => {
  id = parseInt(id, 10);
  return axios.delete(serviceUrl + '/book/' + id).then(res => {
      return res;
  });
}

export default {
  listBook,
  getBook,
  updateBook,
  addBook,
  deleteBook
}
