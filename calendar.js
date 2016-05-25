window.onload=function () {
	(function Inittoday () {
		var date = new Date();  
		var time = date.toString().split(" ");
		var lookday = document.getElementById('lookday');
		var month = makemonthtonum(time[1]);
		lookday.value = time[3]+"年"+month+"月"+time[2]+"日";
        var month = makemonthtonum(time[1]);
        date = new Date(time[3]+" "+month+" "+1);
        time= date.toString().split(" ");
        //console.log(time);
        Inittable(time);
	})();
	(function Initdisyear () {
        var date = new Date();  
        var time = date.toString().split(" ");
		var disyear = document.getElementById("disyear");
		for(var i = 1950;i < 2050; i++){
			var option = document.createElement("option");
			option.value = i;
            if(i == time[3]){
                option.selected = "selected";
            }
			option.innerHTML = i;
			disyear.appendChild(option);
		}
	})();
	(function Initdismonth () {
		var dismonth = document.getElementById("dismonth");
        var lookday = document.getElementById('lookday');
        var date = new Date();  
        var time = date.toString().split(" ");
        var month = makemonthtonum(time[1]);
		for(var i = 1;i <= 12; i++){
            var option = document.createElement("option");
			option.value = i + "月";
            if(i == month){
                option.selected = "selected";
            }
			option.innerHTML = i + "月";
			dismonth.appendChild(option);
		}
	})();
}
function Inittable (findday) {
        var calendar = document.getElementById("calendar");
        //console.log(findday);
        var list = {
            tdheight : "30px",
            tdwidth : "5%",
            rownum : "7",
            colnum : "7",
            thbackground : "black",
            thcolor : "white",
            border : "1px solid black",
            thcontent : ['日','一','二','三','四','五','六'],
        }
        for(var i = 0;i < list.rownum; i++){
            var tr = document.createElement('tr');
            if(i == 0){
                for(var j = 0;j < list.colnum;j++){
                    var td = document.createElement('td');
                    td.innerHTML = list.thcontent[j];
                    td.style.width = list.tdwidth;
                    td.style.height = list.tdheight;
                    td.style.border = list.border;
                    td.style.color = list.thcolor;
                    td.style.background = list.thbackground;
                    tr.appendChild(td);
                }
            }
            else{
                for(var j = 0;j < list.colnum;j++){
                    var td = document.createElement('td');
                    td.style.width = list.tdwidth;
                    td.style.height = list.tdheight;
                    td.style.border = list.border;
                    (function(td){
                       return td.onmouseover = function(){
                        td.style.background = "black";
                        td.style.color = "white";
                       }
                    })(td);
                    (function(td){
                       return td.onmouseout = function(){
                        td.style.background = "white";
                        td.style.color = "black";
                    }
                    })(td);
                    tr.appendChild(td);
                }
            }
            calendar.appendChild(tr);
        }
          var lookday = document.getElementById('lookday');
          var week = makeweektonum(findday[0]);
          //console.log(week);
          var daylist = calendar.getElementsByTagName('td');
          var daynumber = 7+week;
          var daylength = getmonthdaylength(findday[1],findday[3]);
          //console.log(daynumber);
          for(i = 1 ; i <=daylength ; i++){
              daylist[daynumber].innerHTML = i;
              (function(daynumber,i,findday){
                return daylist[daynumber].onclick = function(){
                lookday.value = findday[3]+"年"+makemonthtonum(findday[1])+"月"+i+"日";
                getevents();
              }
              })(daynumber,i,findday);
              daynumber++;
          }
    }
function getevents () {
    var lookday = document.getElementById('lookday');
    var notebook = document.getElementById('notebook');
    var day = getStringToArray(lookday.value);
    var text = document.getElementById('text');
    if(document.getElementById(day) == null){
         text.value = "";
    }
    else{
         var daynote = document.getElementById(day).innerHTML;
         text.value = daynote;
    }
    var floatdiv = document.getElementsByClassName('floatdiv')[0];
    var body=document.getElementsByTagName('body')[0];
    floatdiv.style.display = "block";
    body.style.background = "#F2DAE3";
    var cancel = document.getElementById('cancel');
    cancel.onclick = function(){
         floatdiv.style.display = "none";
         body.style.background = "white";
    }
    var ensure = document.getElementById('ensure');
    ensure.onclick = function(){     
         if(document.getElementById(day) == null){
             var today = document.createElement('div');
             today.id = day;
             today.innerHTML = text.value;
             notebook.appendChild(today);
         }
         else{
             var today = document.getElementById(day);
             today.innerHTML = text.value
         }
         floatdiv.style.display = "none";
         body.style.background = "white";
     }
}
function getStringToArray (day) {
    var year = day.substring(0,4);
    var indexyear = day.indexOf("年");
    var indexmonth = day.indexOf("月");
    var indexday = day.indexOf("日");
    var month = day.substring(indexyear + 1,indexmonth);
    day = day.substring(indexmonth + 1,indexday);
    //console.log(year+" "+month+" "+day);
    return year+" "+month+" "+day;
}
function getmonthdaylength (month,year) {
    var length;
    switch (month){
        case "Jan" : length = 31; break;
        case "Feb" : if(year % 4 == 0){
            length = 29;
        }
        else{
            length = 28;
        }
        break;
        case "Mar" : length = 31; break;
        case "Apr" : length = 30; break;
        case "May" : length = 31; break;
        case "Jun" : length = 30; break;
        case "Jul" : length = 31; break;
        case "Aug" : length = 31; break;
        case "Sep" : length = 30; break;
        case "Oct" : length = 31; break;
        case "Nov" : length = 30; break;
        case "Dec" : length = 31; break;
    }
    //console.log(length);
    return length;
}
function makemonthtonum (monthday) {
	switch (monthday){
		case "Jan" : return 1;
        case "Feb" : return 2;
        case "Mar" : return 3;
        case "Apr" : return 4;
        case "May" : return 5;
        case "June" : return 6;
        case "July" : return 7;
        case "Aug" : return 8;
        case "Sept" : return 9;
        case "Oct" : return 10;
        case "Nov" : return 11;
        case "Dec" : return 12;
	}
}
function makeweektonum (weekday) {
    switch (weekday){
        case "Mon" : return 1;
        case "Tue" : return 2;
        case "Wed" : return 3;
        case "Thu" : return 4;
        case "Fri" : return 5;
        case "Sat" : return 6;
        case "Sun" : return 0;
    }
}
 function selecttime () {
        var year = document.getElementById('disyear');
        var month = document.getElementById('dismonth');
        var indexyear = year.selectedIndex;
        var changeyear = year.options[indexyear].value;
        var indexmonth = month.selectedIndex;
        var changemonth = month.options[indexmonth].value;
        var calendar = document.getElementById('calendar');
        var list = calendar.getElementsByTagName('tr');
        var delectlength = list.length;
        for(var i = 0;i < delectlength; i++){
            calendar.removeChild(list[0]);
        }
        changemonth = changemonth.substring(0,changemonth.length-1);
        var lookday = document.getElementById("lookday");
        console.log(lookday);
        lookday.value = changeyear+"年"+changemonth+"月"+1+'日';
        //console.log(changemonth);
        var findday = new Date(changeyear+' '+changemonth+' '+1);
        //console.log(findday.toString().split(' '));
        Inittable(findday.toString().split(' '));
    }