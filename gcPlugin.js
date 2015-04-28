jQuery.fn.extend({
	uiLock: function(content){
		if(content == 'undefined') content = '';
		$('<div></div>').attr('id', 'uiLockId').css({
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'z-index': 1000,
			'opacity': 0.6,
			'width':'100%',
			'height':'100%',
			'color':'white',
			'background-color':'black'
		}).html(content).appendTo('body');
	},
	uiUnlock: function(){

		$('#uiLockId').remove();
	},
	goTop: function(selector,src){
		if (src === undefined)
			src	=	"http://kronusteam.com/public/img/top-black.png";
		
		$window = $(window);
		var offsets = $(selector).offset();
		var alto = $(selector).height();
		var top = offsets.top+alto-(alto/2);

		var	content = "<img src='"+src+"' width='60px;' border='0' onclick='$(\""+selector+"\").moveScroll();'/>";
		

		$('<div></div>').attr('id', 'btnGoTop').css({
			'position': 'fixed',
			'bottom': 10,
			'right': 10,
			'z-index': 1000,
			'display': 'scroll',
			'cursor': 'pointer'
		}).html(content).appendTo('body');
		

		$window.scroll(function () {
			if ($window.scrollTop() <= top) {
				$('#btnGoTop').fadeOut('fast');
			} else {
				$('#btnGoTop').fadeIn("fast");
			}
		});	
	},
	sleepFor:function ( sleepDuration ){
		var now = new Date().getTime();
		while(new Date().getTime() < now + sleepDuration){ }
	},
	isValidRut: function(boolAutoComplete,rutA){
		var rut ="";
		(boolAutoComplete===undefined) ? boolAutoComplete = false : boolAutoComplete = true;

		(rutA===undefined)? rut = $(this).val() : rut =	rutA;

		var tmpstr = "";
		for (i = 0; i < rut.length; i++)
			if (rut.charAt(i) != ' ' && rut.charAt(i) != '.' && rut.charAt(i) != '-')
				tmpstr = tmpstr + rut.charAt(i);
			rut = tmpstr;
			largo = rut.length;
			
			tmpstr = "";
			for (i = 0; rut.charAt(i) == '0'; i++);
				for (; i < rut.length; i++)
					tmpstr = tmpstr + rut.charAt(i);
				rut = tmpstr;
				largo = rut.length;
			
			if (largo < 2) {
				return false;
			}
			for (i = 0; i < largo; i++) {
				if (rut.charAt(i) != "0" && rut.charAt(i) != "1" && rut.charAt(i) != "2" && rut.charAt(i) != "3" && rut.charAt(i) != "4" && rut.charAt(i) != "5" && rut.charAt(i) != "6" && rut.charAt(i) != "7" && rut.charAt(i) != "8" && rut.charAt(i) != "9" && rut.charAt(i) != "k" && rut.charAt(i) != "K") {
					return false;
				}
			}

			var invertido = "";
			for (i = (largo - 1), j = 0; i >= 0; i--, j++)
				invertido = invertido + rut.charAt(i);
			var drut = "";
			drut = drut + invertido.charAt(0);
			drut = drut + '-';
			cnt = 0;
			for (i = 1, j = 2; i < largo; i++, j++) {
				if (cnt == 3) {
					drut = drut + '.';
					j++;
					drut = drut + invertido.charAt(i);
					cnt = 1;
				} else {
					drut = drut + invertido.charAt(i);
					cnt++;
				}
			}
			invertido = "";
			for (i = (drut.length - 1), j = 0; i >= 0; i--, j++)
				invertido = invertido + drut.charAt(i);
			if (this.checkDV(rut)){
				$(this).val(invertido);
				return true;
			}else{
				if(!boolAutoComplete){
					$(this).val('');
					$(this).focus();
					return false;
				}else{
					var dv	=	this.getDV(true,rut);
					rut+=dv;
					this.isValidRut(rut);
				}
			}
	},
	checkDV: function(crut){
		largo = crut.length;
		if (largo < 2) {
			return false;
		}
		if (largo > 2)
			rut = crut.substring(0, largo - 1);
		else
			rut = crut.charAt(0);
		dv = crut.charAt(largo - 1);
		this.checkCDV(dv);
		if (rut === null || dv === null)
			return 0;
		var dvr = '0';
		suma = 0;
		mul = 2;
		for (i = rut.length - 1; i >= 0; i--) {
			suma = suma + rut.charAt(i) * mul;
			if (mul == 7)
				mul = 2;
			else
				mul++;
		}
		res = suma % 11;
		if (res === 1)
			dvr = 'k';
		else if (res === 0)
			dvr = '0';
		else {
			dvi = 11 - res;
			dvr = dvi + "";
		}
		if (dvr != dv.toLowerCase()) {
			return false;
		}
		return true;		
	},
	checkCDV: function(dvr) {
		dv = dvr + "";
		if (dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k' && dv != 'K') {
			return false;
		}
		return true;
	},
	getDV:function(rut){
		var dvr = '0';
		suma = 0;
		mul = 2;
		for (i = rut.length - 1; i >= 0; i--) {
			suma = suma + rut.charAt(i) * mul;
			if (mul == 7)
				mul = 2;
			else
				mul++;
		}
		res = suma % 11;
		if (res == 1)
			dvr = 'k';
		else if (res === 0)
			dvr = '0';
		else {
			dvi = 11 - res;
			dvr = dvi + "";
		}
		return dvr;
	},
	preLoadImage:function(evt,selector) {
		var files = evt.target.files;
		for (var i = 0, f; f = files[i]; i++) {

		if (!f.type.match('image.*')) {
			continue;
		}
		var reader = new FileReader();

			reader.onload = (function(theFile) {
				return function(e) {
					$(selector).prop("src",e.target.result);
				};
			})(f);

			reader.readAsDataURL(f);
		}
	},
	isValidDate: function (day,month,year){
		var dteDate;

        month=month-1;
        dteDate=new Date(year,month,day);
        
        return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
    },
    convertirFechaAIngles:  function (dateEs,formatReturn){
    	var patron=new RegExp("^([0-9]{1,2})([/])([0-9]{1,2})([/])(19|20)+([0-9]{2})$");

        if(dateEs.search(patron)===0)
        {
        	values=dateEs.split("/");
            // Revisamos que la fecha sea correcta
            if(this.isValidDate(values[0],values[1],values[2]))
            {
                // devuelve la fecha en formato ingles
                if(formatReturn==2)
                {
                    // puedes devolver un objeto fecha para trabajar con el
                    return new Date(values[2],(parseInt(values[1])-1),values[0]);
                }else{
                    // puedes devolver simplemente la fecha en formato cadena
                    return values[2]+"/"+values[1]+"/"+values[0];
                }
            }
        }
        return "";
    },
    getNowDate: function(format,separator){
    	if (separator===undefined) separator = " / ";

    	var today = new Date();
    	var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		if(format == "es")
			return (dd + separator + mm + separator + yyyy);
		else
			return (yyyy + separator + mm +separator + dd);
	},
	getUrlVars: function () {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	},
	isValidText: function (string){
		var text;
		if(string===undefined)
			text = $(this).val();
		else
			text = string;

		var pattern = /^[-_\w\.\ \u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]+$/;

		if(pattern.test(text)){
			return true;
		}else{
			if(string===undefined){
				$(this).val('');
				$(this).focus();	
			}
			return false;	
		}
	},
	isValidEmail: function (string){
		var email;
		if(string===undefined)
			email = $(this).val();
		else
			email = string;

		var pattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,10}/;
		if(!pattern.test(email)){
			if(string===undefined){
				$(this).val("");
				$(this).focus();
			}
			return false;
		}else{
			return true;  
		}
	},
	isValidPhone: function(string,format){
		var phone;
		if(string === undefined)
			phone = $(this).val();
		else
			phone = string;
		
		var pattern;

		if(format === undefined) pattern = /[0-9]/;
		if(format === 1) pattern = "/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})$/";
		
		if(pattern.test(phone) && phone.length >= 8){
			return true;  
		}else{
			if(string===undefined){
				$(this).val("");
				$(this).focus();
			}
			return false;
		}
	},
	isNumeric: function(number){
		if(number === undefined)
			number = $(this).val();

		var pattern= /[^0-9]/;	
		if(!pattern.test(number)){
			return true;  
		}else{
			if (numbers === undefined) {
				$(this).val("");
				$(this).focus();
			}
			return false;
		}
	},
	searcher: function(toSearch,list){
		var pattern = new RegExp(toSearch.val(), "i");
		list.each(function(index,element){
			if(!$(element).text().match(pattern)){
				$(element).hide();
			}else{
				$(element).show();
			}
		});
	},
	getCookie: function (c_name) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1) {
			c_start = c_value.indexOf(c_name + "=");
		}
		if (c_start == -1) {
			c_value = null;
		} else {
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start, c_end));
		}
		return c_value;
	},
	setCookie: function (c_name, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value+"; path=/";
	},
	checkCookie: function (c_name) {
		var cookie = this.getCookie(c_name);
		if (cookie !== null && cookie !== ""){
			return cookie;
		} else {
			return false;
		}
	},
	createXML: function(struct){
		if (window.DOMParser){
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(struct,"text/xml");
		}else{
			// Internet Explorer
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(struct);
		}
		return xmlDoc;
	},
	moveScroll: function(add,speed){
		if(add === undefined){
			add=0;	
		}
		if(speed === undefined){
			speed=400;
		}
		var st=$(this).offset().top + add;
		$("body,html").animate({
			scrollTop: st
		},speed,function(){  }
		);	
	},
	relocate:function(url,params,target){
		if (target===undefined) {target ='_self';}
		var body = document.body;
		form=document.createElement('form'); 
		form.method = 'POST'; 
		form.action = url;
		form.name = 'jsform';
		form.target = target;
		for (index in params){
			var input = document.createElement('input');
			input.type='hidden';
			input.name=index;
			input.id=index;
			input.value=params[index];
			form.appendChild(input);
		}	  		  			  
		body.appendChild(form);
		form.submit();
	},
	cleanAccents:function(html){
		while (html.indexOf('á') != -1) html = html.replace('á', '&aacute;');
		while (html.indexOf('é') != -1) html = html.replace('é', '&eacute;');
		while (html.indexOf('í') != -1) html = html.replace('í', '&iacute;');
		while (html.indexOf('ó') != -1) html = html.replace('ó', '&oacute;');
		while (html.indexOf('ú') != -1) html = html.replace('ú', '&uacute;');
		while (html.indexOf('à') != -1) html = html.replace('à', '&aagrave;');
		while (html.indexOf('è') != -1) html = html.replace('è', '&eagrave;');
		while (html.indexOf('ì') != -1) html = html.replace('ì', '&iagrave;');
		while (html.indexOf('ò') != -1) html = html.replace('ò', '&oagrave;');
		while (html.indexOf('ù') != -1) html = html.replace('ù', '&uagrave;');


		while (html.indexOf('º') != -1) html = html.replace('º', '&ordm;');  
		while (html.indexOf('Ñ') != -1) html = html.replace('Ñ', '&Ntilde;');
		while (html.indexOf('ñ') != -1) html = html.replace('ñ', '&ntilde;');


		while (html.indexOf('Á') != -1) html = html.replace('Á', '&Aacute;');
		while (html.indexOf('À') != -1) html = html.replace('À', '&Agrave;');
		while (html.indexOf('É') != -1) html = html.replace('É', '&Eacute;');
		while (html.indexOf('È') != -1) html = html.replace('È', '&Egrave;');
		while (html.indexOf('Í') != -1) html = html.replace('Í', '&Iacute;');
		while (html.indexOf('Ì') != -1) html = html.replace('Ì', '&Igrave;');
		while (html.indexOf('Ó') != -1) html = html.replace('Ó', '&Oacute;');
		while (html.indexOf('Ò') != -1) html = html.replace('Ò', '&Ograve;');
		while (html.indexOf('Ú') != -1) html = html.replace('Ú', '&Uacute;');
		while (html.indexOf('Ù') != -1) html = html.replace('Ù', '&Ugrave;');
		return html;
	},
	exportTableToExcel: function (selectorTableId,worksheetName,selectorOriginDiv,boolDeleteColumn) {
		var tableAux;
		if(boolDeleteColumn===true){
			tableAux = $(selectorOriginDiv).html();

			$("#toDelete").remove();
			$(".toDelete").remove();
		}

		var html = $(selectorTableId).html();
		if(boolDeleteColumn===true){
			$(selectorOriginDiv).html(tableAux);
		}
		html 	=	this.cleanAccents(html);
		
		var uri = 'data:application/vnd.ms-excel;base64,';
		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
		base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) };
		format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };

		var ctx = {worksheet: worksheetName || 'Worksheet', table: html};
		window.location.href = uri + base64(format(template, ctx));
	},
	getBrowser: function(){
		var nav = navigator.userAgent.toLowerCase();
	    if(nav.indexOf("msie") != -1){
			return "IE";
	    } else if(nav.indexOf("firefox") != -1){
	    	return "Firefox";
	    } else if(nav.indexOf("opera") != -1){
	    	return "Opera";
	    } else if(nav.indexOf("chrome") != -1){
			return "Chrome";
	    } else {
	    	return "Desconosco";
	    }
	}
});