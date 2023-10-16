    // form validation rules 
    import { ValidationMode } from "react-hook-form";
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as Yup from 'yup';
    import { array as yupArray } from "yup";


    function formatDate(date:any) {
        return new Date(date).toLocaleDateString()
    }    

    export const validationSchemas: Array<any> = [
        Yup.object({
            title: Yup.string()
                .required('Title is required'),       
            registrationDate: Yup.date()
                .typeError(`Date is invalid.`) // ex: Expected a value of type date but got: Invalid Date
                .min(
                    Yup.ref('registrationDate'),
                    ({ min }) => `Date needs to be before ${formatDate(min)}!!`,
                    )
                .required('Registration date is required'),
            firstName: Yup.string()
                .required('First Name is required'),
            lastName: Yup.string()
                .required('Last name is required'),                        
        }),
        Yup.object({
            fruits: yupArray().required('Fruits are required'),                 
            address: Yup.string()
                .required('Address is required'),
            city: Yup.string()
                .required('City is required'),                        
        }),     
        Yup.object({
            vegetables: yupArray().required('Vegetables are required'),                 
            wishes: Yup.string()
                .required('Wishes are required'),
            comment: Yup.string()
                .required('Comment is required'),                        
        }),                
        Yup.object({
        })];
        
        const schema = validationSchemas[0];
        const isValid = schema.validateSync({
            title: "Dr.",
            registrationDate: "2020-02-02",
            firstName: "Hu",
            lastName: "Hu",            
          });
