const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// [ {_id:'','India',bronze:2 ,gold:4,silver:6}]
const countriesSchema = new Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        bronze:
        {
            type:Number,
            default:0
        },
        gold:
        {
            type: Number,
            default:0
        },
        silver:
        {
            type:Number,
            default:0
        }
        // [{name:'India' ,gamesScheduled:[{'1st Jan,games:[{gameName:'',opponent:''}]}]}]
        // dates:[
        //     {
        //         date:
        //         {
        //             type:String,
        //             required:true
        //         },
        //         games:
        //         [
        //             {
        //                 type:mongoose.Schema.Types.ObjectId,
        //                 ref:'Game'
        //             }
        //         ]

        //     }
        // ]
    }
)
countriesSchema.index({name:"text"});
module.exports = mongoose.model('Country',countriesSchema)