import { useState, useEffect } from 'react';
import { ListGroup, Badge, Container, Row, Col } from 'react-bootstrap';

export default function PlaceholderApp() {
  // 요청보내기1. js: fetch,
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPostList(data);
      });
  }, []);

  return (
    <Container className="my-5 py-3">
      <Row>
        <Col xs={12} md={6}>
          <h1>게시글 리스트</h1>

          <ListGroup as="ol" numbered>
            {postList.map((post) => {
              return (
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={post.id}>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{post.title}</div>

                    {post.body}
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>

        <Col xs={12} md={6}>
          <h1></h1>
        </Col>
      </Row>
    </Container>
  );
}
