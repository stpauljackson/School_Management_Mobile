let ENV = 'dev'; // 'prod or dev'

let getCalendarEndpoint, saveAttendanceEndpoint, getAllStudentsEndpoint, saveMarksEndpoint,
    getClassEndpoint, marksOfClassEndpoint, getAllTestsEndpoint, fetchEventsEndpoint, createNewTestEndpoint, uploadFileEndpoint, getFileEndpoint;

if (ENV === 'prod') {
    const productionBaseUrl = 'https://us-central1-edge-2060b.cloudfunctions.net/';

    getCalendarEndpoint = productionBaseUrl + 'getCalendar';
    saveAttendanceEndpoint = productionBaseUrl + 'saveAttendance';
    getAllStudentsEndpoint = productionBaseUrl + 'getAllStudentsfromClass';
    saveMarksEndpoint = productionBaseUrl + 'saveMarks';
    getClassEndpoint = productionBaseUrl + 'getClass';
    marksOfClassEndpoint = productionBaseUrl + 'marksofclass';
    getAllTestsEndpoint = productionBaseUrl + 'getAllTests';
    fetchEventsEndpoint = productionBaseUrl + 'fetchEvents';
    createNewTestEndpoint = productionBaseUrl + 'createNewTest';
} else {
    const localHostBaseUrl = 'http://10.0.2.2:5001/edge-2060b/us-central1/';
    
    getCalendarEndpoint = localHostBaseUrl + 'getCalendar';
    saveAttendanceEndpoint = localHostBaseUrl + 'saveAttendance';
    getAllStudentsEndpoint = localHostBaseUrl + 'getAllStudentsfromClass';
    saveMarksEndpoint = localHostBaseUrl + 'saveMarks';
    getClassEndpoint = localHostBaseUrl + 'getClass';
    marksOfClassEndpoint = localHostBaseUrl + 'marksofclass';
    getAllTestsEndpoint = localHostBaseUrl + 'getAllTests';
    fetchEventsEndpoint = localHostBaseUrl + 'fetchEvents';
    createNewTestEndpoint = localHostBaseUrl + 'createNewTest';
    uploadFileEndpoint = localHostBaseUrl + 'uploadFile';
    getFileEndpoint = localHostBaseUrl + 'getFile';
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
    getFileEndpoint
};
