<template>
    <div class="Login" v-on:click="focusPrompt">
        <!-- TELNET OPEN CONNECTION COMMAND -->
        <div class="line">C&gt;telnet irc.pollux-server.de 6667</div>

        <!-- CONSOLE OUTPUT / HISTORY -->
        <div id="history" class="history">
            <div v-for="entry in history" v-bind:key="entry.id">
                <pre class="line">{{ entry.pre }}{{ entry.text }}</pre>
            </div>
        </div>

        <!-- USER INPUT PROMPT -->
        <div class="line">
            {{ promptPrefix }}<input class="prompt" id="prompt" v-on:keypress.enter="toHistory" v-on:input="changeSize" v-model="userInput" v-bind:size="inputSize" autofocus/>
            <span class="blinking-cursor">{{ blinkingCursor }}</span>
        </div>
        <br>
        <br>

        <!-- OVERLAYING DIV TO CATCH USER CLICKS ON EVERY SPOT OF THE PAGE -->
        <div class="focus-catcher"></div>
    </div>
</template>

<script>
    import CommandHandler from "../classes/CommandHandler";
    import RandomValues from "../classes/RandomValues";
    import TextTimer from "../classes/TextTimer";
    import Store from "../store/Store";

    export default {
        name: 'Chat',
        data: function () {
            return {
                blinkingCursor: '_',
                inputSize: 1,
                userInput: '',
                promptPrefix: '',
                history: [],
                state: {
                    registered: false
                }
            }
        },
        methods: {
            // ###########################
            // ### helper methods ###
            focusPrompt: function () {
                document.getElementById('prompt').focus();
            },
            changeSize: function () {
                this.inputSize = this.userInput.length + 1;
            },
            cleanPrompt: function () {
                // Cleanup your prompt
                this.userInput = '';
                this.inputSize = 1;
            },
            scrollHistory: function () {
                // Scroll
                const history = document.getElementById('history');
                window.scrollTo(0, history.scrollHeight + 1000);
            },
            disablePrompt: function (disable) {
                document.getElementById('prompt').disabled = disable;
                if (disable) {
                    this.blinkingCursor = '';
                } else {
                    this.blinkingCursor = '_';
                    this.focusPrompt();
                }
            },
            // ###########################
            // ### event methods ###
            toHistory: function () {
                // Deep Copy of userInput
                let chatText = this.userInput + ' ';

                // Save user input in history
                this.toHistoryWithArgs(this.promptPrefix, chatText);

                // Handle commands in case it was a command
                CommandHandler.handleCommands(this.toHistoryWithArgsDelayed, chatText);

                // Login specific happenings
                if (Store.state.registered === true && this.state.registered === false) {
                    this.state.registered = true;
                    this.printTextRegistered();
                }
            },
            toHistoryWithArgs: function (promptText, text) {
                // Determine last history id
                let lastid = 0;
                if (this.history.length !== 0) {
                    lastid = this.history[(this.history.length-1)].id;
                }
                // Add to history
                this.history.push(
                    {id: (lastid + 1), pre: promptText, text: text}
                );

                // Cleanup and scroll
                this.cleanPrompt();
                this.scrollHistory();
            },
            toHistoryWithArgsDelayed: function (promptText, text, delay) {
                // Disable prompt
                this.disablePrompt(true);

                TextTimer.additiveDelay(0, true);
                TextTimer.print(this.toHistoryWithArgs, promptText, text, TextTimer.additiveDelay(delay));

                // Enable prompt again
                setTimeout((context = this) => {
                    context.disablePrompt(false);
                }, TextTimer.additiveDelay(300));

            },
            // ###########################
            // ### methods for displaying fake hardcoded irc text messages ###
            printTextInitial: function () {
                // Disable prompt
                this.disablePrompt(true);

                // Start printing hardcoded messages with small delays
                TextTimer.additiveDelay(0, true);
                TextTimer.print(this.toHistoryWithArgs, '', 'Trying 62.113.206.126...', TextTimer.additiveDelay(300));
                TextTimer.print(this.toHistoryWithArgs, '', 'Connected to ' + Store.state.chatServer, TextTimer.additiveDelay(900));
                TextTimer.print(this.toHistoryWithArgs, '', 'Escape character is \'^]\'.', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' NOTICE * ', ':*** Looking up your hostname...', TextTimer.additiveDelay(50));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' NOTICE * ', ':*** Checking Ident', TextTimer.additiveDelay(50));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' NOTICE * ', ':*** Found your hostname', TextTimer.additiveDelay(50));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' NOTICE * ', ':*** No Ident response', TextTimer.additiveDelay(50));

                // Enable prompt again
                setTimeout((context = this) => {
                    context.disablePrompt(false);
                }, TextTimer.additiveDelay(300));
            },
            printTextRegistered: function () {
                // Disable prompt
                this.disablePrompt(true);

                // Start printing hardcoded messages with small delays
                TextTimer.additiveDelay(400, true);
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 001 ' + Store.state.nick + ' ', ':Welcome to the pollux Internet Relay Chat Simulation ' + Store.state.nick, TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 002 ' + Store.state.nick + ' ', ':Your host is ' + Store.state.chatServer + '[62.113.206.126/6667], running version 1.0', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 003 ' + Store.state.nick + ' ', ':This server was created Thu Jan 1 1970 at 00:00:00 UTC', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 251 ' + Store.state.nick + ' ', ':There are 0 users and 0 invisible on 1 servers', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 252 ' + Store.state.nick + ' ', '0 :operator(s) online', TextTimer.additiveDelay(150));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 253 ' + Store.state.nick + ' ', '0 :unknown connection(s)', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 254 ' + Store.state.nick + ' ', '1 :channel(s) formed', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 255 ' + Store.state.nick + ' ', ':I have 0 clients and 1 servers', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 375 ' + Store.state.nick + ' ', ':- ' + Store.state.chatServer + ' Message of the Day -', TextTimer.additiveDelay(100));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 372 ' + Store.state.nick + ' ', ':- Welcome to ' + Store.state.chatServer + ' in Europe', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 372 ' + Store.state.nick + ' ', ':- Feel free to have fun with this small js irc simulation.', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 372 ' + Store.state.nick + ' ', ':- ', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, ':' + Store.state.chatServer + ' 376 ' + Store.state.nick + ' ', ':End of /MOTD command', TextTimer.additiveDelay(10));
                TextTimer.print(this.toHistoryWithArgs, '', ':' + Store.state.nick + ' MODE ' + Store.state.nick + ' :+i', TextTimer.additiveDelay(10));

                // Enable prompt again
                setTimeout((context = this) => {
                    context.disablePrompt(false);
                }, TextTimer.additiveDelay(300));
            },
        },
        // ###########################
        // ### lifecycle hooks ###
        mounted: function () {
            Store.setChatServer(RandomValues.randomChatServer());
            this.$nextTick((context = this) => {
                // Code that will run only after the
                // entire view has been rendered
                context.printTextInitial();
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .prompt {
        margin-right: -.75em;
        border: none;
        background-color: inherit;
        color: transparent;
        text-shadow: 0 0 0 rgb(187,187,187);
        font-size: inherit;
        font-family: inherit;
        padding: 0;
    }
    input:focus {
        outline: none;
    }
    .line {
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        padding-top: 3px;
        min-height: 19px;
        margin: 0;
    }
    .focus-catcher {
        height: 100%;
    }
    .history {
        overflow-x:hidden;
        overflow-y:visible;
    }
    .blinking-cursor {
        font-weight: 100;
        font-size: inherit;
        font-family: inherit;
        color: rgb(187,187,187);
        -webkit-animation: 1s blink step-end infinite;
        -moz-animation: 1s blink step-end infinite;
        -ms-animation: 1s blink step-end infinite;
        -o-animation: 1s blink step-end infinite;
        animation: 1s blink step-end infinite;
    }
    @keyframes blink {
        from, to {
            color: transparent;
        }
        50% {
            color: rgb(187,187,187);
        }
    }
    @-moz-keyframes blink {
        from, to {
            color: transparent;
        }
        50% {
            color: rgb(187,187,187);
        }
    }
    @-webkit-keyframes blink {
        from, to {
            color: transparent;
        }
        50% {
            color: rgb(187,187,187);
        }
    }
    @-ms-keyframes blink {
        from, to {
            color: transparent;
        }
        50% {
            color: rgb(187,187,187);
        }
    }
    @-o-keyframes blink {
        from, to {
            color: transparent;
        }
        50% {
            color: rgb(187,187,187);
        }
    }
</style>
