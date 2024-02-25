import { useEffect, useState } from "react";
import { AIChatIcon, LoadingContentOnButton } from "../..";
import { api } from "../../../utils/class/api.class";

const AIChat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInWaitlist, setIsInWaitlist] = useState<boolean>(false);
  const [text, setText] = useState<string>("Fetching..");

  useEffect(() => {
    (async function () {
      setText("Fetching..");
      setIsLoading(true);
      const resp = await api.isUserInAiWaitlist();
      setIsInWaitlist(resp);
      setIsLoading(false);
    })();
  }, []);

  async function joinWaitlist() {
    setText("Processing");
    setIsLoading(true);
    const resp = await api.getIntoAiWaitlist();
    if (resp) setIsInWaitlist(true);
    setIsLoading(false);
  }

  async function leaveWaitlist() {
    if (!confirm("Are you sure you want to leave waitlist?")) return;

    setText("Processing");
    setIsLoading(true);
    const resp = await api.removeFromAiWaitlist();
    if (resp) setIsInWaitlist(false);
    setIsLoading(false);
  }

  return (
    <section>
      <h1 className="page-title mb-4">AI Chat</h1>

      <div className="error-div py-5 px-2">
        <AIChatIcon width={265} height={265} />
        <h3>Coming Soon</h3>

        <p>Get our AI model to guide you on how to make the best use of Quyx.</p>

        <button
          className="btn blue"
          disabled={isLoading}
          onClick={isInWaitlist ? leaveWaitlist : joinWaitlist}
        >
          {isLoading ? (
            <LoadingContentOnButton text={text} />
          ) : isInWaitlist ? (
            "Leave waitlist"
          ) : (
            "Join Waitlist"
          )}
        </button>
      </div>
    </section>
  );
};

export default AIChat;
