import React, {useRef, useState} from "react";


const Claims = (props) =>{
    const claimdetails = props.claimDetails;
    const activeClaim = useRef(0);
    const claimIDs = props.claimIDs;
    const[activeKeyList, setActiveKeyList] = useState([]);
    const[activeValueList, setActiveValueList] = useState([]);
    let convertedClaimList = [];
    let keyList = [];
    // console.log(claimdetails,typeof(claimdetails))
    if(claimdetails !== undefined && claimdetails.length > 0){
        convertedClaimList = eval(claimdetails);
        console.log(convertedClaimList,typeof(convertedClaimList))
        keyList = Object.keys(convertedClaimList[0]);
    }
    let claimData = [];
    const [activeClaimData, setActiveClaimData] = useState([]);
    
    // To get the data of selected claim in the table
    const handleClaimSelect = (e) => {
        activeClaim.current = e.target.id;
        console.log("Active claim is ", activeClaim.current);
        const activeClaimId = claimIDs[activeClaim.current];
        claimData = [];

        // console.log(activeClaimId)
        // setActiveKeyList(Object.keys(claimdetails[activeClaim.current]))
        // setActiveValueList(Object.values(claimdetails[activeClaim.current]))
        for(let i=0; i<convertedClaimList.length; i++){
            if(convertedClaimList[i]["Claim ID"] === activeClaimId){
                // console.log(convertedClaimList[i])
                claimData.push(convertedClaimList[i]);
                // {activeClaim.current === this.id ?
            }
        }
        // console.log(claimData);
        setActiveClaimData(claimData);
    }


    return(
        <>
            <div className="document-container">
                <div className="claims-heading">
                    Claim Details
                </div>
                {typeof(claimdetails)!== "undefined" && <div className="claims-details">
                    <div className="claim-list">
                        <table className="table claim-list-table">
                            <thead>
                                <tr>
                                    <th className="claim-list-heading">
                                        Claim ID
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeof(claimdetails)!== "undefined" && claimIDs.map((claimID, index) => {
                                    return(
                                        <>
                                            <tr key={index}>
                                                <td id={index} className="claim-list-item"  onClick={handleClaimSelect}>
                                                    {claimID}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="claim-info">
                        <table className="table claim-info-table">
                            <thead>
                                <tr>
                                    {keyList.map((keyItem, index) => {
                                        if(index !== 0){
                                        return(
                                            <>
                                                <th key={index} className="claim-info-item claim-back" id={index} scope="col">{keyItem}</th>
                                            </>
                                    )}})}
                                </tr>
                            </thead>
                            <tbody>
                                
                                {activeClaimData.map((claimDataItem, index) => {
                                    return(
                                        <>
                                            <tr>
                                               {Object.values(claimDataItem).map((dataValue,index) => {
                                                    if(index !== 0){
                                                        return(
                                                            <>
                                                                <th key={index} className="claim-info-item" id={index}>{dataValue}</th>
                                                            </>
                                                        )}})}
                                            </tr>
                                        </>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Claims;