let ENV = 'dev'; // 'prod or dev'

let getCalendarEndpoint, saveAttendanceEndpoint, getAllStudentsEndpoint, saveMarksEndpoint,getAssignmentsEndpoint,
    getClassEndpoint, marksOfClassEndpoint, getAllTestsEndpoint, fetchEventsEndpoint, createNewTestEndpoint,
    uploadFileEndpoint, getFileEndpoint,createAnnouncementsEndpoint,createClassesEndpoint,getClassesEndpoint,getStudentFromClassEndpoint;

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
    createAnnouncementsEndpoint = BaseUrl + 'createAnnouncements';
    createClassesEndpoint = BaseUrl + 'createClasses';
    getClassesEndpoint = BaseUrl + 'getClasses';
    getStudentFromClassEndpoint = BaseUrl + 'getStudentFromClass';
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
    getAssignmentsEndpoint,
    createAnnouncementsEndpoint,
    createClassesEndpoint,
    getClassesEndpoint,
    getStudentFromClassEndpoint,
};
