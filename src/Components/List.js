import React, { Component } from 'react'
import {Table, Image} from 'react-bootstrap';

class List extends Component {
  render() {
    return (
      <Table striped bordered hover size="sm" responsive className="m-0">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Labels</th>
            <th>Rating</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {this.props.businesses.map((item, i_key) =>
            <tr key={i_key}>
              <td className="align-middle"><Image
                width={40}
                height={40}
                alt={item.name}
                src={item.image_url}
                roundedCircle 
              /></td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle">
                {item.categories.map((category, c_key) =>
                  <span className="card-title-source" key={c_key}>{(c_key ? ' | ': '')}{category.title}</span>
                )}
              </td>
              <td className="align-middle">{item.rating} Stars<br/>{item.review_count} <a href={item.url} rel="noopener noreferrer" target="_blank">reviews</a></td>
              <td className="align-middle">{item.location.display_address[0]} {item.location.display_address[1]}<br/></td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

export default List