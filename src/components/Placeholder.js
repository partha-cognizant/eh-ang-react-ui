import React, {useState} from "react";
import ResolutionAndDetermination from "./subComponents/ResolutionAndDetermination";
import BenefitDocument from "./subComponents/BenefitDocument";
import ClinicalPolicyDocument from "./subComponents/ClinicalPolicyDocument";
import Claims from "./subComponents/Claims";
import PriorAuthorization from "./subComponents/PriorAuthorization";

const Placeholder = (props) => {

    // To handle tab switching.
    const [activeTab, setActiveTab] = useState("RnD");

    const handleClickOnTab = (tabname) => {
        setActiveTab(tabname);
    }
    return(
        <>
            <div className="placeholderdiv">
                <div className="tab-headings">
                    <div className={`${activeTab === "RnD"?"inline-tabs rnd selected-tab down":"inline-tabs"}`} onClick={()=>handleClickOnTab("RnD")}>Resolution and Determination</div>
                    <div className={`${activeTab === "BD"?"inline-tabs selected-tab down":"inline-tabs"}`} onClick={()=>handleClickOnTab("BD")}>Benefit Information</div>
                    <div className={`${activeTab === "CPD"?"inline-tabs selected-tab down":"inline-tabs"}`} onClick={()=>handleClickOnTab("CPD")}>Clinical Policy</div>
                    <div className={`${activeTab === "C"?"inline-tabs selected-tab down":"inline-tabs"}`} onClick={()=>handleClickOnTab("C")}>Claims</div>
                    <div className={`${activeTab === "PA"?"inline-tabs selected-tab down":"inline-tabs"}`} onClick={()=>handleClickOnTab("PA")}>Prior Authorizations</div>
                </div>
                <hr/>
                {activeTab === "RnD"? <ResolutionAndDetermination
                    caseId={props.caseId} 
                    caseSummary={props.caseSummary} 
                    caseSummaryLoading={props.caseSummaryLoading} 
                    setIsLetterGenerationActive={props.setIsLetterGenerationActive}
                    referenceData = {props.referenceData}
                    recommendationChoice = {props.recommendationChoice}
                    setRecommendationChoice = {props.setRecommendationChoice}
                    justificationData = {props.justificationData}
                    isSaveButtonClicked = {props.isSaveButtonClicked}
                    setIsSaveButtonClicked = {props.setIsSaveButtonClicked}
                    isPdfReady = {props.isPdfReady}
                    setIsPdfReady = {props.setIsPdfReady}
                    chatHistory={props.chatHistory}
                    setChatHistory={props.setChatHistory}
                    messages={props.messages}
                    setMessages={props.setMessages}
                    isQnAReady={props.isQnAReady}
                    setIsQnAReady={props.setIsQnAReady}
                    handleCaseSummarySubmit={props.handleCaseSummarySubmit}
                    isRefDataReady={props.isRefDataReady}
                    isCaseSummaryAvailable={props.isCaseSummaryAvailable}
                    handleLetterGeneration={props.handleLetterGeneration}
                    isQnALoading={props.isQnALoading}
                    isRefLoading={props.isRefLoading}
                    setJustificationData={props.setJustificationData}
                    benefitInformation={props.benefitInformation}
                    jusKey={props.jusKey}
                    setJusKey={props.setJusKey}
                    additionalRefInfo={props.additionalRefInfo}
                    getLetterPrefillData={props.getLetterPrefillData}
                    />:null}
                {activeTab === "BD"? <BenefitDocument 
                    benefitDocumentLink={props.benefitDocumentLink} 
                    isBenefitDocumentAvailable= {props.isBenefitDocumentAvailable}
                    benefitInformation={props.benefitInformation}
                    isCaseIDWrong={props.isCaseIDWrong}
                    />:null}
                {activeTab === "CPD"? <ClinicalPolicyDocument 
                    policyDocumentLink={props.policyDocumentLink} 
                    isPolicyDocumentAvailable= {props.isPolicyDocumentAvailable}
                    />:null}
                {activeTab === "C"? <Claims 
                    claimDetails={props.claimDetails} 
                    isClaimAvailable={props.isClaimAvailable}
                    claimIDs={props.claimIDs}
                    />:null}
                {activeTab === "PA"? <PriorAuthorization 
                    authDetails={props.authDetails} 
                    isAuthAvailable={props.isAuthAvailable}
                    authIDs={props.authIDs}
                    isCaseIDWrong={props.isCaseIDWrong}
                    />:null}
            </div>
        </>
    )
}

export default Placeholder;