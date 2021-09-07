const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// [{'Basketball',[
    // {players:[{'India','Australia'}],date:'01-01-2021},
// {players:[{'India','Australia'}],date:'01-01-2021}]}]


const gamesSchema = new Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        opponents:[
            {
                ///countries
                team1:
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Country'
                },
                team2:
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Country'
                },
                date:
                {
                    type:String,
                    required:true
                }
                
            }
        ]
        // {c1:'India',c2:"australia",date:''},{}
    }
)
gamesSchema.index({name:"text"});
gamesSchema.index({"date":"text"});
module.exports = mongoose.model('Game',gamesSchema);