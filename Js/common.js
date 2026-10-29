/**************************************************
*   Common
**************************************************/
// alert 메세지 실행
function fnAlertEval(val) {
    eval("alert('" + val + "');");
}

/**************************************************
*   Service Call
**************************************************/

function fnCallService(_url, _data, _callback, _type) {
    _type = (_type == null) ? "post" : _type;

    $.ajax({
        url: _url,
        type: _type,
        data: JSON.stringify(_data),
        dataType: "json",
        contentType: "application/json",
        success: function (status) {
            _callback(status);
        },
        error: function (e) {
            alert("error : " + e.Message);
        }
    });
}

function fnFileCallService(_url, _form, _callback) {

    var form = document.getElementById(_form);
    var formData = new FormData(form);

    $.ajax({
        url: _url,
        type: "post",
        data: formData,
        mimeType: "multipart/form-data",
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        success: function (status) {
            _callback(status);
        },
        error: function (e) {
            alert("error : " + e.Message);
        }
    });
}

function fnFileCallService2(_url, _form, _callback) {

    //var form = document.getElementById(_form);
    //var formData = new FormData(form);

    $("#" + _form).ajaxForm({
        url: _url,
        //enctype: "multipart/form-data",
        //datatype: "json",
        success: function (status) {
            _callback(status);
        },
        error: function (e) {
            alert("error : " + e.Message);
        }
    });

    $("#" + _form).submit();
}

/**************************************************
*   Html Bind
**************************************************/

$().ready(function () {
    $(".htmlBind").each(function () {
        $(this).html($(this).text());
    });
})

/**************************************************
*   validation
**************************************************/
function fnPasswordCheck(strValue) {
    var regExp = /^[0-9A-Za-z!@#$%()_+=<>?]{8,13}$/;
    var regExp2 = /[A-Za-z]/;
    //입력을 안했으면
    if (strValue.length == 0) { return false; }
    //형식에 맞지않으면
    if (!regExp.test(strValue)) { return false; }
    if (!regExp2.test(strValue)) { return false; }

    return true;
}

// 휴대폰 형식 체크
function fnPhoneCheck(strValue) {
    var regExp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;

    //입력을 안했으면
    if (strValue.length == 0) { return false; }
    //형식에 맞지않으면
    if (!regExp.test(strValue)) { return false; }

    return true;
}

// 이메일 형식 체크
function fnEmailCheck(strValue) {
    var regExp1 = /[0-9a-zA-Z][_0-9a-zA-Z-]*@@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    var regExp = /^([A-Za-z0-9_.-]{1,15})(@{1})([A-Za-z0-9_]{1,15})(.{1})([A-Za-z0-9_]{2,10})(.{1}[A-Za-z]{2,10})?(.{1}[A-Za-z]{2,10})?$/;
    //입력을 안했으면
    if (strValue.length == 0) { return false; }
    //형식에 맞지않으면
    if (!regExp.test(strValue)) { return false; }

    return true;
}

// 인증숫자 형식 체크
function fnNumberAuthCheck(strValue) {
    var regExp = /^[0-9]{4,6}$/;

    //입력을 안했으면
    if (strValue.length == 0) { return false; }
    //형식에 맞지않으면
    if (!regExp.test(strValue)) { return false; }

    return true;
}

// 생년월일 형식 체크
function fnRrnAuthCheck(strValue) {
    var regExp = /^[0-9]{8}$/;

    //입력을 안했으면
    if (strValue.length == 0) { return false; }
    //형식에 맞지않으면
    if (!regExp.test(strValue)) { return false; }

    return true;
}

// 14세미만 체크
function fnRrn14YearsCheck(strValue) {
    var regExp = /^[0-9]{8}$/;
    var tDay = new Date();
    var yyyy = tDay.getFullYear();
    var mm = tDay.getMonth() < 9 ? "0" + (tDay.getMonth() + 1) : (tDay.getMonth() + 1);
    var dd = tDay.getDate() < 10 ? "0" + tDay.getDate() : tDay.getDate();    

    //입력을 안했으면
    if (strValue.length == 0) { return false; }
    //형식에 맞지않으면
    if (!regExp.test(strValue)) { return false; }

    if (parseInt("".concat(yyyy, mm, dd)) - parseInt(strValue) - 140000 < 0) { return false; }    

    return true;
}


function fnMsg(flag, msg) {
    if (flag != "")
        $("#" + flag).focus();
    alert(msg);
}
/**************************************************
*   Cookie Control
**************************************************/

function SetCookie(cKey, cValue)  // name,pwd
{
    var date = new Date(); // 오늘 날짜
    // 만료시점 : 오늘날짜+10 설정
    var validity = 10;
    date.setDate(date.getDate() + validity);
    // 쿠키 저장
    document.cookie = cKey + '=' + escape(cValue) + ';expires=' + date.toGMTString() + ';domain=' + document.domain + ';path=/';
}

function DelCookie(cKey) {
    // 동일한 키(name)값으로
    // 1. 만료날짜 과거로 쿠키저장
    // 2. 만료날짜 설정 않는다.
    //    브라우저가 닫힐 때 제명이 된다
    var date = new Date(); // 오늘 날짜
    var validity = -1;
    date.setDate(date.getDate() + validity);
    document.cookie =
        cKey + "=;expires=" + date.toGMTString() + ";";
}

function GetCookie(cKey) {
    var allcookies = document.cookie;
    var cookies = allcookies.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var keyValues = cookies[i].split("=");
        if (keyValues[0] == cKey) {
            return unescape(keyValues[1]);
        }
    }
    return "";
}

