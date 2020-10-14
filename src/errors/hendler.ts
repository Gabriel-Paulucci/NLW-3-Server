import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {
    [key: string]: string[]
}

const errorHendler: ErrorRequestHandler = (error, req, res, nex) => {
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })

        return res.status(400).json({
            massage: 'Validation fails',
            errors
        })
    }

    console.error(error)

    return res.status(500)
}

export default errorHendler