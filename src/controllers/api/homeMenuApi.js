const {homeMenuItemsGet} = require('../../modules/home_menu_items');

exports.get = async (req, res) => {

    try {
        const goals = await homeMenuItemsGet()
        res.json({data: goals || [], ok: true})
    } catch (e) {
        res.status(500).json({message: e.message, ok: false})
    }

}