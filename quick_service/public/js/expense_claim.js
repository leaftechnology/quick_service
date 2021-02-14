
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

cur_frm.cscript.expense_type = function (frm, cdt, cdn) {
   var d = locals[cdt][cdn]
	if(d.expense_type){
   		frappe.db.get_doc('Expense Claim Type', d.expense_type)
			.then(doc => {
					cur_frm.set_df_property("location", "reqd", doc.enable_location)
			})

	}
}