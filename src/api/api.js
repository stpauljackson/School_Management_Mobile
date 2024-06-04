let ENV = 'dev'; // 'prod or dev'

let BaseUrl = (ENV === 'prod') ? 'https://us-central1-edge-2060b.cloudfunctions.net/' : 'http://10.0.2.2:5001/edge-2060b/us-central1/';

exports.getCalendarEndpoint = BaseUrl + 'getCalendar';
exports.saveAttendanceEndpoint = BaseUrl + 'saveAttendance';
exports.getAllStudentsEndpoint = BaseUrl + 'getAllStudentsfromClass';
exports.saveMarksEndpoint = BaseUrl + 'saveMarks';
exports.getClassEndpoint = BaseUrl + 'getClass';
exports.marksOfClassEndpoint = BaseUrl + 'marksofclass';
exports.getAllTestsEndpoint = BaseUrl + 'getAllTests';
exports.fetchEventsEndpoint = BaseUrl + 'fetchEvents';
exports.createNewTestEndpoint = BaseUrl + 'createNewTest';
exports.uploadFileEndpoint = BaseUrl + 'uploadFile';
exports.getFileEndpoint = BaseUrl + 'getFile';
exports.getAssignmentsEndpoint = BaseUrl + 'getAssignments';
exports.createAnnouncementsEndpoint = BaseUrl + 'createAnnouncements';
exports.createClassesEndpoint = BaseUrl + 'createClasses';
exports.getClassesEndpoint = BaseUrl + 'getClasses';
exports.getUsersByClassOrSchoolEndpoint = BaseUrl + 'getUsersByClassOrSchool';
exports.createUserIdsWithExcelFileEndpoint = BaseUrl + 'createUserIdsWithExcelFile';
exports.createUsersWithIdEndpoint = BaseUrl + 'createUsersWithId';
exports.getDashboardEndpoint = BaseUrl + 'getDashboard';