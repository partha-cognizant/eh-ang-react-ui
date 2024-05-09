import React,{useState} from "react";
import preview from "../../assets/pre.png";

const ClinicalPolicyDocument = (props) =>{
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [pdfSrcUrl, setPdfSrcUrl] = useState("");

    // To handle the pdf viewer of different documents
    const handleDocumentView = (url) => {
        setPdfSrcUrl(url);
        setIsPreviewOpen(true);
    }

    return(
        <>
            <div className="document-container">
                <div className="document-heading">
                    Clinical Policy
                </div>
                {props.isPolicyDocumentAvailable &&  <div className="document-list">
                    {props.policyDocumentLink.map((policyItem,index)=>{
                        return(
                            <>
                                <div id={index} key={index} className="document-item">
                                    <div className="document-title">
                                        {policyItem.filename}
                                    </div>
                                    <div className="document-preview">
                                        <img className="document-preview-img" src={preview} alt="previewDoc" onClick={()=> handleDocumentView(policyItem.url)}/>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>}
                <div className="pdf-preview" style={{visibility: isPreviewOpen? "visible":"hidden"}}>
                    <span className="close-btn" onClick={()=> setIsPreviewOpen(false)}>X</span>
                    <span className="container-heading">Document Preview</span>
                    <div className="pdf-container">
                        <embed src={pdfSrcUrl} frameBorder="0" width="100%" height="100%"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClinicalPolicyDocument;