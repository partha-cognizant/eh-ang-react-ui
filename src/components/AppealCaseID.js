import React from "react";
import rightcircle from "../assets/rightcircle.png";
import preview from "../assets/preview.png";
import loading from "../assets/loading.png";
import { useState } from "react";

const AppealCaseID = (props) => {

    // flag to set whether preview should be opened or not.
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // To handle the flow after case id is submitted.
    const handleInternalCaseIDSubmit = () => {
        // Case id value is fetched from document
        const caseIDValue = document.getElementById("caseID").value;
        props.setIsLoading(true);
        props.setIsCaseIDValid(false);
        props.setIsCaseIDWrong(false);
        // Fetched case id is passed to the function which handles the API call
        props.handleCaseIDSubmit(caseIDValue);
        
    }

    const handleEnterPress = (e) => {
        if(e.key==="Enter"){
            // Case id value is fetched from document
            const caseIDValue = document.getElementById("caseID").value;
            props.setIsLoading(true);
            props.setIsCaseIDValid(false);
            props.setIsCaseIDWrong(false);
            // Fetched case id is passed to the function which handles the API call
            props.handleCaseIDSubmit(caseIDValue);
        }
    }

    const handleCasePreview = () =>{
        setIsPreviewOpen(true)
    }


    return(
        <>
            <div className="case-heading">Case ID</div>
            <div className="input-box">
                <div className="input-group mb-3">
                    <input type="text" id="caseID" className="form-control" placeholder="Case ID" aria-label="codenumber" aria-describedby="submitbtn" onKeyDown={handleEnterPress}/>
                    <button className="btn btn-outline-secondary idsubmitbtn" type="button" id="submitbtn" onClick={handleInternalCaseIDSubmit}>
                        <img className="submit-image" src={rightcircle} alt="submit" />
                    </button>
                    <div className="submit-tooltip">Go</div>
                </div>
                
                <div>
                    {props.isLoading && <img className="loading-img" src={loading} alt="loading..." />}
                    {props.isCaseIDValid && <img className="preview-img" src={preview} alt="preview" onClick={handleCasePreview}/>}
                    {props.isCaseIDWrong &&
                        <div className="alert alert-danger not-valid-alert" role="alert">
                            No Case found with this case ID !
                        </div>}
                </div>
            </div>
            <div className="pdf-preview" style={{visibility: isPreviewOpen? "visible":"hidden"}}>
                <span className="close-btn" onClick={()=> setIsPreviewOpen(false)}>X</span>
                <span className="container-heading">Document Preview</span>
                <div className="pdf-container">
                    <embed src={props.caseDocumentLink} frameBorder="0" width="100%" height="100%"/>
                </div>
            </div>
        </>
    )
}

export default AppealCaseID;