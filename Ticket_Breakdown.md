# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom Id Field to Shifts Table

Acceptance Criteria:
1. Add a new field "custom_id" to the Shifts table in the database.
2. "custom_id" field should be a string type and nullable, and should be able to store the custom IDs provided by the each Facilities.
3. The existing functionality of creating and updating Agents should not be affected.
4. Map the custom ID to Agent's internal database ID in Agents table.

Time Estimate: 1 hour.

Implementation Details:
1. Create a migration script to add the "custom_id" field to Shifts Table.
2. Update the database schema and deploy the changes.

### Ticket 2: Update `getShiftsByFacility` Function

Acceptance Criteria:
1. Modify the `getShiftsByFacility` function to include the custom ID of each Agent in the returned shifts data.

Time Estimate: 3 hours.

Implementation Details:
1. Using the `getShiftsByFacility` function, you may obtain the custom IDs of each Agent connected to the shifts.
2. The custom ID should be added to the shifts metadata.
3. Test the revised function, to check that the custom IDs are properly received and included in the returned shifts.

### Ticket 3: Update `generateReport` Function

Acceptance Criteria:
1. Change the `generateReport` function so that it generates reports with the custom ID rather than the internal database ID.
2. Update the PDF template so that it shows each Agent's custom ID.
3. Ensure the existing functionality of generating the PDF report is not affected.

Time Estimate: 4 hours.

Implementation Details:
1. Modify the `generateReport` function to retrieve the custom ID of each Agent from the shifts metadata.
2. Inside PDF template, replace the internal database ID with the custom ID.

### Ticket 4: API endpoint to manage custom IDs

Acceptance Criteria:
1. Add an API endpoint to manage custom IDs of each Agent assigned to a Facility.
2. Name the endpoint `/agent_custom_id`.
3. Update API docs.

Time Estimate: 3 hours.

Implementation Details:
1. Develope API endpoint for Facilities to manage custom IDs.
3. Handle validation and error scenarios.

### Ticket 5: Interface to manage custom IDs

Acceptance Criteria:
1. Add a new section in the application for facilities to manage custom IDs of agents.
2. Facilities should be able to view and edit the custom ID of each agent associated with their facility.

Time Estimate: 6 hours.

Implementation Details:
1. Develope a new section for Facilities to manage custom IDs.
2. Retrieve the list of agents associated with the Facility and display their current custom IDs.
3. Implement the function that allow Facilities to edit and save the custom IDs.
4. Handle validation and error scenarios.



