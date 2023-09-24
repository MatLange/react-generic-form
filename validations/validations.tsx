    // form validation rules 
    import { ValidationMode } from "react-hook-form";
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as Yup from 'yup';
    import { array as yupArray } from "yup";


    export const validationSchemas: Array<any> = [
        Yup.object({
            title: Yup.string()
                .required('Title is required'),                  
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
            comment: Yup.string()
                .required('Comment is required'),                 
            dob: Yup.string()
                .required('Date of Birth is required')
                .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
                .required('Confirm Password is required'),
            acceptTerms: Yup.bool()
                .oneOf([true], 'Accept Ts & Cs is required')
        })];
