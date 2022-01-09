// JScript File
var _arr_genlist = {};
var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

function pad(str, len, pad, dir) {
    if (typeof (len) == 'undefined') { var len = 0; };
    if (typeof (pad) == 'undefined') { var pad = ' '; };
    if (typeof (dir) == 'undefined') { var dir = STR_PAD_RIGHT; };

    if (len + 1 >= str.length) {
        switch (dir) {
            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
                break;
            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                break;
            default:
                str = str + Array(len + 1 - str.length).join(pad);
                break;
        };
    };
    return str;
};

function startproc(proc, arg) {
    dlgWaitOpen();
    setTimeout(function () { proc(arg); }, 0);
};


function SetWaitMsg() {
    elem = '<div id="dlg_waitmsg"><img class="imgmsg" src="../share/img/loader.gif"  /><label class="tfoms_wait_lblmsg">Подождите! Выполняется запрос...</label></div>';
    $(elem).appendTo("body");

    $("#dlg_waitmsg").dialog({
        autoOpen: false,
        height: 100,
        width: 450,
        modal: true,
        dialogClass: "no-close"
    });
};


function dlgWaitOpen() {
    $("#dlg_waitmsg").dialog("open");
};

function dlgWaitClose() {
    $("#dlg_waitmsg").dialog("close");
};




//function AjaxStatus(elem, source) {
//    callAjax(source, {}, cb_AjaxStatus);
//};

//function cb_AjaxStatus(ans) {
//    $("#txt_msg").text(ans.val);
//}

function downloadfile() {
    var iframe = document.createElement("iframe");
    iframe.src = "base/download.aspx";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
};

function get_name_browser() {
    var ua = navigator.userAgent;
    if (ua.search(/Chrome/) > 0) return 'Chrome';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0) return 'MSIE';
    return 'unknown'
};

function TrimString(sInString) 
{
    if (sInString == undefined) {
        return "";
    } else {
        sInString = sInString.replace(/ /g, ' ');
        return sInString.replace(/(^\s+)|(\s+$)/g, "");
    };
}

function iif(rul, valTrue, valFalse) {
    var retVal;
    if (rul) {
        retVal = valTrue;
    } else {
        retVal = valFalse;
    };
    return retVal;
};

