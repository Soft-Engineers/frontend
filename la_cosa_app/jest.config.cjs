module.exports = {
    moduleFileExtensions: ['js', 'jsx'],
    roots: ["<rootDir>/public/tests"],
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};

