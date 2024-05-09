import React from "react";

const MemberInfo = (props) => {
    return(
        <>
            <div className="btn-group memberinfo">
			    <button className={props.isMemberValid?"btn btn-outline-secondary dropdown-toggle memberinfobtn":"btn btn-outline-secondary dropdown-toggle memberinfobtn disabled"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
				    Member & Plan Details 			
			    </button>
			    <div className="dropdown-menu p-1 text-body-secondary membertext">
  				    Member ID: {props.memberInfo.member_id}
					<br/>
					Member Name: {props.memberInfo.member_name}
					<br/>
					{/* Policy Number: {props.memberInfo.policy_number}
					<br/> */}
					Plan Name: {props.memberInfo.plan_name}
					<br/>
					Coverage Start Date: {props.memberInfo.cov_start_date}
					<br/>
					Coverage End Date: {props.memberInfo.cov_end_date}
			    </div>
		    </div>
        </>
    )
}

export default MemberInfo;