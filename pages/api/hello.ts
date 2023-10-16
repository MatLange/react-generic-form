import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';

type ResponseData = {
  //message: string
}

// pages/api/user
/* export async function getData() {
    const response = await fetch(// external API endpoint )
    const jsonData = await response.json()
    return jsonData
}
 */
 
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
    // Specifies the maximum allowed duration for this function to execute (in seconds)
    maxDuration: 5,
}

const readJSONFile = async () => {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  //Return the content of the data file in json format
  return fileContents;
};

const writeJSONFile = async (data:any) => {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const error = await fs.writeFile(jsonDirectory + '/data.json',JSON.stringify(data),{encoding: 'utf8'});
    //Return the content of the data file in json format
    return error;
  };

const createItemInJSONFile = async (data:any) => {
    const jsonContent = await readJSONFile();
    let result = { error: {} as any, item: null as any};
    if (!jsonContent) {
        return result;
    }
    let error;
    try {
        const content = JSON.parse(jsonContent || "") as any;
        if (data) { 
            const records = content?.records || [];
            data.uid = crypto.randomUUID();
            records.push(data as never);
            content.records = records;
        }
        error = await writeJSONFile(content);
        result = (error === undefined) ? {error: error, item: data} : result;
    }
    catch(parseError) {
        console.log(parseError);
        
    }
    finally {
        return result;    
    }
};  

const updateItemInJSONFile = async (uid: string, data:any) => {
    const jsonContent = await readJSONFile();
    let result = { error: {} as any, item: null as any};
    if (!jsonContent) {
        return result;
    }
    let error;
    try {
        const content = JSON.parse(jsonContent || "") as any;
        if (data) { 
            const records = content?.records || [];
            const foundIndex = records.findIndex((record: any) => (record.uid === uid));
            if (foundIndex >= 0)  {
                records[foundIndex] = data;
                content.records = records;
            }
        }
        error = await writeJSONFile(content);
        result = (error === undefined) ? {error: error, item: data} : result;
    }
    catch(parseError) {
        console.log(parseError);
    }
    finally {
        return result;    
    }
};  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const requestMethod = req?.method;
    const body = req?.body ? JSON.parse(req?.body) : "" as any;
    let result, error, item;
    switch (requestMethod) {
        case 'GET':

          //readJSONFile().then((fileContents:any) => (res.status(200).json(fileContents)) );          
          const jsonContent = await readJSONFile();
          res.status(200).json(jsonContent);
          break;
          //res.status(200).json({ message: 'Hello from Next.js!' });
        case 'POST':
            if (!body) {
                res.status(200).json({ message: `Body empty. No action taken.` });
                return;
            }
            result = await createItemInJSONFile(body);
            if (result?.error as any === undefined) {
                res.status(200).json( { ...result, message: `You submitted the following data: ${JSON.stringify(result?.item)}` });
            }
            break;
        case 'PATCH':
            if (!body) {
                res.status(200).json( {  message: `Body empty. No action taken.` });
                return;
            }            
            result = await updateItemInJSONFile(body.uid || "" as string, body);
            error = result?.error as any;
            item = result?.item as any;
            if (error === undefined) {
                res.status(200).json({ ...result, message: `You submitted the following data: ${JSON.stringify(item)}` });
            }
            break;
    // handle other HTTP methods        
        default:
          res.status(200).json({ message: 'Welcome to API Routes!'})
      }    

}