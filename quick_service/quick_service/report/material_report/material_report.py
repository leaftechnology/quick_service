# Copyright (c) 2013, jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

def execute(filters=None):
	columns, data = [], []
	conditions = ""

	if filters.get("from_date") and filters.get("to_date"):
		conditions += " and transaction_date BETWEEN '{0}' and '{1}'".format(filters.get("from_date"),filters.get("to_date"))

	if filters.get("customer"):
		conditions += " and customer='{0}' ".format(filters.get("customer"))

	columns = [
		{"label": "Posting Date", "fieldname": "transaction_date", "fieldtype": "Data", "width": "100"},
		{"label": "Material Request", "fieldname": "name", "fieldtype": "Link", "options": "Material Request", "width": "180"},
		{"label": "Customer Name", "fieldname": "customer_name", "fieldtype": "Link", "options": "Material Request", "width": "300"},
		{"label": "SRN No / Job No", "fieldname": "srn_no", "fieldtype": "Data", "options": "Material Request Item", "width": "130"},
		{"label": "Item Code", "fieldname": "item_code", "fieldtype": "Data", "options": "Material Request", "width": "110"},
		{"label": "Item Name", "fieldname": "item_name", "fieldtype": "Data", "options": "Material Request Item", "width": "200"},
		{"label": "Status ", "fieldname": "status", "fieldtype": "Data", "options": "Material Request", "width": "130"},
	]
	query = """ SELECT 
 					A.transaction_date, 
 					A.name,
 					A.customer_name,
					A.srn_no,
					A.status,
					B.item_code,
					B.item_name
				FROM 
					`tabMaterial Request` AS A,
					`tabMaterial Request Item` AS B 
				WHERE A.docstatus = 1 {0}""".format(conditions)
	data = frappe.db.sql(query, as_dict=1)
	return columns, data