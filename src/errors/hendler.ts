import { ErrorRequestHandler } from "express";

const errorHendler: ErrorRequestHandler = (error, req, res, nex) => {
    console.error(error)

    return res.status(500)
}

export default errorHendler