const {capitalize} = require('../../function/other/string');
const getItemInfo = require('../../assets/shop/shop.json');
const {calculateUserStatsEquip} = require('../../function/rpg/stats')

module.exports.run = async (client, message, args, userInfo) => {
    const q = args.join(" ");
    const userInventory = userInfo.inventory
    const userInventoryItemPosition = userInventory.indexOf(capitalize(q))
    if (userInventoryItemPosition === -1) return message.reply("Vous ne possédez pas cet objet dans votre inventaire (ou alors, vous l'avez mal orthographié)");
    const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(capitalize(q));
    const healPoint = getItemInfo.map(h => h.stats.vitality).indexOf(capitalize(q));
    let heal
    if (userInfo.stats.vitality + healPoint > userInfo.statsMax.vitality) {
        heal = userInfo.statsMax.vitality - userInfo.stats.vitality;
    } else {
        heal = healPoint
    }
    if (q[getItemInfo[itemInfoPosition].type] === 'potion') return message.reply("Tu ne peux pas boire un objet !")
    userInventory.splice(userInventoryItemPosition, 1);
    client.updateUserInfo(message.member, {
        "users.$.inventory": userInventory
    });
    await calculateUserStatsEquip(client, message);
    return message.reply(`Tu as bien bu ta potion ! tu as récupéré ${heal}`);

}

module.exports.help = {
    name: 'use',
    category: 'rpg',
    description: 'Permet de boire une potion',
    cd: 1,
    usage: "<object>",
    isUserAdmin: false,
    permissions: false,
    args: true,
    profile: true
}