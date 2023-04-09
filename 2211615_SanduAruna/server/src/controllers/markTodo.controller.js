import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";

export const markTodo =async (req,res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "to do id is required",
        error.mapped()
        ));
    }

    try {
        const todo = await Todo.findOneAndUpdate({
            _id: req.body.todo_id,
            userId: req.userId,   
        },[
            {
                $set:{
                    isCompleted: {
                        $eq:[false,"$isCompleted"]
                    }
                }
            }
        ]
        )

        if(todo){
            return res.json(jsonGenerate(statusCode.SUCCESS, "updated", todo))
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "could not update", null))
    }

}