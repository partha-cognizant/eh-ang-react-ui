import React from "react";

const RadioButtons = () => {
    return(
        <>
            <div className="radio-buttons">
		        <div className="form-check form-check-inline">
			        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" defaultChecked/>
			        <label className="form-check-label" htmlFor="inlineRadio1">
				        Appeals
		        	</label>
		
		        </div>
		        <div className="form-check form-check-inline">
			        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" disabled/>
			        <label className="form-check-label" htmlFor="inlineRadio2">
				        Grievances
			        </label>
		
		        </div>
	        </div>
        </>
    )
}

export default RadioButtons;