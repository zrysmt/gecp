/**
 * 自主学习模块下的数据库操作放在这里
 */

define(function(require, exports, module) {
    var dbOpr = {
        /*课程设置模块*/
        addData2DB_courses: function(courseSetObj) {
            console.log(courseSetObj);

            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    alertDialogShow("新建课程成功");
                    // $('.modal-close').on('click', function(event) {
                    //     // localStorage.clear();
                    //     // courseSetObj = null;
                    //     window.location.reload();
                    // });
                    // $('.close').on('click', function(event) {
                    //     window.location.reload();
                    // });
                },
                'processFailed': function() {
                    console.log("dbOpr.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': ["cName", "cCreateDate", "cCreateUser", "cPicName", "cIntro", "cTeacherIntro", "cAims", "cOutline", "cNotification", "cDifficulty", "cGrade", "cmCode", "saCode", "saLevel", "cDuringStartTime", "cDuringStopTime", "cSectionFiles"],
                'Data': [
                    [courseSetObj.cName, courseSetObj.cCreateDate, courseSetObj.cCreateUser, courseSetObj.cPicName, courseSetObj.cIntro, courseSetObj.cTeaIntro, courseSetObj.cAims, courseSetObj.cOutline, courseSetObj.cNotification, courseSetObj.cDifficultySet, courseSetObj.cGradeSet, courseSetObj.cCmCodeSet,
                        courseSetObj.cSaCodeSet, courseSetObj.cSaLevelSet, courseSetObj.cStudyDate1, courseSetObj.cStudyDate1, courseSetObj.cSectionFiles
                    ]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "courses", Params);
        },
        addData2DB_cAttendStu: function(cAttendStu) {
            console.log(cAttendStu);

            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                  
                },
                'processFailed': function() {
                    console.log("dbOpr.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': ["uid", "csId"],
                'Data': [
                    [
                        cAttendStu.uid,cAttendStu.csId
                    ]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "cAttendStu", Params);
        },
        /**
         * [queryDatasFromDB 已经写死，只用在courses表]
         * @param  {[type]} tableName    [description]
         * @param  {[type]} queryFields  [description]
         * @param  {[type]} queryFilter  [description]
         * @param  {[type]} callbackFunc [description]
         * @param  {[type]} action       [description]
         * @param  {[type]} pageNum      [description]
         * @return {[type]}              [description]
         */
        queryDatasFromDB: function(tableName, queryFields, queryFilter, callbackFunc, action, pageNum) {
            var onePageNums = 12; //一页12个
            console.log(queryFilter);
            if (!queryFilter/*|| action === 'fyDiv'*/) {
                queryFilter = '1=1';
            }
            if (!queryFields) {
                queryFields = '*';
            }
            var sortItemName = 'cId';
            var cSortItemSession = sessionStorage.getItem('courseSortItem'); //排序
            if (cSortItemSession) {
                switch (cSortItemSession) {
                    case "timeDown": //升序
                        sortItemName = 'cCreateDate'; /*'date(a.date)';*/
                        break;
                    case "timeUp": //降序
                        sortItemName = 'cCreateDate DESC';
                        break;
                    case "fate": //评分
                        sortItemName = 'avgRate DESC';
                        break;
                    case "attendNums": 
                        sortItemName = 'caNums DESC';
                        break;
                }
            }
            if (action === 'getOnePageData') { //分页获取数据
                if ((pageNum + 1)) {
                    queryFilter = queryFilter + " group by cId order by " + sortItemName + " limit " + onePageNums + " offset " + pageNum * onePageNums;
                    console.log(queryFilter);
                }
            }
            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data);
                    if (callbackFunc && data) {
                        if (action === 'fyDiv') {
                            callbackFunc(Math.ceil(data.length / onePageNums),queryFilter);
                        } else {
                            callbackFunc(data);
                        }
                    }
                },
                'processFailed': function() {
                    console.log("fileDetial.js文件下数据库操作失败！");
                }
            });
            var lyrOrSQL = {
                'lyr': tableName,
                'fields': queryFields,
                'filter': queryFilter
            };
            sqlServices.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
        },
        addData2DB_cTest: function(cTestObj, callback) {
            console.log(cTestObj);

            var sqlServices = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    if (callback) {
                        callback();
                    }
                    alertDialogShow("新建测试题成功");
                    $('.modal-close').on('click', function(event) {
                        window.location.reload();
                    });

                },
                'processFailed': function() {
                    console.log("dbOpr.js文件下数据库操作失败！");
                }
            });
            var Params = {
                'Fields': ["csId", "radQues", "mulQues", "subjQues"],
                'Data': [
                    [
                        cTestObj.csId, cTestObj.radQues, cTestObj.mulQues, cTestObj.subjQues
                    ]
                ]
            };
            sqlServices.processAscyn("ADD", "gecp2", "cTest", Params);
        },
        /**
         * [queryDBByField 根据字段查询表]
         * @param  {[type]} tableName  [表名]
         * @param  {[type]} queryField [需要查到的字段]
         * @return {[type]}            [description]
         */
        queryDBByField: function(tableName, queryField, queryFilter, callback) {
            var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                'processCompleted': function(data) {
                    console.log(data); //回调函数里返回数据
                    if (callback) {
                        callback(data);
                    }
                },
                'processFailed': function() {
                    console.log('istudy数据库操作有错误');
                }
            });
            var lyrOrSQL = {
                'lyr': tableName,
                'fields': queryField,
                'filter': queryFilter
            };
            sqlservice.processAscyn("SQLQUERY", "gecp2", lyrOrSQL);
        },

        /**/
    };
    /**
     * [alertDialogShow alert]
     * @param  {[string]} value [alert的内容]
     */
    function alertDialogShow(value) {
        if (!$('#alertModal').val()) {
            var alertDialog = require('../../../common/subpages/alertDialog.html');
            $('body').append(alertDialog);
            $('#alertModal').modal('show');
            $('.modal-body').text(value);
        }
    }

    module.exports = dbOpr;
});
