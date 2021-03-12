import {readdirSync} from 'fs';

//Find commands
const loadCommands = (client, dir = './commands/') => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(file => file.endsWith(".js"));
        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            //console.log(`Commande chargée: ${getFileName.help.name}`);
        }
    });
};
//Find Events
const loadEvents = (client, dir = './events/') => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(file => file.endsWith(".js"));
        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            //console.log(`Evenement chargée: ${evtName}`);
        }
    });
};

module.exports = {
    loadCommands,
    loadEvents,
}