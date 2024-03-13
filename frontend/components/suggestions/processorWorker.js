

self.onmessage = function(e) {
    const { inputString} = e.data;
    let queryArray = inputString.split(' ');
    let suggestions = [];

    queryArray = queryArray.filter(word => !excluded.includes(word));

    queryArray.forEach(word => {
        if (tags.includes(word) && !suggestions.includes(word)) {
            suggestions.push(word);
        }
    });

    self.postMessage(suggestions);
};
