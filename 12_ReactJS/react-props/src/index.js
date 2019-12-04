import React from "react";
import ReactDOM from "react-dom";

function Card(props) {
  return <div className="my-style">
    <h2>{props.name}</h2>
    <img
      src={props.imageURL}
      alt="avatar_img"
    />
    <p>{props.tel}</p>
    <p>{props.email}</p>
  </div>;
}

ReactDOM.render(
  <div>
    <h1>My Contacts</h1>

    <Card name="Beyonce" imageURL="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" tel="+123 456 789" email="b@beyonce.com"/>
    <Card name="Jack Bauer" imageURL="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg" tel="+987 654 321" email="jack@nowhere.com"/>
    <Card name="Chuck Norris" imageURL="https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png" tel="+918 372 574" email="gmail@chucknorris.com"/>
  </div>,
  document.getElementById("root")
);