/**************************************************
*   숫자입력체크
**************************************************/
$(function () {
    //숫자타입 (Input class 속성에 onlyNumber 를 추가)
    $(".onlyNumber:text ").each(function (pi, po) {
        setOnlyNumber(po);
    });

    $(".onlyPhoneNumber:text ").each(function (pi, po) {
        setOnlyPhoneNumber(po);
    });

    //실수타입 (Input class 속성에 onlyComNumber 를 추가)
    $(".onlyComNumber:text ").each(function (pi, po) {
        setOnlyComNumber(po);
    });

    $(".limitCom2:text ").each(function (pi, po) {
        if (po) {
            po.onkeydown = function () { fncLimitCommNumber(this, 2); }
            po.onkeyup = function () { fncLimitCommNumber(this, 2); }
        }
    });

    $(".limitCom4:text ").each(function (pi, po) {
        if (po) {
            po.onkeydown = function () { fncLimitCommNumber(this, 4); }
            po.onkeyup = function () { fncLimitCommNumber(this, 4); }
        }
    });
});

// 콤마 제거 함수
delComma = function (val) {
    return val.replace(/,/g, "");
}

setOnlyNumber = function (p_obj) {
    if (p_obj) {
        p_obj.onkeydown = function () { fncSetOnlyNumber(this); }
        p_obj.onkeyup = function () { fncSetOnlyNumber(this); }
        p_obj.style.imeMode = "disabled";
    }
}

setOnlyComNumber = function (p_obj) {
    if (p_obj) {
        p_obj.onkeydown = function () { fncSetOnlyComNumber(this); }
        p_obj.onkeyup = function () { fncSetOnlyComNumber(this); }
        p_obj.style.imeMode = "disabled";
    }
}

setOnlyPhoneNumber = function (p_obj) {
    if (p_obj) {
        p_obj.onkeydown = function () { fncSetOnlyPhoneNumber(this); }
        p_obj.onkeyup = function () { fncSetOnlyPhoneNumber(this); }
        p_obj.style.imeMode = "disabled";
    }
}

// 정수 값에 대한 , 처리
fncSetOnlyNumber = function (obj) {
    var val = String(obj.value.replace(/[^0-9]/g, ""));

    if (val.length < 1)
        return false;

    obj.value = number_format(val);
}

// 소수점 값에 대한 , 처리
fncSetOnlyComNumber = function (obj) {
    var val = String(obj.value.replace(/[^0-9\.]/g, ""));

    if (val.length < 1)
        return false;

    obj.value = number_format(val);
}

fncSetOnlyPhoneNumber = function (obj) {
    var val = String(obj.value.replace(/[^0-9]/g, ""));

    if (val.length < 1)
        return false;

    obj.value = val;
}

