const path = require(`path`);

const {
    existsSync,
    mkdirSync,
} = require(`fs`);

const {
    createIndexFiles,
    createFile,
    getFileContents,
} = require(`../helpers.js`);

const {
    componentsFolderPath,
    componentName,
    componentPath,
    hasContainer,
    hasStyles,
} = require(`./vars`);

const createContainerFile = async () => {
    const filename = `${componentName}.container.js`;
    const template = path.join(__dirname, `./baseContainerTemplate.js`);
    let templateContent = await getFileContents(template);

    templateContent = templateContent.replace(/COMPONENT_NAME/g, componentName);

    return createFile(componentPath, filename, templateContent);
};


const createComponentFile = async () => {
    const filename = `${componentName}.component.js`;
    const template = path.join(__dirname, `./baseComponentTemplate.js`);
    let templateContent = await getFileContents(template);

    if (!hasStyles) {
        templateContent = templateContent.replace(/import styles .+\n\n/, ``);
        templateContent = templateContent.replace(/ style={styles\.container}/, ``);
    }

    templateContent = templateContent.replace(/COMPONENT_NAME/g, componentName);

    return createFile(componentPath, filename, templateContent);
};

const createComponentStylesFile = async () => {
    const filename = `${componentName}.styles.js`;
    const template = path.join(__dirname, `./baseComponentStylesTemplate.js`);
    const templateContent = await getFileContents(template);

    return createFile(componentPath, filename, templateContent);
};

const createComponentIndexFile = () => {
    const filename = `index.js`;
    const extension = hasContainer ? `container` : `component`;
    const content = `export { default as ${componentName} } from './${componentName}.${extension}';\n`;

    return createFile(componentPath, filename, content);
};

const createComponentFolder = () => {
    if (existsSync(componentPath)) {
        console.error(`${componentName} already exists at: ${componentPath}`);
    } else {
        mkdirSync(componentPath);
    }
};

const createComponent = async () => {
    createComponentFolder();

    const files = [createComponentIndexFile(), createComponentFile()];

    if (hasStyles) {
        files.push(createComponentStylesFile());
    }

    if (hasContainer) {
        files.push(createContainerFile());
    }

    await Promise.all(files);
    await createIndexFiles(componentsFolderPath);
};

module.exports = createComponent;
