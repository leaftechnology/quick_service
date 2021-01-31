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
			"fieldtype":"customer",
			"label":__("Requestd Customer"),
			"fieldtype":"Link",
			"options": "Customer",
		},
		{
			"fieldtype":"name",
			"label":__("Material Request"),
			"fieldtype":"Link",
			"options": "Material Request",
		}

	]
};
