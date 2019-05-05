// The default Purge CSS extractor does not consider special characters such as @, :, and / so need to specify a custom one
class CustomExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
};

module.exports = CustomExtractor;
