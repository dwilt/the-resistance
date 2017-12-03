const argv = require(`minimist`)(process.argv.slice(2));

const path = require(`path`);

const {
    srcPath,
} = require(`../vars`);

const componentsFolderPath = path.join(srcPath, `components`);
const componentName = argv.name;
const componentPath = path.join(componentsFolderPath, argv.path || ``, componentName);
const hasContainer = argv.hasContainer;
const hasStyles = argv.hasStyles;

module.exports = {
    componentsFolderPath,
    componentName,
    componentPath,
    hasContainer,
    hasStyles,
};
