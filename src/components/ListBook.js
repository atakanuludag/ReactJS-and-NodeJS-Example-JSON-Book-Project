import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input} from 'reactstrap';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import BookService from '../services/bookService';



class ListBook extends Component {

  editAction(row){
    var service = this.props.transition.router.stateService;
    service.go('DetailBook', { bookId: row._original.id });
  }

  deleteModal(row){
    this.setState({
      modal: true,
      modalDeleteId: row._original.id
    });
  }


  deleteAction(row){
    var modalDeleteId = this.state.modalDeleteId;
    BookService.deleteBook(modalDeleteId).then(function(ret){
      window.location.reload();
    });
  }

  modalClose() {
    this.setState({
      modal: false,
      modalDeleteId: null
    });
  }

  constructor(props) {
      super(props);

      this.modalClose = this.modalClose.bind(this);
      this.deleteAction = this.deleteAction.bind(this);
      this.search = this.search.bind(this);

      var columns = [
        {
          Header: 'Kitap Adı',
          accessor: 'name'
        },
        {
          Header: 'Yazar',
          accessor: 'author'
        },
        {
          Header: 'Yayın Evi',
          accessor: 'publisher'
        },
        {
          Header: 'İşlemler',
          id: 'buttons',
          filterable: false,
          Cell: ({ row }) => (<div className={"text-center"}><Button onClick={(e) => this.editAction(row)} color="primary" size="sm">Düzenle</Button> <Button onClick={(e) => this.deleteModal(row)} color="danger" size="sm">Sil</Button></div>)
        }
      ];


      this.state = {
        modal: false,
        modalDeleteId: null,
        data: this.props.list.data,
        realData: this.props.list.data,
        columns: columns
      };


  }

  search(event){
    var q = event.target.value.toLowerCase();
    var filteredData = [];

    if(q){
      for(var i = 0; i < this.state.data.length; i++){
          var col = this.state.data[i];
          if(col.name.toLowerCase().indexOf(q) !== -1 || col.author.toLowerCase().indexOf(q) !== -1 || col.publisher.toLowerCase().indexOf(q) !== -1){
            filteredData.push(col);
          }
      }

      this.setState({
        data: filteredData
      });


    } else {
      this.setState({
        data: this.state.realData
      });
    }

  }



  render() {
    return (
    	<div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
           <ModalHeader toggle={this.toggle}>Onay</ModalHeader>
           <ModalBody>Gerçekten silmek istiyor musunuz ?</ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={this.deleteAction}>Evet</Button>
             <Button color="secondary" onClick={this.modalClose}>Hayır</Button>
           </ModalFooter>
         </Modal>


         <FormGroup>
            <Input type="text" name="q" id="q" placeholder="Kitap listesinde ara..." onChange={this.search} />
          </FormGroup>


          <ReactTable defaultSorted={[{ id: "id", desc: false }]} data={this.state.data} columns={this.state.columns} defaultPageSize={10} />
        </div>
    );
  }

}

export default ListBook;
