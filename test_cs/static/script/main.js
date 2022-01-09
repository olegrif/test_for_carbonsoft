
var first = true;

$(function () {

    if (first) {
        if (browser()==0) {
            return;
        }
        var cdt = new Date();
        rus();  
        $("#do_date").datepicker();
		func_hide();
		aim_hide();
		$("#do_date").attr("autocomplete", "off");
		var title="Необходимо приложить следующие файлы: \n 1)	Задание на разработку доработку функции по шаблону (скачать шаблон) \
		   \n 2)	Нормативный документ, регламентирующий автоматизируемый процесс";
		title=title.replace(/\n/g, '\u000d');
		$('input:radio[name="aim_group"]').filter('[value=2]').attr('title', title);
		var obj1=$('input:radio[name="aim_group"]').filter('[value=2]');
		var label1 = $("label[for='" + $(obj1).attr('id') + "']");
		label1.each(function( index ) {
			if (index==1) $(this).attr('title', title);
		});
		
		title="Опишите последовательность действий, которая привела к ошибке. \n Необходимо приложить следующие файлы: \
		\n 1)	 Приложите снимок экрана с ошибкой \
		\n 2)	 Если ошибка вызвана загрузкой файла – добавьте этот файл. ";
		title=title.replace(/\n/g, '\u000d');
		$('input:radio[name="aim_group"]').filter('[value=1]').attr('title', title);
		var obj2=$('input:radio[name="aim_group"]').filter('[value=1]');		
		var label2 = $("label[for='" + $(obj2).attr('id') + "']");
		label2.each(function( index ) {
			if (index==1) $(this).attr('title', title);
		});
		//$(label2).attr('title', title);
		title="Необходимо приложить следующие файлы: \n 1)	Задание на изменение БД (скачать шаблон) \
		\n 2)	Инициирующий изменения документ";
		title=title.replace(/\n/g, '\u000d');
		$('input:radio[name="aim_group"]').filter('[value=3]').attr('title', title);
		var obj3=$('input:radio[name="aim_group"]').filter('[value=3]');
		var label3 = $("label[for='" + $(obj3).attr('id') + "']");
		label3.each(function( index ) {
			if (index==1) $(this).attr('title', title);
		});
		//$(label3).attr('title', title);
		title="Необходимо приложить следующие файлы: \
		\n 1)	Задание на разработку по шаблону (скачать шаблон) \
		\n 2)	Инициирующий справку документ";
		title=title.replace(/\n/g, '\u000d');
		$('input:radio[name="favorite_group"]').filter('[value=2]').attr('title', title);
		var obj4=$('input:radio[name="favorite_group"]').filter('[value=2]');
		var label4 = $("label[for='" + $(obj4).attr('id') + "']");
		$(label4).attr('title', title);
		//title="Если нужно более 1 файла, создаём архив с файлами";
		//$('#id_myfile').attr('title', title);
        
        
        
		first = false;
		
		
		
    }  
$('input:radio[name=favorite_group]').on('change', function () {
	
	switch ($(this).val()){
		case "1":
		case "2":
		aim_hide();
		func_hide();
		break;
		case "3":
		func_show();
		aim_show();
		break;
		case "4":
		case "5":
		case "6":
		aim_show();
		func_hide();
		break;
	};
});
$('#do_date').on('change', function (){
    var dt_string=$('#do_date').val();
    var dt=to_date(dt_string);
    var cdt=format();
    if (dt<cdt){
        DateMessage();
    };
    
})

});
function to_date(str) {
    var parts=str.split('.');
    var dtstr=parts[2]+'-'+parts[1]+'-'+parts[0];
    var dt=new Date(dtstr);
    return dt;
}
function format() {
    var curdt=new Date();
    var d = curdt.getDate();
    var m = curdt.getMonth() + 1;
    var y = curdt.getFullYear();
    var dtstr= '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    var dt=new Date(dtstr);
    return dt;
}
 
function func_show() {    
    $('#id_func_select').prop('disabled', false);
    $('#id_group').prop('disabled', false);
    $('#func_lg').css('color', '#000');
}
function func_hide() {    
    $('#id_func_select').prop('disabled', true);
    $('#id_group').prop('disabled', true);
    $('#func_lg').css('color', '#ccc');
}

function aim_show() {
    $('input:radio[name=aim_group]').prop('disabled', false);
    $('#aim_fs label').prop('disabled', false);
    $('#aim_fs label').css('color', '#000');
    $('#aim_lg').css('color', '#000');
}

function aim_hide() {
    $('input:radio[name=aim_group]').prop('disabled', true);
    $('#aim_fs label').prop('disabled', true);
    $('#aim_fs label').css('color', '#ccc');
    $('#aim_lg').css('color', '#ccc');
}

 function browser()
{
    var ua = navigator.userAgent;
    if (ua.search(/MSIE/) > 0) {
        alert("Internet Explorer не поддерживается.")
        return 0
    } else {return 1;}
}

function rus()
{
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
}
function DateMessage() {
    elem = '<div id="dlg_result">Выберите корректную дату...</div>';
    $(elem).appendTo("body");

    $("#dlg_result").dialog({
        autoOpen: open,
        height: 100,
        width: 250,
        modal: true
        	
    });
    $('#do_date').focus();
};
function SetResult() {
    elem = '<div id="dlg_result">Заявка отправляется...</div>';
    $(elem).appendTo("body");

    $("#dlg_result").dialog({
        autoOpen: open,
        height: 100,
        width: 250,
        modal: true,
        dialogClass: "no-close"		
    });
    $('#form1').submit();
};
function dlgResultOpen() {
    $("#dlg_result").dialog("open");
};

function dlgResultClose() {
    $("#dlg_result").dialog("close");
};

