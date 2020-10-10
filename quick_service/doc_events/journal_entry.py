import frappe

def submit_jv(doc, method):
    if doc.petty_cash_request:
        frappe.db.sql(""" UPDATE `tabPetty Cash Request` SET agent_outstanding_amount=0, status='Paid' WHERE name=%s """, doc.petty_cash_request)
        frappe.db.commit()