export default {
    state: {
        chatServer: '',
        nick: null,
        userName: null,
        userHost: null,
        userServer: null,
        userReal: null,
        registered: false,
        channel: null
    },
    setChatServer: function (newChatServer) {
        this.state.chatServer = newChatServer;
    },
    setNick: function (newNick) {
        this.state.nick = newNick;
    },
    setUser: function (newName, newHost, newServer, newRealName) {
        this.state.userName = newName;
        this.state.userHost = newHost;
        this.state.userServer = newServer;
        this.state.userReal = newRealName;
    },
    setRegistered: function (bool) {
        this.state.registered = bool;
    },
    setChannel: function (newChannel) {
        this.state.channel = newChannel;
    }
}