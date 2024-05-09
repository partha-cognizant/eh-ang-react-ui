import { useState } from 'react';
import './App.css';
import AppealCaseID from './components/AppealCaseID';
import MemberInfo from './components/MemberInfo';
import NavBar from './components/NavBar';
import PageHeadings from './components/PageHeadings';
import Placeholder from './components/Placeholder';
import RadioButtons from './components/RadioButtons';
import LetterGeneration from './components/LetterGeneration';
import axios from "axios";
import ChatBotBubble from './components/ChatBotBubble';


function App() {

  // Initializing the required values and checkpoints required 
  const [caseId, setCaseId] = useState(0);
  const [caseSummary, setCaseSummary] = useState("");
  const [caseSummaryLoading, setCaseSummaryLoading] = useState(false);
  const [caseDocumentLink, setCaseDocumentLink] = useState("");
  const [benefitDocumentLink, setBenefitDocumentLink] = useState([{"url":""}]);
  const [policyDocumentLink, setPolicyDocumentLink] = useState([]);
  const [isCaseIDValid, setIsCaseIDValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaseIDWrong, setIsCaseIDWrong] = useState(false);
  const [isBenefitDocumentAvailable, setIsBenefitDocumentAvailable] = useState(false);
  const [isPolicyDocumentAvailable, setIsPolicyDocumentAvailable] = useState(false);
  const [isMemberValid, setIsMemberValid] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});
  const [claimDetails, setClaimDetails] = useState({});
  const [isClaimAvailable, setIsClaimAvailable] = useState(false);
  const [authDetails, setAuthDetails] = useState({});
  const [isAuthAvailable, setIsAuthAvailable] = useState(false);
  const [isLetterGenerationActive, setIsLetterGenerationActive] = useState(false);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [referenceData, setReferenceData] = useState([]);
  const [recommendationChoice, setRecommendationChoice] = useState("");
  const [justificationData, setJustificationData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [messages , setMessages] = useState([
    {
        message: "Hi, How can I help you ?",
        sender: "assistant",
        direction: "incoming",
        sentTime:""
    }
]);
  const [isQnAReady, setIsQnAReady] = useState(false);
  const [claimIDs, setClaimIDs] = useState([]);
  const [authIDs, setAuthIDs] = useState([]);
  const [isRefDataReady, setIsRefDataReady] = useState(false);
  const [isCaseSummaryAvailable, setIsCaseSummaryAvailable] = useState(false);
  const [appealPoints, setAppealPoints] = useState("");
  const [letterContent, setLetterContent] = useState("");
  const [isLetterReady, setIsLetterReady] = useState(false);
  const [benefitInformation, setBenefitInformation] = useState("");
  const [isQnALoading, setIsQnALoading] = useState(false);
  const [isRefLoading, setIsRefLoading] = useState(false);
  const [jusKey, setJusKey] = useState(99);
  const [additionalRefInfo, setAdditionalRefInfo] = useState("");
  const [letterPrefill, setLetterPrefill] = useState({});
  const [isLetterPrefillReady, setIsLetterPrefillReady] = useState(false);


  // API URL. If you change this url, every API call will get this url.
  const apiURL = "https://emblem-health-server-dot-cdb-aia-ops-000305776.uc.r.appspot.com/";

  // The function handles what happens after user submits the case ID.
  const handleCaseIDSubmit = (caseID) =>{

    setCaseId(caseID);
    // To clear the component values before we get data from API
    setCaseSummary("");
    setCaseSummaryLoading(true);
    setCaseDocumentLink("");
    setBenefitDocumentLink([{"url":""}]);
    setPolicyDocumentLink([]);
    setMemberInfo({});
    setClaimDetails({});
    setAuthDetails({});
    setIsBenefitDocumentAvailable(false);
    setIsPolicyDocumentAvailable(false);
    setIsMemberValid(false);
    setIsClaimAvailable(false);
    setIsAuthAvailable(false);
    setIsPdfReady(false);
    setReferenceData([]);
    setRecommendationChoice("");
    setJustificationData("");
    setChatHistory([]);
    setMessages([
      {
          message: "Hi, How can I help you ?",
          sender: "assistant",
          direction: "incoming",
          sentTime:""
      }
    ]);
    setIsQnAReady(false);
    setClaimIDs([]);
    setAuthIDs([]);
    setIsRefDataReady(false);
    setIsCaseSummaryAvailable(false);
    setAppealPoints("");
    setLetterContent("");
    setIsLetterReady(false);
    setBenefitInformation("");
    setIsQnALoading(true);
    setIsLetterReady(true);
    setJusKey(99);
    setAdditionalRefInfo("");
    setIsLetterPrefillReady(false);
    setLetterPrefill({});



    // This data is posted to API to get Appeal Summarization
    const postAppealData = {
      "caseid":caseID,
      "intent":"appeal_summarize"
    }

    // API call to get Appeal Summarization
    axios.post(apiURL,postAppealData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=> {
      setCaseSummaryLoading(false);
      // This will only show case summarization when case ID is valid
      if(!(res.data.appeal_summarize.includes("No Case found"))){
        setIsCaseSummaryAvailable(true);
        setCaseSummary(res.data.appeal_summarize);
      }
      }).catch(err=>console.log("Error :", err))

    // This data is posted to API to get all the files realted to case ID.
    const postDocumentData = {
      "caseid":caseID,
      "intent":"casefiles"
    }

    // API call to get the files related to the case ID
    axios.post(apiURL,postDocumentData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=> {
      // To stop Loading Indicator
      setIsLoading(false);
      // console.log(res.data)

      // The benefit document section will get data only when it not null
      if(res.data.casefiles.status === "failed" ){
        setIsCaseIDWrong(true);
      }else{
      if(res.data.casefiles.benefit_documents !== null ){
        setIsBenefitDocumentAvailable(true);
        setBenefitDocumentLink(res.data.casefiles.benefit_documents);
      };

      // The case document section will get data only when it not null
      if(res.data.casefiles.case_documents !== null ){
        setIsCaseIDValid(true);
        
        setIsCaseIDWrong(false);
        setCaseDocumentLink(res.data.casefiles.case_documents[0].url);
        
      };

      // The policy document section will get data only when it not null
      if(res.data.casefiles.policy_documents !== null ){
        setIsPolicyDocumentAvailable(true);
        setPolicyDocumentLink(res.data.casefiles.policy_documents);
      };} 
      }).catch(err=>console.log("Error :", err))
     
    const postBenefitInfoData = {
      "caseid":caseID,
      "intent":"benefit_information"
    }
  
      // API call to get the files related to the case ID
    axios.post(apiURL,postBenefitInfoData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
      }).then(res=> {
          console.log(res.data);
          setBenefitInformation(res.data.benefit_information);
        }).catch(err=>console.log("Error :", err))
      

    // This data is posted to API to get Member Details
    const postMemberData = {
      "caseid":caseID,
      "intent":"memberdetails"
    }
  
    // API call to get Member Details
    axios.post(apiURL,postMemberData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=> {
      // console.log(res.data);
      // When case id is invalid, member details returns a string but when it valid, it returns a object
      // Member details will only get enabled when it gets an object data type
      if(res.data.memberdetails.status === "failed" ){
        setIsCaseIDWrong(true);
        setIsMemberValid(false);
      }else if(typeof(res.data.memberdetails) !== 'string'){
          setIsMemberValid(true);
          setMemberInfo(res.data.memberdetails)
      }; 
      }).catch(err=>console.log("Error :", err))
    
    // This data is posted to API to get Claim Details
    const postClaimData = {
      "caseid":caseID,
      "intent":"claimdetails"
    }

    // API call to get Claim Details
    axios.post(apiURL,postClaimData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=> {
      // console.log(res.data);
      setIsClaimAvailable(true);
      setClaimIDs(res.data.claimdetails.unique_claim_ids);
      setClaimDetails(res.data.claimdetails.claim_data);
      // console.log(Object.keys(eval(res.data.claimdetails.claim_data)[0]));
      // When case id is invalid, claim details returns empty array.
      // claim details will only get enabled when it return a filled array.
      // if(res.data.claimdetails.length !== 0){
      //   setIsClaimAvailable(true);
      //   setClaimDetails(res.data.claimdetails);
      // };
      }).catch(err=>console.log("Error :", err))  

    // This data is posted to API to get Authorization Details
    const postAuthData = {
      "caseid":caseID,
      "intent":"authdetails"
    }

    // API call to get Authorization Details
    axios.post(apiURL,postAuthData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=> {
      console.log(res.data);
      setIsAuthAvailable(true);
      setAuthDetails(res.data.authdetails.auth_data);
      setAuthIDs(res.data.authdetails.unique_auth_ids);
      // When case id is invalid, authorization details returns empty array.
      // authorization details will only get enabled when it return a filled array.
      // if(res.data.authdetails.length !== 0){
      //   setIsAuthAvailable(true);
      //   setAuthDetails(res.data.authdetails.auth_data);
      //   setAuthIDs(res.data.authdetails.unique_auth_ids);
      // };
      }).catch(err=>console.log("Error :", err))

    
    const postPreprocessData = {
        "caseid": caseID,
        "intent": "qna_preprocess",
    };
    axios.post(apiURL,postPreprocessData,{
        headers:{
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
        }
      }).then(res=>{
        if(res.data.status === "success"){
            setIsQnALoading(false);
            setIsQnAReady(true);
            console.log(res.data)
        }else{
            setIsQnALoading(false);
            console.log(res.data)
        }}
        ).catch(err=>console.log(err))
    
  }

  const handleCaseSummarySubmit = () => {
    setIsRefLoading(true);
    setIsRefDataReady(false);
    setRecommendationChoice("");
    setJustificationData("");
    setReferenceData([]);
    setAdditionalRefInfo("");
    // reference_information
    const refQuery = `Participation Information - ${benefitInformation.participation_information} \n \n Benefit Details - ${benefitInformation.benefit_details}`
    const postRefData = {
      "caseid": caseId,
      "intent": "reference_information",
      "query" : refQuery
    };
    axios.post(apiURL,postRefData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=>{
          setIsRefLoading(false);
          setIsRefDataReady(true);
          console.log(res.data)
          setAdditionalRefInfo(res.data.reference_information.additional_reference_information);
          setRecommendationChoice(res.data.reference_information.decision);
          setJustificationData(res.data.reference_information.justification);
          setReferenceData(res.data.reference_information.reference);
          setAppealPoints(res.data.reference_information.appeal_points);
      }
      ).catch(err=>console.log(err))
  }

  const handleLetterGeneration = () => {
    // setIsLetterGenerationActive(true);
    setIsLetterReady(false);
    let modifiedAppealPoints = appealPoints + "\n Here are the information to generate letter :\n";
    if(document.getElementById('member-id-input').value !== ""){
      modifiedAppealPoints += `Member ID: ${document.getElementById('member-id-input').value},`;
    }
    if(document.getElementById('member-name-input').value !== ""){
      modifiedAppealPoints += `Member Name: ${document.getElementById('member-name-input').value},`;
    }
    if(document.getElementById('case-id-input').value !== ""){
      modifiedAppealPoints += `Case ID: ${document.getElementById('case-id-input').value},`;
    }
    if(document.getElementById('requestor-name-input').value !== ""){
      
      modifiedAppealPoints += `Requestor Name: ${document.getElementById('requestor-name-input').value},`;
    }
    if(document.getElementById('requestor-id').value !== ""){
      console.log(document.getElementById('requestor-id').value);
      let addressLines = document.getElementById('requestor-id').value.split("\n") ;
      modifiedAppealPoints += `Requestor address first line: ${addressLines[0]}\nRequestor address second line: ${addressLines[1]}`;
      console.log(modifiedAppealPoints)
      // console.log(`requestor first line address: ${trial[0]}\nrequestor second line address: ${trial[1]}`)
    }

    const postLetterData = {
      "caseid": caseId,
      "intent": "letter_generation",
      "appeal_points":modifiedAppealPoints,
      "decision":recommendationChoice,
      "justification":justificationData
    };
    console.log(postLetterData, typeof(postLetterData))
    axios.post(apiURL,postLetterData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=>{
        setIsLetterReady(true);
        console.log(res.data.letter);
        setLetterContent(res.data.letter);
      }
      ).catch(err=>console.log(err))
  }

  const getLetterPrefillData = () => {
    const postPrefillData = {
      "caseid": caseId,
      "intent": "letter_inputs",
    };
    axios.post(apiURL,postPrefillData,{
      headers:{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Access-Control-Allow-Origin'
      }
    }).then(res=>{
        setIsLetterPrefillReady(true);
        console.log(res.data.letter_inputs);
        setLetterPrefill(res.data.letter_inputs);

      }
      ).catch(err=>console.log(err))
  }

  // returns the components of the react with information passed as props to them
  return (
    <div className="App">
      <NavBar/>
      <PageHeadings/>
      <RadioButtons/>
      {!isLetterGenerationActive && <AppealCaseID 
        handleCaseIDSubmit = {handleCaseIDSubmit} 
        isCaseIDValid={isCaseIDValid} 
        caseDocumentLink={caseDocumentLink}
        isCaseIDWrong={isCaseIDWrong}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setIsCaseIDValid={setIsCaseIDValid}
        setIsCaseIDWrong={setIsCaseIDWrong}
      />}
      {!isLetterGenerationActive && <MemberInfo 
        isMemberValid={isMemberValid} 
        memberInfo={memberInfo}

      />}
      {!isLetterGenerationActive && <Placeholder 
        caseId={caseId}
        caseSummary= {caseSummary} 
        caseSummaryLoading={caseSummaryLoading}
        policyDocumentLink={policyDocumentLink} 
        benefitDocumentLink={benefitDocumentLink} 
        isBenefitDocumentAvailable={isBenefitDocumentAvailable} 
        isPolicyDocumentAvailable={isPolicyDocumentAvailable} 
        isAuthAvailable={isAuthAvailable} 
        authDetails={authDetails} 
        claimDetails={claimDetails} 
        isClaimAvailable={isClaimAvailable}
        setIsLetterGenerationActive={setIsLetterGenerationActive}
        referenceData = {referenceData}
        recommendationChoice = {recommendationChoice}
        setRecommendationChoice = {setRecommendationChoice}
        justificationData = {justificationData}
        isSaveButtonClicked = {isSaveButtonClicked}
        setIsSaveButtonClicked = {setIsSaveButtonClicked}
        isPdfReady = {isPdfReady}
        setIsPdfReady = {setIsPdfReady}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        messages={messages}
        setMessages={setMessages}
        isQnAReady={isQnAReady}
        setIsQnAReady={setIsQnAReady}
        claimIDs={claimIDs}
        authIDs={authIDs}
        handleCaseSummarySubmit={handleCaseSummarySubmit}
        isRefDataReady={isRefDataReady}
        isCaseSummaryAvailable={isCaseSummaryAvailable}
        handleLetterGeneration={handleLetterGeneration}
        benefitInformation={benefitInformation}
        isCaseIDWrong={isCaseIDWrong}
        isQnALoading={isQnALoading}
        isRefLoading={isRefLoading}
        setJustificationData={setJustificationData}
        jusKey={jusKey}
        setJusKey={setJusKey}
        additionalRefInfo={additionalRefInfo}
        getLetterPrefillData={getLetterPrefillData}
      />}
      {isLetterGenerationActive && <LetterGeneration
        setIsLetterGenerationActive={setIsLetterGenerationActive}
        isLetterReady={isLetterReady}
        letterContent={letterContent}
        handleLetterGeneration={handleLetterGeneration}
        justificationData = {justificationData}
        letterPrefill={letterPrefill}
        setLetterPrefill={setLetterPrefill}
        isLetterPrefillReady={isLetterPrefillReady}
        setIsLetterPrefillReady={setIsLetterPrefillReady}
        setLetterContent={setLetterContent}
      />}
      {!isLetterGenerationActive && <ChatBotBubble
        isQnAReady={isQnAReady}
        caseId={caseId}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        messages={messages}
        setMessages={setMessages}
        benefitInformation={benefitInformation}
      />}
    </div>
  );
}

export default App;
