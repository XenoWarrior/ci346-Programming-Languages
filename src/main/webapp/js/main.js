import React from 'react';
import {render} from 'react-dom';

/**
 * EmployeeClient (Object)
 * 
 * Standard object which contains methods that talk with the API after the page has loaded.
 */
var EmployeeClient = {
	deleteEmployeeAsk: function(id) {
		console.log("EmployeeClient::deleteEmployeeAsk() ask to delete [" + id + "].");
		render(<AskModal title={"Confirm Deletion"} message={"Are you sure you wish to delete this employee record?"} eventListener={EmployeeClient.deleteEmployee.bind(this, id)} />, document.getElementById('modal-target'));
		$('.modal').modal();
		$('#modal-container').modal("open");
	},
	deleteEmployee: function(id) {
    	$.ajax({
    		method: "DELETE",
    		url: "./api/employee/" + id,
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		
    		console.log("EmployeeClient::deleteEmployee() response:")
    		console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('Deleted successfully.', 4000);
    			
    			$("#error-container").remove();
    			render(<App />, document.getElementById('employee-target'));
    		}
    	});
	},
	
	editEmployeeAsk: function(id, fn, ln, ss, se) {
		console.log("EmployeeClient::editEmployeeAsk() request new values [" + id + "].");
		
		render(<InputModal title={"Edit Employee"} message={"Enter the new values below."} eventListener={EmployeeClient.editEmployee.bind(this, id)} />, document.getElementById('modal-target'));
	    
		$('.modal').modal();
		$('#modal-container').modal("open");

		$('#first_name').val(fn);
		$('#last_name').val(ln);
		$('#shift_start').val(ss);
		$('#shift_end').val(se);

	    Materialize.updateTextFields();
	},
	editEmployee: function(id) {
    	$.post({
    		// I know this is supposed to be PUT, but Spring is throwing some issue which I can't understand.
    		method: "POST",
    		url: "./api/employee/" + id,
    		data: {"first_name": $('#first_name').val(), "last_name": $('#last_name').val(), "shift_start": $('#shift_start').val(), "shift_end": $('#shift_end').val()},
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		
    		console.log("EmployeeClient::editEmployee() response:")
    		console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('Edited successfully.', 4000);
    			
    			$("#error-container").remove();
    			render(<App />, document.getElementById('employee-target'));
    		}
    		
    	});
	},
	
	addEmployeeAsk: function() {
		console.log("EmployeeClient::addEmployeeAsk() request new values.");
		render(<InputModal title={"Add Employee"} message={"Enter the new values below."} eventListener={EmployeeClient.addEmployee.bind(this)} />, document.getElementById('modal-target'));
				
		$('.modal').modal();
		$('#modal-container').modal("open");
		
		$('#first_name').val("");
		$('#last_name').val("");
		$('#shift_start').val("");
		$('#shift_end').val("");

	    Materialize.updateTextFields();
	},
	addEmployee: function() {
    	$.post({
    		method: "POST",
    		url: "./api/employees",
    		data: {"first_name": $('#first_name').val(), "last_name": $('#last_name').val(), "shift_start": $('#shift_start').val(), "shift_end": $('#shift_end').val()},
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		
    		console.log("EmployeeClient::addEmployee() response:")
    		console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('Added successfully.', 4000);
    			
    			$("#error-container").remove();
    			render(<App />, document.getElementById('employee-target'));
    		}
    		
    	});
	},
}

/**
 * DebugClient (Object)
 * 
 * Standard object similar to EmployeeClient, used to make developing the website all that much easier. 
 */
