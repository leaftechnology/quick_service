import frappe


def submit_so(doc, method):
    # parent_cc = frappe.db.sql(""" SELECT * FROM `tabCost Center` WHERE is_group=1 LIMIT 1""", as_dict=1)
    parent_cc = frappe.get_value("Global Defaults", "Global Defaults", "default_cost_center")
    if parent_cc:
        obj = {
            "doctype": "Cost Center",
            "cost_center_name": doc.name,
            "parent_cost_center":parent_cc,
            "sales_order":doc.name
        }
        frappe.get_doc(obj).insert()


def cancel_so(doc, method):

    frappe.db.sql(""" DELETE FROM `tabCost Center` WHERE sales_order=%s """,doc.name)
    frappe.db.commit()

