export default class UrlUtils {
    static baseUrl = "http://www.sawaedcommunity.info";
    static wsUrlPart =  "/webservice/rest/server.php?moodlewsrestformat=json&wstoken=b9cfb03539779a8b024f575f37252a2e&wsfunction=";
    static tokenUrl = "http://www.sawaedcommunity.info/login/token.php?service=moodle_mobile_app";
    static siteInfoUrl = "http://www.sawaedcommunity.info/webservice/rest/server.php?moodlewsrestformat=json&wstoken=b9cfb03539779a8b024f575f37252a2e&wsfunction=core_webservice_get_site_info&wstoken=";
    static userCoursesUrl= "http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=6c072df1301c53280eed3668e987d37f&wsfunction=core_enrol_get_users_courses&userid=2&moodlewsrestformat=json"
    static GET_COURSES = "core_course_get_courses";
    
    constructor() {}

    static getBaseUrl() {
        return this.baseUrl;
    }

    static getWsUrl(fun) {
        return this.baseUrl + this.wsUrlPart + fun;
    }

    static getSiteInfoUrl(wstoken) {
        return this.siteInfoUrl + wstoken;
    }

    static getTokenPost() {
        return this.tokenUrl;
    }

    static getUserCourses(userID)
    {
      return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&moodlewsrestformat=json&wsfunction=core_enrol_get_users_courses&userid='+userID;
    }

    static getCourseContents(courseID)
    {
      return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid='+courseID;
    }

    static getUserInfo(uname)
    {
      return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&wsfunction=core_user_get_users_by_field&field=email&values[0]=h@fci.com&moodlewsrestformat=json'
    }

    static getCalendarEvents(courseID)
    {
      return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&moodlewsrestformat=json&wsfunction=core_calendar_get_calendar_events&events[courseids][0]='+courseID+'&moodlewsrestformat=json';
    }

    static getUserGrades(userID = 3){
        return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&moodlewsrestformat=json&wsfunction=gradereport_overview_get_course_grades&userid='+userID;
    }

    static getAllCourses(){
        return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&wsfunction=core_course_get_courses&moodlewsrestformat=json';
    }
    static getUserBadges(userID = 3){
        return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&moodlewsrestformat=json&wsfunction=core_badges_get_user_badges&userid='+userID;
    }
    static getTokenGet(username, password) {
        return this.tokenUrl + "&username=" + username + "&password=" + password;
    }

    static getModulesGradesOfCourse(userID,CourseID){
        return 'http://www.sawaedcommunity.info/webservice/rest/server.php?wstoken=f28025bfa8afc0253768eee524838ff7&moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&courseid='+courseID+'&userid='+userID ;
    }
}
