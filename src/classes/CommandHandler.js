import RandomValues from "../classes/RandomValues";
import Store from "../store/Store";

export default {
    commands: [
        'user',
        'nick',
        'join',
        'help'
    ],
    store: {},
    handleCommands: function (toHistoryWithArgs, text) {
        let command = '';
        text = text.toLowerCase() + ' ';

        // look for the command (slow implementation TODO)
        for (let i = 0; i < this.commands.length; i++) {
            if (text.substr(0, this.commands[i].length + 1) === this.commands[i] + ' ') {
                command = this.commands[i];
                break;
            }
        }

        // Skip if no command
        if (command === '') {
            return;
        }

        // some random numbers for oldschool vibes
        let delay = Math.floor((Math.random() * 150) + 50);
        let dns = RandomValues.randomDns();

        // Print the command specific output
        text = text.trim();
        let comArgs = text.split(' ');
        switch (command) {
            case 'user':
                if (comArgs.length < 5) {
                    toHistoryWithArgs(':' + Store.state.chatServer + ' 461 * ', ':Not enough parameters', delay);
                    break;
                }

                Store.setUser(comArgs[1], comArgs[2], comArgs[3], comArgs[4]);

                break;
            case 'nick':
                if (comArgs.length < 2) {
                    toHistoryWithArgs('' + Store.state.chatServer + ' 461 * ', ':Not enough parameters', delay);
                    break;
                }

                Store.setNick(comArgs[1]);

                break;
            case 'join':
                // Only valid command for registered users
                if (!Store.state.registered) {
                    toHistoryWithArgs(':' + Store.state.chatServer + ' 451 * ', ':You have not registered', delay);
                    break;
                }

                if (comArgs.length < 2) {
                    toHistoryWithArgs(':' + Store.state.chatServer + ' 461 ' + Store.state.nick + ' ', ':Not enough parameters', delay);
                    break;
                }

                Store.setChannel(comArgs[1]);

                // TODO check if channel exists
                toHistoryWithArgs('', ':' + Store.state.nick + '!~' + Store.state.userName + '@' + dns + ' JOIN ' + comArgs[1], delay);

                break;
            case 'help':
                // Only valid command for registered users
                if (!Store.state.registered) {
                    toHistoryWithArgs(':' + Store.state.chatServer + ' 451 * ', ':You have not registered', delay);
                    break;
                }

                toHistoryWithArgs(':' + Store.state.chatServer + ' 704 ' + Store.state.nick + ' index ', ':Help topics available to users:', delay);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':ACCEPT          ADMIN           AWAY            CHALLENGE', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':CMODE           CNOTICE         CPRIVMSG        CREDITS', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':ERROR           EXTBAN          HELP            INDEX', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':INFO            INVITE          ISON            JOIN', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':KICK            KNOCK           LINKS           LIST', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':LUSERS          MAP             MOTD            NAMES', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':NICK            NOTICE          OPER            PART', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':PASS            PING            PONG            PRIVMSG', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':QUIT            STATS           TIME            TOPIC', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':TRACE           UMODE           USER            USERHOST', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':USERS           VERSION         WHO             WHOIS', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 705 ' + Store.state.nick + ' index ', ':WHOWAS', 10);
                toHistoryWithArgs(':' + Store.state.chatServer + ' 706 ' + Store.state.nick + ' index ', ':End of /HELP', 10);

                break;
        }

        // If USER and NICK is set then user is registered
        if (Store.state.userName !== null && Store.state.nick !== null) {
            Store.setRegistered(true);
        }
    }
}