import { supabase } from './databasehandling'
import { useUser } from "../context/user";

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

    const checkIfRecordExists = async (tableName: string, dataRecord:any, userId:string) => {
      const { count } = await supabase
      .from(tableName).select('*', { count: 'exact'})
      .eq('user_id', userId);
      return count;    
    }
    export const addData:any = async (tableName: string, dataRecord:any) => {
          //const count = await checkIfRecordExists(tableName, dataRecord, userId);
          //.eq('user_id', dataRecord.user_id);
          //console.log("Count: "+ count);
/*         if (error) setError(error.message)
        else setTodos([...todos, todo]); */

        //if (!count || count === 0) {
          const resp = await supabase
          .from(tableName)
          .insert({...dataRecord})
          .single();
          return resp;
        //}
/*         if (error) setError(error.message)
        else setTodos([...todos, todo]); */
    }

    export const updateData = async (tableName: string, dataRecord:any)  => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .update({ ...dataRecord })
          .eq('id', dataRecord.id)
          .single();
        if (error) {
          throw error;
        }
        //setIsCompleted(data.is_complete)
      } catch (error) {
        console.log('error', error);
      }
    }    
  
   export const deleteData = async (tableName: string, id:string) => {
      try {
        await supabase.from(tableName).delete().eq("id", id);
        //setTodos(todos.filter((x) => x.id != id))
      } catch (error) {
        console.log('error', error);
      }
    }
  
  export const fetchData : any = async (tableName: string, columnNames:string, userId: string) => {
    try {
      if (!tableName) {
        return undefined;
      }
      
      //const response =  userId ? await supabase.from(tableName).select(columnNames).eq("user_id", userId) : await supabase.from(tableName).select(columnNames);
      const resp =  await supabase.from(tableName).select(columnNames);
      console.log(resp);
      return resp;
/*       if(data) {
        return data;
      }
      if(error) {
        throw error;
      }
 */    }
    catch (error) {
      console.log(error);
    }
  }