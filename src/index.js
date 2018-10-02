import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import { UIRouter, UIView, pushStateLocationPlugin } from '@uirouter/react';
import { Visualizer } from '@uirouter/visualizer';
import './index.css';
import { ReactTableDefaults } from 'react-table'


import BookService from './services/bookService';


//Layouts
import Header from './layouts/Header';
import Footer from './layouts/Footer';

//Components
import ListBook from './components/ListBook';
import AddBook from './components/AddBook';
import DetailBook from './components/DetailBook';


Object.assign(ReactTableDefaults, {
  previousText: 'Geri',
  nextText: 'İleri',
  loadingText: 'Yükleniyor...',
  noDataText: 'Veri bulunamadı.',
  pageText: 'Sayfa',
  ofText: '/',
  rowsText: 'satır',
});


// define your states
const states = [
  {
    name: 'ListBook',
    url: '/',
    component: ListBook,
    resolve: [
      {
        token: 'list',
        deps: ['$transition$'],
        resolveFn: (trans) => BookService.listBook()
      }
    ]
  },
  {
    name: 'AddBook',
    url: '/create',
    component: AddBook,
  },
  {
    name: 'DetailBook',
    url: '/detail/:bookId',
    component: DetailBook,
    resolve: [
      {
        token: 'detail',
        deps: ['$transition$'],
        resolveFn: (trans) => BookService.getBook(trans.params().bookId)
      }
    ]
  }
];

const plugins = [pushStateLocationPlugin];

export const config = (router) => {
  // Setup the state visualizer
  Visualizer(router);
}


ReactDOM.render(
  <main className="my-5 py-5">
  	<Container className="px-0">
		  <UIRouter plugins={plugins} states={states}>
		    <UIView />
		  </UIRouter>
  		</Container>
	</main>,
  document.getElementById('content'),
);

ReactDOM.render(
  <Header />,
  document.getElementById('header'),
);

ReactDOM.render(
  <Footer />,
  document.getElementById('footer'),
);
