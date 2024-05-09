import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";
 
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import reset from "../../assets/reset.png";
 
const ChatBot = (props) => {
    const apiURL = "https://emblem-health-server-dot-cdb-aia-ops-000305776.uc.r.appspot.com/";
 
    // const [messages , setMessages] = useState([
    //     {
    //         message: "Hi, How can I help you ?",
    //         sender: "assistant",
    //         direction: "incoming",
    //         sentTime:""
    //     }
    // ]);
 
    useEffect(()=>{console.log(props.messages)},[props.messages]);
    
    const [typing, setTyping] = useState(false);
    // const [chatHistory, setChatHistory] = useState([]);

    const handleReset = () => {
        props.setMessages([
                {
                    message: "Hi, How can I help you ?",
                    sender: "assistant",
                    direction: "incoming",
                    sentTime:""
                }
            ]);
        props.setChatHistory([]);
        
    }
 
    const HandleSend = async(message) => {
        const newMessage = {
            message : message,
            sender: "user",
            direction: "outgoing",
            sentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
        }
    
        props.setMessages(messages => ([...props.messages, newMessage]));
        
        // console.log(messages);
        setTyping(true);
 
        await processMessageToAPI(message,newMessage);
    }
 
    async function processMessageToAPI(messageToBeSent, messageObject){
        console.log(props.caseId)
        const qnaJustification = `Participation Information - ${props.benefitInformation.participation_information} \n \n Benefit Details - ${props.benefitInformation.benefit_details}`
        const postData = {
            "caseid": props.caseId, 
            "intent": "qna",
            "query": messageToBeSent,
            "history" : props.chatHistory,
            "justification" : qnaJustification,
        }
        
        axios.post(apiURL,postData,{
            headers:{
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
            }
          }).then(res=>{
            // console.log(res.data.response)

            const newResponse = {
                message : res.data.response,
                sender: "assistant",
                direction: "incoming",
                sentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
            }
            
            const newResponses = [...props.messages, messageObject, newResponse];
 
            // console.log(messages);
            
            props.setMessages(newResponses);
            
            // console.log(messages);
 
            const newChat = {
                "question": messageToBeSent,
                "answer": res.data.response
            }

            if(props.chatHistory.length === 3){
                props.chatHistory.splice(0,1)
            }
            const newHistory = [...props.chatHistory, newChat];
            console.log(newHistory);
            props.setChatHistory(newHistory);
 
            setTyping(false);
 
        }).catch(err=>console.log(err))
    }
 
    return(
        <>
        <MainContainer>
            <ChatContainer>
                <MessageList typingIndicator={typing ? <TypingIndicator content="Assitant is Typing..."/> : null}>
                    {props.messages.map((message,i)=>{
                        return (
                        <Message key={i} style={{height:"auto"}} model={
                            {
                                type:"custom",
                                sender: message.sender,
                                direction: message.direction
                            }}>
                            <Message.CustomContent>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.message}
                                </ReactMarkdown>
                            </Message.CustomContent>
                            <Message.Footer
                                sender= {message.sender}
                                sentTime={message.sentTime}
                            />
                        </Message>
                        )
                    })}
                </MessageList>
                <div as={MessageInput} className="msg-input-grp">
                    <MessageInput placeholder="Type your query here..." onSend={HandleSend} onPaste={(e)=>{
                        e.preventDefault();
                        HandleSend(e.clipboardData.getData("text"));
                    }} attachButton="false"/>
                    <img className="reset-msg-btn" src={reset} alt="reset" onClick={handleReset}/>
                </div>
            </ChatContainer>
        </MainContainer>
        </>
    )
}
 
export default ChatBot;