# -*- coding: utf-8 -*-
# Copyright (c) 2020, jan and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PettyCashRequest(Document):
	@frappe.whitelist()
	def generate_journal_entry(self):
		doc_jv = {
			"doctype": "Journal Entry",
			"voucher_type": "Journal Entry",
			"posting_date": self.posting_date,
			"accounts": self.jv_accounts(),
			"petty_cash_request": self.name,
		}

		jv = frappe.get_doc(doc_jv)
		jv.insert(ignore_permissions=1)
		# jv.submit()
		return jv.name

	@frappe.whitelist()
	def jv_accounts(self):
		accounts = []
		amount = 0

		accounts.append({
			'account': self.employee_account,
			'debit_in_account_currency': self.agent_outstanding_amount,
			'credit_in_account_currency': 0,
			'party_type': "Employee",
			'party': self.employee,
		})

		credit_acount = frappe.db.sql(""" SELECT * FROM `tabMode of Payment Account` WHERE parent=%s LIMIT 1""", self.mode_of_payment,as_dict=1)

		if len(credit_acount) > 0:
			accounts.append({
				'account': credit_acount[0].default_account,
				'debit_in_account_currency': 0,
				'credit_in_account_currency': self.agent_outstanding_amount,

			})
		print(accounts)
		return accounts

@frappe.whitelist()
def get_jv(name):
	jv = frappe.db.sql(""" SELECT * FROM `tabJournal Entry` WHERE petty_cash_request=%s""",name, as_dict=1)
	if len(jv) > 0:
		return True
	return False