import React, {useState} from "react";
import ChatBot from "./subComponents/ChatBot";
import chaticon from "../assets/chaticon.png";

const ChatBotBubble = (props) => {
    const [isChatbotOpened, setIsChatbotOpened] = useState(false);
    return(
        <>
            {props.isQnAReady && <div className="chatbot-bubble" onClick={()=>setIsChatbotOpened(true)}>
                <img className="bubble-icon" src={chaticon} alt="chat" onClick={()=>setIsChatbotOpened(true)}/>
            </div>}
            {isChatbotOpened && <div className="chatbot-container">
                <span className="container-heading">QnA Assistant</span>
                <span className="close-btn" onClick={()=> setIsChatbotOpened(false)}>X</span>
                <div className="chatbot-body">
                    <ChatBot
                        caseId={props.caseId}
                        chatHistory={props.chatHistory}
                        setChatHistory={props.setChatHistory}
                        messages={props.messages}
                        setMessages={props.setMessages}
                        benefitInformation={props.benefitInformation}
                    />
                </div>
            </div>}
        </>
    )
}

export default ChatBotBubble;