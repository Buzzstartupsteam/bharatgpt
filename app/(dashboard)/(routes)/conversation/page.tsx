import Chat from "./components/Chat";
import { nanoid } from "nanoid";

const ConversationPage = () => {
  const id = nanoid();

  return <Chat id={id} initialMessages={[]} />;
};

export default ConversationPage;
