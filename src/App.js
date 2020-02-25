import React from "react";
import {
  Row,
  Container,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      inputText: ""
    };
  }

  AddNote = () => {
    this.setState(state => {
      return {
        notes: [
          ...state.notes,
          { id: Date.now().toString(), text: state.inputText }
        ],
        inputText: ""
      };
    });
  };

  DeleteNote = id => {
    this.setState(state => {
      let tmpState = [...state.notes];
      return {
        notes: tmpState.filter(item => {
          return item.id !== id;
        })
      };
    });
  };

  render() {
    return (
      <Container>
        <Row className={styles.mbt20}>
          <Col>
            <h3 className="text-center">Todo App</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Введите текст задачи"
                aria-label="Введите текст задачи"
                value={this.state.inputText}
                onChange={e => this.setState({ inputText: e.target.value })}
              />
              <InputGroup.Append>
                <Button variant="primary" onClick={this.AddNote}>
                  Добавить
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.notes.map(item => (
              <Note
                key={item.id}
                text={item.text}
                onDelete={() => this.DeleteNote(item.id)}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

class Note extends React.Component {
  render() {
    return (
      <Alert variant="primary">
        {this.props.text}
        <hr />
        <Alert.Link onClick={() => this.props.onDelete()}>
          Удалить задачу
        </Alert.Link>
      </Alert>
    );
  }
}