var DebugClient = {

	// Used for undeleting all records in the database.
	// Method: GET
	debugUndeleteAll: function() {
    	$.ajax({
    		method: "GET",
    		url: "./api/debug/undeleteall",
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		//console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('[DEBUG] Task run success.', 4000);
    			render(<App />, document.getElementById('employee-target'));
    		}
    	});
	},

	// Used for deleting all records in the database.
	// Method: DELETE
	debugDeleteAll: function() {
    	$.ajax({
    		method: "DELETE",
    		url: "./api/debug/deleteall",
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		//console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('[DEBUG] Task run success.', 4000);
    			render(<App />, document.getElementById('employee-target'));
    		}
    	});
	},
	
	debugTruncateTable: function() {
    	$.ajax({
    		method: "DELETE",
    		url: "./api/debug/truncatetable",
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		//console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('[DEBUG] Task run success.', 4000);
    			render(<App />, document.getElementById('employee-target'));
    		}
    	});
	},

	debugTestEmployees: function() {
    	$.ajax({
    		method: "GET",
    		url: "./api/debug/testemployees",
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		//console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('[DEBUG] Task run success.', 4000);
    			render(<App />, document.getElementById('employee-target'));
    		}
    	});
	},
	
	debugCreateTable: function() {
    	$.ajax({
    		method: "GET",
    		url: "./api/debug/configure",
    	}).done(function(msg) {
    		var response = JSON.parse(msg);
    		//console.log(response);

    		if(typeof response['error'] != "undefined") { 
    			render(<Error title={"Error"} message={response['error']} />, document.getElementById('error-target'));
    		}
    		else {
    			Materialize.toast('[DEBUG] Task run success.', 4000);
    			render(<App />, document.getElementById('employee-target'));
    		}
    	});
	},
		
	// Used to reload the document without refreshing the page.
	rerenderDocument: function() { 
		render(<App />, document.getElementById('employee-target'));
		render(<Debug />, document.getElementById('debug-target'));
		Materialize.toast('[DEBUG] Task run success.', 4000);
	}
}

/**
 * 2 (React.Component)
 * 
 * The React.Component for the add button next to "EmployeeList" 
 */
class AddButton extends React.Component {
	render() {
		return(
			<a data-tooltip="Adds a new employee to the list." onClick={EmployeeClient.addEmployeeAsk.bind(this)} className="btn-floating btn-large waves-effect waves-light light-green tooltipped"><i className="material-icons">add</i></a>
		);
	}
}

/**
 * Employee (React.Component)
 * 
 * The React.Component for each individual employee in the EmployeeList React.Component 
 */
class Employee extends React.Component {
	render() {
		console.log("Employee::render() props:");
		console.log(this.props);
		return (
			<tr id={"employee-"+this.props.employeeObject['id']}>
				<td>{this.props.employeeObject['id']}</td>
				<td>{this.props.employeeObject['first_name'] + " " + this.props.employeeObject['last_name']}</td>
				<td>{this.props.employeeObject['shift_start'] + " - " + this.props.employeeObject['shift_end']}</td>
				<td className="right-align">
					<div>
						<a data-tooltip="Removes the employee from this shift." onClick={ EmployeeClient.deleteEmployeeAsk.bind(this, this.props.employeeObject['id'])} className="space waves-effect waves-light btn tooltipped">Delete</a>
						<a data-tooltip="Edits the employee on this shift." onClick={ EmployeeClient.editEmployeeAsk.bind(this, this.props.employeeObject['id'], this.props.employeeObject['first_name'], this.props.employeeObject['last_name'], this.props.employeeObject['shift_start'], this.props.employeeObject['shift_end'])} className="waves-effect waves-light btn tooltipped">Edit</a>
					</div>
				</td>
			</tr>
		);
	}
}

/**
 * EmployeeList (React.Component)
 * 
 * The React.Component which contains all the employees in a table, appends Employee React.Component in {employeeList}.
 */
class EmployeeList extends React.Component {
	render() {
		console.log("EmployeeList::render() employeeList:");
		console.log(this.props.employeeList);
		
		if(Object.keys(this.props.employeeList).length == 0) {
			return(<Error title={"Notice"} message={"There were no employees found. You can add new employees using the green 'Add (+)' button."} />);
		}
		else {
			var employeeList = Object.values(this.props.employeeList).map(employeeObject =>
				<Employee employeeObject = {JSON.parse(employeeObject)}/>
			);
			return(
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Shift</th>
							<th className="right-align">Actions</th>
						</tr>
					</thead>
					<tbody>
						{employeeList}
					</tbody>
				</table>
			);
		}
	}
}

