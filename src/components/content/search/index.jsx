import React from "react";

import { FaArrowUp } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Search({ inputValue, setInputValue, sendMessage, loading }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };

  return (
    <div className="search-container">
      <div className="content-container__input-area">
        <input
          type="text"
          value={inputValue}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={sendMessage}
          disabled={loading || inputValue.trim() === ""}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </>
          ) : (
            <FaArrowUp />
          )}
        </Button>
      </div>
    </div>
  );
}

export default Search;
