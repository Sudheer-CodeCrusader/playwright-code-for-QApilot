import fs from "fs";

export default class BaseClassPage {

    public static async generateRandomText(length: number) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset.charAt(randomIndex);
        }
        return result;
    };

    public randomPhone = () => {
        const randomNumber = Math.random().toString().slice(2, 5);
        return randomNumber;
    };

    public async writeToFile(jsondata: any, key: any, value: any) {
        let resp = {};
        try {
            jsondata[key] = value;
            await fs.writeFile('data.json', JSON.stringify(jsondata, null, 2), 'utf8', (err: any) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else {
                    console.log("Data Inserted");
                }
            });
            await fs.readFile('data.json', 'utf8', (err, data) => {
                resp = data;
            })
        } catch (error: any) {
            console.log(error.message);
        }
        return resp;
    }


    // const getPath = (key: any) => {
    //     return process.env.SAVEPATH + jsondata["key"];
    // }


}
