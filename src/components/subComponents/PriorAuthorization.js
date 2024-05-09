import React, {useState, useRef} from "react";


const PriorAuthorization = (props) =>{
    const authdetails = props.authDetails;
    // console.log(authdetails, typeof(authdetails));
    const activeAuth = useRef(0);
    const authIDs = props.authIDs;
    const[activeKeyList, setActiveKeyList] = useState([]);
    const[activeValueList, setActiveValueList] = useState([]);
    let uminKeyList = [];
    let umlsKeyList = [];
    let umsvKeyList = [];
    let uminData = [];
    let umlsData = [];
    let umsvData = [];
    const [activeUminData, setActiveUminData] = useState([]);
    const [activeUmlsData, setActiveUmlsData] = useState([]);
    const [activeUmsvData, setActiveUmsvData] = useState([]);
    let convertedAuthList = [];
    if(authdetails !== undefined && authdetails.length > 0){
        convertedAuthList = eval('['+authdetails+']');
        // console.log(convertedAuthList)
        if(convertedAuthList[0]["auth_umin_data"].length > 0) {uminKeyList = Object.keys(convertedAuthList[0]["auth_umin_data"][0]);}
        if(convertedAuthList[0]["auth_umls_data"].length > 0) {umlsKeyList = Object.keys(convertedAuthList[0]["auth_umls_data"][0]);}
        if(convertedAuthList[0]["auth_umsv_data"].length > 0) {umsvKeyList = Object.keys(convertedAuthList[0]["auth_umsv_data"][0]);}
        // console.log(uminKeyList)
    }


    // To get the data of selected auth id in the table
    const handleAuthSelect = (e) => {
        activeAuth.current = e.target.id;
        const activeAuthID = authIDs[activeAuth.current];
        uminData = [];
        umlsData = [];
        umsvData = [];
        
        for(let i=0; i<convertedAuthList[0]["auth_umin_data"].length;i++){
            if(convertedAuthList[0]["auth_umin_data"][i]["Auth ID"] === activeAuthID){
                uminData.push(convertedAuthList[0]["auth_umin_data"][i]);
            }
        }
        // console.log(uminData[0], typeof(uminData[0]));
        setActiveUminData(uminData[0]);
        // console.log(activeUminData);

        for(let i=0; i<convertedAuthList[0]["auth_umls_data"].length;i++){
            if(convertedAuthList[0]["auth_umls_data"][i]["Auth ID "] === activeAuthID){
                umlsData.push(convertedAuthList[0]["auth_umls_data"][i]);
            }
        }
        console.log(umlsData, typeof(umlsData));
        setActiveUmlsData(umlsData[0]);

        for(let i=0; i<convertedAuthList[0]["auth_umsv_data"].length;i++){
            if(convertedAuthList[0]["auth_umsv_data"][i]["Auth ID"] === activeAuthID){
                umsvData.push(convertedAuthList[0]["auth_umsv_data"][i]);
            }
        }
        setActiveUmsvData(uminData[0]);

        setActiveKeyList(Object.keys(authdetails[activeAuth.current]))
        setActiveValueList(Object.values(authdetails[activeAuth.current]))
    }
    return(
        <>
            <div className="document-container">
                <div className="claims-heading">
                    Prior Authorization Details
                </div>
                {props.isAuthAvailable && !props.isCaseIDWrong && <div className="auth-container">
                    <div className="auth-table-list">
                        <table className="table claim-list-table">
                            <thead>
                                <tr>
                                    <th className="claim-list-heading">
                                        Authorization ID
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {authIDs.map((authID, index) => {
                                    return(
                                        <>
                                            <tr key={index}>
                                                <td key={index} className="claim-list-item" id={index} onClick={handleAuthSelect}>
                                                    {authID}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="auth-table-info">
                        <div className="table-heading">Prior Authorization For Inpatient Record</div>
                        <table className="table claim-info-table">
                            <thead>
                                <tr>
                                    {uminKeyList.map((uminKey, index) => {
                                        if(index !== 0){
                                        return(
                                            <>
                                                <th key={index} className="claim-info-item claim-back" id={index} scope="col">{uminKey}</th>
                                            </>
                                    )}})}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Object.values(activeUminData).map((authInfo, index) => {
                                        if(index !== 0){
                                        return(
                                            <>
                                                <th key={index} className="claim-info-item" id={index}>{authInfo}</th>
                                            </>
                                        )}
                                    })}
                                </tr>
                            </tbody>
                        </table>

                        <div className="table-heading">Prior Authorization For Length Of Stay</div>
                        <table className="table claim-info-table">
                            <thead>
                                <tr>
                                    {umlsKeyList.map((umlsKey, index) => {
                                        if(index !== 0){
                                        return(
                                            <>
                                                <th key={index} className="claim-info-item claim-back" id={index} scope="col">{umlsKey}</th>
                                            </>
                                    )}})}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Object.values(activeUmlsData).map((authInfo, index) => {
                                        if(index !== 0){
                                        return(
                                            <>
                                                <th key={index} className="claim-info-item" id={index}>{authInfo}</th>
                                            </>
                                        )}
                                    })}
                                </tr>
                            </tbody>
                        </table>

                        {umsvKeyList.length > 0 && <><div className="table-heading">Prior Authorization Details</div>
                        <table className="table claim-info-table">
                            <thead>
                                <tr>
                                    {umsvKeyList.map((umsvKey, index) => {
                                        if(index !== 0){
                                        return(
                                            <>
                                                <th key={index} className="claim-info-item claim-back" id={index} scope="col">{umsvKey}</th>
                                            </>
                                    )}})}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {Object.values(activeUmsvData).map((authInfo, index) => {
                                        if(index !== 0){
                                        return(
                                            <>
                                                <th key={index} className="claim-info-item" id={index}>{authInfo}</th>
                                            </>
                                        )}
                                    })}
                                </tr>
                            </tbody>
                        </table></>}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default PriorAuthorization;

// {
//     "authdetails": {
//         "auth_data": {
//             "auth_umin_data": [
//                 {
//                     "Actual Admission Date": "24-OCT-23 12.00.00.000000000 AM",
//                     "Actual Length of Stay": "3",
//                     "Admitting Diagnosis' Major Diagnositic Category": " ",
//                     "Admitting Diagnosis-submitted/input": " ",
//                     "Admitting Dx's Related Diagnosis ID": " ",
//                     "Admitting Primary Diagnosis": " ",
//                     "Admitting Provider ID": "100000155082",
//                     "Admitting Surgical Procedure": " ",
//                     "Admitting Treatment Type": " ",
//                     "Agreement ID": " ",
//                     "Attachment Source ID": "01-JAN-53 12.00.00.000000000 AM",
//                     "Attending Provider": " ",
//                     "Auth Approval Date": "26-OCT-23 08.49.27.000000000 AM",
//                     "Auth ID": "V00072193",
//                     "Authorized Admission Date": "24-OCT-23 12.00.00.000000000 AM",
//                     "Authorized Admit Date Reason": " ",
//                     "Authorized Date of Surgery": "01-JAN-53 12.00.00.000000000 AM",
//                     "Authorized Place of Service": "21",
//                     "Authorized Place of Service Indicator": "I",
//                     "Authorized Pre-op Days": "0",
//                     "Caller Type or Classification": "PORT",
//                     "Case Mgmt Requirement at Diagnosis Indicator": " ",
//                     "Case Mgmt Requirement at Procedure Indicator": " ",
//                     "Claim Delegated Entity ID": " ",
//                     "Claim Delegated Entity Indicator": " ",
//                     "Co-Management Obtained Indicator": " ",
//                     "Code 1": " ",
//                     "Code 2": " ",
//                     "Code 3": " ",
//                     "Confinement Status Date": "17-JAN-24 03.46.10.179000000 PM",
//                     "DRG": " ",
//                     "Denial Date": "01-JAN-53 12.00.00.000000000 AM",
//                     "Denial Reason": " ",
//                     "Denial User ID": " ",
//                     "Diagnosis Set ID": "01-JAN-53 12.00.00.000000000 AM",
//                     "Disallow Explanation ID": " ",
//                     "Discharge Date": "27-OCT-23 12.00.00.000000000 AM",
//                     "Discharge Diagnosis": " ",
//                     "Discharge Diagnosis Manual Translation Indicator": " ",
//                     "Discharge Status": "70",
//                     "Expected Discharge Date": "13-NOV-23 12.00.00.000000000 AM",
//                     "Facility Address Location using PRAD TYPE": "PRI",
//                     "Facility Provider ID": "100000155082",
//                     "Facility's Network Status": " ",
//                     "Global Case Rate Indicator": " ",
//                     "Home Health Care Indicator": " ",
//                     "Initial and Concurrent Review Sequence Number": "0",
//                     "Input Date": "25-OCT-23 09.00.46.000000000 AM",
//                     "Input User ID": "embprbatch",
//                     "Last Update DBMS User ID": "nan",
//                     "Last Update Datetime": "nan",
//                     "Last Update User ID": "nan",
//                     "Limit Prefix": " ",
//                     "Lock Token": "1",
//                     "M&R's Admitting LOS Goal From": "0",
//                     "M&R's Admitting LOS Goal To": "0",
//                     "M&R's Primary LOS Goal (To)": "0",
//                     "M&R's Primary LOS Goal From": "0",
//                     "Major Diagnostic Category": " ",
//                     "Medical Release Indicator": " ",
//                     "Medicare Health Insurance Claim Number": " ",
//                     "Member Contrived Key": "5855350",
//                     "Member ID": "A0000000101",
//                     "Member Record Number": " ",
//                     "Member's Age": "0",
//                     "Microfilm ID": " ",
//                     "Network ID": " ",
//                     "Newborn Birth Weight": "0",
//                     "Next Review Date": "01-JAN-53 12.00.00.000000000 AM",
//                     "Normative Pre op Days": "0",
//                     "Notification Date for Discharge": "01-JAN-53 12.00.00.000000000 AM",
//                     "Notification Violation Reason": " ",
//                     "Notification for the Date of Admission": "01-JAN-53 12.00.00.000000000 AM",
//                     "Notification or Emergency Notification Violation Indicator": " ",
//                     "Out of Area Indicator": " ",
//                     "Out of Area Variable Component Indicator": " ",
//                     "PCP's Provider ID": " ",
//                     "Patient Number": " ",
//                     "Place of Service Authorization Reason": " ",
//                     "Place of Service Norm Indicator": " ",
//                     "Pre-auth Requirement at Diagnosis Indicator": " ",
//                     "Pre-auth Requirement at Facility Indicator": " ",
//                     "Pre-auth Requirement at Procedure Indicator": " ",
//                     "Pre-authorization Indicator\t": "Y",
//                     "Pre-op Reason": " ",
//                     "Primary Diagnosis": "J210",
//                     "Primary Diagnosis Code-submitted/input": "J210",
//                     "Primary Diagnosis Manual Translation Indicator": " ",
//                     "Primary Diagnosis' Major Diagnositic Category": " ",
//                     "Primary Dx's Related Diagnosis ID": " ",
//                     "Primary Surgical Procedure": " ",
//                     "Processing Control Agent Prefix": " ",
//                     "Provider Non-compliance Reason": " ",
//                     "Provider's Compliance Indicator": " ",
//                     "Received Date": "25-OCT-23 09.00.43.000000000 AM",
//                     "Referral Indicator": "N",
//                     "Related Submitted Diagnosis Code": " ",
//                     "Related Submitted Primary Diagnosis": " ",
//                     "Requested Admission Date": "24-OCT-23 12.00.00.000000000 AM",
//                     "Requested Date of Surgery": "01-JAN-53 12.00.00.000000000 AM",
//                     "Requested Place of Service (POS) Code": "21",
//                     "Requested Place of Service Classification": "I",
//                     "Requested Pre-op Days": "0",
//                     "Requesting Provider ID": "100000155082",
//                     "Requesting Provider's Address Location using PRAD Type": "PRI",
//                     "Requesting Provider's Network (ID)": " ",
//                     "Requesting Provider's Network Status Indicator": " ",
//                     "Requesting Provider's PCP Indicator": " ",
//                     "Risk Delegated Entity ID": " ",
//                     "Risk Indicator": " ",
//                     "Second Surgical Opinion Obtained Indicator": " ",
//                     "Second Surgical Opinion Requirement": " ",
//                     "Service Area Indicator": " ",
//                     "Service Category": " ",
//                     "Service Definition Prefix": " ",
//                     "Service Payment Prefix": " ",
//                     "Service Provider's Network Prefix": " ",
//                     "Service Provider's Non-Part Prefix": " ",
//                     "Status": "DC",
//                     "Status Sequence Number": "0",
//                     "Submitted Discharge Diagnosis": " ",
//                     "Surgeon's Practice location using Prad Type": " ",
//                     "Surgeon's Provider ID": " ",
//                     "Total Allowed Length of Stay": "20",
//                     "Total Authorized Length of Stay": "20",
//                     "Total Paid Length of Stay": "3",
//                     "Total Price Amount": "0",
//                     "Total Requested Charge Amount": "0",
//                     "Total Requested Length of Stay": "20",
//                     "Treatment Type": "M",
//                     "Type of Care Indicator": "E",
//                     "UM Delegated Entity ID": " ",
//                     "UM Delegated Entity Indicator": " ",
//                     "User Site": " ",
//                     "Weekend Admission Reason": " ",
//                     "Weekend Admit Authorized Indicator": " ",
//                     "Weekend Admit Requested Indicator": " "
//                 },
//                 {
//                     "Actual Admission Date": "02-NOV-23 12.00.00.000000000 AM",
//                     "Actual Length of Stay": "2",
//                     "Admitting Diagnosis' Major Diagnositic Category": " ",
//                     "Admitting Diagnosis-submitted/input": " ",
//                     "Admitting Dx's Related Diagnosis ID": " ",
//                     "Admitting Primary Diagnosis": " ",
//                     "Admitting Provider ID": "100001253255",
//                     "Admitting Surgical Procedure": " ",
//                     "Admitting Treatment Type": " ",
//                     "Agreement ID": " ",
//                     "Attachment Source ID": "01-JAN-53 12.00.00.000000000 AM",
//                     "Attending Provider": " ",
//                     "Auth Approval Date": "03-NOV-24 12.00.00.000000000 AM",
//                     "Auth ID": "V00076418",
//                     "Authorized Admission Date": "02-NOV-23 12.00.00.000000000 AM",
//                     "Authorized Admit Date Reason": " ",
//                     "Authorized Date of Surgery": "01-JAN-53 12.00.00.000000000 AM",
//                     "Authorized Place of Service": "21",
//                     "Authorized Place of Service Indicator": "I",
//                     "Authorized Pre-op Days": "0",
//                     "Caller Type or Classification": "PORT",
//                     "Case Mgmt Requirement at Diagnosis Indicator": " ",
//                     "Case Mgmt Requirement at Procedure Indicator": " ",
//                     "Claim Delegated Entity ID": " ",
//                     "Claim Delegated Entity Indicator": " ",
//                     "Co-Management Obtained Indicator": " ",
//                     "Code 1": " ",
//                     "Code 2": " ",
//                     "Code 3": " ",
//                     "Confinement Status Date": "05-FEB-24 11.35.34.566000000 AM",
//                     "DRG": " ",
//                     "Denial Date": "01-JAN-53 12.00.00.000000000 AM",
//                     "Denial Reason": " ",
//                     "Denial User ID": " ",
//                     "Diagnosis Set ID": "01-JAN-53 12.00.00.000000000 AM",
//                     "Disallow Explanation ID": " ",
//                     "Discharge Date": "04-NOV-23 12.00.00.000000000 AM",
//                     "Discharge Diagnosis": " ",
//                     "Discharge Diagnosis Manual Translation Indicator": " ",
//                     "Discharge Status": "70",
//                     "Expected Discharge Date": "06-NOV-23 12.00.00.000000000 AM",
//                     "Facility Address Location using PRAD TYPE": "PRI",
//                     "Facility Provider ID": "100000155082",
//                     "Facility's Network Status": " ",
//                     "Global Case Rate Indicator": " ",
//                     "Home Health Care Indicator": " ",
//                     "Initial and Concurrent Review Sequence Number": "0",
//                     "Input Date": "02-NOV-23 12.00.00.000000000 AM",
//                     "Input User ID": "embprbatch",
//                     "Last Update DBMS User ID": "nan",
//                     "Last Update Datetime": "nan",
//                     "Last Update User ID": "nan",
//                     "Limit Prefix": " ",
//                     "Lock Token": "513",
//                     "M&R's Admitting LOS Goal From": "0",
//                     "M&R's Admitting LOS Goal To": "0",
//                     "M&R's Primary LOS Goal (To)": "0",
//                     "M&R's Primary LOS Goal From": "0",
//                     "Major Diagnostic Category": " ",
//                     "Medical Release Indicator": " ",
//                     "Medicare Health Insurance Claim Number": " ",
//                     "Member Contrived Key": "5855350",
//                     "Member ID": "A0000000101",
//                     "Member Record Number": " ",
//                     "Member's Age": "0",
//                     "Microfilm ID": " ",
//                     "Network ID": " ",
//                     "Newborn Birth Weight": "0",
//                     "Next Review Date": "01-JAN-53 12.00.00.000000000 AM",
//                     "Normative Pre op Days": "0",
//                     "Notification Date for Discharge": "01-JAN-53 12.00.00.000000000 AM",
//                     "Notification Violation Reason": " ",
//                     "Notification for the Date of Admission": "01-JAN-53 12.00.00.000000000 AM",
//                     "Notification or Emergency Notification Violation Indicator": " ",
//                     "Out of Area Indicator": " ",
//                     "Out of Area Variable Component Indicator": " ",
//                     "PCP's Provider ID": " ",
//                     "Patient Number": " ",
//                     "Place of Service Authorization Reason": " ",
//                     "Place of Service Norm Indicator": " ",
//                     "Pre-auth Requirement at Diagnosis Indicator": " ",
//                     "Pre-auth Requirement at Facility Indicator": " ",
//                     "Pre-auth Requirement at Procedure Indicator": " ",
//                     "Pre-authorization Indicator\t": "Y",
//                     "Pre-op Reason": " ",
//                     "Primary Diagnosis": "J441",
//                     "Primary Diagnosis Code-submitted/input": "J441",
//                     "Primary Diagnosis Manual Translation Indicator": " ",
//                     "Primary Diagnosis' Major Diagnositic Category": " ",
//                     "Primary Dx's Related Diagnosis ID": " ",
//                     "Primary Surgical Procedure": " ",
//                     "Processing Control Agent Prefix": " ",
//                     "Provider Non-compliance Reason": " ",
//                     "Provider's Compliance Indicator": " ",
//                     "Received Date": "02-NOV-23 12.00.00.000000000 AM",
//                     "Referral Indicator": "N",
//                     "Related Submitted Diagnosis Code": " ",
//                     "Related Submitted Primary Diagnosis": " ",
//                     "Requested Admission Date": "02-NOV-23 12.00.00.000000000 AM",
//                     "Requested Date of Surgery": "01-JAN-53 12.00.00.000000000 AM",
//                     "Requested Place of Service (POS) Code": "21",
//                     "Requested Place of Service Classification": "I",
//                     "Requested Pre-op Days": "0",
//                     "Requesting Provider ID": "100000155082",
//                     "Requesting Provider's Address Location using PRAD Type": "PRI",
//                     "Requesting Provider's Network (ID)": " ",
//                     "Requesting Provider's Network Status Indicator": " ",
//                     "Requesting Provider's PCP Indicator": " ",
//                     "Risk Delegated Entity ID": " ",
//                     "Risk Indicator": " ",
//                     "Second Surgical Opinion Obtained Indicator": " ",
//                     "Second Surgical Opinion Requirement": " ",
//                     "Service Area Indicator": " ",
//                     "Service Category": " ",
//                     "Service Definition Prefix": " ",
//                     "Service Payment Prefix": " ",
//                     "Service Provider's Network Prefix": " ",
//                     "Service Provider's Non-Part Prefix": " ",
//                     "Status": "DC",
//                     "Status Sequence Number": "0",
//                     "Submitted Discharge Diagnosis": " ",
//                     "Surgeon's Practice location using Prad Type": " ",
//                     "Surgeon's Provider ID": " ",
//                     "Total Allowed Length of Stay": "1",
//                     "Total Authorized Length of Stay": "1",
//                     "Total Paid Length of Stay": "1",
//                     "Total Price Amount": "0",
//                     "Total Requested Charge Amount": "0",
//                     "Total Requested Length of Stay": "1",
//                     "Treatment Type": "M",
//                     "Type of Care Indicator": "E",
//                     "UM Delegated Entity ID": " ",
//                     "UM Delegated Entity Indicator": " ",
//                     "User Site": " ",
//                     "Weekend Admission Reason": " ",
//                     "Weekend Admit Authorized Indicator": " ",
//                     "Weekend Admit Requested Indicator": " "
//                 }
//             ],
//             "auth_umls_data": [
//                 {
//                     "Allowed Days": "20",
//                     "Attachment Source ID": "01-JAN-53 12.00.00.000000000 AM",
//                     "Auth ID ": "V00072193",
//                     "Authorized Length of Stay": "20",
//                     "Charge": "0",
//                     "Contract Amount": "0",
//                     "Disallow Explanation": " ",
//                     "Explanation ID": " ",
//                     "Initial or Concurrent Review Denial": " ",
//                     "Initial or Concurrent Review Sequence Number": "0",
//                     "Lock Token": "1",
//                     "Member ID": "A0000000101",
//                     "Price": "0",
//                     "Requested Length of Stay": "20",
//                     "Room Type": "ME",
//                     "Sequence Number": "0",
//                     "Service ID (Type of Service or TOS)": " ",
//                     "Service Pricing ID": " ",
//                     "Service Rule ID": " ",
//                     "Used/Paid Days": "3"
//                 },
//                 {
//                     "Allowed Days": "1",
//                     "Attachment Source ID": "01-JAN-53 12.00.00.000000000 AM",
//                     "Auth ID ": "V00076418",
//                     "Authorized Length of Stay": "1",
//                     "Charge": "0",
//                     "Contract Amount": "0",
//                     "Disallow Explanation": " ",
//                     "Explanation ID": " ",
//                     "Initial or Concurrent Review Denial": " ",
//                     "Initial or Concurrent Review Sequence Number": "0",
//                     "Lock Token": "513",
//                     "Member ID": "A0000000101",
//                     "Price": "0",
//                     "Requested Length of Stay": "1",
//                     "Room Type": "ME",
//                     "Sequence Number": "0",
//                     "Service ID (Type of Service or TOS)": " ",
//                     "Service Pricing ID": " ",
//                     "Service Rule ID": " ",
//                     "Used/Paid Days": "1"
//                 }
//             ],
//             "auth_umsv_data": []
//         },
//         "unique_auth_ids": [
//             "V00072193",
//             "V00076418"
//         ]
//     }
// }