/**
 * AskModal (React.Component)
 * 
 * The React.Component which pushes a modal to get user confirmation.
 * (Confirm/Cancel action)
 */
class AskModal extends React.Component {
	render() {
		return(
			<div id="modal-container" className="modal">
			    <div className="modal-content">
			        <h4 id="modal-tital">{this.props.title}</h4>
			        <p id="modal-message">{this.props.message}</p>
			    </div>
			    <div className="modal-footer">
			        <a href="#!" onClick={this.props.eventListener} className="modal-action modal-close waves-effect waves-green btn-flat">Confirm</a>
			        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
			    </div>
			</div>
		);
	}
}

/**
 * InputModal (React.Component)
 * 
 * The React.Component which pushes a modal to get user input.
 * Primarily used to add/edit employees, but can be extended for other uses.
 */
class InputModal extends React.Component {
	render() {
		return(
			<div id="modal-container" className="modal">
			    <div className="modal-content">
			        <h4 id="modal-tital">{this.props.title}</h4>
			        <p id="modal-message">{this.props.message}</p>
		        	<div className="row">
			        	<div className="input-field col s6">
			        		<input id="first_name" type="text" className="validate active"/>
			        		<label htmlFor="first_name">First Name</label>
			        	</div>
			        	<div className="input-field col s6">
			        		<input id="last_name" type="text" className="validate active"/>
				        		<label htmlFor="last_name">Last Name</label>
			        	</div>
			        	<div className="input-field col s6">
			        		<input id="shift_start" type="time" className="validate active"/>
			        	</div>
			        	<div className="input-field col s6">
			        		<input id="shift_end" type="time" className="validate active"/>
			        	</div>
		        	</div>
			    </div>
			    <div className="modal-footer">
			        <a href="#!" onClick={this.props.eventListener} className="modal-action modal-close waves-effect waves-green btn-flat">Confirm</a>
			        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
			    </div>
			</div>
		);
	}
}

/**
 * Debug (React.Component)
 * 
 * The React.Component for pushing debug controls to screen.
 * Can be disabled at the bottom of this file by removing the render(<Debug />, {...});
 */
class Debug extends React.Component {
	render() {
		//console.log("Debug::render()");
		
		return(
			<table>
				<thead>
					<tr>
						<th>Action</th>
						<th className="center-align">Button</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Create Table (IF NOT EXISTS)</td>
						<td className="center-align"><a data-tooltip="Adds all employees back to the list." onClick={DebugClient.debugCreateTable.bind(this)} className="waves-effect waves-light btn tooltipped">Go</a></td>
					</tr>
					<tr>
						<td>Add Test Employees</td>
						<td className="center-align"><a data-tooltip="Updates the React Components." onClick={DebugClient.debugTestEmployees.bind(this)} className="waves-effect waves-light btn tooltipped">Go</a></td>
					</tr>
					<tr>
						<td>Undelete All Employees</td>
						<td className="center-align"><a data-tooltip="Adds all employees back to the list." onClick={DebugClient.debugUndeleteAll.bind(this)} className="waves-effect waves-light btn tooltipped">Go</a></td>
					</tr>
					<tr>
						<td>Delete All Employees</td>
						<td className="center-align"><a data-tooltip="Deletes all employees from the list." onClick={DebugClient.debugDeleteAll.bind(this)} className="waves-effect waves-light btn tooltipped">Go</a></td>
					</tr>
						<tr>
						<td>Truncate Table</td>
						<td className="center-align"><a data-tooltip="Permanently deletes all employees and resets auto-increment to 0." onClick={DebugClient.debugTruncateTable.bind(this)} className="waves-effect waves-light btn tooltipped">Go</a></td>
					</tr>
					<tr>
						<td>Rerender Document</td>
						<td className="center-align"><a data-tooltip="Updates the React Components." onClick={DebugClient.rerenderDocument.bind(this)} className="waves-effect waves-light btn tooltipped">Go</a></td>
					</tr>
				</tbody>
			</table>
		);
	}
}

