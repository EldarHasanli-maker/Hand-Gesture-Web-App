Prediction="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-lJwYw0w0/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
var synth=window.speechSynthesis;
speak_data_1="The  Prediction Is"+Prediction;
var utter_this=new SpeechSynthesisUtterance(speak_data_1);
synth.speak(utter_this);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
    }
    function gotResult(error,results){
        if (error){
            console.error (error);
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
               Prediction=results[0].label;
               speak();
               if(results[0].label =="Good"){
                document.getElementById("update_emoji2").innerHTML="&#128077;";
               }
               if(results[0].label =="Bad"){
                document.getElementById("update_emoji2").innerHTML="&#128078;";
               }
               if(results[0].label =="Perfect"){
                document.getElementById("update_emoji2").innerHTML="&#128076;";
               }
        }
    }
    