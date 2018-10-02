import React, { Component } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button  } from 'reactstrap';
import BookService from '../services/bookService';


class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      author: "",
      releaseDate: "",
      type: "",
      pageCount: "",
      publisher: "",
      desc: ""
    };
    this.save = this.save.bind(this);
  }

  save() {
    var service = this.props.transition.router.stateService;
    var collection = this.state;

    if(collection.name && collection.author && collection.releaseDate && collection.type && collection.pageCount && collection.publisher && collection.desc){
      BookService.addBook(collection).then(function(ret){
        service.go('ListBook');
      });
    } else {
      alert("Lütfen tüm alanları doldurunuz.");
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
       <div>

       <Form>
         <Row>
           <Col md={5}>
             <FormGroup>
               <Label for="name">Kitap Adı</Label>
               <Input type="text" name="name" id="name"  value={this.state.name} onChange={this.handleChange.bind(this)} placeholder=""  />
             </FormGroup>
           </Col>
           <Col md={5}>
             <FormGroup>
               <Label for="author">Yazar</Label>
               <Input type="text" name="author" id="author" value={this.state.author} onChange={this.handleChange.bind(this)} placeholder="" />
             </FormGroup>
           </Col>
           <Col md={2}>
             <FormGroup>
               <Label for="pageCount">Sayfa Sayısı</Label>
               <Input type="text" name="pageCount" id="pageCount" value={this.state.pageCount} onChange={this.handleChange.bind(this)} placeholder="" />
             </FormGroup>
           </Col>
         </Row>

         <Row>
           <Col md={5}>
             <FormGroup>
               <Label for="publisher">Yayın Evi</Label>
               <Input type="text" name="publisher" id="publisher" value={this.state.publisher} onChange={this.handleChange.bind(this)} placeholder="" />
             </FormGroup>
           </Col>
           <Col md={5}>
             <FormGroup>
               <Label for="type">Kitap Türü</Label>
               <Input type="text" name="type" id="type" value={this.state.type} onChange={this.handleChange.bind(this)} placeholder="" />
             </FormGroup>
           </Col>

           <Col md={2}>
             <FormGroup>
               <Label for="releaseDate">Çıkış Yılı</Label>
               <Input type="text" name="releaseDate" id="releaseDate" value={this.state.releaseDate} onChange={this.handleChange.bind(this)} placeholder="" />
             </FormGroup>
           </Col>
         </Row>



         <Row>
           <Col md={12}>
             <FormGroup>
               <Label for="desc">Kitap Özeti</Label>
               <Input type="textarea" name="desc" id="desc" value={this.state.desc} onChange={this.handleChange.bind(this)} placeholder="" />

             </FormGroup>
           </Col>
         </Row>

         <Button color="primary" onClick={this.save}>Kaydet</Button>




        </Form>

       </div>
    );
  }

}

export default AddBook;
