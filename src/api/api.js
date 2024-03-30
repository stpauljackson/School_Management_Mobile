let ENV = 'dev'; // 'prod or dev'

let getCalendarEndpoint, saveAttendanceEndpoint, getAllStudentsEndpoint, saveMarksEndpoint,getAssignmentsEndpoint,
    getClassEndpoint, marksOfClassEndpoint, getAllTestsEndpoint, fetchEventsEndpoint, createNewTestEndpoint, uploadFileEndpoint, getFileEndpoint;

if (ENV === 'prod') {
    const BaseUrl = 'https://us-central1-edge-2060b.cloudfunctions.net/';

    getCalendarEndpoint = BaseUrl + 'getCalendar';
    saveAttendanceEndpoint = BaseUrl + 'saveAttendance';
    getAllStudentsEndpoint = BaseUrl + 'getAllStudentsfromClass';
    saveMarksEndpoint = BaseUrl + 'saveMarks';
    getClassEndpoint = BaseUrl + 'getClass';
    marksOfClassEndpoint = BaseUrl + 'marksofclass';
    getAllTestsEndpoint = BaseUrl + 'getAllTests';
    fetchEventsEndpoint = BaseUrl + 'fetchEvents';
    createNewTestEndpoint = BaseUrl + 'createNewTest';
    getAssignmentsEndpoint = BaseUrl + 'getAssignments';
    uploadFileEndpoint = BaseUrl + 'uploadFile';
} else {
    const BaseUrl = 'http://10.0.2.2:5001/edge-2060b/us-central1/';
    
    getCalendarEndpoint = BaseUrl + 'getCalendar';
    saveAttendanceEndpoint = BaseUrl + 'saveAttendance';
    getAllStudentsEndpoint = BaseUrl + 'getAllStudentsfromClass';
    saveMarksEndpoint = BaseUrl + 'saveMarks';
    getClassEndpoint = BaseUrl + 'getClass';
    marksOfClassEndpoint = BaseUrl + 'marksofclass';
    getAllTestsEndpoint = BaseUrl + 'getAllTests';
    fetchEventsEndpoint = BaseUrl + 'fetchEvents';
    createNewTestEndpoint = BaseUrl + 'createNewTest';
    uploadFileEndpoint = BaseUrl + 'uploadFile';
    getFileEndpoint = BaseUrl + 'getFile';
    getAssignmentsEndpoint = BaseUrl + 'getAssignments';
}

export {
    getCalendarEndpoint,
    saveAttendanceEndpoint,
    getAllStudentsEndpoint,
    saveMarksEndpoint,
    getClassEndpoint,
    marksOfClassEndpoint,
    getAllTestsEndpoint,
    fetchEventsEndpoint,
    createNewTestEndpoint,
    uploadFileEndpoint,
    getFileEndpoint,
    getAssignmentsEndpoint
};
