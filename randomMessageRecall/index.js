const responseArray = require("./messageResponses.js");
exports.handler = (event, context, callback) => {
 try{   
     console.log('context ${context}');
     var sess = {};
     var response = {};
     var outputSpeech = "";
     
        if (event.session.new){
        //New Session //Start 
            console.log("New Session Started");
        }//End If
         
        switch (event.request.type){
            case "LaunchRequest" :
                // > Launch request //Alexa, AI Group
                console.log("Launch Request");
                response = build_Alexa_Speechlet_Response_Object(sess, responseArray["invocationMessage"], true);
                context.succeed(response);
            break;
            
            case "IntentRequest" :
                
                // > Intent Request //Alexa, ask for the first intent
                console.log("Intent Request");
                switch (event.request.intent.name){
                    case "FirstIntent":
                        //to do list
                       var responseKeys = [];
                        // build the index
                            for (var x in responseArray) {
                                //Exlcude invocationMessage and unknownMessgae
                                if (x != "invocationMessage"                                 && x != "unknownMessage"){
                                        responseKeys.push(x);
                                    }
                            }
                        var messageIntentKey = responseKeys[Math.floor(Math.random() * responseKeys.length)];
                        //var randomString = responseArray[messageIntentKey];
                        //        outputSpeech = responseArray[randomString];
                        outputSpeech = responseArray[messageIntentKey];
                        break;
                    default:
                        outputSpeech = responseArray["unknownMessage"];
                        break;
                }//end switch intent
                
                response = build_Alexa_Speechlet_Response_Object(sess, outputSpeech, true);
                context.succeed(response);
                        
            break;
            case "SessionEndedRequest" :
                // > session Ended Request //Finsihed
                console.log("Session End Request");
            break;
            default :
                console.log("FAIL : 'invalid request type'");
                context.fail('invalid request type');
            break;
        }//End Switch
        
        
    }//End Try
    catch(error){
        context.fail('EXCEPTION: ' + error );
    }//End Catch
       
}


build_Alexa_Speechlet_Response_Object = (sessionAtribute, outputSpeech, shouldEndSession_ind) => {
    console.log('build_Alexa_Speechlet_Response_Object');
    var alexaResponse = { 
        "outputSpeech": outputSpeech,
        shouldEndSession: shouldEndSession_ind
    };
    
    return {
         varsion: "1.0",
         sessionattribute: sessionAtribute,
         response: alexaResponse
     };
};
