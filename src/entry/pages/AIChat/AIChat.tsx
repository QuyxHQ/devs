import { AIChatIcon } from "../..";

const AIChat = () => {
  return (
    <section>
      <h1 className="page-title mb-4">AI Chat</h1>

      <div className="error-div py-5 px-2">
        <AIChatIcon width={265} height={265} />
        <h3>Coming Soon</h3>

        <p>Get our AI model to guide you on how to make the best use of Quyx.</p>

        <button className="btn blue">Join Waitlist</button>
      </div>
    </section>
  );
};

export default AIChat;
