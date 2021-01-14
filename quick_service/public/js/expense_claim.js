

cur_frm.cscript.km = function (frm, cdt, cdn) {
    var d = locals[cdt][cdn]
    if(d.km < 70){
        d.amount = 0
        cur_frm.refresh_field("location")
    }

    else if(d.km >= 70 && d.km <=200){
        d.amount = cur_frm.doc.grade === "L1" ? 70 : cur_frm.doc.grade === "L2" ? 100 : cur_frm.doc.grade === "L3" ? 150 : cur_frm.doc.grade === "L4" ? 220 :cur_frm.doc.grade === "L5" ? 500 : 0
        cur_frm.refresh_field("location")
    }
    else if(d.km > 200){
        d.amount = cur_frm.doc.grade === "L1" ? 150 : cur_frm.doc.grade === "L2" ? 200 : cur_frm.doc.grade === "L3" ? 300 : cur_frm.doc.grade === "L4" ? 500 :cur_frm.doc.grade === "L5" ? 1000 : 0
        cur_frm.refresh_field("location")
    }
    compute_total_km(cur_frm)
}

function compute_total_km(cur_frm){
    var total=0
    for(var i=0;i<cur_frm.doc.location.length;i+=1){
        total += cur_frm.doc.location[i].km
    }
    cur_frm.doc.total_km = total
    cur_frm.refresh_field("total_km")
}

cur_frm.cscript.form_render = function () {
    $.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
	  var placesAutocomplete = places({
		appId: 'plBBA3S4UJ7B',
		apiKey: '0862ae80a132be1181fac98cf20ecfac',
		container: document.querySelectorAll('[data-fieldname = "from_location"]')[4]
	  });

	  var $address = document.querySelectorAll('[data-fieldname = "from_location"]')[4]
	  placesAutocomplete.on('change', function(e) {
		$address.textContent = e.suggestion.value
	  });

	  placesAutocomplete.on('clear', function() {
		$address.textContent = 'none';
	  });
})
$.getScript("https://cdn.jsdelivr.net/npm/places.js@1.19.0", function () {
	  var placesAutocomplete = places({
		appId: 'plBBA3S4UJ7B',
		apiKey: '0862ae80a132be1181fac98cf20ecfac',
		container: document.querySelectorAll('[data-fieldname = "to_location"]')[4]
	  });

	  var $address = document.querySelectorAll('[data-fieldname = "to_location"]')[4]
	  placesAutocomplete.on('change', function(e) {
		$address.textContent = e.suggestion.value
	  });

	  placesAutocomplete.on('clear', function() {
		$address.textContent = 'none';
	  });
})
}
