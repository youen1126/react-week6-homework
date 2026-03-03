import { useSelector } from "react-redux";

export default function MessageToast() {
  const messages = useSelector((state) => state.message);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className="me-auto">{message.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              <img
                src={message.img}
                className="rounded me-2"
                alt="Cute Cat GIF"
                style={{ height: "50px" }}
              />
              {message.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
