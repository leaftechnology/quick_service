// Copyright (c) 2016, jan and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Material Report"] = {
	"filters": [
		{
			"fieldname":"from_date",
			"label":__("From Date"),
			"fieldtype":"Date",
		},
		{
			"fieldtype":"to_date",
			"label":__("To Date"),
			"fieldtype":"Date",
		},
		{
			"fieldtype":"purchase_customer",
			"label":__("Requestd Customer"),
			"fieldtype":"Link",
			"options": "Customer",
		},
		{
			"fieldtype":"srn_no",
			"label":__("SRN No / Job No"),
			"fieldtype":"Data",
			"options": "Material Request",
		}

	]
};
