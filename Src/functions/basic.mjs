export function parseThroughBadWords(message) {
    var messageSplit = message.split(" ").length == 1 ? message : message.split(" ");
    for(let i = 0; i < arrayOfBadWords.length; i++) {
        if (messageSplit.includes(arrayOfBadWords[i])) {
            return true;
        }
    }
}