import React from "react";

const List = ({ id, content }) => {
  return (
    <div>
      <h3>{id}</h3>
      <p>{content}</p>
    </div>
  );
};

export default List;