function StrToDate(DateStr) 
{
    DateStr = TrimString(DateStr);
    var d = new Date();
    var reg = RegExp(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (reg.test(DateStr)) {
        d = new Date(DateStr.replace(/(\d{1,2})\.(\d{1,2})\.(\d{4})/, "$2/$1/$3"));
        var d_arr = DateStr.split('.');
        if (d_arr[2] != d.getFullYear() || d_arr[1] != (d.getMonth() + 1) || d_arr[0] != d.getDate()) {
            d = false;
        };
    } else {
        d = false;
    }
    return d;
}

//function StrToDateCheck(DateStr,Obj) 
//{
//    DateStr = DateStr.replace(/\//g, ".");
//    var d = new Date();
//    var reg = RegExp(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
//    if (reg.test(DateStr)) {
//        CheckCorrectDate(DateStr,Obj);
//        if (Obj.value=="0") {
//            window.alert("Недопустимый формат даты!");
//            d = false;
//        } else {
//            d = new Date(DateStr.replace(/(\d{1,2})\.(\d{1,2})\.(\d{4})/, "$2/$1/$3"));
//        }
//    } else {
//        window.alert("Недопустимый формат даты!");
//        d = false;
//    }
//    return d;
//}

function DateToShortStr(pDate) 
{
    var vMonth = pDate.getMonth()+1;
    var sDay = pDate.getDate().toString(); 
    var sYear = pDate.getYear().toString();
    if (vMonth<10) {
        vMonth = "0" + vMonth;
    };
    if (pDate.getDate()<10) {
        sDay = "0" + sDay;
    };
    if (sYear.length==2) {
        sYear = "19" + sYear;
    };
    var strDate = sDay + "." + vMonth + "." + sYear ;
    return strDate;
};

function getMaxDate (y, m) {
    if (m == 1) {
        return y % 4 || (!(y % 100) && y % 400) ? 28 : 29;
    };
    var d = m === 3 || m === 5 || m === 8 || m === 10 ? 30 : 31;
    return new Date(y,m,d);
};

function StrToDecStr(expr) {
    var res = expr;
    var reg = new RegExp(/^(\s|\u00A0)+|(\s|\u00A0)+/g);
    res = res.replace(reg, '');
    if (res=="") {
        res = "0";
    };
    reg = new RegExp(/^\d+((\.|\,)\d+)?$/);
    if (!reg.test(res)) {
        return false;
    };
    var ptrn, DecSeparator;
    ptrn = (1/10).toLocaleString();
    if (ptrn.indexOf(",") >= 0) {
        DecSeparator = ",";
    } else {
        DecSeparator = ".";
    };
    res = res.replace(".", DecSeparator);
    res = res.replace(",", DecSeparator);
    
    return res;
};

//// как вариант
//window.onbeforeunload = function (evt) {
//    par = {};
//    var ans = callAjaxSync("WsMain.asmx/DelTmpDir", par);
//    if (ans.res != "0") {
//        alert(ans.errtext);
//    };
//};

////////// функция определения переменной, переданной странице параметром (<url>?varName=varValue)
function getParam(strParams,sParamName)
{
    // strParams - часть url с параметрами 
    // sParamName - имя возвращаемой переменной
    var Params = strParams.split("&");  // отсекаем «?» и вносим переменные и их значения в массив
    var variable = "";
    for (var i = 0; i < Params.length; i++){ // пробегаем весь массив
        if (Params[i].split("=")[0] == sParamName){ // ищем нужную переменную
            if (Params[i].split("=").length > 1) variable = Params[i].split("=")[1]; // если значение параметра задано, то возвращаем его
            return variable;
        }
    }
    return "";
}

function CancelEsc() {
    if (window.event.keyCode == 27) {
        window.event.returnValue = false;
    }
};

function CancelBackspace() {
    if (window.event.keyCode == 8) {
        window.event.returnValue = false;
    }
};

//////////////////////////////////////////////////////////////////////////
// заполнение combobox
//function ldrSelect(obj, arr, val) {
//    for (i = obj.options.length - 1; i >= 0; i--) {
//        obj.remove(i);
//    };
//    for (i = 0; i < arr.length; i++) {
//        var oi = document.createElement("option");
//        oi.value = arr[i].code;
//        oi.id = "o" + arr[i].code;
//        oi.text = arr[i].name;
//        if (val != undefined) {
//            if (val == arr[i].code) {
//                oi.selected = true;
//            };
//        };
//        obj.options.add(oi);
//    };
//};

// заполнение combobox с дополнительными параметрами
function fillSelectDet(ObjId, arr, val, atrib1, atrib2) {
    var obj = document.getElementById(ObjId);
    var val_def = val;
    if (obj.value != "" && obj.value != "-1") {
        if (val_def == undefined) {
            val_def = obj.value;
        } else {
            if (val_def == "") {
                val_def = obj.value;
            };
        };
    };
    
    for (i = obj.options.length - 1; i >= 0; i--) {
        obj.remove(i);
    };
    
    for (i = 0; i < arr.length; i++) {
        var oi = document.createElement("option");
        oi.value = arr[i].code;
        oi.id = "o" + arr[i].code;
        oi.innerText = arr[i].name;
        if (val_def == arr[i].code) {
            oi.selected = true;
        };
        if (atrib1 != undefined) {
            var atb = document.createAttribute(atrib1);
            atb.value = arr[i].det;
            oi.setAttributeNode(atb);
        };
        if (atrib2 != undefined) {
            var atb2 = document.createAttribute(atrib2);
            atb2.value = arr[i].det2;
            oi.setAttributeNode(atb2);
        };
        obj.appendChild(oi);
     };
    if (obj.value=="" || obj.value=="-1") {
        obj.selectedIndex = 0;
    };
};

/// возвращает список выбранных кодов из выпадающего списка (при возможности множественного выбора)
function GetValListMulti(obj) {
    var returnList;
    returnList = "";
    for (i = 0 ; i < obj.options.length ; i++) {
        var it = obj.options[i];
        if (it.selected && it.value != "-1") {
            returnList = returnList + "," + it.value;
        };
    };
    if (returnList=="") {
        returnList = "-1";
    } else {
        returnList = returnList.substring(1);
    };    
    return returnList;
};

/// обработка ошибки с сервера
function CheckErrorSrv(res,strTitleErr) {
    var strErr = "";
    if (res.error) {
        strErr = "Ошибка (" + strTitleErr + "): " + res.errorDetail ;
        alert(strErr, 16);
        return true;
    };
    return false;
};

//////////////////////////////////////////////////////////////////////////
//// формирование списка синхронно
function GenListSync(WsMetodName, pr, ObjId, DefVal, DetAttr1, DetAttr2) {
    var obj = document.createElement(ObjId);
    var ans = callAjaxSync(WsMetodName, pr);
    if (ans.res == -1) {
        alert("Ошибка формирования списка " + ObjId + " : " + ans.errtext);
        return false;
    };
    if (DefVal == undefined) {
        DefVal = obj.value;
    };
    fillSelectDet(ObjId, ans.mas, DefVal, DetAttr1, DetAttr2);
    return ans;
};

//// формирование списка асинхронно
function GenListAsync(MetodName, pr, ObjId, DefVal, ProcAfter, DetAttr1, DetAttr2) {   //, LvlList(?) - LvlSelect: 0 - start, 1 - final, undefined - not_dlgWait
    //    //if (flLvlSelect==0) {
    //    //    dlgWaitOpen();
    //    //};
    dlgWaitOpen();

    _arr_genlist["ObjId"] = ObjId;
    _arr_genlist["defval"] = DefVal;
    _arr_genlist["ProcAfter"] = ProcAfter;
    _arr_genlist["DetAttr1"] = DetAttr1;
    _arr_genlist["DetAttr2"] = DetAttr2;

    callAjax(MetodName, pr, Cpl_GenList);
};
function Cpl_GenList(ans) {
    if (ans.res == -1) {
        alert("Ошибка формирования списка " + _arr_genlist["ObjId"] + " : " + ans.errtext);
        return false;
    };
    fillSelectDet(_arr_genlist["ObjId"], ans.mas, _arr_genlist["defval"], _arr_genlist["DetAttr1"], _arr_genlist["DetAttr2"]);
    _arr_genlist["ProcAfter"]();
    //if (flLvlSelect==2) {
    //    dlgWaitClose();
    //};
    dlgWaitClose();
};

////////////////////////////////////////////////////////
function callAjaxSync(pUrl, pData) {
    var jsData = JSON.stringify(pData);
    var msg = $.ajax({
        type: "POST",
        url: pUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsData,
        async: false
    });
    //var ans = JSON.parse(msg.responseJSON);
    //var ans = msg.res
    if (!msg.responseJSON) {
        alert(msg.statusText);
        return false;
    };
    if (!msg.responseJSON.d) {
        var ans = msg.responseJSON;
    } else {
        var ans = msg.responseJSON.d;
    }

    return ans;
}

function callAjax(pUrl, pData, cb_Func) {
    var valid = true;
    var jsData = JSON.stringify(pData);
    valid = $.ajax({
        type: "POST",
        url: pUrl,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jsData,
        success: function (msg) {
            //debugger;
            //if (msg != null) {
                if (!msg.d) {
                    //var ans = JSON.parse(msg);
                    var ans = msg;
                } else {
                    // var ans = JSON.parse(msg.d);
                    var ans = msg.d;
                }
                cb_Func(ans);
                //if (ans.res == "0") {
                //    cb_Func(ans);
                //} else {
                //    alert(ans.errtext);
                //    cb_Func(ans);
                //}
           // }
            
        },
        failure: function (msg) {
            if (!msg.d) {
                // var ans = JSON.parse(msg);
                var ans = msg.responseJSON;
            } else {
                // var ans = JSON.parse(msg.d);
                var ans = msg.responseJSON.d;
            }
            alert(msg);
            cb_Func(ans);
        },
        error: function (xhr, err) {
            alert(xhr.responseText);
            var ans = { value: "" };
            cb_Func(ans);
        }
    })
    return valid;
};
///// OLD /////////////////////////////////////////////////////

//function GenListAsync(ObjSrv,Srv,MetodName,pr,objId,DefVal,ProcAfter)
//var objSel = document.getElementById(objId)
//objSel.options.length = 0
//var oi = document.CreateElement("option")
//objSel.options.add(oi)
//oi.value = 0
//oi.InnerText = "Запрос.."
    
//if pr.Exists("") {
//pr.Remove("")
//};
//UpdateDict pr, "objId", objId
//UpdateDict pr, "defval", DefVal
//UpdateDict pr, "ProcAfter", ProcAfter
//pr.Add "", ""
    
//var oData = PrepServiceAny(ObjSrv,MetodName,true)
//Srv.callService GetRef("Cpl_GenList"),oData,pr.Keys,pr.Items
//};
    
//function Cpl_GenList(res)
//if CheckErrorSrv(res,"Формирование списков") {
//return false;
//};
//var cls = res.value
//var obj = document.getElementById(cls.objId)
//ldrSelectServ obj,cls
//obj.value = cls.defval
//if obj.value="" {
//obj.selectedIndex = 0
//};
//if cls.ProcAfter<>"" {
//execute(cls.ProcAfter)
//};
//};
//////////////////////////////////////////////////////////////////////////
