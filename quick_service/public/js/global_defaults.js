


cur_frm.cscript.refresh = function () {
    cur_frm.set_query('default_cost_center', () => {
    return {
        filters: {
            is_group: 1
        }
    }
})
}