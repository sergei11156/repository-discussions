import path from 'path';
import fs from 'fs';

const directory = './data'


export const saveToFile = (fileName, data) => {
    const filePath = path.join(directory, `${fileName}.json`);
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) reject(err);
            else resolve(`Data saved to ${filePath}`);
        });
    });
}

export const listFiles = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) reject(err);
            else {
                const jsonFiles = files.filter(file => file.endsWith('.json'));
                resolve(jsonFiles);
            }
        });
    });
}

export const loadFromFile = (fileName) => {
    const filePath = path.join(directory, `${fileName}.json`);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
}