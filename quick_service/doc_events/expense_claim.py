import frappe


@frappe.whitelist()
def validate_ec(doc, method):
    doc.grand_total = doc.grand_total * doc.total_km
    doc.total_sanctioned_amount = doc.total_sanctioned_amount * doc.total_km
    doc.total_claimed_amount = doc.total_claimed_amount * doc.total_km
    enable_location = False
    for i in doc.expenses:
        get_claim_type = frappe.db.sql(""" SELECT * FROM `tabExpense Claim Type` WHERE name=%s """, i.expense_type, as_dict=1)
        if len(get_claim_type) > 0:
            enable_location = get_claim_type[0].enable_location
            break


    for ii in doc.location:
        if enable_location and (not ii.from_location or not ii.to_location):
            frappe.throw("From Location or To Location is Mandatory")