/**
 * Error (React.Component)
 * 
 * The React.Component which pushes errors to the screen.
 */
class Error extends React.Component {
	render() {
		console.log("Error::render() props:");
		console.log(this.props);
		
		return(
			<div id="error-container" className="row">
			    <div className="col s12">
			        <div className="card blue-grey darken-1">
			            <div className="card-content white-text">
			                <span className="card-title">{this.props.title}</span>
			                <p>{this.props.message}</p>
			            </div>
			            <div className="card-action">
			                <a href="./">Reload</a>
			            </div>
			        </div>
		        </div>
	        </div>
		);
	}
}

/**
 * App (React.Component)
 * 
 * The React.Component for entry into the web application.
 * This component sets up the initial employee list or displays an error on failure.
 * It will attempt to reconnect upon error.
 */
class App extends React.Component {
    constructor(props) {
		console.log("App::constructor(props)");
        super(props);
    }

    componentDidMount() {
        var response = {};
        
        // Used to recall this method if there is a failure.
        var _this = this;
        
    	$.ajax({
    		method: "GET",
            async: true,
    		url: "./api/employees",
    	}).done(function(msg) {
    		response = JSON.parse(msg);
    		
    		console.log("App::componentDidMount() ajax.done() response:");
    		console.log(response);

    		if(typeof response['error'] != "undefined") {
        		// Checking for error, if this is the case, display an error on the screen.
    			console.log("Response error, pushing error to screen.");
    			
    			if(response['error'] == "Exception Caught: Table 'ci346_employees.employee_data' doesn't exist") {
        			Materialize.toast('Detected first run, table needs creating.', 4000);
        			
    				var errorMessageComponent = <Error title={"Error"} message={"Table does not exist, please create the table."} />;
    				render(errorMessageComponent, document.getElementById('employee-target'));
    			}
    			else {
    				var errorMessageComponent = <Error title={"Error"} message={response['error'] + " Retrying..."} />;
    				render(errorMessageComponent, document.getElementById('employee-target'));
    				
    				console.log("Attempting reconnection...");
					_this.componentDidMount();
    			}
    		}
    		else {
        		// Checking for undefined error, if this is the case, no error actually occurred.
    			console.log("Response success, setting up employee list...");
    	    	var employeeListComponent = <EmployeeList employeeList={response} />;
    			
    	    	// Render the new employee list.
    	    	console.log("Rendering...");
    			render(employeeListComponent, document.getElementById('employee-target'));

    			// Cache employee list for potential refresh later.
    			console.log("Caching employeeList in DataStorage:");
    			DataStorage['hasLoaded'] = true;
        		DataStorage['lastEmployeeList'] = employeeListComponent;
    			console.log(DataStorage);
    			
    			// Render an add button since the connection was successful
    			render(<AddButton />, document.getElementById('add-target'))
    		}
    	});
    }
    
    render() {
    	//console.log("App::render()");
    	
    	// Check if we've loaded.
    	// Continue to slow last employee list if already loaded to prevent the screen from flickering the loading message.
    	if(DataStorage['hasLoaded']) {
    		console.log("Setting last employee list while waiting for new list...");
    		return DataStorage['lastEmployeeList'];
    	}
    	
    	// For the first load, show a message.
    	// Will vanish quick if server responds quickly.
		console.log("Setting first time load message...");
    	console.log(DataStorage['notLoadedState']);
		return DataStorage['notLoadedState'];
    }
}

/**
 * DataStorage (Object)
 * 
 * Used to keep some values cached such as a previous employee list 
 * for when the user performs an action that updates the page, preventing it
 * from jumping them back to the top of the screen.
 */
var DataStorage = {
	hasLoaded: false, 
	notLoadedState: <Error title={"Loading"} message={"Fetching employee list..."} />,
	
	lastEmployeeState: 0
}

render(<App />, document.getElementById('employee-target'));
render(<Debug />, document.getElementById('debug-target'));
