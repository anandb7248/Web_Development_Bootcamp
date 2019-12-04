import React from "react";
import EmojiCard from "./EmojiCard";
import emojipedia from "../emojipedia.js"

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">

        {emojipedia.map(function(emoji){
           return <EmojiCard key={emoji.id} name={emoji.name} emoji={emoji.emoji} meaning={emoji.meaning} />
        })}
      </dl>
    </div>
  );
}

export default App;
