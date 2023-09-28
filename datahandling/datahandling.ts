
const dataFetch = fetch;
//const dataFetch = axios.get;

export const dataFetcher = (url:string) => dataFetch(url).then((res) => res.json());

export const dataPoster = async (url:string, bodyData: any) => {
    const response = await dataFetch(url, {
      method: "POST",
      body: bodyData,
    });
    return response.json();
  };

  export const dataUpdater = async (url:string, bodyData: any) => {
    const response = await dataFetch(url, {
      method: "PATCH",
      body: bodyData,
    });
    return response.json();
  };  