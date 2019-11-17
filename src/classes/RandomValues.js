export default {
    randomChatServer: function () {
        const server = [
            'bigbrother.pollux.server.de',
            'chatrelay1.pollux-server.de',
            'chatrelay2.pollux-server.de',
            'chatrelay3.pollux-server.de',
            'somewhere-in-china.pollux-server.de',
            'freeirc.pollux-server.de',
            'chatter.pollux-server.de',
            'irc0.pollux-server.de',
            'irc1.pollux-server.de',
            'irc2.pollux-server.de',
            'irc4.pollux-server.de',
            'irc8.pollux-server.de',
            'irc16.pollux-server.de',
            'irc32.pollux-server.de',
            'irc64.pollux-server.de',
            'irc128.pollux-server.de',
        ];
        let r = Math.floor((Math.random() * 15) + 0);
        return server[r];
    },
    randomDns: function () {
        const dns = [
            'dslb-117-254-094-228.117.254.pools.telekom.de',
            'dslb-014-121-096-031.014.121.pools.vodafone.de',
            'dslb-096-031-098-188.096.031.pools.unitmedia.de'
        ];
        let r = Math.floor((Math.random() * 2) + 0);
        return dns[r];
    }
}