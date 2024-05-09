import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import loading from "../assets/loading.png";
import download from "../assets/download.png";
import save from "../assets/Save.png";
import edit from "../assets/edit.png";
import jsPDF from "jspdf";

const LetterGeneration = (props) =>{

    const htmlLetter =  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {props.letterContent}
                        </ReactMarkdown>
    
    console.log({htmlLetter});

    const handleLetterSave = () => {
        const letterHTMLContent = document.getElementById("letter-container").innerHTML;
        const modifiedContent = `<div style="width:550px; text-align:justify; text-justify:inter-word">
        ${letterHTMLContent}
        </div>`.replaceAll("&&","\t");
        const doc = new jsPDF('p','pt','letter');
        doc.setFontSize(10);
        const data = {
            callback:function(doc){
                doc.save("letter.pdf")
            },
            margin:[20,20,20,20],
            autoPaging:"text",
            width: 120
        }
        doc.html(modifiedContent,data)

    }

    const handleBackButton = () =>{
        props.setLetterContent("");
        props.setIsLetterPrefillReady(false);
        props.setLetterPrefill({});
        props.setIsLetterGenerationActive(false);
    }

    return(
        <>
            <div className="letter-generation-container">
                <div className="letter-generation-heading">
                    Appeal Determination Letter Generator
                </div>
                <div className="letter-subcontainer">
                    <div className="letter-generation-details">
                    {!props.isLetterPrefillReady && 
                                <div className="loading-letter">
                                    <img className="loading-img" src={loading} alt="loading..."/>
                                </div>}
                    {props.isLetterPrefillReady && <>
                        <div className="letter-row">
                            <label htmlFor="member-id-input" className="letter-page-labels">Member ID</label>
                            <label htmlFor="member-name-input" className="letter-page-labels">Member Name</label>
                        </div>
                        <div className="letter-row">
                            <input id="member-id-input" className="letter-page-input" type="text" defaultValue={props.letterPrefill.memberid}></input>
                            <input id="member-name-input" className="letter-page-input" type="text" defaultValue={props.letterPrefill.membername}></input>
                        </div>
                        <div className="letter-row">
                            <label htmlFor="case-id-input" className="letter-page-labels">Case ID</label>
                            <label htmlFor="requestor-name-input" className="letter-page-labels">Requestor Name</label>
                        </div>
                        <div className="letter-row">
                            <input id="case-id-input" className="letter-page-input" type="text" defaultValue={props.letterPrefill.caseid}></input>
                            <input id="requestor-name-input" className="letter-page-input" type="text" defaultValue={props.letterPrefill.requestorname}></input>
                        </div>
                        <div className="letter-single-row">
                            <label htmlFor="requestor-id" className="letter-page-labels">Requester Address</label>
                            <textarea id="requestor-id" className="letter-large-input" type="text" defaultValue={props.letterPrefill.requestoraddress}></textarea>
                        </div>
                        <div className="letter-single-row">
                            <label htmlFor="justification-id" className="letter-page-labels">Justification/Rationale</label>
                            <textarea id="justification-id" className="letter-large-input" type="text" defaultValue={props.justificationData.replaceAll("*","")}></textarea>
                        </div>
                        <div className="btn-container">
                            <button className="btn btn-primary submit-btn generate-btn" onClick={props.handleLetterGeneration}>Generate Letter</button>
                            <button className="btn btn-primary submit-btn" onClick={handleBackButton}>Back</button>
                        </div>
                        </>}
                    </div>
                    <div className="letter-placeholder">
                        <div className="letter-functions">
                            <div className="letter-heading">Generated Letter</div>
                            <div className="letter-icons">
                                <img className="letter-imgs" src={save} alt="save"/>
                                <img className="letter-imgs" src={download} alt="download" onClick={handleLetterSave}/>
                                <img className="letter-imgs" src={edit} alt="edit"/>
                            </div>
                        </div>
                        <div id="letter-container" className="letter-container">
                            {!props.isLetterReady && 
                                <div className="loading-letter">
                                    <img className="loading-img" src={loading} alt="loading..."/>
                                </div>}
                            {props.isLetterReady && <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {props.letterContent}
                            </ReactMarkdown>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LetterGeneration;