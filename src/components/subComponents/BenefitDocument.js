import React, {useState} from "react";
import preview from "../../assets/pre.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import view from "../../assets/View.png";

const BenefitDocument = (props) =>{

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [pdfSrcUrl, setPdfSrcUrl] = useState("");
    const [isBenInfoPreviewOpen, setIsBenInfoPreviewOpen] = useState(false);

    // To handle the pdf viewer of different documents
    const handleDocumentView = (url) => {
        setPdfSrcUrl(url);
        setIsPreviewOpen(true);
    }

    return(
        <>
            <div className="document-container">
                <div className="document-heading">
                    Plan Benefit Documents
                </div>
                {props.isBenefitDocumentAvailable && !props.isCaseIDWrong && <div className="benefit-info-container">
                    <div className="benefit-info-heading">Plan Name: {props.benefitInformation.plan_name}</div>
                    <div className="benefit-info-title">
                        Benefit Details:
                        <img className="view-ref-btn"src={view} alt="view" onClick={()=>setIsBenInfoPreviewOpen(true)}/>
                    </div>
                    <div className="benefit-info">
                        {props.isBenefitDocumentAvailable && !props.isCaseIDWrong && props.benefitInformation.benefit_details.map((info,index)=>{
                            return(
                                <>
                                    {index+1}. <ReactMarkdown remarkPlugins={remarkGfm}>
                                        {info}
                                    </ReactMarkdown>
                                    <hr/>
                                </>
                            )
                        })}
                    </div>
                    <div className="pdf-preview" style={{visibility: isBenInfoPreviewOpen? "visible":"hidden"}}>
                        <span className="close-btn" onClick={()=> setIsBenInfoPreviewOpen(false)}>X</span>
                        <span className="container-heading">Benefit Details</span>
                        <div className="ref-popup-container">
                            {props.benefitInformation.benefit_details.map((info,index)=>{
                                return(
                                    <>
                                        {index+1}. <ReactMarkdown remarkPlugins={remarkGfm}>
                                            {info}
                                        </ReactMarkdown>
                                        <hr/>
                                    </>
                                    )
                                })}
                        </div>
                    </div>
                </div>}
                {props.isBenefitDocumentAvailable && 
                <div className="document-list">
                    {props.benefitDocumentLink.map((benefitItem, index) => {
                        return(
                            <>
                                <div id={index} key={index} className="document-item">
                                    <div className="document-title">
                                        {benefitItem.filename}
                                    </div>
                                    <div className="document-preview">
                                        <img className="document-preview-img" src={preview} alt="previewDoc" onClick={()=> handleDocumentView(benefitItem.url)}/>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                    <div className="pdf-preview" style={{visibility: isPreviewOpen? "visible":"hidden"}}>
                        <span className="close-btn" onClick={()=> setIsPreviewOpen(false)}>X</span>
                        <span className="container-heading">Document Preview</span>
                        <div className="pdf-container">
                            <embed src={pdfSrcUrl} frameBorder="0" width="100%" height="100%"/>
                        </div>
                    </div>
                </div>}
                
            </div>
        </>
    )
}

export default BenefitDocument;