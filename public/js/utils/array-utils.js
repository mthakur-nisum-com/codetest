export const findByProps = (set = [], properties) => {
    return set.filter(function (entry) {
        return Object.keys(properties).every(function (key) {
            return entry[key] === properties[key];
        });
    });
};