// 소수점 자리 제한
fncLimitCommNumber = function (obj, limit) {
    var upZero = '';
    var dnZero = '';
    var data = obj.value;
    limit = (limit == "") ? 0 : limit;

    // 소수점자리 분리
    var comLoc = data.toString().indexOf(".");
    if (comLoc > 0 && limit > 0) {
        upZero = data.toString().substr(0, comLoc);
        dnZero = data.toString().substr(comLoc + 1).replace(/\./g, "");

        if (limit > 0 && dnZero.length > limit)
            obj.value = upZero + "." + dnZero.substr(0, limit);
    }
}


// 1000자리 콤마표시
// 소수점 이하 자리의 경우 분리
number_format = function (data) {
    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;
    var upZero = '';
    var dnZero = '';
    var arrData;

    // +- 기호제거
    var sign = data.toString().match(/^[\+\-]/);
    if (sign != null) {
        data = data.toString().replace(/^[\+\-]/, "");
    }
    // , 기호 제거
    data = data.toString().replace(/\,/g, "");

    // 소수점자리 분리
    var comLoc = data.toString().indexOf(".");
    if (comLoc > 0) {
        upZero = data.toString().substr(0, comLoc);
        dnZero = data.toString().substr(comLoc + 1).replace(/\./g, "");
    }
    else {
        upZero = data;
        dnZero = "";
    }

    len = upZero.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i = 0; i < len; i++) {
        number = number + upZero.charAt(i);

        if (i < len - 1) {
            k++;
            if ((k % cutlen) == 0) {
                number = number + comma;
                k = 0;
            }
        }
    }

    if (sign != null)
        number = sign + number;

    if (dnZero != "" || comLoc > 0)
        number += "." + dnZero;

    return number;
}

/**
 * 바이트수 반환  
 * 
 * @param el : tag jquery object
 * @returns {Number}
 */
byteCheck = function (el) {
    var codeByte = 0;
    for (var idx = 0; idx < el.val().length; idx++) {
        var oneChar = escape(el.val().charAt(idx));
        if (oneChar.length == 1) {
            codeByte++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte++;
        }
    }
    return codeByte;
}

// To Change Serialzed value
changeSerialize = function (values, k, v) {
    var found = false;

    for (i = 0; i < values.length && !found; i++) {
        if (values[i].name == k) {
            values[i].value = v;
            found = true;
        }
    }

    if (!found) {
        values.push({ name: k, value: v });
    }

    return values;
}

/**************************************************
*   법인/사업자 체크
**************************************************/
// 사업자등록번호
checkBizNo = function (bizNo) {

    // bizNo 자리수 체크
    if (bizNo.length != 10) {
        return false;
    }

    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var i, chkSum = 0, c2, remander;
    bizNo = bizNo.replace(/-/gi, '');

    for (i = 0; i <= 7; i++) {
        chkSum += checkID[i] * bizNo.charAt(i);
    }

    c2 = "0" + (checkID[8] * bizNo.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);

    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));

    remander = (10 - (chkSum % 10)) % 10;

    if (Math.floor(bizNo.charAt(9)) == remander) {
        return true;
    } else {
        return false;
    }
}

// 법인등록번호
checkCorpNo = function (corpNo) {

    // corpNo 자리수 체크
    if (corpNo.length < 13) {
        return false;
    }

    var checkNum = new Array("1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2");
    
    var newNum = new Array();
    for (var i = 0; i < corpNo.length - 1; i++)
        newNum[i] = corpNo.charAt(i);

    var multiNum = new Array();
    for (var k = 0; k < newNum.length; k++)
        multiNum[k] = checkNum[k] * newNum[k];

    var addNum = 0;
    for (var y = 0; y < multiNum.length; y++)
        addNum = addNum + Number(multiNum[y]);

    var remainder;
    var quota;
    remainder = Number(addNum) % 10;
    quota = Number(addNum) / 10;

    var failCheckNum;
    if ((10 - Number(remainder)) == 10) {
        failCheckNum = 0;
    } else {
        failCheckNum = 10 - Number(remainder);
    }

    if (failCheckNum != corpNo.charAt(12)) {
        return false;
    }

    return true;
}


fnCheckFilePhoto = function (chFileName) {
    if (chFileName.match(/\.(jpg|jpeg|gif|png)$/i)) {
        return true;
    } else {
        alert("이미지 포맷만 등록가능합니다. (JPG, GIF, PNG)");
        return false;
    }
}

// Form 리셋
resetFrm = function (frmName) {
    $("#" + frmName).each(function () {
        this.reset();
    });
}