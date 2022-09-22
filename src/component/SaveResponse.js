import React from "react";
import { Table } from "react-bootstrap";
import "./SaveResponse.css";

function SaveResponse() {
  const [userName, setUserName] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");
  const userResponse = [];
  const [allResponses, setAllResponses] = React.useState([]);
  const [stopInfiniteLoop, setStopInfiniteLoop] = React.useState(false);

  if (!stopInfiniteLoop) {
    fetch(
      "https://nikhil-accio-react-default-rtdb.asia-southeast1.firebasedatabase.app/message.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (const dataItem in data) {
          console.log(data[dataItem].userName, data[dataItem].userMessage);
          userResponse.push({
            userName: data[dataItem].userName,
            userMessage: data[dataItem].userMessage,
          });
        }
        setAllResponses(userResponse);
      });
    setStopInfiniteLoop(true);
  }

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`userName :${userName}`);
    console.log(`userMessage : ${userMessage}`);

    // Create (CRUD)

    fetch(
      "https://nikhil-accio-react-default-rtdb.asia-southeast1.firebasedatabase.app/message.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          userMessage: userMessage,
        }),
      }
    )
      .then((res) => {
        console.log("res : ", res);
        return res.json();
      })
      .then((data) => {
        console.log("data :", data);
      });
  };

  return (
    <div className="container">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="first">
          <h4 className="nameHeading">Your Name</h4>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            onChange={handleUserNameChange}
          />
          <br></br>
        </div>
        <div className="second">
          <h4 className="messageHeading">Feel free to share your feedback</h4>
          <textarea
            placeholder="Enter your message"
            id="message"
            rows="4"
            cols="40"
            onChange={handleUserMessageChange}
          />
        </div>
        <button type=" submit">Submit</button>
      </form>

      <Table border={1}>
        <tr>
          <th>Name</th>
          <th>Feedback</th>
        </tr>
        {allResponses &&
          allResponses.map((item) => {
            return (
              <tr>
                <td>{item.userName}</td>
                <td className="messagedata">{item.userMessage}</td>
              </tr>
            );
          })}
      </Table>
    </div>
  );
}

export default SaveResponse;
