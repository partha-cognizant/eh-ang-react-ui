import React from "react";
import loading from "../../assets/loading.png";
import {useState} from "react";
import jsPDF from "jspdf";
import ChatBot from "./ChatBot";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import view from "../../assets/View.png";
import edit from "../../assets/edit.png";
import info from "../../assets/info.png";



const ResolutionAndDetermination = (props) =>{

    const [isRefPreviewOpen, setIsRefPreviewOpen] = useState(false);
    const [isJusPreviewOpen, setIsJusPreviewOpen] = useState(false);
    const [isTextChanged, setIsTextChanged] = useState(false);
    const [isCSPreviewOpen, setIsCSPreviewOpen] = useState(false);
    const [isJusMKPreviewOpen, setIsJusMKPreviewOpen] = useState(false);
    // const [jusKey, setJusKey] = useState(99);

    const handleKeyPressInText = () => {
        if(!isTextChanged){
            setIsTextChanged(true);
        }
    }

    const switchDecision = (decisionChoice) => {
        props.setRecommendationChoice(decisionChoice);
    }

    const handleJusSave = () => {
        setIsTextChanged(false);
        const jusTextValue = document.getElementById("jus-popup-container").value;
        props.setJustificationData(jusTextValue);
    }

    const handleJusCancel = () => {
        const curTextValue = props.justificationData;
        props.setJusKey(Math.floor(Math.random() * 100));
        props.setJustificationData(curTextValue);
        setIsTextChanged(false); 
    }

    const handleSaveButtonClick = () => {
        
        props.setIsSaveButtonClicked(true);
        const doc = new jsPDF('p','pt','letter');
        doc.setFontSize(10);

        const htmlTextContent = `<div style="width:550px; text-align:justify; text-justify:inter-word">
        <div style="text-align:center"><b>Emblem Health Appeals and Grievances</b></div> <p><br></p> 
        <div style="text-align:center"><b>Case ID :${props.caseId}</b></div> <p><br></p> 
        <div><b>Case Summary :</b></div>  ${props.caseSummary}  <hr/>  <p><br></p> 
        <div><b>Reference Information :</b></div> ${props.referenceData.map((refs,index)=>{
            return(
                <>
                    <a id={index} href={refs.filepath} className="ref-links" target="_blank" rel="noopener noreferrer">{index+1} .{refs.filename}</a>
                    <p className="ref-details"><b>Page Number :</b> {refs.page}</p>
                    <p className="ref-details"><b>Details :</b></p>
                    <p className="ref-details">{refs.text}</p>
                    <hr/>
                </>
            )
        })}  <hr/>  <p><br></p> 
        <div><b>Recommendation :</b></div> ${props.recommendationChoice}  <hr/>  <p><br></p> 
        <div><b>Justification :</b></div> ${props.justificationData}</div>`;

        const data = {
            callback:function(doc){
                doc.save("summary.pdf")
            },
            margin:[20,20,20,20],
            autoPaging:"text",
            width: 120
        }

        doc.html(htmlTextContent,data)
        props.setIsPdfReady(true);

    }

    const handleLocalGenerateLetter = () => {
        props.getLetterPrefillData();
        props.setIsLetterGenerationActive(true);
    }

    return(
        <>
            <div className="resolution-container">
                <div className="case-summary-container">
                    <div className="case-summary-heading">
                        Case Summary
                        {props.isCaseSummaryAvailable && <img className="view-ref-btn"src={view} alt="view" onClick={()=>setIsCSPreviewOpen(true)}/>}
                    </div>
                    <div className="case-summary-body">
                        <div className="case-summary-text">
                            {props.caseSummaryLoading && 
                                <div className="loading-case-summary">
                                    <img className="loading-img" src={loading} alt="loading..."/>
                                </div>}
                            {props.isCaseSummaryAvailable && 
                                    <ReactMarkdown remarkPlugins={remarkGfm}>
                                        {props.caseSummary}
                                    </ReactMarkdown>
                            }
                        </div>
                        <hr/>
                        <div className="case-summary-submit">
                            <button className={props.isCaseSummaryAvailable?"btn btn-primary submit-btn":"btn btn-primary submit-btn disabled"} onClick={props.handleCaseSummarySubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="pdf-preview" style={{visibility: isCSPreviewOpen? "visible":"hidden"}}>
                        <span className="close-btn" onClick={()=> setIsCSPreviewOpen(false)}>X</span>
                        <span className="container-heading">Case Summary</span>
                        <div className="ref-popup-container">
                                <ReactMarkdown remarkPlugins={remarkGfm}>
                                    {props.caseSummary}
                                </ReactMarkdown>
                        </div>
                    </div>
                </div>
                <div className="reference-container">
                    <div className="reference-heading">
                        Reference Information
                        {props.isRefDataReady && <img className="view-ref-btn"src={view} alt="view" onClick={()=>setIsRefPreviewOpen(true)}/>}
                    </div>
                    <div className="reference-body">
                        {props.isRefLoading && 
                                <div className="loading-ref">
                                    <img className="loading-img" src={loading} alt="loading..."/>
                                </div>}
                        {props.isRefDataReady && 
                            <>
                                <ReactMarkdown remarkPlugins={remarkGfm}>
                                    {props.additionalRefInfo}
                                </ReactMarkdown>
                                <hr/>
                            </>}
                        {props.isRefDataReady && <div> 
                            <p><b>Provider Information :</b></p>
                            {props.benefitInformation.participation_information}
                            <hr/>
                        </div> }
                        {props.referenceData.map((refs,index)=>{
                            return(
                                <>
                                <a id={index} href={refs.filepath} className="ref-links" target="_blank" rel="noopener noreferrer">{index+1} .{refs.filename}</a>
                                <p className="ref-details"><b>Page Number :</b> {refs.page}</p>
                                <p className="ref-details"><b>Details :</b></p>
                                <p className="ref-details">{refs.text}</p>
                                <hr/>
                                </>
                            )
                        })}
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
                    </div>
                    <div className="pdf-preview" style={{visibility: isRefPreviewOpen? "visible":"hidden"}}>
                        <span className="close-btn" onClick={()=> setIsRefPreviewOpen(false)}>X</span>
                        <span className="container-heading">Reference</span>
                        <div className="ref-popup-container">
                            <>
                                <ReactMarkdown remarkPlugins={remarkGfm}>
                                    {props.additionalRefInfo}
                                </ReactMarkdown>
                                <hr/>
                            </>
                            <div> 
                                <p><b>Provider Information :</b></p>
                                {props.benefitInformation.participation_information}
                                <hr/>
                            </div>
                            {props.referenceData.map((refs,index)=>{
                                return(
                                    <>
                                        <a id={index} href={refs.filepath} className="ref-links" target="_blank" rel="noopener noreferrer">{index+1} .{refs.filename}</a>
                                        <p className="ref-details"><b>Page Number :</b> {refs.page}</p>
                                        <p className="ref-details"><b>Details :</b></p>
                                        <p className="ref-details">{refs.text}</p>
                                        <hr/>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className="chatbot-body">
                        {props.isQnALoading && 
                            <div className="loading-qna">
                                <img className="loading-img" src={loading} alt="loading..."/>
                            </div>}
                        {props.isQnAReady && <ChatBot 
                                                    caseId={props.caseId}
                                                    chatHistory={props.chatHistory}
                                                    setChatHistory={props.setChatHistory}
                                                    messages={props.messages}
                                                    setMessages={props.setMessages}
                                                    benefitInformation={props.benefitInformation}
                        />}
                    </div> */}


                </div>
                <div className="recommendation-container">
                    <div className="recommendation-heading">
                        Recommendation
                        {props.isRefDataReady && <img className="rec-info-btn" src={info} alt="info"/>}
                        <div className="info-details">Until the recommendation has been chosen from the recommendation dropdown choice, letter generation button won't get activated</div>
                    </div>
                    

                    <div className="btn-group decision-dropdown">
                        <button className={props.isRefDataReady?"btn btn-outline-primary dropdown-toggle decision-btn":"btn btn-outline-primary dropdown-toggle decision-btn disabled"} type="button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenu">
                            {props.recommendationChoice}
                        </button>
                        <ul className="dropdown-menu decision-menu" aria-labelledby="dropdownMenu">
                            <li><button className="dropdown-item decision-item" type="button" onClick={()=>switchDecision("Uphold")}>Uphold</button></li>
                            <li><button className="dropdown-item decision-item" type="button" onClick={()=>switchDecision("Overturn")}>Overturn</button></li>
                            <li><button className="dropdown-item decision-item" type="button" onClick={()=>switchDecision("Need More Information")}>Need More Information</button></li>
                        </ul>
                    </div>
                    <div className="justification-heading">
                        Justification/Rationale
                        {props.isRefDataReady && <img className="view-ref-btn"src={view} alt="view" onClick={()=>setIsJusMKPreviewOpen(true)}/>}
                        {props.isRefDataReady && <img className="edit-justification-btn"src={edit} alt="edit" onClick={()=>setIsJusPreviewOpen(true)}/>}
                    </div>
                    {/* <textarea className="justification-text"/> */}
                    {/* <textarea id="justification-text" className="justification-text" defaultValue={props.justificationData.replaceAll("*","")}/> */}
                    <div id="justification-text" className="justification-text">
                            {props.isRefLoading && 
                                <div className="loading-jus">
                                    <img className="loading-img" src={loading} alt="loading..."/>
                                </div>}
                            <ReactMarkdown remarkPlugins={remarkGfm}>
                                {props.justificationData}
                            </ReactMarkdown>
                    </div>
                    <div className="pdf-preview" style={{visibility: isJusPreviewOpen? "visible":"hidden"}}>
                        {!isTextChanged  && <span className="close-btn" onClick={()=> setIsJusPreviewOpen(false)}>X</span>}
                        <span className="container-heading">Justification</span>
                        <textarea key={props.jusKey} id="jus-popup-container" className="jus-popup-container" defaultValue={props.justificationData} onChange={handleKeyPressInText}/>
                        <button className={isTextChanged?"btn btn-primary submit-btn save-jus-btn":"btn btn-primary submit-btn save-jus-btn disabled"} onClick={handleJusSave}>Save</button>
                        <button className={isTextChanged?"btn btn-primary submit-btn":"btn btn-primary submit-btn disabled"} onClick={handleJusCancel}>Cancel</button>
                    </div>
                    <div className="pdf-preview" style={{visibility: isJusMKPreviewOpen? "visible":"hidden"}}>
                        <span className="close-btn" onClick={()=> setIsJusMKPreviewOpen(false)}>X</span>
                        <span className="container-heading">Justification</span>
                        <div className="ref-popup-container">
                                <ReactMarkdown remarkPlugins={remarkGfm}>
                                    {props.justificationData}
                                </ReactMarkdown>
                        </div>
                    </div>
                    <div className="letter-btns">
                        {/* <button className={!isTextChanged && props.recommendationChoice !== "" && props.recommendationChoice !== "Possible Uphold" && props.recommendationChoice !== "Possible Overturn"?"btn btn-primary submit-btn generate-btn":"btn btn-primary submit-btn generate-btn disabled"} onClick={handleLocalGenerateLetter}> */}
                        <button className="btn btn-primary submit-btn generate-btn disabled" onClick={()=> props.setIsLetterGenerationActive(true)}>
                            Generate Letter
                        </button>
                        {/* <button className={!isTextChanged && props.isRefDataReady?"btn btn-primary submit-btn":"btn btn-primary submit-btn disabled"} onClick={handleSaveButtonClick}> */}
                        <button className="btn btn-primary submit-btn disabled" onClick={handleSaveButtonClick}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResolutionAndDetermination;

// "**Justification:**

// The claim submitted by NYC HHC for the second admission of Ms. Jane Doe is being evaluated based on the information provided in the service plan documents, specifically the Hospital Admission Records and the Reimbursement Policy: Hospital Readmission Policy.

// **Key Points for Justification:**

// 1. **Medical Necessity:** The key issue in this case is whether the second admission of Ms. Doe was medically necessary and not a potentially preventable readmission within 30 days of her first discharge.

// 2. **First Admission:** During her first admission from 10/24/2023 to 10/27/2023, Ms. Doe was treated for acute bronchiolitis due to respiratory syncytial virus, hypoxia, and COPD exacerbation. She was discharged in stable condition, with normal vital signs, a negative physical exam, and no signs of acute distress.

// 3. **Discharge Planning:** The hospital's responsibility includes proper discharge planning to ensure the patient's safety and appropriate follow-up care. In this case, it appears that Ms. Doe's discharge planning was adequate, as evidenced by the lack of documentation indicating any issues or concerns at the time of discharge.

// 4. **Second Admission:** Ms. Doe's second admission occurred on 11/02/2023, within 30 days of her first discharge. The reason for readmission was chronic obstructive pulmonary disease exacerbation.

// 5. **Unavoidable Complication:** The hospital argues that the second admission was due to an unavoidable complication, specifically the patient's non-receipt of her inhaler since discharge. However, the policy states that patient non-compliance is not considered avoidable if certain conditions are met, including adequate communication of physician orders, mental competence of the patient, and absence of financial or other barriers to following instructions.

// 6. **Medical Necessity Review:** According to the hospital's policy, all admissions within 30 days of a previous discharge are subject to a medical necessity review. This review considers factors such as premature discharge, inadequate medication management, inadequate discharge planning, and patient non-compliance.

// **Final Conclusion:**

// Based on the available information and the hospital's readmission policy, it appears that the second admission of Ms. Doe may be considered a potentially preventable readmission. The hospital's argument regarding unavoidable complications due to patient non-compliance requires further scrutiny to determine if the conditions outlined in the policy were met.

// **Recommendation:**

// Additional information is needed to make a definitive determination on the medical necessity of the second admission. Specifically, documentation related to discharge planning, communication of discharge instructions, and any potential barriers to medication adherence should be reviewed. If this information supports the hospital's position, the claim may be recommended for payment. However, if the review indicates inadequate discharge planning or non-compliance due to factors within the hospital's control, the claim may be denied."