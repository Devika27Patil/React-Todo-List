import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4" as="h2">
                To-Do List
              </Card.Title>

              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Add a new task"
                />
                <Button variant="primary" onClick={addTask}>
                  Add Task
                </Button>
              </InputGroup>

              <ListGroup variant="flush">
                {tasks.map((task, index) => (
                  <ListGroup.Item
                    key={index}
                    className={`d-flex justify-content-between align-items-center ${
                      task.completed
                        ? "bg-light text-decoration-line-through"
                        : ""
                    }`}
                  >
                    <span
                      onClick={() => toggleComplete(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {task.text}
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
