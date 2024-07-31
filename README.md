React Core Concepts:
Functional Components:

Manager is a functional component that defines the UI and behavior using hooks.
React Hooks:

useState: Manages the state for students, teachers, marks, and form inputs.
useEffect: Executes side effects (e.g., loading from and saving to local storage).
JSX:

Syntax used to describe the UI structure within the React component.
State Management:
State Variables:
students, teachers, marks: Arrays and objects storing lists of students, teachers, and their marks.
studentName, studentAge, studentClass: Manage form input values for student details.
teacherName, teacherAge, teacherSubject: Manage form input values for teacher details.
marksStudent, marksSubject, marksValue: Manage form input values for marks details.
editStudentIndex, editTeacherIndex, editMarksIndex: Track the index of the item being edited.
Data Persistence:
Local Storage:
Loading data from local storage when the component mounts.
Saving data to local storage whenever the state changes.
Form Handling:
Controlled Components:

Form inputs are controlled by React state, allowing their values to be managed and updated through state variables.
Event Handlers:

Functions that handle changes to form inputs (onChange events) and button clicks (onClick events).
Conditional Rendering:
Ternary Operators:
Used to conditionally render different buttons (e.g., Add or Update) based on the editing state.
Displaying a message when there are no students, teachers, or marks to show.
Array and Object Manipulation:
Array Methods:

map: Iterates over arrays to generate JSX elements.
filter: Creates a new array with elements that pass a test.
concat: Combines arrays.
splice: Adds/removes items in an array (although not used directly, similar operations are performed).
Object Methods:

Object.keys: Retrieves an array of the keys from an object.
Styling:
Inline Styles:
Styles are applied directly to elements using JavaScript objects.
Functionality:
CRUD Operations:
Create: Adding new students, teachers, and marks.
Read: Displaying lists of students, teachers, and marks.
Update: Editing existing students, teachers, and marks.
Delete: Removing students, teachers, and marks.
Data Structure:
Nested Data Structures:
marks state is an object where keys are student names and values are objects with subjects as keys and marks as values.
Best Practices:
Component Organization:
Separate sections for managing students, teachers, and marks, each with its own form and table.
Clear separation of concerns by grouping related state and functions together.
UI/UX Considerations:
User Feedback:
Conditional messages like "No Student Information Found" provide feedback when there are no entries.
Buttons change from "Add" to "Update" based on the context.
